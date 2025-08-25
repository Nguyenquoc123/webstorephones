import React, { useState } from "react";
import "./ChinhSuaKhuyenMai.css";

function ChinhSuaKhuyenMai({ promo, dsDienThoai, onClose, onSave, inputData }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(promo)
    onSave();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Chỉnh sửa khuyến mãi</h3>
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            placeholder="Tên khuyến mãi"
            type="text"
            value={promo.tenKhuyenMai}
            onChange={(e) => inputData("tenKhuyenMai", e.target.value)}
            required
          />
          <select value={promo?.loaiKhuyenMai} name="" id="" onChange={(e) => inputData('loaiKhuyenMai', e.target.value)}>
            <option value="Fixed">Fixed</option>
            <option value="Percent">Percent</option>
          </select>
          <input
            placeholder="Giá trị giảm. Vd: 500000đ hoặc 10%"
            type="number"
            value={promo.giaTriGiam}
            onChange={(e) => inputData("giaTriGiam", e.target.value)}
            required
          />
          <div className="date-group">
            <label>Bắt đầu</label>
            <input
              type="date"
              value={promo.ngayBatDau ? promo.ngayBatDau.split("T")[0] : ''}
              onChange={(e) => inputData("ngayBatDau", e.target.value)}
              required
            />
            <label>Kết thúc</label>
            <input
              type="date"
              value={promo.ngayKetThuc ? promo.ngayKetThuc.split("T")[0] : ''}
              onChange={(e) => inputData("ngayKetThuc", e.target.value)}
              required
            />
          </div>
          <div className="chon-dienthoai">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="btn-select">Điện thoại áp dụng</button>

            {showDropdown && (
              <div className="dropdown">
                {dsDienThoai && dsDienThoai.map((phone) => (
                  <label key={phone.maDienThoai} className="dropdown-item">
                    {phone.tenDienThoai}
                    <input
                      type="checkbox"
                      checked={promo.dsDienThoai.includes(phone.maDienThoai)}
                      onChange={(e) => inputData('dsDienThoai', phone.maDienThoai)}
                    />
                  </label>
                ))}

              </div>
            )}
            {showDropdown && (
              <button
                type="button"
                className="btn-done"
                onClick={() => setShowDropdown(false)}>Ẩn</button>
            )}
          </div>

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
