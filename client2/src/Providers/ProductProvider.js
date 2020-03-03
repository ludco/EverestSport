import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ProductContext = createContext();


function ProductProvider(props) {
  console.log(props)
    const  baseUrl = 'http://localhost:3000';
    const [products, setProducts] = useState([]);
    const [inc, setInc] = useState('');

    useEffect(()=>{
        axios.get(`${baseUrl}/products`).then(result =>{
            setProducts(result.data);
            setInc(result.data.length)
           
        })
        .catch(e=>console.log(e))
    },[])

  
  return (
    <ProductContext.Provider value={{products : products, inc : inc}} >
        {props.children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
