const searchInput = document.querySelector('input');
const searchSubmit = document.querySelector('button');



async function getLocations(searchQuery) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}&key=b08bd4c6d1d84ad090bee3f82821883a`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
}

searchSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(searchInput.value)
    const encodedQuery = encodeURI(searchInput.value);
    getLocations(encodedQuery);
})