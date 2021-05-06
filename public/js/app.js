// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data.puzzle)
//     })
// })

// fetch('http://localhost:4000/weather?address=Boston').then((response) => {
//     response.json().then(({error, forecast, location}) => {
//         if (error) {
//             console.log(error)
//         } else {
//             console.log(forecast, location)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(`http://localhost:4000/weather?address=${location}`).then((response) => {
    response.json().then(({error, forecast, location}) => {
        if (error) {
            messageOne.textContent = error
        } else {
            messageOne.textContent = forecast
            messageTwo.textContent = location
        }
    })
})
})