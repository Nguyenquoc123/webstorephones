import React from "react";
import "./Xoa.css";

const Xoa = ({ show, clickCancel, clickActive, message }) => {
  if (!show) return null; // Nếu show = false thì không hiển thị

  return (
    <div className="xoa-overlay">
      <div className="xoa-container">
        <h3 className="xoa-title">Xác nhận xoá</h3>
        <p className="xoa-message">{message || "Bạn có chắc chắn muốn xoá mục này?"}</p>
        <div className="xoa-actions">
          <button className="btn-cancel" onClick={clickCancel}>
            Huỷ
          </button>
          <button className="btn-delete" onClick={clickActive}>
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default Xoa;
