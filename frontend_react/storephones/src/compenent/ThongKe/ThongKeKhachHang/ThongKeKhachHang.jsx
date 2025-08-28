import React from "react";
import "./ThongKeKhachHang.css";
import MenuAdmin from "../../menuadmin/MenuAdmin";
import BieuDoDuong from "../../../components/bieudo/BIeuDoDuong";
import Table from "../../../components/componentTable/Table";
import BieuDoTron from "../../../components/bieudo/BieuDoTron";
import CardThongKe from "../../../components/cart/CardThongKe";

export default function ThongKeKhachHang() {
  const dataCard = [
    { title: "Tổng số khách hàng", value: 1200, icon: "👤" },
    { title: "Khách hàng đang hoạt động", value: 1050, icon: "✅" },
    { title: "Khách hàng mới", value: 120, icon: "🆕" },
    { title: "Khách hàng không còn hoạt động", value: 150, icon: "❌" },
  ];

  const databieudoduong = [
    { name: "Tháng 1", value: 200 },
    { name: "Tháng 2", value: 350 },
    { name: "Tháng 3", value: 500 },
    { name: "Tháng 4", value: 450 },
    { name: "Tháng 5", value: 600 },
    { name: "Tháng 6", value: 700 },
    { name: "Tháng 7", value: 800 },
    { name: "Tháng 8", value: 750 },
    { name: "Tháng 9", value: 900 },
    { name: "Tháng 10", value: 950 },
    { name: "Tháng 11", value: 1100 },
    { name: "Tháng 12", value: 1200 },
  ];

  const databieudotron = [
    { name: "New", value: 20 },
    { name: "Regular", value: 65 },
    { name: "Inactive", value: 15 },
  ];

  const columns = [
    { name: "id" },
    { name: "name" },
    { name: "email" },
    { name: "status" },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Truong Văn Sang",
      email: "sang@gmail.com",
      status: "Hoạt động",
    },
    { id: 2, name: "Lê Vinh", email: "vinh@gmail.com", status: "Hoạt động" },
    { id: 3, name: "Quế Minh", email: "que@gmail.com", status: "Hoạt động" },
    {
      id: 4,
      name: "Trương Văn Minh",
      email: "minh@gmail.com",
      status: "Hoạt động",
    },
    {
      id: 5,
      name: "Hiệp Phùng",
      email: "phung@gmail.com",
      status: "Ngưng hoạt động",
    },
  ];

  return (
    <>
      <MenuAdmin />
      <div className="dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <h2>Thống kê khách hàng</h2>
          <select>
            <option>Theo năm</option>
            <option>Theo tháng</option>
          </select>
        </div>

        {/* Thống kê */}
        <div className="stats">
          {dataCard.map((item, index) => (
            <CardThongKe key={index} {...item} />
          ))}
        </div>

        {/* Biểu đồ */}
        <BieuDoDuong data={databieudoduong} name="Khách hàng theo thời gian" />
        <BieuDoTron data={databieudotron} name="Phân loại khách hàng" />

        {/* Bảng danh sách */}
        <div className="top-products">
          <h3>Danh sách khách hàng</h3>
          <Table columns={columns} data={topProducts} />
        </div>
      </div>
    </>
  );
}
