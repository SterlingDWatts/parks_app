'use strict';

const apiKey = 'cm3vUF9VoQjld7FGWSXQ9Io10Q1RJpwzCL7nBwa5';
const searchURL = 'https://developer.nps.gov/api/v1/';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson) {
    // display the results

    $('.results ul').empty();

    for (let i = 0; i < responseJson.data.length; i++) {
        $('.results ul').append(`
            <li class='result'>
                <h3 class='result-tile component'>${responseJson.data[i].fullName}</h3>
                <p class='result-description component'>${responseJson.data[i].description}</p>
                <a class='result-url component' href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
            </li>
        `);
    }

    $('.results').removeClass('hidden');
}

function getResults(query, numResults) {
    const params = {
        api_key: apiKey,
        stateCode: query,
        limit: numResults
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + 'parks?' + queryString;
    console.log(url)
    
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            console.log('Hey, there is an error');
            console.log(err.message);
        })
}

function handleSubmit() {
    //  Event listener for the Submit button

    $('.search-form').on('submit', function(event) {
        event.preventDefault();
        const stateInput = $('#state-select').val().match(/[A-z]{2}/g).join(',');
        const numResults = $('#max-select').val();
        getResults(stateInput, numResults);
    })
}

function handleStartFunctions() {
    // Load starting functions and event listeners

    handleSubmit();
}

$(handleStartFunctions());