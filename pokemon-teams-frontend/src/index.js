const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const adapterPokemon = new Adapter("http://localhost:3000", 'pokemons')
const adapterTrainer = new Adapter("http://localhost:3000", 'trainers')

document.addEventListener('DOMContentLoaded', ()=> {
  const cards = document.querySelector("#poke-cards")
  cards.addEventListener('click', buttonHandler)


  init()

})




function buttonHandler(e) {
  if (e.target.className.includes("addPokeBtn")) {
    adapterPokemon.create(e.target.dataset.trainerId)
    .then(e => renderPokemon(e))
  } else if (e.target.className.includes("release")) {
    adapterPokemon.delete(e.target.dataset.pokemonId)
    .then(deletePokemon(e.target))
  }
}

function init() {
  adapterTrainer.index()
    .then(res => {
      // console.log(res)
      res.forEach(trainer => {
        let trainerHold = document.getElementById('poke-cards')
        let div = document.createElement('div')
        div.setAttribute('class', 'card')
        let p = document.createElement('p')
        p.innerText = trainer.name
        let addPokeBtn = document.createElement('button')
        addPokeBtn.innerText = "Add Pokemon"
        addPokeBtn.className = 'addPokeBtn'
        addPokeBtn.setAttribute('data-trainer-id', trainer.id)
        let ul = document.createElement('ul')
        ul.setAttribute('id', `list-${trainer.id}`)
        div.append(p)
        div.append(addPokeBtn)
        div.append(ul)
        trainerHold.append(div)

        trainer.pokemons.forEach(poke => {
          renderPokemon(poke)
        })
      })
    })
    .catch(console.log)
}

function renderPokemon(poke) {
  let ul = document.getElementById(`list-${poke.trainer_id}`)
  let li = document.createElement('li')
  li.innerText = `${poke.species} (${poke.nickname})`
  let btn = document.createElement('button')
  btn.className = "release"
  btn.setAttribute('data-pokemon-id', poke.id)
  btn.innerText = "Release"
  li.append(btn)
  ul.append(li)
}

function deletePokemon(button){
  button.parentNode.parentNode.removeChild(button.parentNode)
}
