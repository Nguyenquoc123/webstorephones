import React, { useState, useEffect } from "react";
import "./ChinhSua.css";

const ChinhSua = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    hoten: "",
    email: "",
    sdt: "",
    resetpassword: false
  });

  const [err, setErr] = useState({
    hoten: "",
    email: "",
    sdt: "",
    resetpassword: false
  })

  // Load dữ liệu user vào form khi mở modal
  useEffect(() => {
    if (user) {
      setFormData({
        hoten: user.hoTen || "",
        email: user.email || "",
        sdt: user.soDienThoai || "",
        resetpassword: false
      });
    }
  }, [user]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thông tin edit", formData)
    if(!validCheck())
      return;
    
    const data = {
      'hoTen': formData.hoten,
      'email': formData.email,
      'soDienThoai': formData.sdt,
      'resetpassword': formData.resetpassword
    }
    onSave(data);
    return;
  };
  const validCheck = () => {
    let hasError = false;
    let newErr = {
      email: '',
      hoTen: '',
      soDienThoai: ''
    }

    // email
    if (!formData.email.trim()) {
      newErr.email = "Vui lòng nhập email";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErr.email = "Email không hợp lệ";
      hasError = true;
    }
    // số điện thoại
    if (!formData.soDienThoai.trim()) {
      newErr.soDienThoai = "Vui lòng nhập số điện thoại";
      hasError = true;
    } else if (!/^(0[0-9]{9,10})$/.test(formData.soDienThoai)) {
      newErr.soDienThoai = "Số điện thoại không hợp lệ";
      hasError = true;
    }
    // họ và tên
    if (!formData.hoTen.trim()) {
      newErr.hoTen = "Vui lòng nhập họ và tên";
      hasError = true;
    } else if (!/^[\p{L}\s]+$/u.test(formData.hoTen)) {
      newErr.hoTen = "Họ và tên chỉ chứa chữ cái";
      hasError = true;
    }

    setErr(newErr);
    return !hasError;
  }
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
              onChange={(e) => handleChange('hoten', e.target.value)}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </label>

          <label>
            Số điện thoại:
            <input
              type="text"
              name="sdt"
              value={formData.sdt}
              onChange={(e) => handleChange('sdt', e.target.value)}
              required
            />
          </label>

          <label id="reset-password">

            <input
              type="checkbox"
              name="resetpassword"
              checked={formData.resetpassword}
              onChange={(e) => handleChange('resetpassword', e.target.checked)}

            />
            Reset mật khẩu về mặc định
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
