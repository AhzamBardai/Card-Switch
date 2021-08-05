let pokeArr = []
for(i=1; i<20 ; i++){

    rand = Math.floor(Math.random() * 899)
    const url = `https://pokeapi.co/api/v2/pokemon/${rand}`

    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(res => {
            
            if(res.sprites.other.dream_world.front_default){
                pokeArr.push(res.sprites.other.dream_world.front_default)
            } else if(res.sprites.other['official-artwork'].front_default){
                pokeArr.push(res.sprites.other['official-artwork'].front_default)
            } 

        })
        .catch(error => {
            console.log("Error!", error)
        })  
}


const cards = [['😄', '😉', '🐭', '🖱️', '🧠', '🙃', '😠','🤑', '😴', '😷', '🤓', '😑', '🤯', '😤', '🤡', '💀', '👽', '👏', '😡', '💯', '🖤', '💣', '💅', '💻'],
               ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']               
]

cards.push(pokeArr)

const easyBtn = document.querySelector('.easy')
const medBtn = document.querySelector('.medium')
const hardBtn = document.querySelector('.hard')
const restartBtn = document.querySelector('.restart')
const startModal = document.querySelector('#start-modal')
const endModal = document.querySelector('#win-modal')
const board = document.querySelector('.score-board')
const score = document.querySelector('.score')
const clear = document.querySelector('.clear')
const right = document.querySelector('.right')
const wrong = document.querySelector('.wrong')
const allCards = document.querySelector('.cards')
const start = document.querySelector('.first-page')
const winner = document.querySelector('.win-screen')

const settingsBtn = document.querySelector('.open-settings')
let img = document.createElement('img')
img.setAttribute('src', 'images/settings.png')
img.setAttribute('id', 'settings-image')
settingsBtn.appendChild(img)
const settings = document.querySelector('.side-modal')



let first,
    second,
    match = false,
    lockFlip = false,
    rightCount = 0,
    wrongCount = 0,
    newCards = [],
    totalScore = null,
    gameMode = 0

let localStorage = window.localStorage;




easyBtn.addEventListener('click', function(e){
    e.preventDefault()
    allCards.style.gridTemplateColumns = 'repeat(4, 50px )'
    allCards.style.gridRowGap = '4rem'
    allCards.style.gridColumnGap = '11rem'
    gameMode = 1
    makeCardGrid(6)
    
})
medBtn.addEventListener('click', function(e){
    e.preventDefault()
    allCards.style.gridTemplateColumns = 'repeat(6, 50px )'
    allCards.style.gridRowGap = '3rem'
    allCards.style.gridColumnGap = '7rem'
    gameMode = 2
    makeCardGrid(9)
    
})
hardBtn.addEventListener('click', function(e){
    e.preventDefault()
    allCards.style.gridTemplateColumns = 'repeat(6, 50px )'
    allCards.style.gridColumnGap = '7rem'
    gameMode = 3
    makeCardGrid(12)
    
})

function makeCardGrid(num) {

    if(localStorage.getItem('keepScore') !== null){
        totalScore = parseInt(localStorage.getItem('keepScore'))
        score.innerText = parseInt(localStorage.getItem('keepScore'))
    }else {
        score.innerText = 0
    }


    document.body.style.background = `no-repeat center/100% url(backgrounds/boxes.jpg)`
    startModal.style.display = 'none'
    board.style.display = 'grid'
    clear.style.display = 'block'

    randArr = Math.floor(Math.random() * cards.length)
    randIndex = Math.floor(Math.random() * (cards[randArr].length - num))
    stopIndex = randIndex + num
    if(num === 12){
        randArr = 0
    }
    for(i=randIndex ; i<stopIndex ; i++){

            newCard = document.createElement('div')
            front = document.createElement('div')
            back = document.createElement('div')

            newCard.classList.add('card')
            newCard.setAttribute('data-cardnum', i)
            front.classList.add('card-front')
            back.classList.add('card-back')
            if(randArr === 2){
                pokeImage = document.createElement('img')
                pokeImage.setAttribute('src', cards[randArr][i] )
                pokeImage.setAttribute('id', 'poke-image')
                back.appendChild(pokeImage)
                front.style.background = 'no-repeat center/100% url("images/pokeball.gif")';
                front.style.right = '.8rem'
            } else {
                backImage = document.createElement('div')
                backImage.classList.add('back-image')
                backImage.textContent = cards[randArr][i]
                back.appendChild(backImage)
            }

            if(randArr === 1){
                back.classList.add('card-back-words')
            }
            newCard.appendChild(front)
            newCard.appendChild(back)

            newCards.push(newCard)
            newCards.push(newCard.cloneNode(true))
    }
    

    for(i=0 ; i<newCards.length ; i++){
        rand = Math.floor(Math.random() * i)
        temp = newCards[i]
        newCards[i] = newCards[rand]
        newCards[rand] = temp
    }

    newCards.forEach(card => {
        allCards.appendChild(card)
        card.addEventListener('click', flip)
    })
    
}


