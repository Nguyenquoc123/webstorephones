import logo from "./logo.jpg";
import "./App.css";
import Login from "./compenent/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./compenent/signup/Signup";
import ChiTietDienThoai from "./compenent/chitietdienthoai/ChiTietDienThoai";
import DienThoai from "./compenent/quanlysanpham/dienthoai";
import HomeKhachHang from "./compenent/homekhachhang/HomeKhachHang";
import DanhMuc from "./compenent/quanlydanhmuc/DanhMuc";
import Admin from "./compenent/Admin/Admin";
import DoiMatKhau from "./compenent/DoiMatKhau/DoiMatKhau";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dienthoai" element={<DienThoai />} />
        <Route path="/danhmuc" element={<DanhMuc />} />
        <Route path="/home/:makhachhang" element={<HomeKhachHang />} />
        <Route path="/chitietdienthoai/:value" element={<ChiTietDienThoai />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/doimatkhau" element={<DoiMatKhau />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
