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
import KhuyenMai from "./compenent/Quanlykhuyenmai/Quanlykhuyenmai";
import HoSoCaNhan from "./compenent/hosocanhan/HoSoCaNhan";
import './App.css';
import ThongTinDatHang from "./compenent/thongtindathang/ThongTinDatHang";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dienthoai" element={<DienThoai />} />
          <Route path="/danhmuc" element={<DanhMuc />} />
          <Route path="/home/:makhachhang" element={<HomeKhachHang />} />
          <Route path="/home" element={<HomeKhachHang />} />
          <Route path="/home/hosocanhan" element={<HoSoCaNhan />} />
          <Route path="/chitietdienthoai/:value" element={<ChiTietDienThoai />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/doimatkhau" element={<DoiMatKhau />} />
          <Route path="/donhang" element={<DonHang />} />
          <Route path="/chitietdonhang/:maDonHang" element={<ChiTietDonHang />} />
          <Route path="/khuyenmai" element={<KhuyenMai />} />
          <Route path="/home/giohang" element={<GioHang />} />
          <Route path="/home/giohang/thongtingiaohang" element={<ThongTinDatHang />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
