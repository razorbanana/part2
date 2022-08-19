import {useState, useEffect} from 'react'
import axios from 'axios'


const Country = ({country}) => {
  return(<div>
    <h1>{country.name.common}</h1>
    <p>capital: {country.capital}</p>
    <p>area: {country.area} km^2</p>
    <strong>languages:</strong>
    <ul>
      {Object.values(country.languages).map(lan => <li key = {lan}>{lan}</li>)}
    </ul>
    <img src={country.flags.png}></img>
  </div>)
}

const CountryList = ({countries}) => {
  if (countries.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }else if(countries.length === 0){
    return (
      <p>No matches</p>
    )
  }else if(countries.length === 1){
    return (
      <>
        {countries.map(country => <Country key = {country.name.common} country = {country}/>)}
      </>
      )
  }else{
    return (
    <>
      {countries.map(country => <p key = {country.name.common}>{country.name.common}</p>)}
    </>
    )
  }
}

function App() {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() =>{
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  },[])

  const filterSearch = (str1, str2) => {
    for (let i = 0; i < str1.length - str2.length + 1; i++){
      if(str1.slice(i,i+search.length).toLowerCase() === str2.toLowerCase() ){
        return true
      }
    }
    return false
  }

  const countriesToShow = countries.filter(country => filterSearch(country.name.common, search))

  return (
    <>
    country: <input value = {search} onChange = {(event => {setSearch(event.target.value)})}/>
    <h1>Country List</h1>
    <CountryList countries = {countriesToShow}/>
    </>
  );
}

export default App;
