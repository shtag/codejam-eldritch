const chosenAncientImg = document.querySelector('.chosen-ancient')
const ancients = document.querySelectorAll('.ancient')
const dif = document.querySelectorAll('.dif')
const shuffleButton = document.querySelector('.shuffle')
const colodeBtn = document.querySelector('.colodeBtn')
const popup = document.querySelector('.popup')
const currentCard = document.querySelector('.current-card-img')
const greens = document.querySelectorAll('.green')
const brown = document.querySelectorAll('.brown')
const blue = document.querySelectorAll('.blue')
const phase1 = document.querySelectorAll('.phase1')
const phase2 = document.querySelectorAll('.phase2')
const phase3 = document.querySelectorAll('.phase3')


let chosenDiffucalty = 2;
let chosenAncient;
let currentAncient = []
let currentColode = {}
let sumGreens = 0;
let sumBrowns = 0;
let sumBlues = 0;

import {ancientsData} from "./ancients.js"
import {card} from "./data/mythicCards/index.js"

dif[2].classList.add('active')

ancients.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    chosenAncientImg.src = e.target.src;
    ancients.forEach(element => {
      element.classList.remove('active-ancient')
    })
    element.classList.add('active-ancient')
    chosenAncient = index;
    currentAncient.length = 0;
    currentAncient.push(ancientsData[chosenAncient].firstStage, ancientsData[chosenAncient].secondStage, ancientsData[chosenAncient].thirdStage)
    for (let key in card) {
      currentColode[key] = card[key];
    }
  })
});




dif.forEach((element ,index) => {
  element.addEventListener('click', (e) => {
    dif.forEach(element => {
      element.classList.remove('active')
    })
    chosenDiffucalty = index;
    e.target.classList.add('active');
  })
})

let colode = [];

shuffleButton.addEventListener('click', () => {
  sumGreens = 0;
  sumBrowns = 0;
  sumBlues = 0;
  let greensArr = [];
  let brownsArr = [];
  let bluesArr = [];
  greens.forEach((el, id) => {
    el.textContent = currentAncient[id].greenCards
    sumGreens = sumGreens + Number(el.textContent)
  })
  brown.forEach((el, id) => {
    el.textContent = currentAncient[id].brownCards
    sumBrowns = sumBrowns + Number(el.textContent)
  })
  blue.forEach((el, id) => {
    el.textContent = currentAncient[id].blueCards
    sumBlues = sumBlues + Number(el.textContent)
  })
  for(let i = 0; i < sumGreens; i++){
    const random = Math.floor(Math.random()*currentColode.greenCards.length)
    greensArr.push(...currentColode.greenCards.splice(random, 1))
  }
  for(let i = 0; i < sumBrowns; i++){
    const random = Math.floor(Math.random()*currentColode.brownCards.length)
    brownsArr.push(...currentColode.brownCards.splice(random, 1))
  }
  for(let i = 0; i < sumBlues; i++){
    const random = Math.floor(Math.random()*currentColode.blueCards.length)
    bluesArr.push(...currentColode.blueCards.splice(random, 1))
  }
  let phase = [[], [], []];
  greens.forEach((element, id) => {
    for(let i = 0; i < Number(element.textContent); i++){
      phase[id].push(greensArr.pop());
    }
  })
  brown.forEach((element, id) => {
    for(let i = 0; i < Number(element.textContent); i++){
      phase[id].push(brownsArr.pop());
    }
  })
  blue.forEach((element, id) => {
    for(let i = 0; i < Number(element.textContent); i++){
      phase[id].push(bluesArr.pop());
    }
  })

  let phrase1 = phase[0];
  let phrase2 = phase[1];
  let phrase3 = phase[2];
  phrase1.sort(() => Math.random() - 0.5)
  phrase2.sort(() => Math.random() - 0.5)
  phrase3.sort(() => Math.random() - 0.5)
  console.log(phrase1)
  console.log(phrase2)
  console.log(phrase3)
  colode = [...phrase1, ...phrase2, ...phrase3];
  console.log(colode)
  colode.reverse()
  colodeBtn.src = 'assets/mythicCardBackground.png'
})

colodeBtn.addEventListener('click', () => {
  if(phase1[0].textContent != '0' || phase1[1].textContent != '0' || phase1[2].textContent != '0'){
    if(colode[colode.length-1].color == 'blue')phase1[2].textContent = Number(phase1[2].textContent)-1;
    else if(colode[colode.length-1].color == 'brown') phase1[1].textContent = Number(phase1[1].textContent)-1;
    else if(colode[colode.length-1].color == 'green') phase1[0].textContent = Number(phase1[0].textContent)-1;
  } else if(phase2[0].textContent != '0' || phase2[1].textContent != '0' || phase2[2].textContent != '0'){
    if(colode[colode.length-1].color == 'blue')phase2[2].textContent = Number(phase2[2].textContent)-1;
    else if(colode[colode.length-1].color == 'brown') phase2[1].textContent = Number(phase2[1].textContent)-1;
    else if(colode[colode.length-1].color == 'green') phase2[0].textContent = Number(phase2[0].textContent)-1;
  } else if(phase3[0].textContent != '0' || phase3[1].textContent != '0' || phase3[2].textContent != '0'){
    if(colode[colode.length-1].color == 'blue')phase3[2].textContent = Number(phase3[2].textContent)-1;
    else if(colode[colode.length-1].color == 'brown') phase3[1].textContent = Number(phase3[1].textContent)-1;
    else if(colode[colode.length-1].color == 'green') phase3[0].textContent = Number(phase3[0].textContent)-1;
  }
  
  currentCard.src = colode[colode.length-1].cardFace;
  colode.length = colode.length-1;
  if(colode.length == 0) colodeBtn.src = '';
})


popup.addEventListener('click', () => {
  location.reload()
})




