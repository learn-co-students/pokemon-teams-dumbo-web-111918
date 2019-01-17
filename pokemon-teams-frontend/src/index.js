const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  let main = document.querySelector("main")
  delegate(main)
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(data => data.forEach(trainer => render(main, trainer)))
})

function delegate(node) {
  node.addEventListener("click", e => {
    if (e.target.className === "add") {
      add(e.target.dataset.trainerId)
    } else if (e.target.className === "release") {
      destroy(e.target.dataset.pokemonId)
    }
  })
}

function add(id) {
  let data = { trainer_id: id }
  let node = document.querySelector(`[data-id='${id}']`).childNodes[2]
  fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => {
      if(res.status === 201) {
        return res.json()
      }
    }).then(p => addPoke(node, p))

}

function addPoke(node, pokemon) {
    let li = document.createElement("li")
    let button = document.createElement("button")
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    button.innerText = "Release"
    button.className = "release"
    button.dataset.pokemonId = pokemon.id
    li.append(button)
    node.append(li)
  }

function destroy(id) {
  fetch(`${POKEMONS_URL}/${id}`, {method: "DELETE"})
  .then(res => res.json())
  .then(remove)
}

function remove({id}) {
  let node = document.querySelector(`[data-pokemon-id='${id}']`).parentNode
  node.remove()
}

function render(node, trainer) {
  const {id, name, pokemons} = trainer
  let div = document.createElement("div")
  let p = document.createElement("p")
  let btn = document.createElement("button")
  let ul = document.createElement("ul")
  div.className = "card"
  div.dataset.id = id
  p.innerText = name
  btn.dataset.trainerId = id
  btn.className = "add"
  btn.innerText = "Add Pokemon"
  pokemons.forEach(p => addPoke(ul, p))
  div.append(p)
  div.append(btn)
  div.append(ul)
  node.append(div)
}