import { useState, useEffect } from 'react'
import personService from './services/phonebook'

const Filter = ({filter, onChange}) => {
  return (
    <div>
        filter: <input value = {filter} onChange={onChange}/>
    </div>
  )
}

const PersonForm = ({insertNew, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form  onSubmit={insertNew}>
      <div>
        name: <input value = {newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value = {newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({person, persons, setPersons}) => {
  const deletePerson = () => {
    if (window.confirm(`Do you really want to delete ${person.name}'s number?`)) {
      personService
        .del(person.id)
        .then(() => setPersons(persons.filter(per => per.id !== person.id)))
    }
  }
  return (
    <>
      {person.name}: {person.number + ' '}
      <button onClick = {deletePerson}>delete</button><br/>
    </>
  )
}

const Persons = ({persons, setPersons}) => {
  return (
    <>
      {persons.map(person => <Person key = {person.name} person ={person} persons={persons} setPersons={setPersons}/>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const insertNew = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length === 0){
      const newObj = {
        name: newName,
        number: newNumber
      }
      personService
      .create(newObj)
      .then(initialNotes => {
        setPersons(persons.concat(initialNotes))
        setNewName('')
        setNewNumber('')
      })
    }else{
      if (window.confirm(`Do you really want to change ${newName}'s number?`)) {
        const newObj = {
          name: newName,
          number: newNumber
        }
        const id = persons.find(per => per.name === newName).id
        personService
          .update(id, newObj)
          .then(() => {
            setPersons(persons.map(per => per.id !== id ? per : newObj))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    console.log(event.target.value)
    console.log(persons.filter(person => person.name.substring(0, filter.length) === filter))
  }

  const personsToShow = persons.filter(person => person.name.substring(0, filter.length) === filter)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} onChange = {handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm insertNew ={insertNew} newName = {newName} handleNameChange = {handleNameChange} 
      newNumber={newNumber} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons = {personsToShow} setPersons={setPersons}/>
    </div>
  )
}

export default App