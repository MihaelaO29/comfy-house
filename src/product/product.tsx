import React from 'react';
import { useState } from 'react';
import './product.css';
import { IFurniture } from '../App';

const Product = (props: any) => {

    const [showButton, setShowButton] = useState(false);
    const handleMouseEnter = () => {
        setShowButton(true)
    }

    const handleMouseLeave = () => {
        setShowButton(false)
    }

    const handleCart = () => {  
        props.addProduct(props.product)
    }

  
    return (
        <div className='products'>
            <div
                className='product_image_container'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img className='products-img' src={props.product.image} />
                <button onClick={handleCart} className={`add-cart-btn ${showButton ? 'show_add_button' : ''}`}
                >ADD TO CART</button>
            </div>
            <div className='product-title'>{props.product.title} </div>
            <div className='price'>{props.product.price}</div>
        </div>
    )
}

export default Product;