import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/cart.css";
import { useAuth } from "../Home/UserContext";
import { useHistory } from "react-router";

export interface Basket {
  basketId: string;
  userId: string;
  items: Item[];
}

export interface Item {
  itemId: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  size?: string;
}

export interface User {
  userId?: string;
  userName: string;
  email: string;
}

const Cart: React.FC = () => {
  const [basket, setBasket] = useState<Basket | null>(null);
  const [subtotal, setSubtotal] = useState<number>(0);
  const shipping = 30;
  const { user, basketId } = useAuth();
  const history = useHistory();

  useEffect(() => {
    // Fetch basket by ID
    fetch(`http://localhost:8000/basket/${basketId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched basket:", data); // Log the fetched data
        setBasket(data);
        calculateSubtotal(data.items);
      })
      .catch((error) => console.error("Error fetching the basket", error));
  }, [basketId]);

  const calculateSubtotal = (items: Item[]) => {
    const total = items.reduce((sum, item) => {
      const price = item.price;
      return sum + item.quantity * price;
    }, 0);
    setSubtotal(total);
  };

  const handleCheckout = () => {
    console.log("Proceed to Checkout");
  };

  const handleContinueShopping = () => {
    history.push("/products");
  };


  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    fetch(`http://localhost:8000/basket/${basketId}/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error updating item quantity');
        }
        return response.json();
      })
      .then((data) => {
        if (basket) {
          const updatedItems = basket.items.map((item) =>
            item.itemId === itemId
              ? { ...item, quantity: data.quantity }
              : item
          );
          setBasket({ ...basket, items: updatedItems });
          calculateSubtotal(updatedItems);
        }
      })
      .catch((error) =>
        console.error('Error updating item quantity', error)
      );
  };


  const removeItemFromBasket = (itemId: string) => {
    fetch(`http://localhost:8000/basket/${basketId}/items/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error removing item from basket');
        }
        if (basket) {
          const updatedItems = basket.items.filter(
            (item) => item.itemId !== itemId
          );
          setBasket({ ...basket, items: updatedItems });
          calculateSubtotal(updatedItems);
        }
      })
      .catch((error) =>
        console.error('Error removing item from basket', error)
      );
  };


  if (!basket) return <div>Loading...</div>;

  const total = subtotal > 350 ? subtotal : subtotal + shipping;

  return (
    <div>
      {user ? (
        <div className="cart-header">{user.firstName}'s Shopping Cart</div>
      ) : (
        <div className="cart-header">Your Shopping Cart</div>
      )}
      <div className="cart-container">
        <div className="products-section">
          {basket.items.map((item, index) => (
            <div key={index} className="product-item">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-image"
                />
              )}
              <div className="product-details">
                <p>{item.name}</p>
                <div>
                  {item.size && <span>Size: {item.size}</span>}
                  <span
                    className="product-price"
                    style={{ marginLeft: "10px" }}
                  >
                    Price: {item.price} kr
                  </span>
                </div>
                <div className="product-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateItemQuantity(item.itemId, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() =>
                        updateItemQuantity(item.itemId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeItemFromBasket(item.itemId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <h3>Get free shipping above 350!</h3>
          <p>
            Subtotal: <span id="subtotal">{subtotal} kr</span>
          </p>
          <p>
            Shipping:{" "}
            <span id="shipping">{subtotal > 350 ? 0 : shipping} kr</span>
          </p>
          <p>
            Total: <span id="total">{total} kr</span>
          </p>
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
      <button
        className="continue-shopping-button"
        onClick={handleContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Cart;
