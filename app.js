"use strict";

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
    let url = searchURL + queryString;
    console.log(url);
    fetch(url) 
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        })
        .then(responseJson => 
            displayResults(responseJson)
        )
        .catch (error => alert('Sorry, please try again') 
        );
}

function onSubmit() {
    $('#form').on('submit', event => {
        event.preventDefault();
        $('#target').empty();
        let state = $('.state-name').val();
        state.split(" ").join("");
        let limit = $('.number').val();
        getNationalParks(state, limit);
    })
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#target').empty();
    let i = 0;
    for (let i = 0; i < responseJson.data.length; i++) {
        if(responseJson.data[i].addresses.length === 0) {
    $('#target').append(`
    <li>
        <p>${responseJson.data[i].fullName}</p>
        <p>${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
    </li>
    `)} else {
        $('#target').append(`
    <li>
        <p>${responseJson.data[i].fullName}</p>
        <p>${responseJson.data[i].addresses[0].line1}</p>
        <p>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode}, ${responseJson.data[i].addresses[0].postalCode}</p>
        <p>${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
    </li>
    `)};
    $('#results').removeClass('hidden');
    }
};

function handler() {
    onSubmit();
}

handler();