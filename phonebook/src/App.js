import { useState, useEffect } from 'react'
import personService from './services/phonebook'

const GoodNotification = ({ message }) => {

  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style = {style}>
      {message}
    </div>
  )
}

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
  const [good, setGood] = useState(null)
  const [bad, setBad] = useState(null)

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
        setGood(`${newName}'s number is added`)
        setNewName('')
        setNewNumber('')
        setTimeout(() => {setGood(null)},2500)
      })
    }else{
      if (window.confirm(`Do you really want to change ${newName}'s number?`)) {
        const id = persons.find(per => per.name === newName).id
        const newObj = {
          name: newName,
          number: newNumber,
          id: id
        }
        personService
          .update(id, newObj)
          .then(() => {
            setPersons(persons.map(per => per.id !== id ? per : newObj))
            setGood(`${newName}'s number is updated`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {setGood(null)},2500)
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
      <GoodNotification message={good}/>
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