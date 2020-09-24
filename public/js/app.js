fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            return console.log(data.error)
        }
        console.log(data.forecast)
        console.log(data.location)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+search.value).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            return messageOne.textContent = data.error
        }
        messageOne.textContent = data.forecast 
        messageTwo.textContent = data.location 
    })
})
})