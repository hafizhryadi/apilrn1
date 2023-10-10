import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';




function App() {
  const [categories, setCategories] = useState()
  const [search, setSearch] = useState()
  const [dataSearched, setDataSearched] = useState()

  useEffect(() => {
    retrieveCategories()
  }, [])

  const retrieveCategories = async () => {
    try {

      const { data } = await axios.get(`https://api.publicapis.org/categories`)

      // console.log(response.data, 'respon ya')

      setCategories(data)

    } catch (error) {
      console.log(error, 'error ya')
    }
  }

  const handleChange = (e) => {
    // console.log("hello")
    setSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.get(`https://api.publicapis.org/entries?category=${search}`)

      setDataSearched(data.entries)

    } catch (error) {
      console.log(error, "error ya")
    }
  }


  return (

    <div className='App' >
      <h1 style={{color: "white"}}>Search Public Api</h1>
      <p style={{color: "gray"}}>*by category</p>

      <form onSubmit={handleSubmit} className='form'>
        <input onChange={handleChange} />
        <button className='button1'>Submit</button>
      </form><br />

      <div>
        {dataSearched && dataSearched.map((data, index) => {
          return (
            <BrowserRouter>
              <div className='page1'>
                <h4>{data.API}</h4>
                <li>{data.Category}</li>
                <li>
                  <button className='buttons' key={data.Link}>
                    <Link className='link' to={data.Link}>Link</Link>
                  </button>
                </li>

                <br />
                <br />
              </div>
            </BrowserRouter>
          )
        })}
      </div>
    </div>
  );

}



export default App;
