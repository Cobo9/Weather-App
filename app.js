let latitude;
let longitude;
const APIkey = "786c2b6bbc48aa74fe6627410b35df5d"

function startApp (){
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (position)=>{
         lon = position.coords.longitude
         lat = position.coords.latitude
         fetchData(lat, lon);
        }
    )

}
}

function fetchData (lat, lon){
    const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lon}&appid=${APIkey}`
    // console.log(url)
    fetch(url) 
    .then( blob => blob.json())
    .then(data => {
        updateDOM(data)
    })
}

function updateDOM ({name, main, wind, weather ,sys}){
    currentConditions =  weather[0].main;
    document.getElementById("location").textContent = name;
    document.getElementById("temperature").textContent = main.temp;
    document.getElementById("wind").textContent = wind.speed;
    document.getElementById("pressure").textContent=main.pressure

    console.log(sys.sunset)
    console.log(sys.sunrise)
    const sunriseHours = new Date (sys.sunrise*1000).getHours();
    const sunriseMinutes = new Date (sys.sunrise*1000).getMinutes();

    const sunsetHours = new Date (sys.sunset*1000).getHours();
    const sunsetMinutes = new Date (sys.sunset*1000).getMinutes();

    document.querySelector("#sunrise").textContent = sunriseHours +":"+sunriseMinutes;
    document.querySelector("#sunset").textContent = sunsetHours +":"+sunsetMinutes;

    updateBackground (currentConditions);
}

function updateBackground(currentConditions){
    const body = document.querySelector("body");    
    switch(currentConditions) {
          case "Clouds":
          body.style.backgroundImage= "url('assets/images/clouds.jpg')"
          break;
          case "Rain":
          body.style.backgroundImage= "url('assets/images/rain.jpg')"
          break;
          case "Clear":
          body.style.backgroundImage= "url('assets/images/clear.jpg')"
          break;
          case "Drizzle":
          body.style.backgroundImage= "url('assets/images/drizzle.jpg')"
          break;
          case "Mist":
          body.style.backgroundImage= "url('assets/images/mist.jpg')"
          break;
          case "Snow":
          body.style.backgroundImage= "url('assets/images/snow.jpg')"
          break;
          case "Thunderstorm":
          body.style.backgroundImage= "url('assets/images/thunderstorm.jpg')"
          break;
        default:
          return
      }
}