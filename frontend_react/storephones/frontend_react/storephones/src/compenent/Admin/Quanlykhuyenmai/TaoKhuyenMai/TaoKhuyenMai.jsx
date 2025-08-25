import React, { useState } from "react";
import "./TaoKhuyenMai.css";

function TaoKhuyenMai({ onClose, onSave }) {
  const [tenKM, setTenKM] = useState("");
  const [mucGiam, setMucGiam] = useState("");
  const [ngayBD, setNgayBD] = useState("");
  const [ngayKT, setNgayKT] = useState("");
  const [dieuKien, setDieuKien] = useState("");
  const [trangThai, setTrangThai] = useState("running");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPromo = {
      tenKM,
      mucGiam,
      ngayBD,
      ngayKT,
      dieuKien,
      trangThai,
    };
    onSave(newPromo); // Gửi dữ liệu về component cha
    onClose(); // Đóng form
  };

  return (
    <div className="tao-container">
      <h3>Tạo khuyến mãi mới</h3>
      <form className="tao-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên khuyến mãi"
          value={tenKM}
          onChange={(e) => setTenKM(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mức giảm (VD: 20% hoặc -500000)"
          value={mucGiam}
          onChange={(e) => setMucGiam(e.target.value)}
          required
        />
        <div className="date-group">
          <label>Bắt đầu</label>
          <input
            type="date"
            value={ngayBD}
            onChange={(e) => setNgayBD(e.target.value)}
            required
          />
          <label>Kết thúc</label>
          <input
            type="date"
            value={ngayKT}
            onChange={(e) => setNgayKT(e.target.value)}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Điều kiện"
          value={dieuKien}
          onChange={(e) => setDieuKien(e.target.value)}
        />
        <select
          value={trangThai}
          onChange={(e) => setTrangThai(e.target.value)}
        >
          <option value="running">Đang chạy</option>
          <option value="upcoming">Sắp diễn ra</option>
          <option value="expired">Hết hạn</option>
        </select>
        <div className="btn-group">
          <button type="submit" className="btn-save">
            Lưu
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaoKhuyenMai;
