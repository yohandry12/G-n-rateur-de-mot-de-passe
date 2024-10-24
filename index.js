const navEl = document.querySelector('nav')
let prevScrollpos = window.scrollY;

window.onscroll = function() {
  const currentScrollPos = window.scrollY;

  if (prevScrollpos < currentScrollPos) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }

  prevScrollpos = currentScrollPos;
}



let inputEl = document.getElementById('userInput')
const lengthEl = document.getElementById('length')
const uppercaseEL = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const caracEl = document.getElementById('symbol')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')
let voirEl = document.getElementById('voir')
const zoneEl = document.getElementById('zone')
const passwordStrengthEl = document.getElementById('password-strength');



voirEl.addEventListener('click', () => {
  let motDePasse = inputEl.value;
  const meetsRequirements = normes();
  const erreurEl = " Le mot de passe ne répond pas aux exigences.";
  zoneEl.innerText = motDePasse;
  if(motDePasse){
    zoneEl.classList.add('zone')
  }else{
    zoneEl.classList.remove('zone')
  }

  if(meetsRequirements){
    zoneEl.innerText = motDePasse;
  } else{
    zoneEl.innerText = erreurEl;
  }

})

inputEl.onfocus = function(){
  document.getElementById('message').style.display = "block"
}

inputEl.onblur = function(){
  document.getElementById('message').style.display = "none"
}

inputEl.addEventListener('keyup', () =>{
  normes()
})








function normes (){
  let valid = true;

  const haslowerCaseLetters = /[a-z]/
  if(inputEl.value.match(haslowerCaseLetters)){
      letter.classList.remove('invalid')
      letter.classList.add('valid')
  } else{
      valid = false;
      letter.classList.remove('valid')
      letter.classList.add('invalid')
  }

  const hasupperCaseLetters = /[A-Z]/
  if(inputEl.value.match(hasupperCaseLetters)){
      capital.classList.remove('invalid')
      capital.classList.add('valid')
  } else{
      valid = false;
      capital.classList.remove('valid')
      capital.classList.add('invalid')
  }

  const hasnumbers = /[0-9]/
  if(inputEl.value.match(hasnumbers)){
      number.classList.remove('invalid')
      number.classList.add('valid')
  } else{
      valid = false;
      number.classList.remove('valid')
      number.classList.add('invalid')
  }

  const hascaractere = /[``!@#$%^&*(){}[=<>/,.]/
  if (inputEl.value.match(hascaractere)){
      symbol.classList.remove('invalid')
      symbol.classList.add('valid')
  } else{
      valid = false;
      symbol.classList.remove('valid')
      symbol.classList.add('invalid')
  }

  


  if(inputEl.value.length >= 8 ){
      lenght.classList.remove('invalid')
      lenght.classList.add('valid')
  } else{
      valid = false;
      lenght.classList.remove('valid')
      lenght.classList.add('invalid')
  }


  return valid;

  
}








const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () =>{
    const textearea = document.createElement('textarea')
    const password = inputEl.value

    if(!password) { return }

    textearea.value = password
    document.body.appendChild(textearea)
    textearea.select()
    document.execCommand('copy')
    textearea.remove()
    alert('Password copied to clipboard')
})



generateEl.addEventListener('click', () =>{
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEL.checked
    const hasNumber = numbersEl.checked
    const hasSymbol  = symbolsEl.checked

    inputEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    
    
})


function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item) [0])
  

    if(typesCount === 0){
        return ''
    }

    for(let i = 0; i < length; i+= typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type) [0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)
  

    return finalPassword    

}


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
