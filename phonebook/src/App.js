import React from "react"
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '+3800000000' 
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const insertNew = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length === 0 && persons.filter(person => person.number === newNumber).length === 0){
      const newObj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newObj))
      setNewName('')
      setNewNumber('')
    }else if(persons.filter(person => person.name === newName).length === 0){
      alert(`${newNumber} is already added`)
    }else if(persons.filter(person => person.number === newNumber).length === 0){
      alert(`${newName} is already added`)
    }else{
      alert(`${newName} and ${newNumber} are already added`)
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map(person => <p key = {person.name}>{person.name}: {person.number}</p>)}
      
    </div>
  )
}

export default App