import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import "./ThongKeKhachHang.css";
import MenuAdmin from "../../menuadmin/MenuAdmin";
import BieuDoDuong from "../../../components/bieudo/BIeuDoDuong";
import Table from "../../../components/componentTable/Table";
import BieuDoTron from "../../../components/bieudo/BieuDoTron";
import CardThongKe from "../../../components/cart/CardThongKe";
import {
  fetchGetDashBoardKhachHang,
  fetchGetTKDSKhachHang,
  fetchGetTKKhachHang,
} from "../../../api/thongke";
import LoaiThongKe from "../LoaiThongKe/LoaiThongKe";
import { useNavigate } from "react-router-dom";
import Loading from "../../loading/Loading";

export default function ThongKeKhachHang() {
  const navigate = useNavigate();
  const today = new Date();
  const yearDefault = today.getFullYear();
  const [year, setYear] = useState(yearDefault);

  const [showLoading, setShowLoading] = useState(false);
  const [dataCard, setDataCard] = useState([
    { title: "Tổng số khách hàng", value: 1200, icon: "👤" },
    { title: "Khách hàng đang hoạt động", value: 1050, icon: "✅" },
    { title: "Khách hàng mới", value: 120, icon: "🆕" },
    { title: "Khách hàng không còn hoạt động", value: 150, icon: "❌" },
  ]);

  // const databieudoduong = [
  //     { name: "Tháng 1", value: 200 },
  //     { name: "Tháng 2", value: 350 },
  //     { name: "Tháng 3", value: 500 },
  //     { name: "Tháng 4", value: 450 },
  //     { name: "Tháng 5", value: 600 },
  //     { name: "Tháng 6", value: 700 },
  //     { name: "Tháng 7", value: 800 },
  //     { name: "Tháng 8", value: 750 },
  //     { name: "Tháng 9", value: 900 },
  //     { name: "Tháng 10", value: 950 },
  //     { name: "Tháng 11", value: 1100 },
  //     { name: "Tháng 12", value: 1200 },
  // ]
  const [databieudoduong, setDataBieuDoDuong] = useState([]);

  const [databieudotron, setDataBieuDoTron] = useState([
    { name: "New", value: 20 },
    { name: "Regular", value: 65 },
    { name: "Inactive", value: 15 },
  ]);
  const columns = [
    { name: "id" },
    { name: "name" },
    { name: "email" },
    { name: "status" },
  ];

  // const topProducts = [
  //     { id: 1, name: "Truong Văn Sang", email: "sang@gmail.com", status: "Hoạt động" },
  //     { id: 2, name: "Lê Vinh", email: "vinh@gmail.com", status: "Hoạt động" },
  //     { id: 3, name: "Quế Minh", email: "que@gmail.com", status: "Hoạt động" },
  //     { id: 4, name: "Trương Văn Minh", email: "minh@gmail.com", status: "Hoạt động" },
  //     { id: 5, name: "Hiệp Phùng", email: "phung@gmail.com", status: "Ngưng hoạt động" },
  // ];
  const [dsKhachHang, setDSKhachHang] = useState([]);
  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  const loadDashBoardKhachHangNam = async () => {
    setShowLoading(true);
    loadTkKhachHang();
    loadDSKhachHang();
    const params = new URLSearchParams();
    params.append("type", "year");
    params.append("nam", year);
    const response = await fetchGetDashBoardKhachHang(params);
    if (response.code === 200) {
      console.log("DashBoard khách hàng Theo Năm: ", response.result);
      setDataCard([
        {
          title: "Tổng số khách hàng",
          value: response.result.tongTaiKhoan,
          icon: "👤",
        },
        {
          title: "Khách hàng đang hoạt động",
          value: response.result.hoatDong,
          icon: "✅",
        },
        {
          title: "Khách hàng mới",
          value: response.result.moiDangKy,
          icon: "🆕",
        },
        {
          title: "Khách hàng không còn hoạt động",
          value: response.result.biKhoa,
          icon: "❌",
        },
      ]);
      setDataBieuDoTron([
        {
          name: "New",
          value:
            response.result.tongTaiKhoan === 0
              ? 0
              : parseFloat(
                  (
                    (response.result.moiDangKy / response.result.tongTaiKhoan) *
                    100
                  ).toFixed(1)
                ),
        },
        {
          name: "Regular",
          value:
            response.result.tongTaiKhoan === 0
              ? 0
              : parseFloat(
                  (
                    (response.result.hoatDong / response.result.tongTaiKhoan) *
                    100
                  ).toFixed(1)
                ),
        },
        {
          name: "Inactive",
          value:
            response.result.tongTaiKhoan === 0
              ? 0
              : parseFloat(
                  (
                    (response.result.biKhoa / response.result.tongTaiKhoan) *
                    100
                  ).toFixed(1)
                ),
        },
      ]);
    }

    setShowLoading(false);
  };

  const loadTkKhachHang = async () => {
    const params = new URLSearchParams();
    params.append("type", "year");
    params.append("nam", year);
    const response = await fetchGetTKKhachHang(params);
    if (response.code === 200) {
      console.log("Thống kê khách hàng theo năm", response.result);
      setDataBieuDoDuong(response.result);
    }
  };

  const loadDSKhachHang = async () => {
    const params = new URLSearchParams();
    params.append("type", "year");
    params.append("nam", year);
    const response = await fetchGetTKDSKhachHang(params);

    if (response.code === 200) {
      setDSKhachHang(response.result);
    }
  };

  useEffect(() => {
    loadDashBoardKhachHangNam();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "Theo tháng") {
      navigate("/Thongkekhachhangthang");
    } else if (value === "Theo năm") {
      navigate("/Thongkekhachhang");
    }
  };
  return (
    <>
      <MenuAdmin />
      <div className="dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <h2>Thống kê khách hàng</h2>
          <select onChange={handleChange}>
            <option value="Theo năm">Theo năm</option>
            <option value="Theo tháng">Theo tháng</option>
          </select>
        </div>
        <LoaiThongKe
          type={"year"}
          value={year}
          inputData={setYear}
          clickThongKe={loadDashBoardKhachHangNam}
        />
        {/* Thống kê */}
        <div className="stats">
          {dataCard.map((item, index) => (
            <CardThongKe key={index} {...item} />
          ))}
        </div>
        {/* Biểu đồ */}
        <BieuDoDuong data={databieudoduong} name="Khách hàng theo thời gian" />
        <BieuDoTron data={databieudotron} name="Phân loại khách hàng" />
        {/* Bảng sản phẩm */}
        <div className="top-products">
          <h3>Danh sách khách hàng </h3>
          <Table columns={columns} data={dsKhachHang} />
        </div>
      </div>

      <Loading show={showLoading} />
    </>
  );
}
