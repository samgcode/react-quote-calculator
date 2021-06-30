import './App.css';
import { useEffect, useReducer, useState } from 'react';
import axios from "axios";

function App() {
  const [services, setServices] = useState(null)
  const [quoteItems, setQuoteItems] = useState([])
  const [price, setPrice] = useState(0)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:3030',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setServices(response.data.services)
      } catch(err) {
        console.error(err)
      }
    }
    fetchData()
  }, [services])

  useEffect(() => {
    let total = 0
    quoteItems.map(quoteItem => {
      total += (quoteItem.quantity * quoteItem.price)
    })
    total = total.toFixed(2)
    setPrice(total)
  }, [quoteItems])

  function handleChange(event) {
    console.log(event.target.value)
    const id = parseInt(event.target.id)
    const service = services.find(service => service.id === id)
    const quoteItem = quoteItems.find(item => item.id === id)
    if(quoteItem !== undefined) {
      quoteItem.quantity = event.target.value
    } else {
      quoteItems.push({
        id,
        quantity: event.target.value,
        price: service.price
      })
    }
    setQuoteItems([...quoteItems])
    console.log(quoteItems)
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

export default App
/*
curl --location --request GET 'https://api.twitch.tv/helix/search/channels?query=a_seagull' --header 'client-id: dqaq5reedo8qw06tfyou3n498kpvc3' --header 'Authorization: Bearer zevtehfbrf0oonyewf32bhql74tj3u'
*/