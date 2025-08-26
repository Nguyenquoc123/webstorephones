import React, { useState, useEffect } from "react";
import "./ChinhSua.css";

const ChinhSua = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    hoten: "",
    email: "",
    sdt: "",
    matkhau: "",
    vaitro: "user",
  });

  // Load dữ liệu user vào form khi mở modal
  useEffect(() => {
    if (user) {
      setFormData({
        hoten: user.hoten || "",
        email: user.email || "",
        sdt: user.sdt || "",
        matkhau: user.matkhau || "",
        vaitro: user.vaitro || "user",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({ ...user, ...formData });
    }
    onClose();
  };

  if (!user) return null; // Nếu chưa chọn user thì không render

  return (
    <div className="chinhSua-overlay">
      <div className="chinhSua-container">
        <div className="chinhSua-header">
          <h2>Chỉnh sửa tài khoản</h2>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        <form className="chinhSua-form" onSubmit={handleSubmit}>
          <label>
            Họ tên:
            <input
              type="text"
              name="hoten"
              value={formData.hoten}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Số điện thoại:
            <input
              type="text"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Mật khẩu:
            <input
              type="password"
              name="matkhau"
              value={formData.matkhau}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Vai trò:
            <select
              name="vaitro"
              value={formData.vaitro}
              onChange={handleChange}
            >
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị</option>
            </select>
          </label>

          <div className="chinhSua-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="save-btn">
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChinhSua;
