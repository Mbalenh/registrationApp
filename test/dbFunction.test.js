const assert = require('assert');
const pgp = require('pg-promise')();
const DbFunction = require("../db/DbFunction")

const DATABASE_URL= process.env.DATABASE_URL ||"postgresql://mbali:mba123@localhost:5432/registration"

const config = { 
  connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
  config.ssl = { 
    rejectUnauthorized : false
  }
}

const db = pgp(config);


describe('The registration numbers app', function(){
    beforeEach(async function(){
 // clean the tables before each test run

 await db.none('Delete FROM registrationNumber')
 //setTimeout(10000)
});

    it('should be able to add all registration numbers', async function(){
     const dbFunction = DbFunction(db)

     await dbFunction.insertRegistration('CA 123 456')
     await dbFunction.insertRegistration('CJ 123-567')

     const regNumbers = await dbFunction.getRegNum()

     assert.deepEqual([ { reg_number: 'CA 123 456' }, { reg_number: 'CJ 123-567' } ], regNumbers)

 });

    it('should be able to add all registration numbers', async function(){

        const dbFunction = DbFunction(db)

        await dbFunction.insertRegistration('CY 123 656')
        await dbFunction.insertRegistration('CY 123567')
        const regNumbers = await dbFunction.getRegNum()
        assert.deepEqual([ { reg_number: 'CY 123 656' }, { reg_number: 'CY 123567' } ], regNumbers)

    });


    it('should be able to check if the registration is from Bellville', async function(){


     const dbFunction = DbFunction(db)

     await dbFunction.insertRegistration('CY 123567')
     await dbFunction.insertRegistration('CK 123 656')

     const regNumbers = await dbFunction.getRegFilter(1)
     assert.deepEqual([ {reg_number: 'CY 123567'} ], regNumbers)

 });


    it('should be able to check if the registration is from Paarl', async function(){

     const dbFunction = DbFunction(db)
     await dbFunction.insertRegistration('CK 123567')
     await dbFunction.insertRegistration('CK 123 656')
     

     const regNumbers = await dbFunction.getRegFilter(4)

     assert.deepEqual([ {reg_number: 'CK 123567'}, {reg_number: 'CK 123 656'} ], regNumbers)
 });

    it('should be able to check if the registration is from Cape town', async function(){
        const dbFunction = DbFunction(db)

        await dbFunction.insertRegistration('CA 123567')
        await dbFunction.insertRegistration('CA 123 656')
       
        const regNumbers = await dbFunction.getRegFilter(2)
        assert.deepEqual([ {reg_number: 'CA 123567'}, {reg_number: 'CA 123 656'} ], regNumbers)
    });

    after(function(){
     db.$pool.end()
 });
});
