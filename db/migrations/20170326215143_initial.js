
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.text('avatar').nullable();
      table.string('username', 30).nullable();
      table.integer('levels').nullable();
      table.timestamps(true, true);

    }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('puzzles', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name', 50).nullable().unique();
      table.text('extra_info', 'longtext').nullable();
      table.text('problem', 'longtext').nullable();
      table.text('solution', 'longtext').nullable();
      table.text('pop-up', 'longtext' ).nullable();
      table.text('pop-up-image', 'url').nullable();
    }),
    knex.schema.createTableIfNotExists('items', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name', 50).unsigned().nullable();
      table.text('description', 'longtext').nullable();
      table.text('img_url').nullable();
      table.integer('user_id').references('profiles.id').onDelete('CASCADE');
      table.integer('puzzle_id').references('puzzles.id').onDelete('CASCADE');
      table.string('equipped', 15).nullable();
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('items'),
    knex.schema.dropTable('puzzles'),
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles')
  ]);
};




