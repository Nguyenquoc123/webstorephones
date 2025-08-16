
import './App.css';
import Login from './compenent/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './compenent/signup/Signup';
import ChiTietDienThoai from './compenent/chitietdienthoai/ChiTietDienThoai';
import DienThoai from './compenent/quanlysanpham/dienthoai'
import HomeKhachHang from './compenent/homekhachhang/HomeKhachHang';
import DanhMuc from './compenent/quanlydanhmuc/DanhMuc';
import Giohang from './compenent/giohang/Giohang';
import HoSoCaNhan from './compenent/hosocanhan/HoSoCaNhan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dienthoai' element={<DienThoai />} />
        <Route path='/danhmuc' element={<DanhMuc />} />
        <Route path='/home' element={<HomeKhachHang />} />
        <Route path='/home/hosocanhan' element={<HoSoCaNhan />} />
        <Route path='/home/giohang' element={<Giohang />} />
        <Route path='/chitietdienthoai/:value' element={<ChiTietDienThoai />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
