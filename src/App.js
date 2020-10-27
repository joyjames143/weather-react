import React,{useState} from "react"

const api = {
  key : "6e06c8edd8b3c69a33b3e69bc80831b7",
  base : "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const[quary,setQuary] = useState('')
  const [wheather,setWheather] = useState({})


  const submitted = (evt) =>{
    if (evt.key === "Enter") {
          fetch(`${api.base}weather?q=${quary}&units=metric&appid=${api.key}`)
            .then(res => res.json())
              .then(result => {
                setWheather(result);
                setQuary('');
                console.log(result);
              });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  
  return (
    <div className={(typeof wheather.main != "undefined") ? ((wheather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
      <h1>WEATHER ?</h1>
        <div className="search-box">
          <input 
            type="text"
            placeholder="search by city ...."
            className="search-bar" 
            value={quary}
            onChange={(e)=>setQuary(e.target.value)}
            onKeyPress={submitted}

          />
        </div>
          
        {(typeof wheather.main != "undefined") ? (
          <div>
              <div className="location-box">
                  <div className="location">{wheather.name}, {wheather.sys.country}</div>
                  <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                  <div className="temp">{Math.round(wheather.main.temp)}°c</div>
                  <div className="weather">{wheather.weather[0].main}</div>
              </div>
          </div>
          ):("")}
      </main>
    </div>
  );
}

export default App;
