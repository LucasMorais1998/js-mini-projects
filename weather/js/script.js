document.querySelector('.search').addEventListener('submit', async (e) => {
  e.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if (input !== '') {
    clearInfo();
    showWarning('Carregando...');

    let apiKey = '6ab015e59344c27ea0a8484ab4b3f4bf';

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=${apiKey}&units=metric&lang=pt_br`;

    let result = await fetch(url);
    let json = await result.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        tempDescription: json.weather[0].description,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning('Não encontramos está localização.');
    }
  } else {
    clearInfo();
    showWarning('Informe uma localização.');
  }
});

function showInfo(json) {
  showWarning('');

  document.querySelector('.title').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.temp-info').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector(
    '.wind-info'
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`;

  let image = document.querySelector('.temp img');
  image.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
  );
  image.setAttribute('alt', `imagem de ${json.tempDescription}`);

  document.querySelector('.wind-pointer').style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;

  document.querySelector('.result').style.display = 'block';
}

function clearInfo() {
  showWarning('');
  document.querySelector('.result').style.display = 'none';
}

function showWarning(msg) {
  document.querySelector('.warning').innerHTML = msg;
}
