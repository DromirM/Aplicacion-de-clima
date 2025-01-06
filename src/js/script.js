
document.addEventListener('DOMContentLoaded', () => {
  const divClimeData = document.getElementById('climeData');
  let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
  let api_key = '4c21d70905cbdd8eab32cfc81afd5de3';
  let kelvin_difference = 273.15;

  document.getElementById('searchButton').addEventListener('click', function(){
    const cityInputElement = document.getElementById('inputCity');

    //Valido que se ingresara un dato.
    if(cityInputElement.value){
      fetchClimeData(cityInputElement.value);
    }else{
      displayMessage("Por favor ingrese el nombre de una ciudad");
      cityInputElement.focus();
    }
  });

  function fetchClimeData(city) {
    fetch(`${urlBase}?q=${city}&appid=${api_key}`)
    .then(data => data.json())
    .then(data => {
      if(data.cod === 200){
        displayClimeData(data);
      } else if(data.cod === '404'){
        displayMessage("Por favor, ingrese el nombre de una ciudad valida");
      } else if(data.cod === '429'){
        displayMessage("Limite de usos de la API del sistema alcanzado.");
      } else{
        displayMessage("Algo salio mal.");
      }
    })
    .catch(error => displayMessage("Se ha producido un error ", error));
  }

  function displayClimeData(data){
    const container = document.getElementById('container');
    const cityName = data.name;
    const countryName = data.sys.country;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    // Limpio el contenido antiguo.
    cleanClimeData();

    // Actualizo el div con los datos nuevos.
    const cityTitle = document.createElement('h2');
    cityTitle.textContent = `${cityName}, ${countryName}`;

    const temperatureInfo = document.createElement('p');
    temperatureInfo.textContent = `La temperatura es: ${Math.floor(temperature-kelvin_difference)}°C`;

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `La humedad es: ${humidity}`;

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `Descripcion meteorologica: ${description}`;

    const iconElement = document.createElement('img');
    iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    divClimeData.appendChild(cityTitle);
    divClimeData.appendChild(temperatureInfo);
    divClimeData.appendChild(humidityInfo);
    divClimeData.appendChild(iconElement);
    divClimeData.appendChild(descriptionInfo);

    container.classList.toggle('expand', true);
  }

  function displayMessage(messageContent){
    // Funcion que despliega un mensaje por pantalla notificando algun tipo de informacion.
    const container = document.getElementById('messageContainer');
    container.innerHTML = '';
    container.innerHTML = messageContent;
    container.style.opacity = '1';

    setTimeout(() => {
      container.style.opacity = '0';
    }, 2000);

  }

  function cleanClimeData(){
    divClimeData.innerHTML = '';
  }
  
});
