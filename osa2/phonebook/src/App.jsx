import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-123456'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      <div>{persons.map(person => (<div key = {person.name} >{person.name} {person.number}</div>))}</div>
    </div>
  )
}

export default App