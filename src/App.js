import './App.css'
import { useEffect, useState } from 'react'
import { css } from "@emotion/react";
import BarLoader from 'react-spinners/BarLoader'
import axios from "axios";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 30px;
`;

function App() {
  const [services, setServices] = useState(null)
  const [quoteItems, setQuoteItems] = useState([])
  const [price, setPrice] = useState(0)
  const [loading, setLoading ] = useState(true)
  const [error, setError] = useState(false)
  const [showForm, setShowForm] = useState(false)
  
  useEffect(() => {
    async function fetchData() {
      // setLoading(true)
      setError(false)
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:3030',
          headers: { 'Content-Type': 'application/json' }
        })
        setLoading(false)
        setShowForm(true)
        setServices(response.data.services)
      } catch(err) {
        setLoading(false)
        setShowForm(false)
        setError(true)
        console.error(err)
      }
    }
    fetchData()
  }, [services])

  useEffect(() => {
    let total = 0
    quoteItems.forEach(quoteItem => {
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
        <BarLoader color={"#000"} loading={loading} css={override} size={150}/>
        {showForm ? <div>
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
          </div> : null 
        }
        {error ? <h2 className="error">
            error occured fetching services
          </h2> : null
        }
      </header>
    </div>
  );
}

export default App
/*
curl --location --request GET 'https://api.twitch.tv/helix/search/channels?query=a_seagull' --header 'client-id: dqaq5reedo8qw06tfyou3n498kpvc3' --header 'Authorization: Bearer zevtehfbrf0oonyewf32bhql74tj3u'
*/