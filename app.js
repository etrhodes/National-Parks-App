const apiKey = 'XJ5A8I8b0ezCdeJuK9ajOJxQh1rN8eXuxjAgusCr';
var searchURL = `https://developer.nps.gov/api/v1/parks?`;

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    console.log(queryItems);
    console.log(queryItems.join('&'));
    return queryItems.join('&');
}

function getNationalParks(state, limit=10) {
    const params = {
        api_key: apiKey,
        stateCode: state,
        limit,
    }
    let queryString = formatQueryParams(params);
    searchURL += queryString;
    fetch(searchURL) 
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        })
        .then(responseJson => 
            displayResults(responseJson)
        );
}

function onSubmit() {
    $('form').on('submit', event => {
        event.preventDefault();
        let state = $('.state-name').val();
        let limit = $('.number').val();
        getNationalParks(state, limit);
    })
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#target').empty();
    let i = 0;
    for (let i = 0; i < responseJson.length; i++) {
    $('#target').append(`
    <li>
        <p>${responseJson.data[i].fullName}</p>
        <p>${responseJson.data[i].description}</p>
    </li>
    `)};
    $('#results').removeClass('hidden');
}

function handler() {
    onSubmit();
}

handler();