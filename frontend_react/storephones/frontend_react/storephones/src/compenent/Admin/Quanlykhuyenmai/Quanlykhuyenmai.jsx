import React, { useState } from "react";
import "./Quanlykhuyenmai.css";
import TaoKhuyenMai from "./TaoKhuyenMai/TaoKhuyenMai";
import XemChiTietKhuyenMai from "./XemChiTietKhuyenMai/XemChiTietKhuyenMai";
import ChinhSuaKhuyenMai from "./ChinhSuaKhuyenMai/ChinhSuaKhuyenMai";
import XoaKhuyenMai from "./XoaKhuyenMai/XoaKhuyenMai";

function Quanlykhuyenmai() {
  const [hienForm, setHienForm] = useState(false);
  const [xemChiTiet, setXemChiTiet] = useState(null);
  const [chinhSua, setChinhSua] = useState(null);
  const [xoaKM, setXoaKM] = useState(null);

  const [danhSachKM, setDanhSachKM] = useState([
    {
      tenKM: "Khuyến mãi Black Friday...",
      mucGiam: "20%",
      ngayBD: "2024-11-24",
      ngayKT: "2024-11-30",
      dieuKien: "Đơn hàng trên 2 triệu",
      trangThai: "running",
    },
    {
      tenKM: "Giảm giá cuối năm",
      mucGiam: "-500.000đ",
      ngayBD: "2024-12-20",
      ngayKT: "2024-12-31",
      dieuKien: "Đơn hàng trên 5 triệu",
      trangThai: "upcoming",
    },
  ]);

  const handleAddPromo = (promo) => {
    setDanhSachKM([...danhSachKM, promo]);
  };

  const handleEditPromo = (updated) => {
    setDanhSachKM(
      danhSachKM.map((km) => (km.tenKM === updated.tenKM ? updated : km))
    );
  };

  const handleDeletePromo = (promo) => {
    setDanhSachKM(danhSachKM.filter((km) => km.tenKM !== promo.tenKM));
  };

  return (
    <div className="promo-container">
      <div className="promo-header">
        <h2>Quản lý khuyến mãi</h2>
        <button className="btn-add" onClick={() => setHienForm(!hienForm)}>
          + Tạo khuyến mãi mới
        </button>
      </div>

      {hienForm && (
        <TaoKhuyenMai
          onClose={() => setHienForm(false)}
          onSave={handleAddPromo}
        />
      )}

      <table className="promo-table">
        <thead>
          <tr>
            <th>TÊN KHUYẾN MÃI</th>
            <th>MỨC GIẢM</th>
            <th>NGÀY ÁP DỤNG</th>
            <th>ĐIỀU KIỆN</th>
            <th>TRẠNG THÁI</th>
            <th>HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {danhSachKM.map((km, index) => (
            <tr key={index}>
              <td>{km.tenKM}</td>
              <td className="green">{km.mucGiam}</td>
              <td>
                {km.ngayBD} - {km.ngayKT}
              </td>
              <td>{km.dieuKien}</td>
              <td>
                <span className={`status ${km.trangThai}`}>
                  {km.trangThai === "running"
                    ? "Đang chạy"
                    : km.trangThai === "upcoming"
                    ? "Sắp diễn ra"
                    : "Hết hạn"}
                </span>
              </td>
              <td>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setXemChiTiet(km)}
                >
                  👁
                </span>{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setChinhSua(km)}
                >
                  ✏
                </span>{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setXoaKM(km)}
                >
                  🗑
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {xemChiTiet && (
        <XemChiTietKhuyenMai
          promo={xemChiTiet}
          onClose={() => setXemChiTiet(null)}
        />
      )}

      {chinhSua && (
        <ChinhSuaKhuyenMai
          promo={chinhSua}
          onClose={() => setChinhSua(null)}
          onSave={handleEditPromo}
        />
      )}

      {xoaKM && (
        <XoaKhuyenMai
          promo={xoaKM}
          onClose={() => setXoaKM(null)}
          onDelete={handleDeletePromo}
        />
      )}
    </div>
  );
}

export default Quanlykhuyenmai;
