document.addEventListener('DOMContentLoaded', init)

function init(){
  getAllTrainers().then(iterateTrainers)
}

function iterateTrainers(trainersArray){
  trainersArray.forEach(trainer => {
    const mainContainer = document.querySelector("main")
    let trainerCard = document.createElement('div')
      trainerCard.setAttribute('class', 'card')
      trainerCard.dataset.id = trainer.id
      trainerCard.innerHTML = makeTrainerCard(trainer)
      // trainerCard.addEventListener('click', handleButton)
      mainContainer.append(trainerCard)
    })
}

function makeTrainerCard(trainer){
  return `<p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>
      ${trainer.pokemons.map( pokemon => {
        return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
      }).join('')}
    </ul>`
}

//fetch

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getAllTrainers(){
  return fetch(TRAINERS_URL)
  .then(response => response.json())
}
