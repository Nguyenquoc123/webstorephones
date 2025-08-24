import React, { use, useEffect, useState } from 'react'
import MenuKhachHang from '../menukhachhang/MenuKhachHang'
import Table from '../../components/table/Table'
import { fetchGetDSInGioHang, fetchXoaKhoiGioHang } from '../../api/giohang';




const Giohang = () => {
  const [cart, setCart] = useState([]);
  const [lstSelect, setLstSelect] = useState([]);
  const [tongTien, setTongTien] = useState(0);
  useEffect(() =>{
    localStorage.removeItem("soluongaddnew")
    loadDSInCart()
  }, [])

  useEffect(() => {
    console.log('Thay đổi')
    let total = 0
    cart.forEach(item => {
      if(lstSelect.includes(item.maPhienBan))
      {
        total += item.giaBan*item.soLuong;
      }
    })
    setTongTien(total);
  }, [cart])
  const loadDSInCart = async () =>{
    const response = await fetchGetDSInGioHang();
    if(response.code === 200){
      console.log("Ds sản phẩm ", response.result)
      setCart(response.result);
    }
  }
  const deleteInCart = async (maPhienBan) => {
    const response = await fetchXoaKhoiGioHang(maPhienBan);
    if(response.code === 200){
      console.log("Xóa thành công")
      loadDSInCart();
    }
  }
  const selectSanPham = (maPhienBan) => {
    const pb = cart.find(item => item.maPhienBan === maPhienBan)
    if(lstSelect.includes(maPhienBan)){
      setLstSelect(ds => ds.filter(item => item !== maPhienBan))
      setTongTien(tongTien-(pb.soLuong*pb.giaBan))
      console.log('cahyj')
    }else{
      setLstSelect([...lstSelect, maPhienBan])
      setTongTien(tongTien+(pb.giaBan*pb.soLuong))
      console.log('ko cahyj')
    }
  }
  const totalItems = cart.length;
  return (
    <div>
      <MenuKhachHang />
      <h1 style={{ marginLeft: 'auto', textAlign: 'center', fontWeight: 'normal' }}>Giỏ hàng ({totalItems})</h1>
      <Table cart={cart} setCart={setCart} deleteInCart={deleteInCart} tongTien={tongTien} SelectSanPham={selectSanPham}/>
    </div>
  )
}
export default Giohang
