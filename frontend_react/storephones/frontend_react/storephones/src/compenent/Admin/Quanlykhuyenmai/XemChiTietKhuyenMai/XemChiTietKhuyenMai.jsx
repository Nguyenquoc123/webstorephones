import React from "react";
import "./XemChiTietKhuyenMai.css";

function XemChiTietKhuyenMai({ promo, onClose }) {
  if (!promo) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Chi tiết khuyến mãi</h3>
        <div className="detail-item">
          <strong>Tên khuyến mãi:</strong> {promo.tenKM}
        </div>
        <div className="detail-item">
          <strong>Mức giảm:</strong> {promo.mucGiam}
        </div>
        <div className="detail-item">
          <strong>Ngày áp dụng:</strong> {promo.ngayBD} - {promo.ngayKT}
        </div>
        <div className="detail-item">
          <strong>Điều kiện:</strong> {promo.dieuKien || "Không có"}
        </div>
        <div className="detail-item">
          <strong>Trạng thái:</strong>{" "}
          {promo.trangThai === "running"
            ? "Đang chạy"
            : promo.trangThai === "upcoming"
            ? "Sắp diễn ra"
            : "Hết hạn"}
        </div>
        <button className="btn-close" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export default XemChiTietKhuyenMai;
