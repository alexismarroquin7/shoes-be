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
      countries.string('country_name');
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

    .createTable('discounts', discounts => {
      discounts.increments('discount_id');
      discounts.string('discount_name')
        .notNullable()
        .unique();
      discounts.string('discount_description');
      discounts.decimal('discount_amount')
        .notNullable()
        .unique();
    })
    
    .createTable('shoe_inventory', shoe_inventory => {
      shoe_inventory.increments('shoe_inventory_id');
      shoe_inventory.integer('shoe_inventory_quantity')
        .notNullable();
      shoe_inventory.decimal('shoe_inventory_price')
        .notNullable();
      shoe_inventory.integer('discount_id')
        .unsigned()
        .notNullable()
        .references('discount_id')
        .inTable('discounts')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

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

      shoe_inventory.timestamps('created_at').defaultTo(knex.fn.now());
      shoe_inventory.timestamps('modified_at').defaultTo(knex.fn.now());
    })

    .createTable('images', images => {
      images.increments('image_id');
      images.string('image_src')
        .notNullable();
      images.string('image_alt');
      images.string('image_title');
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
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}
