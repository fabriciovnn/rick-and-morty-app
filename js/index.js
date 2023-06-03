let paginaAtual = 1

//dom content load
document.addEventListener('DOMContentLoaded', async () => {

  const charactersList = await buscarPersonagens()
  
  montarCards(charactersList)

})


//buscar personagens
async function buscarPersonagens(page) {
  paginaAtual = page
  try{
    const response = await apiConfig.get('/character', {
      params: {
        page: page || 1
      }
    })
    console.log(response.data.results)
    return response.data.results 
  } catch (error) {
    console.log(error)
    return []
  }
}


// montar cards
function montarCards(characters) {
  const sectionCards = document.getElementById('container-cards')
  // sectionCards.innerHTML = ''

  characters.forEach(async (character) => {
    const divCard = document.createElement('div')
    divCard.classList.add('card')

    const img = document.createElement('img')
    img.setAttribute('src', `${character.image}`)
    img.setAttribute('width', '230px')
    img.setAttribute('alt', 'character image')

    const divInfo = document.createElement('div')
    divInfo.classList.add('info-card')

    const divNameContainer = document.createElement('div')
    const h2 = document.createElement('h2')
    h2.innerHTML = `${character.name}`

    const pStatus = document.createElement('p')
    pStatus.innerHTML = `${character.status} - ${character.species}`
    if(character.status === 'Alive') {
      pStatus.classList.add('status-alive')
    } else if(character.status === 'Dead') {
      pStatus.classList.add('status-dead')
    } else {
      pStatus.classList.add('status-unknown')
    }

    const divLastLocation = document.createElement('div')
    const pLastLocation = document.createElement('p')
    pLastLocation.classList.add('location-info')
    pLastLocation.innerHTML = 'Last Known Location'
    const pLocationInfo = document.createElement('p')
    pLocationInfo.innerHTML = `${character.location.name}`

    const divSeeIn = document.createElement('div')
    const pSeeIn = document.createElement('p')
    pSeeIn.classList.add('location-info')
    pSeeIn.innerHTML = 'Last Seen In'
    const pSeeInInfo = document.createElement('p')

    const ultimoEpisodio = character.episode[character.episode.length -1]
    const respostaLocalizacao = await axios.get(`${ultimoEpisodio}`)
    const ultimaLocalizacao = respostaLocalizacao.data.name
    pSeeInInfo.innerHTML = `${ultimaLocalizacao}`

    divNameContainer.appendChild(h2)
    divNameContainer.appendChild(pStatus)
    divLastLocation.appendChild(pLastLocation)
    divLastLocation.appendChild(pLocationInfo)
    divSeeIn.appendChild(pSeeIn)
    divSeeIn.appendChild(pSeeInInfo)

    divInfo.appendChild(divNameContainer)
    divInfo.appendChild(divLastLocation)
    divInfo.appendChild(divSeeIn)

    divCard.appendChild(img)
    divCard.appendChild(divInfo)

    sectionCards.appendChild(divCard)


  }) 
}

///montar botoes