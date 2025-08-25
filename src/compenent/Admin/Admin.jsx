import React, { useState } from "react";
import "./Admin.css";
import Quanlykhuyenmai from "./Quanlykhuyenmai/Quanlykhuyenmai";
// import QuanLySanPham from "./Quanlysanpham/Quanlysanpham";
import QuanLySanPham from "../quanlysanpham/dienthoai";

function Admin() {
  const [activeTab, setActiveTab] = useState("khuyenmai");

  const renderContent = () => {
    switch (activeTab) {
      case "sanpham":
        return <QuanLySanPham />;
      case "khuyenmai":
        return <Quanlykhuyenmai />;
      default:
        return <div>Chọn chức năng ở menu</div>;
    }
  };

  return (
    <div className="admin-container">
      <aside className="AD-sidebar">
        <div className="AD-logo">A</div>
        <nav>
          <ul>
            <li>Tổng quan</li>
            <li onClick={() => setActiveTab("sanpham")}>Quản lý sản phẩm</li>
            <li>Quản lý đơn hàng</li>
            <li>Quản lý khách hàng</li>
            <li
              className={activeTab === "khuyenmai" ? "active" : ""}
              onClick={() => setActiveTab("khuyenmai")}
            >
              Quản lý khuyến mãi
            </li>
            <li>Cài đặt hệ thống</li>
          </ul>
        </nav>
      </aside>

      <div className="AD-main">
        <header className="AD-header">
          <div className="AD-breadcrumb">Trang chủ / {activeTab}</div>
          <div className="AD-user-info">Admin User</div>
        </header>
        <div className="AD-content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Admin;
