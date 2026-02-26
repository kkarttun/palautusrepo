import { useState } from 'react'

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
      .map(person => (<div key = {person.name} >{person.name} {person.number}</div>))}</div>
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])
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
      setPersons(persons.concat(
        {
           name: newName,
           number: newNumber
        }));
      setNewName('');
      setNewNumber('');
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