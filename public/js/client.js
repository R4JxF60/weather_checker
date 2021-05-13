const searchInput = document.querySelector('input');
const searchSubmit = document.querySelector('button');
const contentArea = document.getElementById('content-area');
const weatherLink = document.getElementById('weather-link');
const aboutLink = document.getElementById('about-link');

const __GEOMETRY = [] 
weatherLink.style.fontWeight = 600;

const createDiv = (object, divID) => {
    
    const components = object.components;
    
    let details = 
    `
        <div class="base-info clear-fix">
            <p class="base-info-text"><span class="span-details-title">Country</span>     <span class="span-details-value">${components.country}</span></p>
            <p class="base-info-text"><span class="span-details-title">Country Code</span>     <span class="span-details-value">${components.country_code}</span></p>
            <p class="base-info-text"><span class="span-details-title">Continent</span>   <span class="span-details-value">${components.continent}</span></p>
        </div>
        <button class="more-button btn-dynamic" id="m-${divID}">More</button>
        <button class="weather-button btn-dynamic" id="w-${divID}">Weather</button>
    `;
    details += '<div class="more-info clear-fix" style="display: none">';
    for(key in components) {
        //details += (`<p>${key} : ${components[key]}</p>`);
        
        const keyString = key.toString();
        if(keyString !== 'country' && keyString !== 'country_code' && keyString !== 'continent' && keyString.charAt(0) !== '_')
        {
            details += `<p><span class="span-details-title">${key.charAt(0).toUpperCase() + key.substr(1)}</span> <span class="span-details-value">${components[key]}</span></p>`;
        }
        //console.log(key + ':' +  components[key]);
    }
    details += '</div>';
    
    const divContent = 
    `
        <div class="div-content-box" id="div-${divID}">
            <a href="#" class="info-title">${object.formatted.charAt(0).toUpperCase()+object.formatted.substr(1)}</a>
            ${details}
        </div>
    `;
    __GEOMETRY.push(object.geometry);
    //console.log(details);
    
    return divContent;
}


const showLocations = (locations) => {
    let divID = -1;
    locations.forEach((location) => {
        divID++;
        const divContent = createDiv(location, divID);
        contentArea.innerHTML += divContent;
    }); 
}

async function getLocations(searchQuery) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}&key=YOUR-APIKEY`;
    const response = await fetch(url);
    const locations = await response.json();
    showLocations(locations.results);
    console.log(locations);
}


searchSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    weatherLink.style.fontWeight = 600;
    aboutLink.style.fontWeight = 400;
    const encodedQuery = encodeURI(searchInput.value);
    contentArea.innerHTML = null;
    getLocations(encodedQuery);
});

async function getWeather(lat, lng) {
    const weather = await fetch(`http://localhost:3000/get-weather?lat=${lat}&lng=${lng}`, {method: 'POST'});
    const body  = await weather.json();
    console.log(body);
}

contentArea.addEventListener('click', (event) => {
    const targetId = parseInt(event.target.id.substr(2));
    if(event.target.classList.contains('more-button')){
        const divContentBox = contentArea.children[targetId];
        const moreInfoDiv = divContentBox.children[4];
        moreInfoDiv.style.display = 'block';
    }else if(event.target.classList.contains('weather-button')) {
        console.log(__GEOMETRY[targetId]);
        contentArea.innerHTML = null;
        contentArea.innerHTML = `<h3>${__GEOMETRY[targetId]}</h3>`;
        getWeather(__GEOMETRY[targetId].lat, __GEOMETRY[targetId].lng);
    }
});

weatherLink.addEventListener('click', (event) => {
    event.preventDefault();
    contentArea.innerHTML = null;
    aboutLink.style.fontWeight = 400;
    weatherLink.style.fontWeight = 600;
});


aboutLink.addEventListener('click', (event) => {
    event.preventDefault();
    weatherLink.style.fontWeight = 400;
    aboutLink.style.fontWeight = 600;
    contentArea.innerHTML = 
    `
        <div class="container">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis eum molestiae quod, officiis soluta ea. Perferendis sequi quos a, earum reiciendis accusamus eaque dolorum aliquam. Quisquam quaerat animi id saepe, maxime quis neque, ullam provident ex, consequatur quo. Beatae quae consequatur voluptates cum enim eveniet obcaecati distinctio ea necessitatibus, architecto omnis unde. Laudantium pariatur, veniam deserunt iste quibusdam libero placeat consectetur numquam tenetur asperiores? Esse aut aspernatur cupiditate, molestias inventore veniam suscipit tempora incidunt vero eius temporibus corrupti atque saepe deleniti autem velit dolor dignissimos distinctio placeat magnam molestiae. Aliquid accusantium, ut assumenda iusto facilis ab molestiae! Corrupti, molestias adipisci.</p>
        </div>
    `;
})

