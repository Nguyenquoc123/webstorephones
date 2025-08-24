import React, { useState } from "react";
import "./Table.css";


const Table = ({ cart, setCart, deleteInCart, tongTien, SelectSanPham, datHang}) => {
    const decreaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.maPhienBan === id && item.soLuong > 1
                    ? { ...item, soLuong: item.soLuong - 1, thanhTien: (item.soLuong-1)*item.giaBan }
                    : item
            )
        );
    };

    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.maPhienBan === id ? { ...item, soLuong: item.soLuong + 1, thanhTien: (item.soLuong+1)*item.giaBan} : item
            )
        );
    };

    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const formatPrice = (price) => {
        if(!price)
            return ''
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
                        <tr key={item.maPhienBan}>
                            <td>
                                <input type="checkbox" onClick={() => SelectSanPham(item.maPhienBan)}
                                    style={{ width: "20px", height: "20px" }} />
                            </td>
                            <td className="GH-product-cell">
                                <img src={item?.image[0].url} alt={item.name} className="GH-product-img" />
                                <div className="info-phone">
                                    <strong>{item?.tenDienThoai}</strong>
                                    <br />
                                    <small>{item?.moTa}</small>
                                </div>
                            </td>
                            <td>{formatPrice(item?.giaBan)}</td>
                            <td>
                                <button onClick={() => decreaseQty(item.maPhienBan)}>-</button>
                                <input
                                    type="text"
                                    value={item?.soLuong}
                                    readOnly
                                    className="GH-qty-input"
                                />
                                <button onClick={() => increaseQty(item.maPhienBan)}>+</button>
                            </td>
                            <td>{formatPrice(item.thanhTien)}</td>
                            <td>
                                <button className="GH-delete-btn" onClick={() => deleteInCart(item.maPhienBan)}>
                                    ❌
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="GH-checkout-container">
                <div>
                    {tongTien > 0 && <span className="info-tong-tien">Tổng tiền: {tongTien.toLocaleString('vi-VN')}đ</span>}
                </div>
                <button onClick={datHang} className="GH-checkout-btn">Thanh toán</button>
            </div>
        </div>
    );
};

export default Table;
