const cards = [['😄', '😉', '🐭', '🖱️', '🧠', '🙃', '😠','🤑', '😴', '😷', '🤓', '😑', '🤯', '😤', '🤡', '💀', '👽', '👏', '😡', '💯', '🖤', '💣', '💅', '💻'],
               ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
               ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
               
]

const easyBtn = document.querySelector('.easy'),
      medBtn = document.querySelector('.medium'),
      hardBtn = document.querySelector('.hard'),
      restartBtn = document.querySelector('.restart')

const right = document.querySelector('.correct-matches'),
      wrong = document.querySelector('.incorrect-matches'),
      allCards = document.querySelector('.cards'),
      start = document.querySelector('.first-page'),
      winner = document.querySelector('.win-screen')

let first,
    second,
    match = false,
    lockFlip = false,
    rightCount = 0,
    wrongCount = 0
    
  


easyBtn.addEventListener('click', function(e){
    e.preventDefault()
    makeCardGrid(6)
    
})
medBtn.addEventListener('click', function(e){
    e.preventDefault()
    makeCardGrid(9)
    
})
hardBtn.addEventListener('click', function(e){
    e.preventDefault()
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
    

    newCards.forEach(card => {
        allCards.appendChild(card)
    })
}

 

