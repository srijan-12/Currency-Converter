const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");


const message = document.querySelector(".msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let opt = document.createElement("option");
        opt.innerText = currcode;
        opt.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            opt.selected = "selected";
        }else if(select.name === "to" && currcode === "INR"){
                opt.selected = "selected";
        }
         select.appendChild(opt);
    }

    select.addEventListener("change" ,(evt) =>{
        updateFlag(evt.target);             //bhaut saara options mai se kon sa option mai change aaya ya enevt trigger kia wo element(part of html code )
    })

}



const updateFlag = (element) =>{            //(wo part of code jo trigger hua wo yaha aaiga that is element or uska value = currencyCOde)  //element mai select hai avi
    let currencyCode = element.value;
    // console.log(currencyCode);
    let countryCode = countryList[currencyCode];
    // console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let newimg  = element.parentElement.querySelector("img");
    newimg.src = newSrc;
}


btn.addEventListener("click" , async (evt) =>{
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    //console.log(amount);    //amount is the whole element
    let amtVal = amount.value;
    // console.log(amtVal);
    if(amtVal === " " || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value,toCurr.value);

    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);     //the response that the api gives is not in readable format so converting
    let data = await response.json(); //conversion in readable format
    // console.log(data);
    
    let rate = data[toCurr.value.toLowerCase()];       //getting only exchange rate  , data is in format of array {date:xxxx, inr:83.98765}. inr is the key   [square bracket k andr key hai`]
    console.log(rate);
    let finalAmount = amtVal * rate;
    console.log(finalAmount);


    message.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


    
});