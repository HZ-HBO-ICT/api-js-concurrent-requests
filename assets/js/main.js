import { getOne, fetchData } from './api.js';

// dom elements
let characterElement;
let characterDetailsElement;

// global variables
const LukeSkywalker = {
  name: '',
  filmTitles: [],
};

// api root
let apiRoot = 'https://swapi.py4e.com/api/';
let selectedCollection = 'people';

/**
 * Function to initialize the application after the DOM is loaded
 */
async function init() {
  // Logic to initialize the application
  characterElement = document.querySelector('#character');
  characterDetailsElement = document.querySelector('#character-details');

  console.info('Initializing the application');

  // The following code demonstrates how to use Promise.all
  // OPTION 1 - Example of Promise.all with then and catch
  // const dataFromTheFunction =  simplePromiseAllExampleWithThenCatch();
  // OPTION 2 - Example of Promise.all with async await
  // const dataFromTheFunction = await simplePromiseAllExampleWithAsyncAwait();

  handleRequest();
}

/**
 * Function to handle the request from the API
 */
async function handleRequest() {
  // Logic to handle the request
  const character = await getOne(1, selectedCollection, apiRoot);
  // add name to LukeSkywalker object
  LukeSkywalker.name = character.data.name;

  // Step 1 - get the urls of the films
  const urlsfilmsOfCharacter = character.data.films;

  // extract the titles of the films
  try {

    // Step 2 - fetch all the data
    const promises = urlsfilmsOfCharacter.map((url) => fetchData(url));

    // Step 3 - handle the data
    const films = await Promise.all(promises);

    // All in one go!
    // const films = await Promise.all(
    //   urlsfilmsOfCharacter.map((film) => {
    //     return fetchData(film);
    //   })
    // );

    // add the titles of the films to the LukeSkywalker object
    films.forEach((film) => {
      LukeSkywalker.filmTitles.push(film.data.title);
    });

  } catch (error) {
    console.log(error); // rejectReason of any first rejected promise
  }
  // update the DOM
  update();
}

/**
 * Function to update the DOM
 */
function update() {
  // check if the name has been loaded
  LukeSkywalker.name ? characterElement.innerHTML = LukeSkywalker.name : characterElement.innerHTML = 'Loading...';
  // check if the films have been loaded
  if (LukeSkywalker.filmTitles.length !== 0) {
    characterDetailsElement.innerHTML = '';
    LukeSkywalker.filmTitles.forEach((film) => {
      const filmElement = document.createElement('li');
      filmElement.innerHTML = film;
      characterDetailsElement.appendChild(filmElement);
    });
  } else { characterDetailsElement.innerHTML = 'Loading...'; }
}

/**
 * Example function to demonstrate Promise.all with then and catch
 * @returns dataToBeResolved - Promise object that resolves with the data
 */
function simplePromiseAllExampleWithThenCatch() {
  const dataToBeResolved = [];
  // step 1 - get all the urls
  const urls = [
    'https://swapi.py4e.com/api/films/1/',
    'https://swapi.py4e.com/api/films/2/',
    'https://swapi.py4e.com/api/films/3/',
    'https://swapi.py4e.com/api/films/6/',
    'https://swapi.py4e.com/api/films/7/'
  ];
  // step 2 - fetch all the data
  const promises = urls.map((url) => fetchData(url));
  // step 3 - handle the datas
  Promise.all(promises)
    .then((results) => {
      dataToBeResolved.push(results);
      console.log('data inside function simplePromiseAllExampleWithThenCatch', results);
    })
    .catch((error) => {
      console.log(error);
    });
  return dataToBeResolved;
}

/**
 * Example function to demonstrate Promise.all with async await
 * @returns dataToBeResolved - Promise object that resolves with the data
 
 */
async function simplePromiseAllExampleWithAsyncAwait() {
  // step 1 - get all the urls
  const urls = [
    'https://swapi.py4e.com/api/films/1/',
    'https://swapi.py4e.com/api/films/2/',
    'https://swapi.py4e.com/api/films/3/',
    'https://swapi.py4e.com/api/films/6/',
    'https://swapi.py4e.com/api/films/7/'
  ];

  // step 2 - fetch all the data
  const promises = urls.map((url) => fetchData(url));

  // step 3 - handle the data
  try {
    const films = await Promise.all(promises);
    console.log('data inside function simplePromiseAllExampleWithAsyncAwait', films);
    return films;
  } catch (error) {
    console.log(error);
  }
}

init();
