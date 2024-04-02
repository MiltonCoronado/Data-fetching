const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3';

const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites';

const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;

const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';

const spanError = document.querySelector('#error');

async function loadRandomDogs() {
  const response = await fetch(API_URL_RANDOM, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',//el Content-Type si es obligatorio!!!
      'x-api-key': 'live_aQ5ZkKubEqUn1r1OJhqAL2kN9HyCQfj1cMoZ5ICpH0Q72N6seriCoocaJrio6IGu',
    },
  });
  const data = await response.json();
  console.log(data)
  
  if (response.status !== 200){
    spanError.innerHTML = `Hubo un error en: ${response.status}`;
  }else{
    const img1 = document.querySelector('#img1');
    const img2 = document.querySelector('#img2');
    const img3 = document.querySelector('#img3');
    const buttonOne = document.querySelector('#buttonOne');
    const buttonTwo = document.querySelector('#buttonTwo');
    const buttonThree = document.querySelector('#buttonThree');
  
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    
    buttonOne.onclick = () => saveFavoriteDog(data[0].id);
    buttonTwo.onclick = () => saveFavoriteDog(data[1].id);
    buttonThree.onclick = () => saveFavoriteDog(data[2].id);
  };
};


async function loadfavoritesDogs() {
  const response = await fetch(API_URL_FAVORITES, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',//el Content-Type si es obligatorio!!! 
      'x-api-key': 'live_aQ5ZkKubEqUn1r1OJhqAL2kN9HyCQfj1cMoZ5ICpH0Q72N6seriCoocaJrio6IGu',
    }
  });
  const data = await response.json();
  console.log(data)

  if (response.status !== 200) {
    spanError.innerHTML = `Hubo un error en: ${response.status}`;
  }else{
    const section = document.querySelector('#favoritesDogs');
    section.innerHTML = '';//aca limpio el contenedor y luego recien renderizo...
    const h2 = document.createElement('h2');
    const textOne = document.createTextNode('Favorites Dogs');
    h2.append(textOne);
    section.append(h2);

    data.forEach(item => {//Aca los elemento manipulados del "DOM" quedan permanentes al recargar y por lo tanto al momento de guardar se guarda mas de una imagen, lo que se tiene que hacer es limpiar ese nodo del DOM y luego ejecutar la funcion.
      const article = document.createElement('article');
      const img = document.createElement('img');
      const button = document.createElement('button');
      const text = document.createTextNode('Quitar al perrito de favoritos');

      img.src = item.image.url;
      img.style.width = '200px';
      button.append(text);
      button.onclick = () => deletefavoritesDogs(item.id);
      article.append(img, button);
      section.append(article);
    });
  };
};


async function saveFavoriteDog(id){
  const response = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',//el Content-Type si es obligatorio!!! 
      'x-api-key': 'live_aQ5ZkKubEqUn1r1OJhqAL2kN9HyCQfj1cMoZ5ICpH0Q72N6seriCoocaJrio6IGu',
    },
    body: JSON.stringify({ 
      "image_id": id,
    }),
  }); 
  
  const data = await response.json();
  console.log(data);
  
  if (response.status !== 200) {
    spanError.innerHTML = `Hubo un error en: ${response.status}`;
  }else{
    console.log('Guardado en favoritos con exito');
    loadfavoritesDogs();
  };
};


async function deletefavoritesDogs(id){
  const response = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',//Aca el 'headers' con 'Content -Type' no es obligatorio, es lo mismo si no lo envio, por lo tanto 'body' no es necesario ya que la documentacion asi lo indica y segun MDN cuando no se envia un 'headers' no es necesario un 'body' (Aca solo lo puse de prueba, haber si fallaba la peticion, que no fallo!!!)
      'x-api-key': 'live_aQ5ZkKubEqUn1r1OJhqAL2kN9HyCQfj1cMoZ5ICpH0Q72N6seriCoocaJrio6IGu',
    },
  });

  const data = await response.json();
  console.log(data);

  if (response.status !== 200) {
    spanError.innerHTML = `Hubo un error en: ${response.status}`;
  }else{
    console.log('Borrado con exito');
    loadfavoritesDogs();
  };
};


async function uploadDogPicture(){
  const form = document.querySelector('#uploadingForm')//1- seleccionamos al formulario.
  const formData = new FormData(form);//2- se crea una nueva instancia de FormData y se le pasa como argumeneto el formulario, asi agarra todos los valores de la etiqueta input.
  console.log(formData.get('file'));

  const response = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data', esto es por un bug del servidor pero quitandole el Content-Type FormData lo soluciona!
      'x-api-key': 'live_aQ5ZkKubEqUn1r1OJhqAL2kN9HyCQfj1cMoZ5ICpH0Q72N6seriCoocaJrio6IGu',
    },
    body: formData,//aca en el body le pasamos la instancia de "FormData" ya que esta instancia contiene los valores del input y asi el body los puede leer (no es necesario pasarle al body un JSON.stringify({}))
  });

  const data = await response.json();//aca se parsea la informacion
  console.log(data);
  saveFavoriteDog(data.id);//llamamos a la funcion para que guarde en favoritos la imagen del perrito subida.
};


loadRandomDogs();
loadfavoritesDogs();
