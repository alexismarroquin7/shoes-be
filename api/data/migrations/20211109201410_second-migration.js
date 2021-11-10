
exports.up = async knex => {
  await knex.schema
  
  .createTable('roles', roles => {
    roles.increments('role_id')
    roles.string('role_name')
    .notNullable()
    .unique();
    roles.string('role_description');
  })

  .createTable('users', users => {
    users.increments('user_id');
    users.string('username')
    .notNullable();
    users.string('password')
    .notNullable();
    users.string('email')
    .unique();
    users.integer('email_confirmed');
    users.timestamp('created_at').defaultTo(knex.fn.now());
    users.timestamp('modified_at').defaultTo(knex.fn.now());
    users.integer('role_id')
    .unsigned()
    .notNullable()
    .references('role_id')
    .inTable('roles')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
  })
  
  .createTable('user_adresses', user_adresses => {
    user_adresses.increments('user_adress_id');
    user_adresses.string('adress_line_1');
    user_adresses.string('adress_line_2');
    user_adresses.string('postal_code');
    user_adresses.string('city');
    user_adresses.timestamp('created_at').defaultTo(knex.fn.now());
    user_adresses.timestamp('modified_at').defaultTo(knex.fn.now());
    user_adresses.integer('user_id')
    .unsigned()
    .notNullable()
    .references('user_id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
    user_adresses.integer('country_id')
    .unsigned()
    .notNullable()
    .references('country_id')
    .inTable('countries')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
  })

  .createTable('user_payments', user_payments => {
    user_payments.increments('user_payment_id');
    
    user_payments.string('payment_type');
    user_payments.string('provider');
    user_payments.string('card_number');
    user_payments.string('name_on_card');
    user_payments.string('expiry_date');
    
    user_payments.timestamp('created_at').defaultTo(knex.fn.now());
    user_payments.timestamp('modified_at').defaultTo(knex.fn.now());
    
    user_payments.integer('user_id')
    .unsigned()
    .notNullable()
    .references('user_id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
    
    user_payments.integer('user_adress_id')
    .unsigned()
    .notNullable()
    .references('user_adress_id')
    .inTable('user_adresses')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
  })
  ;
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('user_payments');
  await knex.schema.dropTableIfExists('user_adresses');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('roles');
};
