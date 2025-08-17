import React, { useState } from 'react'
import MenuKhachHang from '../menukhachhang/MenuKhachHang'
import Table from '../../components/table/Table'




const Giohang = () => {
   const [cart,setCart] = useState([
       {
         id: 1,
         name: "iPhone 16 pro",
         price: 24000000,
         quantity: 2,
         image:
           "/images/ip13trang.jpg",
       },
       {
         id: 2,
         name: "iPhone 11 pro",
         price: 10000000,
         quantity: 3,
         image:
           "/images/ip14 den.png",
       },
       {
         id: 3,
         name: "iPhone 12",
         price: 12000000,
         quantity: 1,
         image:
           "/images/ip14 trang.png",
       },
       {
         id: 4,
         name: "iP[hone 14 mini",
         price: 15500000,
         quantity: 2,
         image:
           "/images/ip15 vang.webp",
       },
     ]);
   
    const totalItems = cart.length;
    return (
        <div>
            <MenuKhachHang />
             <h1 style={{ marginLeft: 'auto', textAlign: 'center', fontWeight: 'normal' }}>Giỏ hàng ({totalItems})</h1>
            <Table cart={cart} setCart={setCart} />
        </div>
    )
}
export default Giohang
