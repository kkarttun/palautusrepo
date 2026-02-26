import { useState } from 'react'


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
      <form>
        <div>
          filter show with <input value = {search} onChange={event => setSearch(event.target.value)}/>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addEntries}>
        <div>
          name: <input value = {newName} onChange={event => setNewName(event.target.value)}/>
          <br />
          number: <input value = {newNumber} onChange = {event => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{(persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())))
      .map(person => (<div key = {person.name} >{person.name} {person.number}</div>))}</div>
    </div>
  )
}

export default App