import "./App.css";
import logo from "./logo.jpg"; // hoặc logo.svg, tuỳ bạn chọn file muốn dùng

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./compenent/login/Login";
import Signup from "./compenent/signup/Signup";
import ChiTietDienThoai from "./compenent/chitietdienthoai/ChiTietDienThoai";
import DienThoai from "./compenent/quanlysanpham/dienthoai";
import HomeKhachHang from "./compenent/homekhachhang/HomeKhachHang";
import DanhMuc from "./compenent/quanlydanhmuc/DanhMuc";
import Admin from "./compenent/Admin/Admin";
import DoiMatKhau from "./compenent/DoiMatKhau/DoiMatKhau";
import GioHang from "./compenent/giohang/Giohang";
import DonHang from "./compenent/quanlydonhang/DonHang";
import ChiTietDonHang from "./compenent/quanlydonhang/chitietdonhang/PageChiTietDonHang";
import KhuyenMai from './compenent/Quanlykhuyenmai/Quanlykhuyenmai'
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
        <Route path="/home" element={<HomeKhachHang />} />
        <Route path="/home/giohang" element={<GioHang />} />
        <Route path="/donhang" element={<DonHang />} />
        <Route path="/chitietdonhang/:maDonHang" element={<ChiTietDonHang />} />
        <Route path="/khuyenmai" element={<KhuyenMai />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
