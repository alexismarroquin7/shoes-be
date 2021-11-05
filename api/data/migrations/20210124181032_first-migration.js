exports.up = async knex => {
  await knex.schema
  
    .createTable('brands', brands => {
      brands.increments('brand_id');

      brands.string('brand_name')
        .notNullable();
      
      brands.string('brand_description');
      
      brands.timestamps('created_at').defaultTo(knex.fn.now());
      brands.timestamps('modified_at').defaultTo(knex.fn.now());
    })

    .createTable('countries', countries => {
      countries.increments('country_id');
      countries.string('country_name')
      .unique()
      .notNullable();
      countries.string('country_name_abreviation')
      .unique()
      .notNullable();

      countries.timestamps('created_at').defaultTo(knex.fn.now());
      countries.timestamps('modified_at').defaultTo(knex.fn.now());
    })

    .createTable('colors', colors => {
      colors.increments('color_id');
      colors.string('color_name')
      .notNullable()
      .unique();
      colors.string('color_description');

      colors.timestamps('created_at').defaultTo(knex.fn.now());
      colors.timestamps('modified_at').defaultTo(knex.fn.now());
    })

    .createTable('genders', genders => {
      genders.increments('gender_id');
      genders.string('gender_name')
        .unique()
        .notNullable();

      genders.timestamps('created_at').defaultTo(knex.fn.now());
      genders.timestamps('modified_at').defaultTo(knex.fn.now());
    })

    .createTable('shoe_sizes', shoe_sizes => {
      shoe_sizes.increments('shoe_size_id');
      shoe_sizes.integer('shoe_size_amount');
      shoe_sizes.integer('country_id')
        .unsigned()
        .notNullable()
        .references('country_id')
        .inTable('countries')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      shoe_sizes.integer('gender_id')
        .unsigned()
        .notNullable()
        .references('gender_id')
        .inTable('genders')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      shoe_sizes.timestamps('created_at').defaultTo(knex.fn.now());
      shoe_sizes.timestamps('modified_at').defaultTo(knex.fn.now());
    })
    
    .createTable('shoe_styles', shoe_styles => {
      shoe_styles.increments('shoe_style_id');
      
      shoe_styles.string('shoe_style_name')
      .notNullable();
      
      shoe_styles.string('shoe_style_description');
      
      shoe_styles.timestamps('created_at').defaultTo(knex.fn.now());
      shoe_styles.timestamps('modified_at').defaultTo(knex.fn.now());
    })

    .createTable('shoes', shoes => {
      shoes.increments('shoe_id');
      
      shoes.string('shoe_name')
      .notNullable();
      
      shoes.string('shoe_description');

      shoes.integer('brand_id')
        .unsigned()
        .notNullable()
        .references('brand_id')
        .inTable('brands')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      
      shoes.integer('shoe_style_id')
        .unsigned()
        .notNullable()
        .references('shoe_style_id')
        .inTable('shoe_styles')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      
      shoes.timestamps('created_at').defaultTo(knex.fn.now());
      shoes.timestamps('modified_at').defaultTo(knex.fn.now());
    })
    
    .createTable('shoe_inventory', shoe_inventory => {
      shoe_inventory.increments('shoe_inventory_id');
      shoe_inventory.integer('shoe_inventory_quantity')
        .notNullable();
      shoe_inventory.decimal('shoe_inventory_price')
        .notNullable();
      shoe_inventory.integer('shoe_id')
        .unsigned()
        .notNullable()
        .references('shoe_id')
        .inTable('shoes')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      shoe_inventory.integer('shoe_size_id')
        .unsigned()
        .notNullable()
        .references('shoe_size_id')
        .inTable('shoe_sizes')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      shoe_inventory.integer('gender_id')
        .unsigned()
        .notNullable()
        .references('gender_id')
        .inTable('genders')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      shoe_inventory.integer('color_id')
        .unsigned()
        .notNullable()
        .references('color_id')
        .inTable('colors')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      shoe_inventory.timestamps('created_at').defaultTo(knex.fn.now());
      shoe_inventory.timestamps('modified_at').defaultTo(knex.fn.now());
    })

    .createTable('images', images => {
      images.increments('image_id');
      images.string('image_src')
        .notNullable();
      images.string('image_alt');
      images.string('image_title');
      images.string('image_name')
        .unique()
        .notNullable();

      images.timestamps('created_at').defaultTo(knex.fn.now());
      images.timestamps('modified_at').defaultTo(knex.fn.now());
    })
    
    .createTable('shoe_images', shoe_images => {
      shoe_images.increments('shoe_image_id');
      shoe_images.integer('image_id')
        .unsigned()
        .notNullable()
        .references('image_id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      shoe_images.integer('shoe_inventory_id')
        .unsigned()
        .notNullable()
        .references('shoe_inventory_id')
        .inTable('shoe_inventory')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
        
      shoe_images.timestamps('created_at').defaultTo(knex.fn.now());
      shoe_images.timestamps('modified_at').defaultTo(knex.fn.now());
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('shoe_images')
  await knex.schema.dropTableIfExists('images')
  await knex.schema.dropTableIfExists('shoe_inventory')
  await knex.schema.dropTableIfExists('shoes')
  await knex.schema.dropTableIfExists('shoe_styles')
  await knex.schema.dropTableIfExists('shoe_sizes')
  await knex.schema.dropTableIfExists('genders')
  await knex.schema.dropTableIfExists('colors')
  await knex.schema.dropTableIfExists('countries')
  await knex.schema.dropTableIfExists('brands')
}
