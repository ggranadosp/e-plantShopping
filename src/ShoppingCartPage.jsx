import React from 'react';
import { useHistory } from 'react-router-dom';
import CartItem from './CartItem';

const ShoppingCartPage = () => {
  const history = useHistory();

  const handleContinueShopping = () => {
    history.push('/plant-listing'); // Navega a la página de listado de plantas
  };

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      <CartItem onContinueShopping={handleContinueShopping} />
    </div>
  );
};

export default ShoppingCartPage;
