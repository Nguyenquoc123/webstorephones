import React from "react";
import "./DoiMatKhau.css";

function DoiMatKhau() {
  return (
    <div class="DMK-container">
      <div class="DMK-content">
        <label htmlFor="password">mật khẩu hiện tại</label>
        <input
          className="DMK-password"
          type="password"
          placeholder="password"
        />
      </div>
    </div>
  );
}
export default DoiMatKhau;
