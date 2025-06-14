let from = document.querySelector("#from");
let to = document.querySelector("#to");
let fromFlag = document.querySelector("#fromFlag");
let toFlag = document.querySelector("#toFlag");
let amountInput = document.querySelector("input");
let answerInput = document.querySelector("#answer");


(async () => {
    let response = await fetch('https://open.er-api.com/v6/latest/USD')
    let data = await response.json()
    let countries = data.rates
    for (var key in countries) {
        let select = document.querySelector("#from")
        select.innerHTML+= `<option value="${key}">${key}</option>`
        
    }
    let scndresponse = await fetch('https://open.er-api.com/v6/latest/PKR')
    let jeo = await scndresponse.json()
    let countr = jeo.rates
    for (var key in countr) {
        let select = document.querySelector("#to")
        select.innerHTML+= `<option value="${key}">${key}</option>`
        
    }
        
})()

let _from = () => {
  var fromselected = from.value;
    let flagUrl = flagGenerater(fromselected);
    fromFlag.src= flagUrl
    return fromselected
}
_from()
let _to = () => {
  var toselected = to.value;
    let flagUrl = flagGenerater(toselected);
    toFlag.src= flagUrl
    return toselected
}
_to()

async function converter(){
    let value = amountInput.value;
    let from = await _from()
    let to = await _to()
    let response = await fetch(`https://open.er-api.com/v6/latest/${from}`)
    let data = await response.json()
    let exchangeRate = data.rates[to]    
    answerInput.value= `${(value*exchangeRate).toFixed(2)}`
}


function flagGenerater(currencyCode) {
  let code = `${currencyCode}`;
  code = code.toLocaleLowerCase();
  goodCode = code[0]+code[1];
  return `https://flagcdn.com/w320/${goodCode}.png`
  
  
}

