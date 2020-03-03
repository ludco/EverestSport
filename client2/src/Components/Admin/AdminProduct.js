import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';




function AdminProduct({ product, decrement }) {
    const baseUrl = 'http://localhost:3000';
    const [canModify, setCanModify] = useState(false);

    const fileInput = React.createRef();
    const [productName, setProductName] = useState(product.name);
    const [productPrice, setProductPrice] = useState(product.priceTTC);
    const [productDesc, setProductDesc] = useState(product.description);

    // DELETE A PRODUCT
    const deleteProduct = (id) => {
        axios.delete(`${baseUrl}/products/${id}`).then(() => {
            decrement();
        })
            .catch(e => console.log(e));

    }
    const handleChangeName = (event) => {
        setProductName(event.target.value)
    }
    const handleChangePrice = (event) => {
        setProductPrice(event.target.value)
    }
    const handleChangeDesc = (event) => {
        setProductDesc(event.target.value)
    }

    const Modify = (event) => {
        let modifiedProduct = {
            name: productName,
            priceTTC: productPrice,
            description: productDesc,
            photo : null,
            promo : null,
            isBigPromo : null,
            category : null,
            type : null
        }
        console.log('avant put', modifiedProduct)
        axios.put(`${baseUrl}/products/${product.id}`,modifiedProduct).then(result => {
            console.log(result.data);
            setCanModify(false)
            decrement();


        })
            .catch(e => console.log(e));
        event.preventDefault();
    }


    if (canModify) {
        return (

            <div className="card">
                <form onSubmit={Modify} className="addForm">
                    <label htmlFor="photo">Photo du produit : </label>
                    <p><input type="file" id="photo" ref={fileInput}></input></p>
                    <label htmlFor="name">Nom du produit : </label>
                    <h2><input type="text" id="name" value={productName} onChange={handleChangeName}></input></h2>
                    <label htmlFor="price">Prix du produit (€) : </label>
                    <h4><input type="number" min="0" step="any" value={productPrice} onChange={handleChangePrice}></input></h4>
                    <label htmlFor="desc">Description </label>
                    <p><textarea rows="4" id="desc" value={productDesc} onChange={handleChangeDesc}></textarea></p>
                    <Button color="primary" type="submit" className="addButton">Modifier</Button>
                    <Button color="secondary" className="addButton" onClick={() => setCanModify(false)}>Retour</Button>
                </form>
            </div>

        );
    }
    else {
        return (

            <div className="card">
                <img width="100%" src={product.photo} alt="product" />
                <div>
                    <h2>{product.name}</h2>
                    <h4>{product.priceTTC}€</h4>
                    <p>{product.description}</p>
                    <Button color="primary" onClick={() => setCanModify(true)}>Modifier</Button>
                    <Button color="secondary" onClick={() => { if (window.confirm('Êtes-vous sûrs de vouloir supprimer ce produit ?')) deleteProduct(product.id) }}>Supprimer</Button>
                </div>
            </div>

        );
    }
}

export default AdminProduct;
