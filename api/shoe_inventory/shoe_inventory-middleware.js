const ShoeInventory = require('./shoe_inventory-model');

const validateShoeInventoryExistsById = async (req, res, next) => {
  try {
    const shoe_inventory = await ShoeInventory.findById(Number(req.params.shoe_inventory_id));
    if(shoe_inventory){
      req.shoe_inventory = shoe_inventory;
      next();

    } else {
      next({
        status: 404,
        message: `shoe_inventory of id ${req.params.shoe_inventory_id} does not exist`
      });
    }

  } catch (err) {
    next(err);
  }
}

const handleShoeIdQuery = async (req,res,next) => {
  if(req.query && req.query.shoe_id){
    try {
      const shoe_inventory = await ShoeInventory.findAll(req.query);
      if(shoe_inventory){
        res.status(200).json(shoe_inventory);
      } else {
        next({
          status: 404,
          message: `shoe_inventory of shoe_id ${req.query.shoe_id} does not exist`
        });
      }
    } catch (err) {
      next(err);
    }

  } else {
    next();
  }
}

module.exports = {
  validateShoeInventoryExistsById,
  handleShoeIdQuery
};