let paginaAtual = 1

//dom content load
document.addEventListener('DOMContentLoaded', async () => {

  const respostaApi = await buscarPersonagens()
  const charactersList = respostaApi.results

  const paragrafoTotalPersonagens = document.getElementById('total-personagens')
  paragrafoTotalPersonagens.innerHTML = `CHARACTERS: ${respostaApi.info.count}`

  const paragrafoLocalizacoes = document.getElementById('total-localizacoes')
  const respostaLocation = await apiConfig.get('/location')
  const totalLocalizacoes = respostaLocation.data.info.count
  paragrafoLocalizacoes.innerHTML = `LOCATIONS: ${totalLocalizacoes}`

  const paragrafoTotalEpisodios = document.getElementById('total-episodios')
  const respostaEpisodes = await apiConfig.get('/episode')
  const totalEpisodios = respostaEpisodes.data.info.count
  paragrafoTotalEpisodios.innerHTML = `EPISODES: ${totalEpisodios}`


  montarCards(charactersList)
  montarBotoes(respostaApi.info.pages)
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
    return response.data 
  } catch (error) {
    console.log(error)
    return []
  }
}

// montar cards
function montarCards(characters) {
  const sectionCards = document.getElementById('container-cards')
  sectionCards.innerHTML = ''

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
function montarBotoes(quantidade) {
  for(let contador = 1; contador <= quantidade; contador++) {
    const containerPaginacao = document.getElementById('container-paginacao')

    const button = document.createElement('button')
    button.setAttribute('class', 'btn-paginacao')
    button.innerText = `Page ${contador}`
    

    if(contador === paginaAtual) {
      button.disabled = true
    }

    button.addEventListener('click', async () => {
      const respostaApi = await buscarPersonagens(contador)
      const buttons = document.querySelectorAll('.btn-paginacao')

      buttons.forEach(item => {
        item.disabled = false
        item.setAttribute('class', 'btn-paginacao')
      })
      button.disabled = true
      button.classList.add('button-disable')



      montarCards(respostaApi.results)
    })

    containerPaginacao.appendChild(button)
  }
}