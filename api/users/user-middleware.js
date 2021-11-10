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

module.exports = {
  validateUserExistsById
}