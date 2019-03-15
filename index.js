'use strict';

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length ; i++){ 
$('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].full_name}</a></h3>
      <p>${responseJson[i].description}</p>
      </li>`
    )}; 
  $('#results').removeClass('hidden');
}

function getRepos(searchHandle) {
  const url = `https://api.github.com/users/${searchHandle}/repos`;

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
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchHandle = $('#search-handle').val();
    getRepos(searchHandle);
  });
}

$(watchForm);
