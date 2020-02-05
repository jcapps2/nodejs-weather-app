const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()          // prevents browser refresh on button click

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''             // Clears previous search when button is clicked again

    // Basically fetch data from this location, and then run this function.
    // Removed http://localhost:3000 because we can't do that once deployed on Heroku.
    // So the following '/weather?address=' + location will be concatenated onto Heroku url.
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})