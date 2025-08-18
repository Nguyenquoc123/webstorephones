import React, { useState } from "react";
import "./TaoKhuyenMai.css";

function TaoKhuyenMai({phoneList, formAddKhuyenMai, onClose, onSave, inputData}) {
  const [tenKM, setTenKM] = useState("");
  const [mucGiam, setMucGiam] = useState("");
  const [ngayBD, setNgayBD] = useState("");
  const [ngayKT, setNgayKT] = useState("");
  const [dieuKien, setDieuKien] = useState("");
  const [trangThai, setTrangThai] = useState("running");

  const [showDropdown, setShowDropdown] = useState(false)
  


  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSave();
    onClose(); // Đóng form
  };

  return (
    <div className="tao-container">
      <h3>Tạo khuyến mãi mới</h3>
      <form className="tao-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên khuyến mãi"
          value={formAddKhuyenMai.tenKhuyenMai}
          onChange={(e) => inputData('tenKhuyenMai', e.target.value)}
          required
        />
        <select name="" id="" onChange={(e) => inputData('loaiKhuyenMai', e.target.value)}>
          <option value="" disabled selected hidden>Loại khuyến mãi</option>
          <option value="Fixed">Fixed</option>
          <option value="Percent">Percent</option>
        </select>
        <input
          type="number"
          placeholder="Mức giảm (VD: 20% hoặc -500000)"
          value={formAddKhuyenMai.giaTriGiam}
          onChange={(e) => inputData('giaTriGiam', e.target.value)}
          required
        />
        <div className="date-group">
          <label>Bắt đầu</label>
          <input
            type="date"
            value={formAddKhuyenMai.ngayBatDau}
            onChange={(e) => inputData('ngayBatDau', e.target.value)}
            required
          />
          <label>Kết thúc</label>
          <input
            type="date"
            value={formAddKhuyenMai.ngayKetThuc}
            onChange={(e) => inputData('ngayKetThuc', e.target.value)}
            required
          />
        </div>
        <div className="chon-dienthoai">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="btn-select"
          >
            Chọn điện thoại áp dụng
          </button>

          {showDropdown && (
            <div className="dropdown">
              {phoneList && phoneList.map((phone) => (
                <label key={phone.maDienThoai} className="dropdown-item">
                  {phone.tenDienThoai}
                  <input
                    type="checkbox"
                    checked={formAddKhuyenMai.dsDienThoai.includes(phone.maDienThoai)}
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
              onClick={() => setShowDropdown(false)}>
              Xong
            </button>
          )}
        </div>

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
