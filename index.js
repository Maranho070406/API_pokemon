
const pokemonName = document.querySelector('.pokemonNome')
const pokemonNumero = document.querySelector('.pokemonNumero')
const pokemonImage = document.querySelector('.pokemonImg')
const form = document.querySelector('.form')
const input = document.querySelector('.inputSearch')
const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')
const checkbox = document.querySelector('#checkbox')

let search = 1 
let pokemonData = null
 

const fetchPokemon = async (pokemon) => {
  const APIresponse =await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  if(APIresponse.status == 200){
  const data = await APIresponse.json()
  return data
  }
 
}

const renderPokemon = async (pokemon) => {
 
    pokemonName.innerHTML = 'Loading...'
   pokemonNumero.innerHTML = ''
  const data = await fetchPokemon(pokemon)
  console.log(data)
 if(data){
  pokemonImage.style.display = 'block';
  pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
  pokemonName.innerHTML = data.name
  pokemonNumero.innerHTML = data.id
  search = data.id
 }
 else 
 {
  pokemonImage.style.display = 'none'
   pokemonName.innerHTML = 'Not Found'
   pokemonNumero.innerHTML = ''

 }
 input.value=''
 pokemonData = data
  
}


form.addEventListener('submit', (ev) => {
ev.preventDefault()
console.log( 'input enviado...')
renderPokemon(input.value.toLowerCase())
})

next.addEventListener('click', () => {
  search += 1 
  renderPokemon(search)
})

prev.addEventListener('click', () => {
  if (search > 1) 
  {search -= 1} 
  renderPokemon(search)
})

checkbox.addEventListener('change', () => {
  if(pokemonData){
    let isShiny= checkbox.checked
    if(isShiny) {
      pokemonImage.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
    }
    else
    {
      pokemonImage.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }
  }
 })


renderPokemon(1)