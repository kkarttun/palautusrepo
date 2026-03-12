import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({search, onChange}) => {
  return <div>
    filter show with <input value={search} onChange={onChange} />
  </div>
}
const PersonForm = ({addEntries, newName, setNewName, newNumber, setNewNumber}) => {
  return <form onSubmit={addEntries}>
        <div>
          name: <input value = {newName} onChange={event => setNewName(event.target.value)}/>
          <br />
          number: <input value = {newNumber} onChange = {event => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
}
const Persons = ({persons, search}) => {
  return <div>{(persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())))
      .map(person => (<div key = {person.id} >{person.name} {person.number}</div>))}</div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


  const addEntries = (event) => {
    event.preventDefault();
    if (!newName) return
    if (!newNumber) return
    const sameName = persons.find(person => person.name === newName);
    const sameNumber = persons.find(person => person.number === newNumber);
    if (sameName && !sameNumber){
      alert(`${newName} is already added to phonebook`);
    } else if (sameNumber && !sameName) {
      alert(`${newNumber} is already added to phonebook`);
    } else if(sameName && sameNumber){
      alert(`${newName} and ${newNumber} are already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      axios
    .post('http://localhost:3001/persons', newPerson)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange = {event => setSearch(event.target.value)}/>
      <h3>add a new</h3>
      <PersonForm {...{addEntries, newName, setNewName, newNumber, setNewNumber}}/>
      <h3>Numbers</h3>
      <Persons {...{persons, search}}/>
    </div>
  )
}

export default App