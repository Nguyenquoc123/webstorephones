import React, { useState } from "react";
import "./ChinhSuaKhuyenMai.css";

function ChinhSuaKhuyenMai({ promo, onClose, onSave }) {
  const [tenKM, setTenKM] = useState(promo.tenKM);
  const [mucGiam, setMucGiam] = useState(promo.mucGiam);
  const [ngayBD, setNgayBD] = useState(promo.ngayBD);
  const [ngayKT, setNgayKT] = useState(promo.ngayKT);
  const [dieuKien, setDieuKien] = useState(promo.dieuKien);
  const [trangThai, setTrangThai] = useState(promo.trangThai);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPromo = {
      ...promo,
      tenKM,
      mucGiam,
      ngayBD,
      ngayKT,
      dieuKien,
      trangThai,
    };
    onSave(updatedPromo);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Chỉnh sửa khuyến mãi</h3>
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={tenKM}
            onChange={(e) => setTenKM(e.target.value)}
            required
          />
          <input
            type="text"
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
              Lưu thay đổi
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChinhSuaKhuyenMai;
