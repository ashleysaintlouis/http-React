import { useState, useEffect } from 'react'
import './App.css'

import { useFetch } from './hooks/useFetch'

const url = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([])
  const {data} = useFetch(url)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 */

  // add de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
    };

    console.log(product)
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product)
    });

    const addedProduct = await res.json();
    setProducts((prevProducts) => [...prevProducts, addedProduct]);
    
    setName("")
    setPrice("")
  };


  return (
    <div className="App">
      <h1>Lista de produto</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>

      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input 
            type="text" 
            value={name}
            name='name'
            onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input 
            type="number" 
            value={price}
            name='price'
            onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <input type="submit" value="Cadastrar produto" />

        </form>
      </div>

    </div>
  )
}

export default App
