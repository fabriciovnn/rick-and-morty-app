const personagemId = localStorage.getItem('personagemId')
if(!personagemId) {
  window.location.href = 'index.html'
}

const rowCard = document.getElementById('row-card')

document.addEventListener('DOMContentLoaded', async () => {
  const character = await BuscarPersonagemId()

  const spanNomePersonagem = document.getElementById('personagem')
  spanNomePersonagem.innerHTML = `${character.name}`

  const spanLocalizacaoPersonagem = document.getElementById('localizacao-personagem')
  spanLocalizacaoPersonagem.innerHTML = character.location.name

  const spanTotalEpisodios = document.getElementById('total-episodios')
  spanTotalEpisodios.innerHTML = character.episode.length

  montarCard(character)
})

async function BuscarPersonagemId () {
  try{
    const response = await api.get(`/character/${personagemId}`)
    return response.data
  } catch (error) {
    console.log(error)
    alert('Não foi possível buscar os personagens')
    return
  }
}

async function montarCard (personagem) {
  rowCard.innerHTML = ''
  /* 
          <div class="col-12 col-md-6 col-lg-4">
          <div class="container">         
            <div class="card">
                <img src="./imgs/136.jpeg" class="card-img-top" alt="avatar">
                <div class="card-body px-5">
                  <h5 class="card-title">Nome Personagem</h5>
  
                  <p class="card-text status alive">
                    Vivo - Humano
                  </p>
  
                  <dl>
                    <dt>Ultima localização conhecida:</dt>
                    <dd>Planeta XPTO</dd>
  
                    <dt>Visto a última vez em:</dt>
                    <dd>Nome do Capítulo</dd>
                  </dl>
                </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-8 text-light fs-1">
          <div class="container">
            <h1 class="display-3 fw-bold">Nome Personagem</h1>
            <dl class="dlInfo animacao">
              <dt>Type</dt>
              <dd>unknown</dd>

              <dt>Gender</dt>
              <dd>Male</dd>

              <dt>Origin</dt>
              <dd>Earth (C-137)</dd>

              <dt>Created</dt>
              <dd>2017-11-04t19:09:56.428z</dd>
            </dl>
          </div>
        </div>
  */

  // MONTAGEM DO CARD
  const divColCard = document.createElement('div')
  divColCard.setAttribute('class', 'col-12 col-md-6 col-lg-4 fade-in-content')

  const divContainerCard = document.createElement('div')

  const divCard = document.createElement('div')
  divCard.classList.add('card')

  const imgCard = document.createElement('img')
  imgCard.setAttribute('src', `${personagem.image}`)
  imgCard.setAttribute('alt', 'avatar')
  imgCard.classList.add('card-img-top')

  const divBodyCard = document.createElement('div')
  divBodyCard.setAttribute('class', 'card-body px-5')

  const titleCard = document.createElement('h5')
  titleCard.classList.add('card-title')
  titleCard.innerText = personagem.name

  const pCardStatus = document.createElement('p')
  pCardStatus.innerHTML = `${personagem.status} - ${personagem.species}`
  pCardStatus.setAttribute('class', 'card-text status')
  if(personagem.status === 'Alive') {
    pCardStatus.classList.add('alive')
  } else if(personagem.status === 'Dead') {
    pCardStatus.classList.add('dead')
  } else {
    pCardStatus.classList.add('unknown')
  }

  const dlCard = document.createElement('dl')
  const dtLocation = document.createElement('dt')
  dtLocation.innerText = 'Last Known Location'

  const ddLocation = document.createElement('dd')
  ddLocation.innerText = `${personagem.location.name}`

  const dtLastSeen = document.createElement('dt')
  dtLastSeen.innerText = 'Last Seen In'

  const ddLastSeen = document.createElement('dd')
  const ultimoEpisodio = personagem.episode[personagem.episode.length -1]
  const respostaLocalizacao = await axios.get(`${ultimoEpisodio}`)
  const ultimaLocalizacao = respostaLocalizacao.data.name
  ddLastSeen.innerText = `${ultimaLocalizacao}`


  //MONTAGEM DA INFORMAÇÃO EXTRA
const divColInfo = document.createElement('div')
divColInfo.setAttribute('class', 'col-12 col-md-6 col-lg-8 text-light fs-1 fade-in-content')
const divContainerInfo = document.createElement('div')

const titleInfo = document.createElement('h2')
titleInfo.setAttribute('class', 'display-3 fw-bold nome-personagem')
titleInfo.innerText = personagem.name

const dlInfo = document.createElement('dl')
dlInfo.classList.add('dlInfo')

const dtType = document.createElement('dt')
dtType.innerText = 'Type'
const ddType = document.createElement('dd')
if(!personagem.type) {
  ddType.innerText = 'unknown'
} else {
  ddType.innerText = personagem.type
}

const dtGender = document.createElement('dt')
dtGender.innerText = 'Gender'
const ddGender = document.createElement('dd')
ddGender.innerText = personagem.gender

const dtOrigin = document.createElement('dt')
dtOrigin.innerText = 'Origin'
const ddOrigin = document.createElement('dd')
ddOrigin.innerText = personagem.origin.name

const dtCreated = document.createElement('dt')
dtCreated.innerText = 'Created'
const ddCreated = document.createElement('dd')
ddCreated.innerText = personagem.created


//APPEND DOS CARDS
  dlCard.appendChild(dtLocation)
  dlCard.appendChild(ddLocation)
  dlCard.appendChild(dtLastSeen)
  dlCard.appendChild(ddLastSeen)

  divBodyCard.appendChild(titleCard)
  divBodyCard.appendChild(pCardStatus)
  divBodyCard.appendChild(dlCard)

  divCard.appendChild(imgCard)
  divCard.appendChild(divBodyCard)
  divContainerCard.appendChild(divCard)
  divColCard.appendChild(divContainerCard)

  //APPEND DAS INFORMAÇÕES EXTRAS
  dlInfo.appendChild(dtType)
  dlInfo.appendChild(ddType)
  dlInfo.appendChild(dtGender)
  dlInfo.appendChild(ddGender)
  dlInfo.appendChild(dtOrigin)
  dlInfo.appendChild(ddOrigin)
  dlInfo.appendChild(dtCreated)
  dlInfo.appendChild(ddCreated)

  divContainerInfo.appendChild(titleInfo)
  divContainerInfo.appendChild(dlInfo)
  divColInfo.appendChild(divContainerInfo)

//APPEND DO CARD E DAS INFORMAÇÕES NA ROW
  rowCard.appendChild(divColCard)
  rowCard.appendChild(divColInfo)
}

const buttonVoltar = document.getElementById('voltar')
buttonVoltar.addEventListener('click', () => {
  localStorage.removeItem('personagemId')
  window.location.href = 'index.html'
})