import { useEffect, useState} from 'react'
import axios from 'axios'

const Filter = ({search, onChange}) => {
  return <div>
    find countries <input value={search} onChange={onChange} />
  </div>
}

const CountryInfo = ({data}) => {
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
      setShow(Array(results.length).fill(false));

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
