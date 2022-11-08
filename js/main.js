var searchInput=document.querySelector('.searchInput')
let cartona=""
const days=['sunday','monday','tuesday','wednesday','thursday','friday','saterday']
let d = new Date();
const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let m = new Date();
let day = days[d.getDay()]
let month = months[m.getMonth()]
let tomorrow = days[d.getDay()+1];
let last = days[d.getDay()+2];


if(d.getDay()==5)
{
    last=days[0]
}
if(d.getDay()==6)
{
    tomorrow=days[0];
    last=days[1]
}

getWheather()
async function getWheather(country='cairo'){
    let link = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=7ea6747d2e2147caaef42551220811&q=${country}&days=3`)
    let data = await link.json();   
    console.log(data);
    let nextDay = data.forecast.forecastday[1]
    console.log(nextDay);
    let lastDay = data.forecast.forecastday[2]
    console.log(lastDay);
    cartona=
    `
     
      <div class="col-lg-4 p-3 px-5 bg-info border-end border-dark first">
       <div class="current-item text-white">
        <div class="current-header text-muted border-bottom border-dark d-flex justify-content-between align-items-center">
           <p class="mt-2">${day}</p>
           <p class="mt-2">${(d.getDate()) +month}</p>
        </div>
        <h5 class="locattion text-muted py-3">${data.location.name}</h5>
        <div class="item-body d-flex justify-content-center my-2 py-4">
          <h1 class="temp fs-1 mt-3 fw-bolder">${data.current.temp_c}<sup>o</sup>C</h1> 
          <div class="w-25 ">
           <img class="w-100" src="https:${data.current.condition.icon}">
          </div>
        </div>
        <p class="my-2 text-info">${data.current.condition.text}</p>
        <div class="my-3">
          <span><img src="images/weather/icon-umberella.png" alt=""> 20%</span>
          <span><img src="images/weather/icon-wind.png" alt=""> 18km/h</span>
          <span><img src="images/weather/icon-compass.png" alt=""> East</span>
        </div>
       </div>
      </div>

     
    `
    cartona+=
    `
    <div class="col-lg-4 p-3 bg-info text-center border-end border-dark second">
     <div class="current-item text-white">
      <div class="current-header border-bottom border-dark d-flex justify-content-center text-muted">
        <p class="mt-2">${tomorrow}</p>
       </div>
      <div class="item-body my-2 py-4">
       <div class="w-25  m-auto">
         <img class="w-75" src="https:${nextDay.day.condition.icon}">
       </div>
      </div>
      <div>
       <h5 class="temp ">${nextDay.day.maxtemp_c}<sup>o</sup>C</h5> 
       <p class="temp ">${nextDay.day.mintemp_c}<sup>o</sup>C</p> 
      </div>
      <p class="text-info">${nextDay.day.condition.text}</p>  
     </div>
    </div>
    `
    cartona+=
    `
    <div class="col-lg-4 p-3 bg-info text-center third">
     <div class="current-item text-white">
      <div class="current-header border-bottom border-dark d-flex justify-content-center text-muted">
        <p class="mt-2">${last}</p>
       </div>
      <div class="item-body my-2 py-4">
       <div class="w-25  m-auto">
         <img class="w-75" src="https:${lastDay.day.condition.icon}">
       </div>
      </div>
      <div>
       <h5 class="temp ">${lastDay.day.maxtemp_c}<sup>o</sup>C</h5> 
       <p class="temp ">${lastDay.day.mintemp_c}<sup>o</sup>C</p> 
      </div>
      <p class="text-info ">${lastDay.day.condition.text}</p>  
     </div>
    </div>
    `
    document.querySelector(".weather").innerHTML=cartona;
}

searchInput.addEventListener("input",function(){
    let nameCountry = searchInput.value;
    getWheather(nameCountry);
})
