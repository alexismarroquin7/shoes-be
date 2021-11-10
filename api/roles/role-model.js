const db = require("../data/db-config")

const findBy = async filter => {
  const roles = await db('roles as r')
  .where(filter)
  .orderBy('r.role_id')
  .select(
    'r.role_id',
    'r.role_name as name',
    'r.role_description as description',
    'r.created_at',
    'r.modified_at'
  );
  
  return roles;
}

module.exports = {
  findBy
}