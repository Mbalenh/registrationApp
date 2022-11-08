const routes=(dbFunction) =>{

	const getIndex= async(req,res)=>{
  const regNumbers=await dbFunction.getRegNum()
  res.render('index',{
regNumbers
  })
}

const insertRegistrations= async (req,res)=>{

   let reg= req.body.regnumbers
   const check= await dbFunction.checkDuplicate(reg.toUpperCase())
   
if(!reg){

req.flash("info","Please enter registration number")

}else if(!/^[A-Z]{2}\s[0-9]{3}(\s|\-)?[0-9]{3}$/.test(reg.toUpperCase())){
req.flash("info","Invalid registration number")  
}else if(check.count>0){
 req.flash("info","registration number already exist")
}else if(reg){
  await dbFunction.insertRegistration(reg.toUpperCase())
  req.flash("success","registration number added")
}

res.redirect("/")


}
    const clearREGnum=  async (req,res)=>{
  await dbFunction.clearTownReg()
  res.redirect('/');
    }
  

    const getfilter = async (req,res)=>{

      let city = req.body.city
      const regFilter = await dbFunction.getRegFilter(city)
       res.render('index',{
            regNumbers:regFilter
  })
}


return{
	getIndex,
	insertRegistrations,
	clearREGnum,
	getfilter

}
}
module.exports = routes