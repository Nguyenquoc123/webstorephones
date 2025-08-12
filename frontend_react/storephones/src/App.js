import logo from './logo.svg';
import './App.css';
import Login from './compenent/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './compenent/signup/Signup';
import ChiTietDienThoai from './compenent/chitietdienthoai/ChiTietDienThoai';
import DienThoai from './compenent/quanlysanpham/dienthoai'
import HomeKhachHang from './compenent/homekhachhang/HomeKhachHang';
import DanhMuc from './compenent/quanlydanhmuc/DanhMuc';
import Giohang from './compenent/giohang/Giohang';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dienthoai' element={<DienThoai />} />
        <Route path='/danhmuc' element={<DanhMuc />} />
        <Route path='/home/:makhachhang' element={<HomeKhachHang />} />
        <Route path='/home/:makhachhang/giohang' element={<Giohang />} />
        <Route path='/chitietdienthoai/:value' element={<ChiTietDienThoai />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
