const db = require('../data/db-config');
const Role = require('../roles/role-model');
const { intToBool, boolToInt } = require('../../utils');

const findAll = async () => {
  const rows = await db('users as u')
  .join('roles as r', 'r.role_id', 'u.role_id')
  .select(
    'u.user_id',
    'u.username',
    'u.password',
    'u.email',
    'u.email_confirmed',
    'u.created_at as user_created_at',
    'u.modified_at as user_modified_at',
    
    'u.role_id',
    'r.role_name',
    'r.role_description',
    'r.created_at as role_created_at',
    'r.modified_at as role_modified_at'
  );

  const users = rows.map(row => {
    return {
      user_id: row.user_id,
      username: row.username,
      password: row.password,
      email: row.email,
      email_confirmed: intToBool(row.email_confirmed),
      created_at: row.user_created_at,
      modified_at: row.user_modified_at,
      role: {
        role_id: row.role_id,
        name: row.role_name,
        description: row.role_description,
        created_at: row.role_created_at,
        modified_at: row.role_modified_at
      }
    }
  });
  
  return users;
};

const findById = async user_id => {
  const row = await db('users as u')
  .join('roles as r', 'r.role_id', 'u.role_id')
  .select(
    'u.user_id',
    'u.username',
    'u.password',
    'u.email',
    'u.email_confirmed',
    'u.created_at as user_created_at',
    'u.modified_at as user_modified_at',
    
    'u.role_id',
    'r.role_name',
    'r.role_description',
    'r.created_at as role_created_at',
    'r.modified_at as role_modified_at'
  )
  .where({ user_id })
  .first();
  
  return row 
  ? {
    user_id: row.user_id,
    username: row.username,
    password: row.password,
    email: row.email,
    email_confirmed: intToBool(row.email_confirmed),
    created_at: row.user_created_at,
    modified_at: row.user_modified_at,
    role: {
      role_id: row.role_id,
      name: row.role_name,
      description: row.role_description,
      created_at: row.role_created_at,
      modified_at: row.role_modified_at
    }
  } 
  : null;
};

const findBy = async filter => {
  const rows = await db('users as u')
  .join('roles as r', 'r.role_id', 'u.role_id')
  .select(
    'u.user_id',
    'u.username',
    'u.password',
    'u.email',
    'u.email_confirmed',
    'u.created_at as user_created_at',
    'u.modified_at as user_modified_at',
    
    'u.role_id',
    'r.role_name',
    'r.role_description',
    'r.created_at as role_created_at',
    'r.modified_at as role_modified_at'
  )
  .where(filter)
  .orderBy('u.user_id', 'asc');

  if(rows === []){
    return [];
  } else {
    const users = rows.map(row => {
      return {
        user_id: row.user_id,
        username: row.username,
        password: row.password,
        email: row.email,
        email_confirmed: intToBool(row.email_confirmed),
        created_at: row.user_created_at,
        modified_at: row.user_modified_at,
        role: {
          role_id: row.role_id,
          name: row.role_name,
          description: row.role_description,
          created_at: row.role_created_at,
          modified_at: row.role_modified_at
        }
      }
    });
  
    return users;
  }
};

const create = async ({ username, email, roleName, password }) => {
  // find corresponding role_id
  const [ role ] = await Role.findBy({ role_name: roleName });

  const model = {
    username,
    email,
    email_confirmed: boolToInt(false),
    role_id: role.role_id,
    password
  };

  const [ user ] = await db('users as u').insert(model, ['u.user_id']);
  
  return findById(user.user_id);
};

const updateById = async (changes, user_id) => {
  const oldUser = await findById(user_id);
  let role;
  if(changes.role){
    [ role ] = await Role.findBy({ role_name: changes.role });
  } else {
    role = oldUser.role
  }
  
  const model = {
    username: changes.username ? changes.username : oldUser.username,
    email: changes.email ? changes.email : oldUser.email,
    email_confirmed: changes.email_confirmed ? boolToInt(changes.email_confirmed) : oldUser.email_confirmed,
    password: changes.password ? changes.password : oldUser.password,
    role_id: role.role_id,
    created_at: oldUser.created_at,
    modified_at: db.fn.now()
  };
  await db('users as u').where({ user_id }).update(model);
  return findById(user_id);
};

const deleteById = async user_id => {
  const userToDelete = await findById(user_id);

  await db.transaction(async trx => {
    await trx('user_payments as up').where({ user_id }).delete();
    await trx('user_adresses as ua').where({ user_id }).delete();
    await trx('users as u').where({ user_id }).delete();
  });

  const deletedUser = userToDelete;

  return deletedUser;
};

module.exports = {
  findAll,
  findById,
  deleteById,
  findBy,
  create,
  updateById
}