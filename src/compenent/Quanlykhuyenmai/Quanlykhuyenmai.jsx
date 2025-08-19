import React, { useEffect, useState } from "react";
import "./Quanlykhuyenmai.css";
import TaoKhuyenMai from "./TaoKhuyenMai/TaoKhuyenMai";
import XemChiTietKhuyenMai from "./XemChiTietKhuyenMai/XemChiTietKhuyenMai";
import ChinhSuaKhuyenMai from "./ChinhSuaKhuyenMai/ChinhSuaKhuyenMai";
import XoaKhuyenMai from "./XoaKhuyenMai/XoaKhuyenMai";
import { fetchAddKhuyenMai, fetchGetDSKhuyenMai } from '../../api/khuyenmai'
import { fetchGetDSDienThoai } from '../../api/dienthoai'
function Quanlykhuyenmai() {
  const [hienForm, setHienForm] = useState(false);
  const [xemChiTiet, setXemChiTiet] = useState(null);
  const [chinhSua, setChinhSua] = useState(null);
  const [xoaKM, setXoaKM] = useState(null);

  const [danhSachKM, setDanhSachKM] = useState([]);
  const [formAddKhuyenMai, setFormAddKhuyenMai] = useState({
    tenKhuyenMai: '',
    loaiKhuyenMai: '',
    giaTriGiam: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    dsDienThoai: []
  })
  const [dsDienThoai, setDSDienThoai] = useState([])

  useEffect(() => {
    loadDSKhuyenMai()
    loadDSDienThoai()
  }, [])

  const loadDSDienThoai = async () => {
    const response = await fetchGetDSDienThoai();
    if (response.code === 200) {
      setDSDienThoai(response.result)
    }
  }
  const loadDSKhuyenMai = async () => {
    const response = await fetchGetDSKhuyenMai();
    if (response.code === 200) {
      setDanhSachKM(response.result)
      console.log(response.result)
    }
  }

  const handleAddPromo = async () => {
    console.log(formAddKhuyenMai)
    const data = {
      'tenKhuyenMai': formAddKhuyenMai.tenKhuyenMai,
      'loaiKhuyenMai': formAddKhuyenMai.loaiKhuyenMai,
      'giaTriGiam': formAddKhuyenMai.giaTriGiam,
      'ngayBatDau': formAddKhuyenMai.ngayBatDau,
      'ngayKetThuc': formAddKhuyenMai.ngayKetThuc,
      'dsDienThoai': formAddKhuyenMai.dsDienThoai
    }
    const response = await fetchAddKhuyenMai(data)
    if (response.code === 200) {
      console.log(response.result)
      setDanhSachKM([...danhSachKM, response.result])
    }
  };

  const handleEditPromo = (updated) => {
    setDanhSachKM(
      danhSachKM.map((km) => (km.tenKM === updated.tenKM ? updated : km))
    );
  };

  const handleDeletePromo = (promo) => {
    setDanhSachKM(danhSachKM.filter((km) => km.tenKM !== promo.tenKM));
  };

  const inputData = (key, value) => {
    if (key !== "dsDienThoai")
      setFormAddKhuyenMai({ ...formAddKhuyenMai, [key]: value })
    else {
      let ds = formAddKhuyenMai.dsDienThoai;
      if (ds.includes(value))
        ds = ds.filter(item => item !== value)
      else
        ds.push(value)

      setFormAddKhuyenMai({ ...formAddKhuyenMai, [key]: ds })
    }
  }

  // promo: object khuyến mãi
  // ví dụ: { ngayBatDau: "...", ngayKetThuc: "...", trangThai: 1 }
  const showTrangThai = (km) => {
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
    const date = new Date(isoString);

    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
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
          formAddKhuyenMai={formAddKhuyenMai}
          phoneList={dsDienThoai}
          onClose={() => setHienForm(false)}
          onSave={handleAddPromo}
          inputData={inputData}
        />
      )}

      <table className="promo-table">
        <thead>
          <tr>
            <th>TÊN KHUYẾN MÃI</th>
            <th>MỨC GIẢM</th>
            <th>NGÀY ÁP DỤNG</th>

            <th>TRẠNG THÁI</th>
            <th>HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {danhSachKM.map((km) => (
            <tr key={km.maKhuyenMai}>
              <td>{km.tenKhuyenMai}</td>
              <td className="green">{km.giaTriGiam}</td>
              <td>
                {showNgay(km.ngayBatDau)} - {showNgay(km.ngayKetThuc)}
              </td>

              <td>
                <span className={`status ${km.trangThai}`}>
                  {showTrangThai(km)}
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
