const URL_API = 'https://api.thecatapi.com/v1/images/search';

fetch(URL_API)//1. cargamos la URL (1ra promesa)
  .then(response => response.json())//2. en el 1er .then() recibimos una promesa (respuesta) y esta respuesta la convertimos a algo que JS pueda entender con el metodo .json() la convertimos a un objeto. (2da promesa)
  .then(data => {//3. llamamos al metodo .then para resolver la segunda promesa y aqui es donde recibimos los datos (la informacion que cargue la API).
    console.log(data)
    const img = document.querySelector('img');
    img.src = data[0].url;
  });

