import React, { useState } from "react";
import "./XemChiTietKhuyenMai.css";

function XemChiTietKhuyenMai({ promo, onClose }) {

  const [showDropdown, setShowDropdown] = useState(false);

  const showTrangThai = (km) => {
    if(!km) return ''
    const now = new Date();
    const start = new Date(km.ngayBatDau);
    const end = new Date(km.ngayKetThuc);

    if (now < start) {
      return "Sắp diễn ra";
    } else if (now >= start && now <= end) {
      return "Đang diễn ra";
    } else {
      return "Đã kết thúc";
    }
  };

  const showNgay = (isoString) => {
    if(!isoString) return ''
    const date = new Date(isoString);

    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const showGiaTriGiam = (km) => {
    if (!km) return '';
    if (km.loaiKhuyenMai === "Fixed")
      return km.giaTriGiam.toLocaleString('vi-VN') + "đ"
    return km.giaTriGiam + "%"
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Chi tiết khuyến mãi</h3>
        <div className="detail-item">
          <strong>Tên khuyến mãi:</strong> {promo?.tenKhuyenMai}
        </div>
        <div className="detail-item">
          <strong>Mức giảm:</strong> {showGiaTriGiam(promo)}
        </div>
        <div className="detail-item">
          <strong>Ngày áp dụng:</strong> {showNgay(promo?.ngayBatDau)} - {showNgay(promo?.ngayKetThuc)}
        </div>

        <div className="detail-item">
          <strong>Trạng thái:</strong>{" "}
          {showTrangThai(promo)}
        </div>
        <div className="chon-dienthoai">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="btn-select"
          >
            Danh sách điện thoại
          </button>

          {showDropdown && (
            <div className="dropdown-ds">
              {promo.dsDienThoai && promo.dsDienThoai.map((phone, index) => (
                <label key={phone.maDienThoai} className="dropdown-ds-item">
                  {index+1}. {phone.tenDienThoai}
                </label>
              ))}

            </div>
          )}
          {showDropdown && (
            <button
              type="button"
              className="btn-done"
              onClick={() => setShowDropdown(false)}>
              Ẩn
            </button>
          )}
        </div>
        <button className="btn-close" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export default XemChiTietKhuyenMai;
