const arrayWords = ["co dwie głowy to nie jedna","cel uświęca środki","raz na wozie raz pod wozem", "niedaleko pada jabłko od jabłoni"];
const typeLetterInput = document.querySelector('.typeLetterInput')
const nameBox = document.querySelector('.name')
// const spanElements = document.getElementsByClassName('letter');
const messageBox = document.querySelector('.message')
const restartBtn = document.querySelector('.restart');
const wrapper = document.querySelector('.wrapper')
const spanElementsArray = []


let mistakes = 0;
let counter = 0;

let whiteSpaceIndex;
const whiteSpaceArray = [];

let index = Math.floor(Math.random() * arrayWords.length);
let word = arrayWords[index].split("");

const addSpanElements = () => {
    
    for(let i = 0; i < word.length; i++){
        const spanElement = document.createElement('span')
        // spanElement.textContent = ".";
        // spanElement.style.color = 'black';
        spanElement.className = "letter";
        spanElement.dataset.key = i;
        
        spanElementsArray.push(spanElement)
        nameBox.appendChild(spanElement)
    }
}

addSpanElements();


  while(word.includes(" ")){
    nameBox.textContent = "";
    spanElementsArray.splice(0);
    whiteSpaceIndex = word.findIndex(letter => letter === " ")
      word.splice(whiteSpaceIndex, 1)  
    //   spanElementsArray.splice(whiteSpaceIndex, 1);
    if(!(word.includes(" "))){
      addSpanElements();
    }
      whiteSpaceArray.push(whiteSpaceIndex -1)
    
    }
    
     whiteSpaceArray.forEach(whiteSpaceNumber => {
            spanElementsArray[whiteSpaceNumber].style.marginRight = "70px" 
         })
     
    
     
const preventOtherChars = (e) =>{
    if(e.keyCode < 65 || e.keyCode > 90){
        e.preventDefault();
   }
}
 

const typeLetter = (e) => {
    const text = e.target.value.toLowerCase()

    
if(word.includes(text)){
    word.forEach((letter, index) => {
        if(letter === text){
            if(spanElementsArray[index].textContent.includes(letter)){
                return alert("Już podałeś tą literę");
            }
            spanElementsArray[index].textContent = letter;
            spanElementsArray[index].style.color = "white";
            // spanElements[index].textContent = spanElementsArray[index].textContent;
            counter++;
        }
    })
    }
else{
        document.querySelector('img').src = `images/img_${++mistakes}.png`;
}
    setTimeout(function(){
        e.target.value = "";
    }, 100)

    setTimeout(function(){

   
    if(counter === word.length){
        document.querySelector('.messageContent span').textContent = "Wygrałeś!"
        wrapper.style.filter = "blur(8px)";
        typeLetterInput.disabled = true;
        messageBox.classList.add('active');

    }

    if(mistakes === 11){
        document.querySelector('.messageContent span').textContent = "Przegrałeś!"
        wrapper.style.filter = "blur(8px)";
        typeLetterInput.disabled = true;
        messageBox.classList.add('active');

    }
},200) 
        
}

  const restartGame = () => {
    window.location.reload();
  }  
restartBtn.addEventListener('click', restartGame);
typeLetterInput.addEventListener('input', typeLetter);
typeLetterInput.addEventListener('keydown', preventOtherChars);
  