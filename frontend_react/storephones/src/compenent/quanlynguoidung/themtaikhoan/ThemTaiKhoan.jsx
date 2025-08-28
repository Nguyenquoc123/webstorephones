import React, { useState } from "react";
import "./ThemTaiKhoan.css";

const ThemTaiKhoan = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    hoTen: '',
    soDienThoai: '',
    gioiTinh: 1,
    ngaySinh: '',
    password: ''

  });

  const [err, setErr] = useState({
    email: '',
    userName: '',
    hoTen: '',
    soDienThoai: '',
    gioiTinh: 'Nam',
    ngaySinh: '',
    password: '',
    againpassword: ''
  })

  const validCheck = () => {
    let hasError = false;
    let newErr = {
      email: '',
      userName: '',
      hoTen: '',
      soDienThoai: '',
      gioiTinh: 'Nam',
      ngaySinh: '',
      password: '',
      againpassword: ''
    }
    // check username
    if (!formData.userName.trim()) {
      newErr.userName = "Vui lòng nhập username";
      hasError = true;
    } else if (formData.userName.length < 6) {
      newErr.userName = "Username phải có ít nhất 6 ký tự";
      hasError = true;
    } else if (!/^[A-Za-z0-9]+$/.test(formData.userName)) {
      newErr.userName = "Username chỉ được chứa chữ và số";
      hasError = true;
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
    // ngày sinh
    if (!formData.ngaySinh) {
      newErr.ngaySinh = "Vui lòng nhập ngày sinh";
      hasError = true;
    } else {
      const today = new Date();
      const ngaySinh = new Date(formData.ngaySinh);
      if (ngaySinh > today) {
        newErr.ngaySinh = "Ngày sinh không hợp lệ";
        hasError = true;
      }
    }
    // check password
    if (!formData.password.trim()) {
      newErr.password = "Vui lòng nhập password";
      hasError = true;
    } else if (formData.password.length < 8) {
      newErr.password = "Password phải có ít nhất 8 ký tự";
      hasError = true;
    }
    
    setErr(newErr);
    return !hasError;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thong tin tk: ", formData)
    if (!validCheck())
      return;
    // Tạo data
    const newUser = {
      'email': formData.email,
      'userName': formData.userName,
      'hoTen': formData.hoTen,
      'soDienThoai': formData.soDienThoai,
      'gioiTinh': formData.gioiTinh,
      'ngaySinh': formData.gioiTinh,
      'password': formData.password
    };

    onSave(newUser);
    // onClose();
  };

  const changeInput = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }



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
            <label>Tên đăng nhập</label>
            <input
              type="text"
              name="name"
              value={formData.userName}
              onChange={(e) => changeInput('userName', e.target.value)}
              required
            />
            {err.userName && <span className="err-add">{err.userName}</span>}
          </div>

          <div className="add-form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.hoTen}
              onChange={(e) => changeInput('hoTen', e.target.value)}
              required
            />
            {err.hoTen && <span className="err-add">{err.hoTen}</span>}
          </div>

          <div className="add-form-group">
            <label>Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.soDienThoai}
              onChange={(e) => changeInput('soDienThoai', e.target.value)}
              required
            />
            {err.soDienThoai && <span className="err-add">{err.soDienThoai}</span>}
          </div>

          <div className="add-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => changeInput('email', e.target.value)}
              required
            />
            {err.email && <span className="err-add">{err.email}</span>}
          </div>

          <div className="add-form-group">
            <label>Ngày sinh</label>
            <input
              type="date" lang="vi"
              name="ngay-sinh"
              value={formData.ngaySinh}
              onChange={(e) => changeInput('ngaySinh', e.target.value)}
              required
            />
            {err.ngaySinh && <span className="err-add">{err.ngaySinh}</span>}
          </div>

          <div className="add-form-group">
            <label>Giới tính</label>
            <select
              name="gioi-tinh"
              value={formData.gioiTinh}
              onChange={(e) => changeInput('gioiTinh', e.target.value)}
            >
              <option value={1}>Nam</option>
              <option value={2}>Nữ</option>
              <option value={3}>Khác</option>
            </select>
          </div>

          <div className="add-form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => changeInput('password', e.target.value)}
              required
            />
            {err.password && <span className="err-add">{err.password}</span>}
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
