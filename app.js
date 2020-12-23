const BASE_URL = 'https://opentdb.com/api.php?amount=10&category=18'



const button = document.querySelector('button')

button.addEventListener('click', getData)

async function getData() {
  let response = await axios.get(`${BASE_URL}`)
  console.log(response)
}

