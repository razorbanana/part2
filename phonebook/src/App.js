import React from "react"
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      id: 1,
      name: 'Arto Hellas' 
    }
  ]) 
  const [newName, setNewName] = useState('')

  const insertNew = (event) => {
    event.preventDefault()
    const newObj = {
      id: persons.length + 1,
      name: newName
    }
    setPersons(persons.concat(newObj))
    setNewName('')
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form  onSubmit={insertNew}>
        <div>
          name: <input value = {newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key = {person.id}>{person.name}</p>)}
      
    </div>
  )
}

export default App