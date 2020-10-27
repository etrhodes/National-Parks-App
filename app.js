const apiKey = 'XJ5A8I8b0ezCdeJuK9ajOJxQh1rN8eXuxjAgusCr'
const searchURL = 'https://developer.nps.gov/api/v1/parks?key=XJ5A8I8b0ezCdeJuK9ajOJxQh1rN8eXuxjAgusCr'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => )
}

function getNationalParks(state, limit=10) {
    const params = {
        key: apiKey,
        stateCode: state,
        limit,
    }
}


function onSubmit() {
    $('form').on('submit', event => {
        event.preventDefault();


        $('#submit').removeClass('hidden');
    })
}

function displayResults() {
    $('#results').empty();
}
 
function handler() {
    onSubmit();
}