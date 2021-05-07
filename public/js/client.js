const form = document.querySelector('form')
const search = document.querySelector('input')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = encodeURI(search.value)
    const hostURL = `http://localhost:3000/weather?location=${location}`
    fetch(hostURL).then((body) => {
        const d = JSON.stringify(body)
        console.log(d)
    }).catch((e) => {
        
    })
})


