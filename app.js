const BASE_URL = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
const button = document.querySelector('button')
const answersDiv = document.querySelector('#answers')
const questionHeading = document.querySelector('#question')
const triviaDiv = document.querySelector('.triviaDiv')


button.addEventListener('click', getData)

async function getData() {
  let response = await axios.get(`${BASE_URL}`)
  triviaGameQuestions(response.data.results)
  triviaGameAnswers(response.data.results)
}

let index = 0
function triviaGameQuestions(question) {
  // console.log(question[index].question)
  questionHeading.innerText = question[index].question
}

function triviaGameAnswers(answers) {

  const allAnswers = [answers[index].correct_answer, ...answers[index].incorrect_answers]
  // console.log(allAnswers[0])
  const shuffledAnswers = shuffle(allAnswers)
  // console.log(shuffledAnswers[0])
  answersDiv.innerHTML = `
  <input type="radio" id="choice-1" name="answer-1" value="1">
  <label for="choice-1">${shuffledAnswers[0]}</label>
  <input type="radio" id="choice-2" name="answer-2" value="2">
  <label for="choice-2">${shuffledAnswers[1]}</label>
  <input type="radio" id="choice-3" name="answer-3" value="3">
  <label for="choice-3">${shuffledAnswers[2]}</label>
  <input type="radio" id="choice-4" name="answer-4" value="4">
  <label for="choice-4">${shuffledAnswers[3]}</label>
  <button class='answerButton'>Submit</button>
  `
  const answerButton = document.querySelector('.answerButton')
  answerButton.addEventListener('click', () => {
    index++ 
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
  triviaDiv.innerHTML = '<h2>Thank You for Playing!</h2>'
}