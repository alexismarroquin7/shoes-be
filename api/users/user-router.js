const router = require('express').Router();
const { validateUserExistsById, validateEmailUnique, validateNewUserModel } = require('./user-middleware');
const User = require('./user-model');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:user_id', validateUserExistsById, async (req, res) => {
  res.status(200).json(req.user);
});

router.put('/:user_id', validateUserExistsById, validateNewUserModel, validateEmailUnique, async(req,res,next)=> {
  try {
    const user = await User.updateById(req.body, req.user.user_id);
    res.status(200).json(user);
  } catch(err){
    next(err); 
  }
});

router.delete('/:user_id', validateUserExistsById, async(req,res,next)=> {
  try {
    const deletedUser = await User.deleteById(req.user.user_id);
    res.status(200).json({ user_id: deletedUser.user_id });
  } catch(err){
    next(err); 
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;