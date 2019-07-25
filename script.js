'use strict'

const apiKey = 'PenYNgMPgxnm5AOown904jQH1X8AupGNtSvEQwim';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)} = ${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();

    for (let i = 0; i < responseJson.data.length & i <= maxResults; i++) {
        $('#results-list').append(`
        <div class="js-national-parks">
        <li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        </li></div>`);
    };
}





function getNationalParks(statesList, maxResults = 10) {
    const params = {
        stateCode: statesList,
        api_key: apiKey
    }

    const queryString = formatQueryParams(params);
    const url = searchUrl + '?' + queryString;
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message} `);
        });
}

function watchForm() {
    $('#js-form').on('submit', event => {
        event.preventDefault();
        const statesList = $('#js-search-states').val().split(",");
        const maxResults = $('#js-max-results').val();

        getNationalParks(statesList, maxResults);
    });
}

$(watchForm);