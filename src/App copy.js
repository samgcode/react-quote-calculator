import './App.css';
import data from './dataO.json'
import { useEffect, useReducer, useState } from 'react';

function App() {
  const [services, setServices] = useState(null)
  const [quantitys, setQuantitys] = useReducer(
    (state, newState) => ({...state, ...newState}), {})
  const [price, setPrice] = useState(0)
  
  useEffect(() => {
    setServices(data.services)
  }, [services])

  useEffect(() => {
    let total = 0
    for (const quantity in quantitys) {
      console.log(quantity)
      const service = services.find(service => {
        return service.id === quantity
      })
      console.log(service)
      total += (quantitys[quantity] * service.price)
      total = total.toFixed(2)
    }
    setPrice(total)
  }, [quantitys])

  function handleChange(event) {
    console.log(event.target.value)
    setQuantitys({[event.target.id]: event.target.value})
    console.log(quantitys)
  }

  return (
    <div>
      <header>
        <ul>
          {(services === null) ? null : services.map((service) => (
            <li key={service.name}>
              <label htmlFor={service.name}>{service.name}</label>
              <input type="number" id={service.id} onChange={handleChange}></input>
              <span> ${service.price} per {service.per}</span>
            </li>
          ))}
        </ul>
        <h1>{price}</h1>
      </header>
    </div>
  );
}

export default App;
/*
curl --location --request GET 'https://api.twitch.tv/helix/search/channels?query=a_seagull' --header 'client-id: dqaq5reedo8qw06tfyou3n498kpvc3' --header 'Authorization: Bearer zevtehfbrf0oonyewf32bhql74tj3u'
*/