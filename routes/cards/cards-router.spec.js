const supertest = require( "supertest" );
const app = require( "../../api/server" );
const knex = require( "../../data/dbConfig" );
const cleaner = require( "knex-cleaner" );
const request = supertest( app );

describe( "Card Router Test", () => {
    it( "should test that true === true", () => {
        expect( true ).toBe( true );
    } );
} );

