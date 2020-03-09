const supertest = require( "supertest" );
const app = require( "../../api/server.js" );
const knex = require( "../../data/dbConfig.js" );
const cleaner = require( "knex-cleaner" );
const config = require( "../../knexfile.js" );
const request = supertest( app );

describe( "User Endpoints", () => {
  beforeAll( async( done ) => {
    try{
      let result = await knex.seed.run( config[ "test" ] );
      console.log( result );
      done();
    }catch( e ){
      console.log( e );
      done( e );
    }
  } );
  
  it( "should retrieve the current user", done => {
    request
      .get( "/api/users/me" )
      .set( { auth: "uid1" } )
      .expect( 200 )
      .then( res => {
        const user = res.body;
        expect( user ).toEqual( {
          user_id: 1,
          uid: "uid1",
          username: "user1",
          created_at: expect.any( String ),
          updated_at: expect.any( String ),
        } );
        done();
      } )
      .catch( err => {
        console.log( err );
        done( err );
      } );
  } );
  
  it( "should retrieve all users", done => {
    request
      .get( "/api/users/all" )
      .set( { auth: "uid1" } )
      .expect( 200 )
      .then( res => {
        const users = res.body;
        expect( users.length ).toEqual( 3 );
        expect( typeof users ).toBe( "object" );
        expect( users ).toEqual( [
          {
            user_id: 1,
            uid: "uid1",
            username: "user1",
            created_at: expect.any( String ),
            updated_at: expect.any( String ),
          }, {
            user_id: 2,
            uid: "uid2",
            username: "user2",
            created_at: expect.any( String ),
            updated_at: expect.any( String ),
          }, {
            user_id: 3,
            uid: "uid3",
            username: "user3",
            created_at: expect.any( String ),
            updated_at: expect.any( String ),
          },
        ] );
        done();
      } );
  } );
  
  it( "should edit current user", done => {
    request
      .put( "/api/users" )
      .set( { auth: "uid1" } )
      .send( { username: "newUsername" } )
      .expect( 201 )
      .then( res => {
        const user = res.body[ 0 ];
        expect( typeof user ).toBe( "object" );
        expect( user ).toEqual( {
          user_id: 1,
          uid: "uid1",
          username: "newUsername",
          created_at: expect.any( String ),
          updated_at: expect.any( String ),
        } );
        done();
      } );
  } );
  
  it( "should delete current user", done => {
    request
      .delete( "/api/users" )
      .set( { auth: "uid1" } )
      .expect( 203 )
      .then( res => {
        const body = res.body;
        expect( body.message ).toEqual( "The user has been removed" );
        done();
      } );
  } );
  
  afterAll( () => {
    cleaner.clean( knex );
  } );
} );
