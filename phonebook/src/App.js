import React from "react"
import axios from 'axios'
import { useState, useEffect } from 'react'

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

const Persons = ({persons}) => {
  return (
    <>
      {persons.map(person => <p key = {person.name}>{person.name}: {person.number}</p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
         .then(response => {
          setPersons(response.data)
         })
  },[])

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
      <Persons persons = {personsToShow}/>
    </div>
  )
}

export default App