function flip() {
    if(first === this) return;
    else if(lockFlip) return;
    else if (!match){
        first = this
        match = true
        this.classList.toggle('flip')
    }
    else {
        second = this
        setTimeout(() => {
            this.classList.toggle('flip')
        }, 100)
        lockFlip = true
        cardMatch()
    }

}

function cardMatch() {

    

    if(first.dataset.cardnum === second.dataset.cardnum) {
        rightCount++
        right.innerText = rightCount
        first.removeEventListener('click', flip)
        second.removeEventListener('click', flip)
        first.style.border = '5px solid lightgreen'
        second.style.border = '5px solid lightgreen'
        lockFlip = false
        match = false
        first = null
        second = null
        scoreCount(true)
        if(rightCount == newCards.length/2){
            finishGame()
        }
    }
    else {
        wrongCount++
        wrong.innerText = wrongCount
        first.style.border = '5px solid red'
        second.style.border = '5px solid red'

        setTimeout(() => {            
            first.classList.toggle('flip')
            first.style.border = '5px solid white'
            setTimeout(() => {
                second.classList.toggle('flip')
                second.style.border = '5px solid white'    
                second = null
            }, 30)
            lockFlip = false
            match = false
            first = null
        }, 1000)
        scoreCount(false)
    }
}


window.onload = function () {
    startModal.style.display = 'block'
    setTimeout(() => {
        document.querySelector('.difficulty').innerHTML = 'Choose your <em>Difficulty</em>'
    }, 1000)
}

function scoreCount(bool) {
    if(gameMode === 1){
        if(bool){
            totalScore += 5
            score.innerText = 5 + parseInt(score.innerText)    
        } else if (!bool && parseInt(score.innerText) > 0){
            totalScore -= 1
            score.innerText =  parseInt(score.innerText) - 1
        }
    } else if (gameMode === 2){
        if(bool){
            totalScore += 10
            score.innerText = 10 + parseInt(score.innerText)    
        } else if (!bool && parseInt(score.innerText) > 0){
            totalScore -= 2
            score.innerText = parseInt(score.innerText) - 2
        }
    } else if (gameMode === 3 && bool){
        if(bool){
            totalScore += 20
            score.innerText = 20 + parseInt(score.innerText)    
        } else if (!bool && parseInt(score.innerText) > 0){
            totalScore -= 5
            score.innerText = parseInt(score.innerText) - 5
        }
    }

    localStorage.setItem('keepScore', totalScore.toString())

}

function finishGame() {
    setTimeout(() => {
        endModal.style.display = 'block'
    }, 1500);
    document.querySelector('.play-again').innerHTML = 'Wanna play again?'
    restartBtn.addEventListener('click', function() {
        endModal.style.display = 'none'
        startModal.style.display = 'block'
        location.reload()
    })
}


clear.addEventListener('click', () => {
    score.innerText = 0
    localStorage.clear()
})


settingsBtn.addEventListener('click', () => {
    
    document.querySelector('.side-modal').style.display = 'block'
})

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.side-modal').style.display = 'none'
})



