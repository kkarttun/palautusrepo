import { useEffect, useState} from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const Filter = ({search, onChange}) => {
  return <div>
    find countries <input value={search} onChange={onChange} />
  </div>
}

const CountryInfo = ({data}) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${data.capital[0]}`)
      .then(response => {
        setWeather(response.data);
      });
  }, [data]);
  return <>
        <h2>{data.name.common}</h2>
        <div>Capital(s): {data.capital.map((item, index) => (
          <p key={index}>{item}</p>
        ))}</div>
        <br />
        <div>Area {data.area}</div>
        <h2>Languages</h2>
        <ul>{Object.values(data.languages).map((item, index) => (
        <li key={index}>{item}</li>
        ))}</ul>
        <img src = {data.flags["png"]}></img>
        {weather && (
        <div>
          <h2>Weather in {data.capital[0]}</h2>
          <p>Temperature: {weather.current.temperature} Celsius</p>
          <>
            {weather.current.weather_icons.map((item, index) => (
              <img key={index} src={item} />
            ))}
          </>
          <p>windspeed {Math.round(weather.current.wind_speed / 3.6)} m / s</p>
        </div>
      )}
      </>
}

  const Names = ({data, show, setShow}) => {

    if(data.length > 10){
      return <>Too many matches, specify another filter</>
    }
  
    if(data.length === 1){
      return <CountryInfo data = {data[0]} />
    }
    return <div>
      {data.map((item, index) => (
      <div key={index}>
        {show[index] ? (
            <>
            <button style={{ display: "inline" }} onClick = {() => {
                setShow(prev => prev.map((v, i) => i === index ? !v : v));
              }}>hide</button>
            <CountryInfo data={item} />
            </>
          ) : (
            <>
              <span>{item.name.common} </span>
              <button style={{ display: "inline" }} onClick = {() => {
                setShow(prev => prev.map((v, i) => i === index ? !v : v));
              }}>Show</button>
            </>
          )}

      </div>
    ))}
    </div>
  }

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState([]);

  useEffect(() => {
      axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const results = response.data.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setCountries(results);
      if(results.length === 1){
        setShow([true])
      }else{
        setShow(Array(results.length).fill(false));
      }
    })
  }, [search]);
  return (
    <>
      <Filter search={search} onChange = {event => setSearch(event.target.value)}/>
      <Names data = {countries} show={show} setShow={setShow} />
    </>
  )
}

export default App
