import React from "react"
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas' 
    }
  ]) 
  const [newName, setNewName] = useState('')

  const insertNew = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length === 0){
      const newObj = {
        name: newName
      }
      setPersons(persons.concat(newObj))
      setNewName('')
    }else{
      alert(`${newName} is already added`)
    }
    
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
      {persons.map(person => <p key = {person.name}>{person.name}</p>)}
      
    </div>
  )
}

export default App