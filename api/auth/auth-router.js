const router = require('express').Router();
const { sendMail, generateJsonWebToken } = require('../../utils');
const User = require('../users/user-model');
const {
  validateLoginCredentials,
  handleJsonWebTokenForUser,
  handlePasswordHash,
  validateConfirmEmailToken
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
      
      const token = generateJsonWebToken({
        subject: user.user_id
      },
      {
        expiresIn: '1d' 
      });

      const url = {
        subject: `[CONFIRM EMAIL] ${process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_NETWORK_DEV_CLIENT_URL}` : `${process.env.REACT_APP_PRODUCTION_CLIENT_URL}`}`,
        confirmEmail: process.env.NODE_ENV === 'development' 
        ? `${process.env.REACT_APP_NETWORK_DEV_CLIENT_URL}/confirm-email/${token}` 
        : `${process.env.REACT_APP_PRODUCTION_CLIENT_URL}/confirm-email/${token}`,
        deleteAccount: process.env.NODE_ENV === 'development' 
        ? `${process.env.REACT_APP_NETWORK_DEV_CLIENT_URL}/delete-account/${token}` 
        : `${process.env.REACT_APP_PRODUCTION_CLIENT_URL}/delete-account/${token}`
      }

      await sendMail({
        service: "gmail",
        auth: {
          user: process.env.SUPPORT_EMAIL_USER,
          pass: process.env.SUPPORT_EMAIL_PASS
        }
        },
        {
          from: process.env.SUPPORT_EMAIL_USER,
          to: user.email,
          subject: url.subject,
          text: `
            <div>
              <p>Click <a href=${url.confirmEmail}> here </a>to confirm your email.</p>
              <p>If you did not sign up for this account remove your email <a href=${url.deleteAccount}>here</a>.
              </p>
            </div>
          `,
          html: `
            <div>
              <p>Click 
                <a href=${url.confirmEmail}>here</a>to confirm your email.
              </p>
              <p>If you did not sign up for this account remove your email 
                <a href=${url.deleteAccount}>here</a>.
              </p>
            </div>
          `
      });

    } catch(err) {
      next(err);
    
    } finally {
      res.status(201).json(user);
    }

  } catch(err) {
    next(err);
  }
});

router.post('/login', validateLoginCredentials, handleJsonWebTokenForUser, async (req, res, next) => {
  res.status(200).json({
    message: `welcome back ${req.user.username}`,
    user: req.user,
    token: req.token
  });
});

router.get('/logout', (req, res, next) => {
  res.end();
});

router.put('/confirm-email/:token', validateConfirmEmailToken, async (req, res, next) => {
  try {
    const user = await User.updateById({ email_confirmed: true }, req.decodedConfirmEmailToken.subject);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;