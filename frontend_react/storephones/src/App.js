import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./compenent/login/Login";
import Signup from "./compenent/signup/Signup";
import ChiTietDienThoai from "./compenent/chitietdienthoai/ChiTietDienThoai";
import DienThoai from "./compenent/quanlysanpham/dienthoai";
import HomeKhachHang from "./compenent/homekhachhang/HomeKhachHang";
import DanhMuc from "./compenent/quanlydanhmuc/DanhMuc";
import DoiMatKhau from "./compenent/DoiMatKhau/DoiMatKhau";
import GioHang from "./compenent/giohang/Giohang";
import DonHang from "./compenent/quanlydonhang/DonHang";
import ChiTietDonHang from "./compenent/quanlydonhang/chitietdonhang/PageChiTietDonHang";
import KhuyenMai from "./compenent/Quanlykhuyenmai/Quanlykhuyenmai";
import HoSoCaNhan from "./compenent/hosocanhan/HoSoCaNhan";
import QuanLyNguoiDung from "./compenent/quanlynguoidung/QuanLyNguoiDung";
import MenuAdmin from "./compenent/menuadmin/MenuAdmin.jsx";
import './App.css';
import ThongTinDatHang from "./compenent/thongtindathang/ThongTinDatHang";
import DonHangKhachHang from "./compenent/donhangkhachhang/DonHangKhachHang";
import PageChiTietDonHangKhachHang from "./compenent/pagechitietdonhangkhachhang/PageChiTietDonHangKhachHang";
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
        <Route path="/doimatkhau" element={<DoiMatKhau />} />
        <Route path="/donhang" element={<DonHang />} />
        <Route path="/chitietdonhang/:maDonHang" element={<ChiTietDonHang />} />
        <Route path="/khuyenmai" element={<KhuyenMai />} />
        <Route path="/quanlyUSE" element={<QuanLyNguoiDung />} />
        <Route path="/Admin" element={<MenuAdmin />} />
        <Route path="/home/giohang" element={<GioHang />} />
        <Route path="/home/giohang/thongtingiaohang" element={<ThongTinDatHang />} />
        <Route path="/home/donhang" element={<DonHangKhachHang />} />
        <Route path="/home/chitietdonhang/:maDonHang" element={<PageChiTietDonHangKhachHang />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
