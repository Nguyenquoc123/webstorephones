import React from "react";
import { Line, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import MenuAdmin from "../../menuadmin/MenuAdmin";
import BieuDoCot from "../../../components/bieudo/BieuDoCot";
import BieuDoDuong from "../../../components/bieudo/BIeuDoDuong";
import Table from "../../../components/componentTable/Table";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ThongKeDoanhSo() {
  const navigate = useNavigate();
  
  const databieudocot = [
    { name: "Điện Thoại", value: 13 },
    { name: "LapTop", value: 23 },
    { name: "Đồng Hồ", value: 6 },
  ]
  
  const databieudoduong = [
    { name: "08:00", value: 200000 },
    { name: "09:00", value: 350000 },
    { name: "10:00", value: 500000 },
    { name: "11:00", value: 420000 },
    { name: "12:00", value: 600000 },
    { name: "13:00", value: 800000 },
    { name: "14:00", value: 750000 },
  ]
  
  const columns = [
    { name: 'stt' },
    { name: 'name' },
    { name: 'price' },
    { name: 'orders' }
  ]
  // them data trong table
  
  const topProducts = [
    { stt: 1, name: "iPhone 16 promax", price: "27.000.000 đ", orders: 102 },
    { stt: 2, name: "iPhone 14 promax", price: "20.000.000 đ", orders: 100 },
    { stt: 3, name: "iPhone 15 promax", price: "22.000.000 đ", orders: 99 },
    { stt: 4, name: "iPhone 12 promax", price: "14.000.000 đ", orders: 90 },
    { stt: 5, name: "Samsung A6", price: "22.000.000 đ", orders: 89 },
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "Theo ngày") {
      navigate("/thongkedoanhso");
    } else if (value === "Theo tháng") {
      navigate("/thongkedoanhso/thang");
    } else if (value === "Theo năm") {
      navigate("/thongkedoanhso/nam");
    }
  };

  // const options = {
  //   responsive: true,
  //   plugins: { legend: { display: false } },
  // };


  const dataCard = { doanhThu: '55.000.000 đ', donHang: 52, khachHang: 50, doanhSo: '15,6%' }


  return (
    <>
      <MenuAdmin />
      <div className="dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <h2>Thống kê doanh số</h2>
            <select onChange={handleChange}>
            <option value="Theo ngày">Theo ngày</option>
            <option value="Theo tháng">Theo tháng</option>
            <option value="Theo năm">Theo năm</option>
          </select>
        </div>

        {/* Thống kê */}
        <div className="stats">
          <div className="stat-card">
            <p>Tổng doanh thu</p>
            <h3>{dataCard.doanhThu}</h3>
          </div>
          <div className="stat-card">
            <p>Đơn đặt hàng</p>
            <h3>{dataCard.donHang}</h3>
          </div>
          <div className="stat-card">
            <p>Khách hàng</p>
            <h3>{dataCard.khachHang}</h3>
          </div>
          <div className="stat-card">
            <p>Tăng trưởng doanh số</p>
            <h3>{dataCard.doanhSo}</h3>
          </div>
        </div>

        {/* Biểu đồ */}
        <div className="charts">
          <BieuDoDuong data={databieudoduong} />
          <BieuDoCot data={databieudocot} />
          {/* <BieuDoTron data={databieudotrong} /> */}
        </div>

        {/* Bảng sản phẩm */}
        <div className="top-products">
          <h3>Sản phẩm bán chạy</h3>
          <Table columns={columns} data={topProducts} />
        </div>
      </div>
    </>
  );
}
