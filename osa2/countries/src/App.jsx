import { useEffect, useState} from 'react'
import axios from 'axios'

const Filter = ({search, onChange}) => {
  return <div>
    find countries <input value={search} onChange={onChange} />
  </div>
}

const Names = ({data}) => {


    if(data.length > 10){
      return <>Too many matches, specify another filter</>
    }
  
    if(data.length === 1){
      return <>
        <h2>{data[0].name.common}</h2>
        <div>Capital(s): {data[0].capital.map((item, index) => (
          <p key={index}>{item}</p>
        ))}</div>
        <br />
        <div>Area {data[0].area}</div>
        <h2>Languages</h2>
        <ul>{Object.values(data[0].languages).map((item, index) => (
        <li key={index}>{item}</li>
        ))}</ul>
        <img src = {data[0].flags["png"]}></img>
      </>
    }
    console.log(data);
    return <div>
      {data.map((item, index) => (
        <p key={index}>{item.name.common}</p>
      ))}
      </div>
}

function App() {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([]);

  useEffect(() => {
      axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const results = response.data.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setCountries(results)

    })
  }, [search]);
  


  return (
    <>
      <Filter search={search} onChange = {event => setSearch(event.target.value)}/>
      <Names data = {countries}/>
    </>
  )
}

export default App
