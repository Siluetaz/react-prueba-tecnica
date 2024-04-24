import { useEffect, useState } from 'react'
import './App.css'
const CAR_ENDPOINT_RANDOM_FACT_URL = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`

const App = () => {
  const [fact, setFact] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    fetch(CAR_ENDPOINT_RANDOM_FACT_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch')
        return response.json()
      })
      .then((data) => {
        const { fact } = data
        setFact(fact)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    if (!fact) return
    const threeWordsFirsWords = fact.split(' ', 3).join('%20')
    fetch(`https://cataas.com/cat/says/${threeWordsFirsWords}?size=50&color=red&json=true`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch')
        return response.json()
      })
      .then((data) => {
        setImage(`https://cataas.com/cat/says/${threeWordsFirsWords}?size=50&color=red`)
      }).catch((error) => {
        console.error(error)
      })
  }, [fact])

  if (!fact || !image) return (<h1>Loading...</h1>)

  return (
    <main className='container'>
      <h1>Cat App</h1>

      <section className='section'>
        {fact && <p className='fact-text'>{fact}</p>}
        <div className='image-mask'>
          {image && <img className='cat-image' src={image} alt='cat image from three words fact' />}
        </div>
      </section>
    </main>
  )
}

export default App
