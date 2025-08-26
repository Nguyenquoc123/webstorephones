import React, { useState } from "react";
import "./ThemTaiKhoan.css";

const ThemTaiKhoan = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    status: "Hoạt động",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tạo user mới (giả lập)
    const newUser = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      status: formData.status,
      createdDate: new Date().toLocaleDateString("vi-VN"),
      locked: formData.status !== "Hoạt động",
    };

    onSave(newUser);
    onClose();
  };

  return (
    <div className="add-modal-overlay">
      <div className="add-modal">
        <div className="add-modal-header">
          <h2>Thêm tài khoản</h2>
          <button className="add-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="add-form" onSubmit={handleSubmit}>
          <div className="add-form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-form-group">
            <label>Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-form-group">
            <label>Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Hoạt động</option>
              <option>Bị khóa</option>
            </select>
          </div>

          <div className="add-modal-actions">
            <button type="button" className="add-cancel-btn" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="add-confirm-btn">
              Thêm tài khoản
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThemTaiKhoan;
