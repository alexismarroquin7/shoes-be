const User = require('./user-model');

const validateUserExistsById = async (req,res,next) => {
  const { user_id } = req.params;
  try {
    const user = await User.findById(Number(user_id));
    
    if(user){
      req.user = user;
      next();
    } else {
      next({
        status: 404,
        message: `user of id ${user_id} does not exist`
      });
    }
  } catch (err) {
    next(err);
  }
}

const validateNewUserModel = (req,res,next) => {
  const {
    username,
    password,
    email,
    role
  } = req.body;

  if(!username||!password||!email||!role){
    next({ status: 400, message: "username, password, email, and role are all required" });
  } else {
    next();
  }
};

const validateEmailUnique = async (req, res, next) => {
  const { email } = req.body;
  try {
    const [ user ] = await User.findBy({ email });
    if(user){
      next();
    } else {
      next({
        status: 400,
        message: `${email} already has an account registered`
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateUserExistsById,
  validateNewUserModel,
  validateEmailUnique
}