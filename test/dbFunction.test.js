const assert = require('assert');
const pgp = require('pg-promise')();
const DbFunction = require("../db/DbFunction")

const DATABASE_URL= process.env.DATABASE_URL ||'postgresql://mbali:mba123@localhost:5432/registration'
const config = { 
  connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
  config.ssl = { 
    rejectUnauthorized : false
  }
}

const db = pgp(config)
describe('The registration numbers app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
         await db.none('Delete FROM registrationNumber')
        //  setTimeout(10000)
     });

    it('should be able to add all registration numbers', async function(){
       
        const dbFunction = DbFunction(db)
        await dbFunction.insertRegistration('CA 123 456')
        await dbFunction.insertRegistration('CJ 123-567')

        assert.equal('CA 123 456', await dbFunction.getRegNum('CA 123 456'))
        assert.equal('CJ 123-567', await dbFunction.getRegNum('CJ 123-567'))
});

   it('should be able to add all registration numbers', async function(){
      
        const dbFunction = DbFunction(db)
          await dbFunction.insertRegistration('CK 123 656')
         await dbFunction.insertRegistration('CY 123567')

        assert.equal('CK 123 656', await dbFunction.getRegNum('CK 123 656'))
        assert.equal('CY 123567', await dbFunction.getRegNum('CY 123567'))
});

it('should be able to check if the registration is from Bellville', async function(){
     
        const dbFunction = DbFunction(db)
        await dbFunction.insertRegistration('CK 123 656')
         await dbFunction.insertRegistration('CY 123567')

        assert.equal(1, await dbFunction.getRegFilter('CY 123567'))
});

it('should be able to check if the registration is from Paarl', async function(){
        
        const dbFunction = DbFunction(db)
       
         await dbFunction.insertRegistration('CK 123 656')
         await dbFunction.insertRegistration('CK 123567')

        assert.equal(4, await dbFunction.getRegFilter('CK 123 656'))
        assert.equal(4, await dbFunction.getRegFilter('CK 123567'))
});
it('should be able to check if the registration is from Cape town', async function(){
        
        const dbFunction = DbFunction(db)
      await dbFunction.insertRegistration('CA 123 656')
         await dbFunction.insertRegistration('CA 123567')

        assert.equal(2, await dbFunction.getRegFilter('CA 123 656'))
        assert.equal(2, await dbFunction.getRegFilter('CA 123567'))   
     
});


    after(function(){
    db.$pool.end()
});
 });
