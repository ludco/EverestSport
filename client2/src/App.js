import React from 'react';
import './App.css';
import AdminProductList from './Components/Admin/AdminProductList';
import ProductProvider from './Providers/ProductProvider';

function App() {
 

  return (
    <div className="App">
      <ProductProvider>
        <AdminProductList/>
      </ProductProvider>
    </div>
  );
}

export default App;
