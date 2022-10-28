    
     const DbFunction = (db) =>{
	const insertRegistration= async(reg) =>{
      let town = await db.oneOrNone('select * from Towns where town_name= $1',[reg.slice(0,2)])

		await db.none('insert into registrationNumber (reg_number, town_id) values($1,$2);',[reg,town.id])
}
 const getTownReg= async()=>{
    	return await db.manyOrNone('SELECT * FROM Towns ')
   }
   const getRegNum= async()=>{
    return await db.manyOrNone('SELECT DISTINCT reg_number FROM  registrationNumber')
     
    }  
     

     const clearTownReg = async () => {
        await db.none('Delete FROM registrationNumber')
    }

    const getRegFilter= async(value)=>{
     return await db.manyOrNone('select DISTINCT reg_number from registrationNumber where town_id= $1',[value])

    }
return{
   insertRegistration,
   getTownReg,
   getRegNum,
   clearTownReg,
   getRegFilter
}
}
module.exports = DbFunction


