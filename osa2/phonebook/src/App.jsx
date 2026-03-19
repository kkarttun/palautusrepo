import { useState, useEffect } from 'react'
import entryServices from './services/entries'

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

const Persons = ({persons, search, handleDelete}) => {
  return <div>{(persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())))
      .map(person => (<div key = {person.id} >{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></div>))}
      </div>
}

const App = () => {
  const [persons, setPersons] = useState([])

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      entryServices.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  useEffect(() => {
  entryServices
    .getAll()
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
      if (window.confirm(`${newName}  is already added to phonebook. replace the old number with the new one?`)) {
        const updatedPerson = {
        ...sameName,
        number: newNumber
        }

      entryServices
        .update(sameName.id, updatedPerson)
        .then(response => {
        const update = response.data || updatedPerson
        setPersons(
          persons.map(p =>
            p.id !== sameName.id ? p : update
          )
        )
        setNewName('')
        setNewNumber('')
        })
      }
    } else if (sameNumber && !sameName) {
      alert(`${newNumber} is already added to phonebook`);
    } else if(sameName && sameNumber){
      alert(`${newName} and ${newNumber} are already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      entryServices
    .create(newPerson)
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
      <Persons {...{persons, search, handleDelete}}/>
    </div>
  )
}

export default App