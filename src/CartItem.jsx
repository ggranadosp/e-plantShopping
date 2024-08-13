import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, cartTotalState, setAddedToCart }) => {
    const [cartTotal, setCartTotal] = cartTotalState
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    console.log("Contenido del carrito:", cart);
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => {
            const costAsNumber = parseFloat(item.cost.replace('$', ''));
            return total + item.quantity * costAsNumber;
        }, 0);
    };

    const calculateTotalCost = (item) => {
        const costAsNumber = parseFloat(item.cost.replace('$', ''));
        return item.quantity * costAsNumber;
    };

    const handleContinueShopping = () => {
        if (onContinueShopping) {
            onContinueShopping(); // Llama a la función pasada desde ProductList.jsx
        }
    };

    const handleIncrement = (item) => {
        setCartTotal(cartTotal + 1);
        dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
    };


    const handleDecrement = (item) => {
        if (cartTotal > 0) {
            if (item.quantity > 1) {
                setCartTotal(cartTotal - 1);
                dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
            } else {
                handleRemove(item); // Usa la función de eliminar cuando la cantidad es 1
            }
        }
    };


    const handleRemove = (item) => {
        const newTotal = cartTotal - item.quantity;
        setCartTotal(newTotal >= 0 ? newTotal : 0); // Asegura que el total nunca sea negativo
        dispatch(removeItem(item.name));
        setAddedToCart((prevState) => ({
            ...prevState,
            [item.name]: false, // Cambia el estado a "Add to Cart"
        }));
    };


    const handleCheckoutShopping = () => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item).toFixed(2)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    onContinueShopping: PropTypes.func.isRequired, // Valida que onContinueShopping sea una función requerida
    updateCartTotal: PropTypes.func.isRequired, // Asegura que esta función sea pasada como prop
};

export default CartItem;
