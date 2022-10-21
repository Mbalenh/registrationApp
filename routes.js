const routes=(dbFunction) =>{
	const getIndex= async(req,res)=>{
  const regNumbers=await dbFunction.getRegNum()
  res.render('index',{
regNumbers
  })
}

const insertRegistrations= async (req,res)=>{

   let reg= req.body.regnumbers

console.log(reg)
if(!/^[A-Z]{2}\s[0-9]{3}(\s|\-)?[0-9]{3}$/.test(reg)){
req.flash("info","Invalid registration number")
}else if(reg){
  await dbFunction.insertRegistration(reg.toUpperCase())
  req.flash("info","registration number added")
}else{
req.flash("info","Please enter registration number")

}
res.redirect("/")


}
    const clearREGnum=  async (req,res)=>{
  await dbFunction.clearTownReg()
  res.redirect('/');
    }
  

    const getfilter = async (req,res)=>{

 let city = req.body.city
   const regFilter = await dbFunction.getRegFilter()
  res.render('index',{
regFilter
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