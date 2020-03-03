import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ProductContext = createContext();


function ProductProvider(props) {

  const baseUrl = 'http://localhost:3000';
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios.get(`${baseUrl}/products`).then(result => {
      setProducts(result.data);
    })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    getProducts();
  }, [])

  const changeProducts = () => {
    getProducts();
  }

  return (
    <ProductContext.Provider value={{ products, changeProducts }} >
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
