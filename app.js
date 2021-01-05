const BASE_URL = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
const button = document.querySelector('button')
const answersDiv = document.querySelector('#answers')
const questionHeading = document.querySelector('#question')
const triviaDiv = document.querySelector('.triviaDiv')


button.addEventListener('click', getData)

async function getData() {
  let response = await axios.get(`${BASE_URL}`)
  triviaDiv.style.visibility = 'visible'
  triviaGameQuestions(response.data.results)
  triviaGameAnswers(response.data.results)
}

let index = 0
let score = 0 
let currentQuestion = 1
let totalQuestions 

function triviaGameQuestions(question) {
  // console.log(question[index].question)
  questionHeading.innerText = question[index].question
}

function triviaGameAnswers(answers) {
  totalQuestions = answers.length

  const allAnswers = [answers[index].correct_answer, ...answers[index].incorrect_answers]
  // console.log(allAnswers[0])
  const shuffledAnswers = shuffle(allAnswers)

  let input1Value = shuffledAnswers[0].split(' ').join('-')
  let input2Value = shuffledAnswers[1].split(' ').join('-')
  let input3Value = shuffledAnswers[2].split(' ').join('-')
  let input4Value = shuffledAnswers[3].split(' ').join('-')
  // console.log(shuffledAnswers[0])
  answersDiv.innerHTML = `
  <input type="radio" id="choice-1" name="answer" value=${input1Value}>
  <label for="choice-1">${shuffledAnswers[0]}</label>
  <input type="radio" id="choice-2" name="answer" value=${input2Value}>
  <label for="choice-2">${shuffledAnswers[1]}</label>
  <input type="radio" id="choice-3" name="answer" value=${input3Value}>
  <label for="choice-3">${shuffledAnswers[2]}</label>
  <input type="radio" id="choice-4" name="answer" value=${input4Value}>
  <label for="choice-4">${shuffledAnswers[3]}</label>
  <button class='answerButton'>Submit</button>
  `
  const answerButton = document.querySelector('.answerButton')
  
  answerButton.addEventListener('click', () => {
    let checked = document.querySelector('input[name="answer"]:checked').value;
    let checkedAnswer = checked.split('-').join(' ')
  
    if (checkedAnswer === answers[index].correct_answer) {
      score++
    }

    index++ 
    currentQuestion++

    if (index < answers.length) {
      // Next question.
      triviaGameQuestions(answers) 
      triviaGameAnswers(answers)

    } else {
      // End game. 
      endGame()
    }
  })
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

function endGame() {
  triviaDiv.innerHTML = `
    <h2> Thank You for Playing!</h2> 
    <p>Out of ${totalQuestions} questions you scored a total of ${score} points</p>
    `
}

