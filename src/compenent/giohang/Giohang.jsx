import React, { use, useContext, useEffect, useState } from 'react'
import MenuKhachHang from '../menukhachhang/MenuKhachHang'
import Table from '../../components/table/Table'
import { fetchCheckSoLuong, fetchGetDSInGioHang, fetchXoaKhoiGioHang } from '../../api/giohang';

import { useNavigate } from 'react-router-dom';




const Giohang = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [lstSelect, setLstSelect] = useState([]);
  const [tongTien, setTongTien] = useState(0);

  useEffect(() => {
    loadDSInCart()
  }, [])

  useEffect(() => {
    console.log('Thay đổi')
    let total = 0
    cart.forEach(item => {
      if (lstSelect.includes(item.maPhienBan)) {
        total += item.giaBan * item.soLuong;
      }
    })
    setTongTien(total);
  }, [cart])
  const loadDSInCart = async () => {
    const response = await fetchGetDSInGioHang();
    if (response.code === 200) {
      console.log("Ds sản phẩm ", response.result)
      setCart(response.result);
      localStorage.setItem("soluongaddnew", response.result.length)
    }
  }
  const deleteInCart = async (maPhienBan) => {
    const response = await fetchXoaKhoiGioHang(maPhienBan);
    if (response.code === 200) {
      console.log("Xóa thành công")
      loadDSInCart();
    }
  }
  const selectSanPham = (maPhienBan) => {
    const pb = cart.find(item => item.maPhienBan === maPhienBan)
    if (lstSelect.includes(maPhienBan)) {
      setLstSelect(ds => ds.filter(item => item !== maPhienBan))
      setTongTien(tongTien - (pb.soLuong * pb.giaBan))
      console.log('cahyj')
    } else {
      setLstSelect([...lstSelect, maPhienBan])
      setTongTien(tongTien + (pb.giaBan * pb.soLuong))
      console.log('ko cahyj')
    }
  }
  const datHang = async () => {
    if(lstSelect.length <= 0){

      return ;
    }
    const dsMua = cart
      .filter(item => lstSelect.includes(item.maPhienBan))
      .map(v => ({ 'maPhienBan': v.maPhienBan, 'soLuong': v.soLuong, 'giaBan': v.giaBan }))
    console.log(dsMua)
      const response = await fetchCheckSoLuong(dsMua)
    if (response.code === 200) {
      console.log("Check hoàn tất", response)
      localStorage.setItem("dsMua", JSON.stringify(dsMua))
      navigate('/home/giohang/thongtingiaohang', {state: {dsMua}})
    }
    else{
      console.log(response)
    }
  }

  const totalItems = cart.length;
  return (
    <div>
      <MenuKhachHang />
      <h1 style={{ marginLeft: 'auto', textAlign: 'center', fontWeight: 'normal' }}>Giỏ hàng ({totalItems})</h1>
      <Table cart={cart}
        setCart={setCart}
        deleteInCart={deleteInCart}
        tongTien={tongTien}
        SelectSanPham={selectSanPham}
        datHang={datHang} />
    </div>
  )
}
export default Giohang
