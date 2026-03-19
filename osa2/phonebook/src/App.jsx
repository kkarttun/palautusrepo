import { useState, useEffect } from 'react'
import entryServices from './services/entries'
import './style.css'
import {Filter, PersonForm, Persons, Info} from './components/index.jsx'

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
  const [Notification, setNotification] = useState(null)

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
        setNotification(`${newName} number changed to ${newNumber}`)
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
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
      setNotification(`Added ${newName}`)
      setNewName('')
      setNewNumber('')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Info text = {Notification}/>
      <Filter search={search} onChange = {event => setSearch(event.target.value)}/>
      <h3>add a new</h3>
      <PersonForm {...{addEntries, newName, setNewName, newNumber, setNewNumber}}/>
      <h3>Numbers</h3>
      <Persons {...{persons, search, handleDelete}}/>
    </div>
  )
}

export default App