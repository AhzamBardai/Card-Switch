// Card Switch JavaScript


// Loop which fetches 20 pokemon images out of 898 pokemons
let pokeArr = []
for(i=1; i<20 ; i++){

    // gets random pokemonand inserts it in the url
    rand = Math.floor(Math.random() * 899)

    // pokemon Api URL
    const url = `https://pokeapi.co/api/v2/pokemon/${rand}`

    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(res => {
            
            // if the pokemon has a dreamworld image it selects that if not then it takes the official artwork from the pokiApi
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


// Array of cards options
const cards = [['😄', '😉', '🐭', '🖱️', '🧠', '🙃', '😠','🤑', '😴', '😷', '🤓', '😑', '🤯', '😤', '🤡', '💀', '👽', '👏', '😡', '💯', '🖤', '💣', '💅', '💻'],
               ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']               
]

// puts pokmon image links array inside cards array
cards.push(pokeArr)


// All variables called using DOM
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
const settings = document.querySelector('.side-modal')

// sets settings modal image
let img = document.createElement('img')
img.setAttribute('src', 'images/settings.png')
img.setAttribute('id', 'settings-image')
settingsBtn.appendChild(img)


// All local variables
let first,
    second,
    match = false,
    lockFlip = false,
    rightCount = 0,
    wrongCount = 0,
    newCards = [],
    totalScore = null,
    gameMode = 0


// initializing local storage
let localStorage = window.localStorage;



// easy, medium, hard button event listeners
easyBtn.addEventListener('click', function(e){
    e.preventDefault()

    // styles each grid according to number of cards in Easy Mode and them calls function to make the card grid
    allCards.style.gridTemplateColumns = 'repeat(4, 50px )'
    allCards.style.gridRowGap = '4rem'
    allCards.style.gridColumnGap = '11rem'
    gameMode = 1
    makeCardGrid(6)
    
})
medBtn.addEventListener('click', function(e){
    e.preventDefault()

    // styles each grid according to number of cards in Medium Mode and them calls function to make the card grid
    allCards.style.gridTemplateColumns = 'repeat(6, 50px )'
    allCards.style.gridRowGap = '3rem'
    allCards.style.gridColumnGap = '7rem'
    gameMode = 2
    makeCardGrid(9)
    
})
hardBtn.addEventListener('click', function(e){
    e.preventDefault()

    // styles each grid according to number of cards in Hard Mode and them calls function to make the card grid
    allCards.style.gridTemplateColumns = 'repeat(6, 50px )'
    allCards.style.gridColumnGap = '7rem'
    gameMode = 3
    makeCardGrid(12)
    
})


// card grid made here
function makeCardGrid(num) {

    // check if a value exists inside local storage and if there is one it inputs it insde score on screen
    if(localStorage.getItem('keepScore') !== null){
        totalScore = parseInt(localStorage.getItem('keepScore'))
        score.innerText = parseInt(localStorage.getItem('keepScore'))
    }else {
        score.innerText = 0
    }

    // shows all items in the card grid screen at the same time; removed start glitches
    document.querySelector('#settings-image').style.display = 'inline'
    document.body.style.background = `no-repeat center/100% url(backgrounds/boxes.jpg)`
    startModal.style.display = 'none'
    board.style.display = 'grid'
    clear.style.display = 'block'

    // picks a random array from cards 
    randArr = Math.floor(Math.random() * cards.length)

    // picks a random index to start the card grid from
    randIndex = Math.floor(Math.random() * (cards[randArr].length - num))

    // last index that which is the randIndex + num because num is the amount of cards we need for the grid
    stopIndex = randIndex + num

    // only gets emojis for hard mode
    if(num === 12){
        randArr = 0
    }

    // starts at the randon Index and ends at the stop Index
    for(i=randIndex ; i<stopIndex ; i++){

            // creates new card div, fron of te card and back of the card
            newCard = document.createElement('div')
            front = document.createElement('div')
            back = document.createElement('div')

            // adds attributes to card, front card anf back card
            newCard.classList.add('card')
            newCard.setAttribute('data-cardnum', i)
            front.classList.add('card-front')
            back.classList.add('card-back')

            // sets different image attributes for pokemon cards and regular cards; adds then to the back of the card
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

            // extra styling if the random array is the words array inside cards array
            if(randArr === 1){
                back.classList.add('card-back-words')
            }

            // adds front card and back card in to the card
            newCard.appendChild(front)
            newCard.appendChild(back)

            // puts the card and it's duplicate inside the newCards array
            newCards.push(newCard)
            newCards.push(newCard.cloneNode(true))
    }
    
    // shuffles up the cards after they are made
    for(i=0 ; i<newCards.length ; i++){
        rand = Math.floor(Math.random() * i)
        temp = newCards[i]
        newCards[i] = newCards[rand]
        newCards[rand] = temp
    }

    // adds each card to the all cards div in html with an event listener which calls the flip function
    newCards.forEach(card => {
        allCards.appendChild(card)
        card.addEventListener('click', flip)
    })
    
}


// flips 2 cards and locks the card when it's been flipped
function flip() {

    // checks if first card is already set or card lock is already true; checking statement for bugs
    if(first === this || lockFlip) return;

    // if the match is false meaning no card has been selected so the card use picks will be the first card and it toggles class on that card with the fliping style
    else if (!match){
        first = this
        match = true
        this.classList.toggle('flip')
    }
    // when match is true it'll be the second card that the player picks
    else {
        second = this
        setTimeout(() => {
            this.classList.toggle('flip')
        }, 100)
        lockFlip = true

        // call the cardMatch function to check if the 2 flipped cards match
        cardMatch()
    }
}


// matches 2 card clicked by user
function cardMatch() {

    // equates both cards that user picks. If the same the right pick increments by 1 and it locks the card in place also clears out first, second, lockFlip and match for the next pick by player
    if(first.dataset.cardnum === second.dataset.cardnum) {

        // adds right points and siplays them
        rightCount++
        right.innerText = rightCount

        // locks cards in place by removing the event listeners
        first.removeEventListener('click', flip)
        second.removeEventListener('click', flip)

        // border light green showing correct answers
        first.style.border = '5px solid lightgreen'
        second.style.border = '5px solid lightgreen'

        // sets htese four to null for next 2 cards the player chooses to flip
        lockFlip = false
        match = false
        first = null
        second = null

        // call score function to add to total points
        scoreCount(true)

        // if all cards have ben clicked and they are right the game ends
        if(rightCount == newCards.length/2){
            finishGame()
        }
    }

    // if condition is false, adds 1 to wrong. Changes the border of the card to red and then flips both cards back to orignal positions 
    else {

        // adds to wrongs choices player picks
        wrongCount++
        wrong.innerText = wrongCount

        // changes border color to red signifying wrong choice
        first.style.border = '5px solid red'
        second.style.border = '5px solid red'

        // brief delay in the card and card flip variabels changing back to original state
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

        // calls score function to remove from total points
        scoreCount(false)
    }
}

// on screen load shows the start screen modal
window.onload = function () {
    startModal.style.display = 'block'
    document.querySelector('.difficulty').innerHTML = 'Choose your <em>Difficulty</em>'
   
}

// total score counter
function scoreCount(bool) {

    // score for easy mode
    if(gameMode === 1){

        // checks if the function call was from the right user picks or the wrong
        if(bool){

            // adds to total score and shows on screen inside score
            totalScore += 5
            score.innerText = 5 + parseInt(score.innerText)    
        } 
        
        else if (!bool && parseInt(score.innerText) > 0){

            // removes from total score and shows on screen inside score
            totalScore -= 1
            score.innerText =  parseInt(score.innerText) - 1
        }
    } 
    // score for medium mode
    else if (gameMode === 2){

        // checks if the function call was from the right user picks or the wrong
        if(bool){

            // adds to total score and shows on screen inside score
            totalScore += 10
            score.innerText = 10 + parseInt(score.innerText)    
        } 
        
        else if (!bool && parseInt(score.innerText) > 0){

            // removes from total score and shows on screen inside score
            totalScore -= 2
            score.innerText = parseInt(score.innerText) - 2
        }
    } 
    // score for hard mode
    else if (gameMode === 3 && bool){

        // checks if the function call was from the right user picks or the wrong
        if(bool){

            // adds to total score and shows on screen inside score
            totalScore += 20
            score.innerText = 20 + parseInt(score.innerText)    
        } 
        
        else if (!bool && parseInt(score.innerText) > 0){

            // removes from total score and shows on screen inside score
            totalScore -= 5
            score.innerText = parseInt(score.innerText) - 5
        }
    }

    // inputs total score to local storage to save players current total score
    localStorage.setItem('keepScore', totalScore.toString())

}

// end game modal function
function finishGame() {

    // delay modal showing after player finishes the game
    setTimeout(() => {
        endModal.style.display = 'block'
    }, 1500);
    document.querySelector('.play-again').innerHTML = 'Wanna play again?'

    // if player chooses to start again game reloads and starts from start modal showing and end modal hidden
    restartBtn.addEventListener('click', function() {
        endModal.style.display = 'none'
        startModal.style.display = 'block'
        location.reload()
    })
}

// clear score button removes total score from local storage and current score on screen
clear.addEventListener('click', () => {
    score.innerText = 0
    localStorage.clear()
})


// shows the settings modal in the middle of the screen
settingsBtn.addEventListener('click', () => {
    
    document.querySelector('.side-modal').style.display = 'block'
})

// closing button in the corner of the settings modal
document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.side-modal').style.display = 'none'
})



