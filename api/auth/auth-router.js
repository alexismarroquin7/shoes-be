const router = require('express').Router();
const nodemailer = require('nodemailer');
const User = require('../users/user-model');
const {
  validateLoginCredentials,
  handleJsonWebToken,
  handlePasswordHash 
} = require('./auth-middleware');
const {
  validateNewUserModel,
  validateEmailUnique 
} = require('../users/user-middleware');

router.post('/register', validateNewUserModel, validateEmailUnique, handlePasswordHash, async (req, res, next) => {
  const { username, email, role } = req.body;
  try {
    const user = await User.create({ username, email, roleName: role, password: req.hash });
    
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SUPPORT_EMAIL_USER,
          pass: process.env.SUPPORT_EMAIL_PASS
        }
      });
  
      const mailOptions = {
        from: process.env.SUPPORT_EMAIL_USER,
        to: user.email,
        subject: `[CONFIRM EMAIL] SHOES`,
        text: "",
        html: `
        <div>
          <p>Click <a href=${'link'}>here</a> to confirm your email.</p>
          <p>If you did not sign up for this account remove your email <a href=${'link'}>here</a>.</p>
        </div>
        `
      };
  
      await transporter.sendMail(mailOptions);

    } catch(err) {
      next(err);
    
    } finally {
      res.status(201).json(user);
    }

  } catch(err) {
    next(err);
  }
});

router.post('/login', validateLoginCredentials, handleJsonWebToken, async (req, res, next) => {
  res.status(200).json({
    message: `welcome back ${req.user.username}`,
    user: req.user,
    token: req.token
  });
});

router.get('/logout', (req, res, next) => {
  res.end();
});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;