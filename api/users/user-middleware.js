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
  } else if(role !== 'user' || role !== 'admin') {
    next({ status: 400, message: "role must equal 'user' or 'admin'" });
  } else {
    next();
  }
};

const validateEmailUnique = async (req, res, next) => {
  const { email } = req.body;
  try {
    const [ user ] = await User.findBy({ email });
    if(user){
      if(
        !req.params.user_id || 
        (req.params.user_id && user.user_id !== Number(req.params.user_id))
      ){
        next({
          status: 400,
          message: `${email} already has an account registered`
        });
      } else {
        // email is taken by same user
        next();
      }
    } else {
      // email is not taken
      next();
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