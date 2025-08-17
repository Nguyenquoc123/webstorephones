import React, { useState } from "react";
import "./DoiMatKhau.css";
import close_eye from "../../../src/icons/eye_close.png";
import open_eye from "../../../src/icons/eye_open.png";

const DoiMatKhau = () => {
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="DMK-container">
      <h2 className="DMK-title">Thông tin tài khoản</h2>

      <div className="DMK-form-group">
        <label>Tên đăng nhập hiện tại</label>
        <input type="text" value="Văn Sang" disabled />
      </div>

      <div className="DMK-form-group">
        <label>Tên đăng nhập mới</label>
        <input type="text" placeholder="Nhập tên đăng nhập mới" />
      </div>

      <div className="DMK-form-group">
        <label>Mật khẩu cũ</label>
        <div className="DMK-input-password">
          <input
            type={showPassword.old ? "text" : "password"}
            placeholder="Nhập mật khẩu cũ"
          />
          <span onClick={() => togglePassword("old")} className="DMK-eye-icon">
            <img
              src={showPassword.old ? open_eye : close_eye}
              alt="toggle visibility"
            />
          </span>
        </div>
      </div>

      <div className="DMK-form-group">
        <label>Mật khẩu mới</label>
        <div className="DMK-input-password">
          <input
            type={showPassword.new ? "text" : "password"}
            placeholder="Nhập mật khẩu mới"
          />
          <span onClick={() => togglePassword("new")} className="DMK-eye-icon">
            <img
              src={showPassword.new ? open_eye : close_eye}
              alt="toggle visibility"
            />
          </span>
        </div>
      </div>

      <div className="DMK-form-group">
        <label>Nhập lại mật khẩu mới</label>
        <div className="DMK-input-password">
          <input
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Nhập lại mật khẩu mới"
          />
          <span
            onClick={() => togglePassword("confirm")}
            className="DMK-eye-icon"
          >
            <img
              src={showPassword.confirm ? open_eye : close_eye}
              alt="toggle visibility"
            />
          </span>
        </div>
      </div>

      <div className="DMK-password-rules">
        <h4>Quy tắc mật khẩu:</h4>
        <ul>
          <li>✔️ Mật khẩu dài tối thiểu 8 ký tự</li>
          <li>
            ✔️ Chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt
          </li>
          <li>✔️ Không trùng mật khẩu cũ</li>
        </ul>
      </div>

      <div className="DMK-form-footer">
        <button className="DMK-btn-cancel">Hủy</button>
        <button className="DMK-btn-confirm">Xác nhận</button>
      </div>
    </div>
  );
};

export default DoiMatKhau;
