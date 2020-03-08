const supertest = require( "supertest" );
const app = require( "../../api/server" );
const knex = require( "../../data/dbConfig" );
const cleaner = require( "knex-cleaner" );
const request = supertest( app );

describe( "Sample Test", () => {
    it( "should test that true === true", () => {
        expect( true ).toBe( true );
    } );
} );

describe( "Register Endpoints", () => {
    beforeAll( () => {
        cleaner.clean( knex );
    } );
    
    it( "should create a new user", ( done ) => {
        try{
            request
                .post( "/api/register" )
                .send( { uid: "1234fjkdsl", username: "testing123" } )
                .expect( 201 )
                .then( res => {
                    const user = res.body;
                    expect( user ).toEqual( {
                        user_id: expect.any( Number ),
                        uid: "1234fjkdsl",
                        username: "testing123",
                        created_at: expect.any( String ),
                        updated_at: expect.any( String ),
                    } );
                    done();
                } );
        }catch( e ){
            console.log( e );
        }
        
    } );
} );