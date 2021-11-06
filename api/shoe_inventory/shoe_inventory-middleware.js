const ShoeInventory = require('./shoe_inventory-model');

const validateShoeInventoryExistsById = async (req, res, next) => {
  try {
    const shoe_inventory = await ShoeInventory.findById(Number(req.params.shoe_inventory_id));
    console.log(shoe_inventory)
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
module.exports = {
  validateShoeInventoryExistsById
};