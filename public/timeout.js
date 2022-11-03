document.addEventListener('DOMContentLoaded', function(){
	let errorMessageElem =document.querySelector(".error")
	let	successMessageElem=document.querySelector(".success")

if(errorMessageElem.innerHTML !== '' || successMessageElem.innerHTML !== ''){
setTimeout(function(){
		errorMessageElem.innerHTML=""
		successMessageElem.innerHTML=""
},3000);

}
});