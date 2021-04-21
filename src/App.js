import React, { useState } from 'react';

const api = {
  api_key: "892524b41dd9002a4bc87c26f1c299a2",
  url: "https://api.openweathermap.org/data/2.5"
}

function App() {
  const [query, setQuery] = useState('');
  const [cityNotFound, setCityNotFound] = useState(false);
  const [weather, setWeather] = useState({});
  const [loader, setLoader] = useState(false);
  const search = evt => {

    if (evt.key === "Enter") {
      setLoader(true);
      fetch(`${api.url}/weather?q=${query}&units=metric&APPID=${api.api_key}`)
        .then(res => res.json())
        .then(result => {
          if (result.cod != 200) {
            setCityNotFound(true);
          } else {
            setCityNotFound(false);
          }
          setWeather(result);
          setQuery('');
        }).catch(e => {
          console.log('error');
        }).finally(f => {
          setLoader(false);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm ' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search...."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          >
          </input>
        </div>
        {!loader && (typeof weather.main != "undefined") && (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)} °C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        )}
        {!loader && (cityNotFound == true) && (
          <div>
            <div className="location-box">
              <div className="location">{'No City Found.'}</div>
              <div className="date">{'Please search a valid city.'}</div>
            </div>
          </div>
        )}
        {loader == true &&
          <div className="spiner_div">
            <div className="cm-spinner"></div>
          </div>
        }
      </main>
    </div>
  );
}

export default App;
