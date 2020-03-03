import React from 'react';
import './App.css';
import ProductList from './Components/ProductList'
import ProductProvider from './Providers/ProductProvider'

function App() {
 

  return (
    <div className="App">
      <ProductProvider>
        <ProductList/>
      </ProductProvider>
    </div>
  );
}

export default App;
