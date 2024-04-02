const URL_API = 'https://api.thecatapi.com/v1/images/search';
  
async function reload(){//1. para Async/await definimos una funcion asincrona ("async" function xxxxxx(){};), esta funcion ya no va con const ni con let.
  const response = await fetch(URL_API);//2. dentro del codigo "fetch" va a esperar una repuesta ( "await" fetch(URL_API) ).
  const data = await response.json();//3. recibimos una respuesta y esta respuesta tb va con "await", luego la convertimos a algo que JS pueda entender con el metodo .json() la convertimos a un objeto y esa informacion la guardamos en una variable. comunmente llamada "data".

  console.log(data);
  const img = document.querySelector('img');
  img.src = data[0].url;
};

reload();