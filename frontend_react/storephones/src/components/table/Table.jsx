import React, { useState } from "react";
import "./Table.css";


const Table = ({ cart, setCart }) => {
    const decreaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const formatPrice = (price) => {
        return price.toLocaleString("vi-VN") + " đ";
    };

    return (
        <div className="GH-cart-container">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <input type="checkbox"
                                    style={{ width: "20px", height: "20px" }} />
                            </td>
                            <td className="GH-product-cell">
                                <img src={item.image} alt={item.name} className="GH-product-img" />
                                <div>
                                    <strong>{item.name}</strong>
                                    <br />
                                    <small>Mô tả</small>
                                </div>
                            </td>
                            <td>{formatPrice(item.price)}</td>
                            <td>
                                <button onClick={() => decreaseQty(item.id)}>-</button>
                                <input
                                    type="text"
                                    value={item.quantity}
                                    readOnly
                                    className="GH-qty-input"
                                />
                                <button onClick={() => increaseQty(item.id)}>+</button>
                            </td>
                            <td>{formatPrice(item.price * item.quantity)}</td>
                            <td>
                                <button className="GH-delete-btn" onClick={() => removeItem(item.id)}>
                                    ❌
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="checkout-container">
                <button className="checkout-btn">Thanh toán</button>
            </div>
        </div>
    );
};

export default Table;
