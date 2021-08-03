const cards = [['😄', '😉', '🐭', '🖱️', '🧠', '🙃', '😠','🤑', '😴', '😷', '🤓', '😑', '🤯', '😤', '🤡', '💀', '👽', '👏', '😡', '💯', '🖤', '💣', '💅', '💻'],
               ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
               ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
               
]

const easyBtn = document.querySelector('.easy')
const medBtn = document.querySelector('.medium')
const hardBtn = document.querySelector('.hard')
const restartBtn = document.querySelector('.restart')

const right = document.querySelector('.correct-matches')
const wrong = document.querySelector('.incorrect-matches')
const allCards = document.querySelector('.cards')
const start = document.querySelector('.first-page')
const winner = document.querySelector('.win-screen')

let first,
    second,
    match = false,
    lockFlip = false,
    rightCount = 0,
    wrongCount = 0
    
  


easyBtn.addEventListener('click', function(e){
    e.preventDefault()
    allCards.style.gridTemplateColumns = 'repeat(4, 50px )';
    makeCardGrid(6)
    
})
medBtn.addEventListener('click', function(e){
    e.preventDefault()
    allCards.style.gridTemplateColumns = 'repeat(6, 50px )';
    makeCardGrid(9)
    
})
hardBtn.addEventListener('click', function(e){
    e.preventDefault()
    allCards.style.gridTemplateColumns = 'repeat(6, 50px )';
    makeCardGrid(12)
    
})

function makeCardGrid(num) {
    randArr = Math.floor(Math.random() * cards.length)
    randIndex = Math.floor(Math.random() * (cards[randArr].length - num))
    stopIndex = randIndex + num
    newCards = []
    
    for(i=randIndex ; i<stopIndex ; i++){

            newCard = document.createElement('div')
            front = document.createElement('div')
            back = document.createElement('div')

            newCard.classList.add('card')
            newCard.setAttribute('data-cardnum', i)
            front.classList.add('card-front')
            back.classList.add('card-back')
            back.textContent = cards[randArr][i]

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
        lockFlip = true
        setTimeout(() => {
            this.classList.toggle('flip')
        }, 100)
        cardMatch()
    }

}

function cardMatch() {
    if(first.dataset.cardnum === second.dataset.cardnum) {
        rightCount++
        right.innerText = rightCount
        first.removeEventListener('click', flip)
        second.removeEventListener('click', flip)
        lockFlip = false
        match = false
        first = null
        second = null
        if(rightCount == newCards.length){
            // finish game function
        }
    }
    else {
        wrongCount++
        wrong.innerText = wrongCount
        setTimeout(() => {
            first.classList.toggle('flip')
            second.classList.toggle('flip')
            
        }, 100)
        lockFlip = false
        match = false
        first = null
        second = null
        
    }
}
