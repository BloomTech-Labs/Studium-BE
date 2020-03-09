exports.seed = function( knex ){
  return knex( "users" ).insert( [
    { uid: "uid1", username: "user1" }, { uid: "uid2", username: "user2" },
    { uid: "uid3", username: "user3" },
  ] );
};
