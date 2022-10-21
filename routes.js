const routes=(dbFunction,registration) =>{
	const getIndex= async(req,res)=>{

 let name = registration.regnum
 let town = registration.town
let message= registration.greet(name,town)

  registration.regnum =""
  registration.town=""
    res.render('index' ,{
    message: message,
     
})
}

const greeted= async (req,res)=>{

   let error = registration.errorMessage(req.body.regnumbers,req.body.town)
    if (error) {
       req.flash('info', error)
    }else{
      registration.regnum = req.body.regnumbers[0].toUpperCase()+req.body.regnumbers.slice(1).toLowerCase();
      registration.town = req.body.town
      // regnum= regnumbers[0].toUpperCase()+regnumbers.slice(1).toLowerCase();
      await dbFunction.greets(registration.regnum)
    }
res.redirect('/');


}
    const clearName=  async (req,res)=>{
    await dbFunction.clearReg()
  res.redirect('/');
    }
  

    const getName = async (req,res)=>{

 let names= await dbFunction.getNames()
  
   console.log(names)
res.render('greeted',{
  names
})
}

const getUserCounters=  async (req,res)=>{
 let user = req.params.regnum;
  let counter= await dbFunction.getUserCounter(user)
// await dbFunction.getCounter(user)
  res.render('counter',{user, counter})


}
return{
	getIndex,
	greeted,
	clearName,
	getName,
	getUserCounters
}
}
module.exports = routes