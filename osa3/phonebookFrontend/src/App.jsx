import { useState, useEffect } from 'react'
import entryServices from './services/entries'
import {Filter, PersonForm, Persons, Info} from './components/index.jsx'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [Notification, setNotification] = useState(null)
  const [NotificationColor, setNotificationColor] = useState('green')

  const changeNotification = ({message, color}) => {
    setNotification(message)
    setNotificationColor(color)
    setTimeout(() => {
          setNotification(null)
        }, 5000)
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      entryServices.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      }).catch(() => {
        changeNotification({message: `informations of ${person.name} have already been removed from the server`, color: 'red'})
    })
    }
  }

  useEffect(() => {
    console.log("test")
  entryServices
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

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
        changeNotification({message: `${newName} number changed to ${newNumber}`, color: 'green'})
        setNewName('')
        setNewNumber('')
        }).catch(() => {
          changeNotification({message: `Information of ${newName} have already been removed from the server`,
          color: 'red'})
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
      changeNotification({message: `Added ${newName}`, color: 'green'})
      setNewName('')
      setNewNumber('')
    })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Info text = {Notification} color = {NotificationColor}/>
      <Filter search={search} onChange = {event => setSearch(event.target.value)}/>
      <h3>add a new</h3>
      <PersonForm {...{addEntries, newName, setNewName, newNumber, setNewNumber}}/>
      <h3>Numbers</h3>
      <Persons {...{persons, search, handleDelete}}/>
    </div>
  )
}

export default App