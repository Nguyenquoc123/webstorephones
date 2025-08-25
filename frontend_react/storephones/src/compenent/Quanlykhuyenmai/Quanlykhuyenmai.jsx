import React, { useEffect, useState } from "react";
import "./Quanlykhuyenmai.css";
import TaoKhuyenMai from "./TaoKhuyenMai/TaoKhuyenMai";
import XemChiTietKhuyenMai from "./XemChiTietKhuyenMai/XemChiTietKhuyenMai";
import ChinhSuaKhuyenMai from "./ChinhSuaKhuyenMai/ChinhSuaKhuyenMai";
import XoaKhuyenMai from "./XoaKhuyenMai/XoaKhuyenMai";
import MenuAdmin from "../menuadmin/MenuAdmin";

import {
  fetchAddKhuyenMai,
  fetchDeleteKhuyenMai,
  fetchGetDSKhuyenMai,
  fetchUpdateKhuyenMai,
} from "../../api/khuyenmai";
import { fetchGetDSDienThoai } from "../../api/dienthoai";
import Popup from "../popup/Popup";
function Quanlykhuyenmai() {
  const [hienForm, setHienForm] = useState(false);
  const [xemChiTiet, setXemChiTiet] = useState(false);
  const [chinhSua, setChinhSua] = useState(false);
  const [xoaKM, setXoaKM] = useState(false);

  const [danhSachKM, setDanhSachKM] = useState([]);
  const [dsXoaDienThoai, setDSXoaDienThoai] = useState([]);
  const [formAddKhuyenMai, setFormAddKhuyenMai] = useState({
    maKhuyenMai: "",
    tenKhuyenMai: "",
    loaiKhuyenMai: "",
    giaTriGiam: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    dsDienThoai: [],
  });
  const [dsDienThoai, setDSDienThoai] = useState([]);
  const [showPopup, setShowPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    loadDSKhuyenMai();
    loadDSDienThoai();
  }, []);

  const loadDSDienThoai = async () => {
    const response = await fetchGetDSDienThoai();
    if (response.code === 200) {
      setDSDienThoai(response.result);
    }
  };
  const loadDSKhuyenMai = async () => {
    const response = await fetchGetDSKhuyenMai();
    if (response.code === 200) {
      setDanhSachKM(response.result);
      console.log(response.result);
    }
  };

  const handleAddPromo = async () => {
    if (validateData()) return;

    console.log(formAddKhuyenMai);
    const data = {
      tenKhuyenMai: formAddKhuyenMai.tenKhuyenMai,
      loaiKhuyenMai: formAddKhuyenMai.loaiKhuyenMai,
      giaTriGiam: formAddKhuyenMai.giaTriGiam,
      ngayBatDau: formAddKhuyenMai.ngayBatDau,
      ngayKetThuc: formAddKhuyenMai.ngayKetThuc,
      dsDienThoai: formAddKhuyenMai.dsDienThoai,
    };
    const response = await fetchAddKhuyenMai(data);
    if (response.code === 200) {
      console.log(response.result);
      setDanhSachKM([...danhSachKM, response.result]);
    }
  };

  const handleEditPromo = async () => {
    if (validateData()) return;

    let dsXoa = [];
    let dsNew = formAddKhuyenMai.dsDienThoai;
    const km = danhSachKM.find(
      (item) => item.maKhuyenMai === formAddKhuyenMai.maKhuyenMai
    );
    km.dsDienThoai.forEach((item) => {
      if (dsXoaDienThoai.includes(item.maDienThoai))
        dsXoa.push(item.maDienThoai);
      if (dsNew.includes(item.maDienThoai)) {
        dsNew = dsNew.filter((tmp) => tmp !== item.maDienThoai);
      }
    });
    console.log("Danh sách xóa", dsXoa);
    console.log("Danh sách thêm ", dsNew);
    const data = {
      maKhuyenMai: formAddKhuyenMai.maKhuyenMai,
      tenKhuyenMai: formAddKhuyenMai.tenKhuyenMai,
      loaiKhuyenMai: formAddKhuyenMai.loaiKhuyenMai,
      giaTriGiam: formAddKhuyenMai.giaTriGiam,
      ngayBatDau: formAddKhuyenMai.ngayBatDau,
      ngayKetThuc: formAddKhuyenMai.ngayKetThuc,
      dsDienThoaiNew: dsNew,
      dsDienThoaiDelete: dsXoa,
    };
    const response = await fetchUpdateKhuyenMai(data);
    if (response.code === 200) {
      console.log("Update khuyến mãi success");
      loadDSKhuyenMai();
    }

    setChinhSua(false);
  };

  const handleDeletePromo = async (promo) => {
    console.log("Xóa khuyên mãi có mã ", promo.maKhuyenMai);

    const response = await fetchDeleteKhuyenMai(promo.maKhuyenMai);
    if (response.code === 200) {
      console.log("Delete khuyến mãi success");
      loadDSKhuyenMai();
    }

    setXoaKM(false);
  };

  const inputData = (key, value) => {
    if (key !== "dsDienThoai")
      setFormAddKhuyenMai({ ...formAddKhuyenMai, [key]: value });
    else {
      let ds = formAddKhuyenMai.dsDienThoai;
      if (ds.includes(value)) {
        ds = ds.filter((item) => item !== value);
        if (chinhSua) {
          if (!dsXoaDienThoai.includes(value)) {
            setDSXoaDienThoai([...dsXoaDienThoai, value]);
          }
        }
      } else {
        ds.push(value);
      }

      setFormAddKhuyenMai({ ...formAddKhuyenMai, [key]: ds });
    }
  };

  // promo: object khuyến mãi
  // ví dụ: { ngayBatDau: "...", ngayKetThuc: "...", trangThai: 1 }
  const showTrangThai = (km) => {
    if (!km) return "";
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
    if (!isoString) return "";
    const date = new Date(isoString);

    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const showGiaTriGiam = (km) => {
    if (!km) return "";
    if (km.loaiKhuyenMai === "Fixed")
      return km.giaTriGiam.toLocaleString("vi-VN") + "đ";
    return km.giaTriGiam + "%";
  };

  const clickEditKhuyenMai = (km) => {
    const ds = km.dsDienThoai.map((item) => item.maDienThoai);
    console.log(km.dsDienThoai);
    setFormAddKhuyenMai({
      maKhuyenMai: km.maKhuyenMai,
      tenKhuyenMai: km.tenKhuyenMai,
      loaiKhuyenMai: km.loaiKhuyenMai,
      giaTriGiam: km.giaTriGiam,
      ngayBatDau: km.ngayBatDau,
      ngayKetThuc: km.ngayKetThuc,
      dsDienThoai: ds,
    });
    setChinhSua(true);
  };
  const resetFormKhuyenMai = () => {
    setFormAddKhuyenMai({
      maKhuyenMai: "",
      tenKhuyenMai: "",
      loaiKhuyenMai: "",
      giaTriGiam: "",
      ngayBatDau: "",
      ngayKetThuc: "",
      dsDienThoai: [],
    });
  };
  const clickCancelEditKhuyenMai = () => {
    setDSXoaDienThoai([]);
    resetFormKhuyenMai();
    setChinhSua(false);
  };

  const validateData = () => {
    if (formAddKhuyenMai.tenKhuyenMai.trim() === "") {
      setShowPopup({ show: true, type: false, message: "Nhập tên khuyến mãi" });
      return true;
    } else if (!/^[a-zA-Z0-9]+$/.test(formAddKhuyenMai.tenKhuyenMai)) {
      setShowPopup({
        show: true,
        type: false,
        message: "Tên khuyến mãi chỉ được nhập chữ cái và số",
      });
      return true;
    } else if (!formAddKhuyenMai.loaiKhuyenMai) {
      setShowPopup({
        show: true,
        type: false,
        message: "Chưa chọn loại khuyến mãi",
      });
      return true;
    } else if (!Number.parseInt(formAddKhuyenMai.giaTriGiam)) {
      setShowPopup({ show: true, type: false, message: "Chỉ được nhập số" });
      return true;
    } else if (Number.parseInt(formAddKhuyenMai.giaTriGiam) <= 0) {
      setShowPopup({
        show: true,
        type: false,
        message: "Giá trị giảm phải lớn hơn 0",
      });
      return true;
    } else if (
      formAddKhuyenMai.loaiKhuyenMai === "Percent" &&
      Number.parseInt(formAddKhuyenMai.giaTriGiam) > 100
    ) {
      setShowPopup({
        show: true,
        type: false,
        message: "Vui lòng không nhập quá 100%",
      });
      return true;
    } else if (!formAddKhuyenMai.ngayBatDau) {
      setShowPopup({ show: true, type: false, message: "Chọn ngày bắt đầu" });
      return true;
    } else if (!formAddKhuyenMai.ngayKetThuc) {
      setShowPopup({ show: true, type: false, message: "Chọn ngày kết thúc" });
      return true;
    }
    const now = new Date();
    const bd = new Date(formAddKhuyenMai.ngayBatDau);
    const kt = new Date(formAddKhuyenMai.ngayKetThuc);
    if (kt < bd) {
      setShowPopup({
        show: true,
        type: false,
        message: "Ngày kết thúc phải lớn hơn ngày bắt đầu",
      });
      return true;
    } else if (kt < now) {
      setShowPopup({
        show: true,
        type: false,
        message: "Ngày kết thúc phải lớn ngày hiện tại",
      });
      return true;
    } else if (formAddKhuyenMai.dsDienThoai.length <= 0) {
      setShowPopup({
        show: true,
        type: false,
        message: "Vui lòng chọn điện thoại áp dụng",
      });
      return true;
    }
    return false;
  };
  return (
    <>
      <MenuAdmin />
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
                <td className="green">{showGiaTriGiam(km)}</td>
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
                    onClick={() => clickEditKhuyenMai(km)}
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
            promo={formAddKhuyenMai}
            onClose={clickCancelEditKhuyenMai}
            onSave={handleEditPromo}
            inputData={inputData}
            dsDienThoai={dsDienThoai}
          />
        )}

        {xoaKM && (
          <XoaKhuyenMai
            promo={xoaKM}
            onClose={setXoaKM}
            onDelete={handleDeletePromo}
          />
        )}
        {showPopup.show && (
          <Popup
            type={showPopup.type}
            message={showPopup.message}
            onclose={() => setShowPopup({ ...showPopup, show: false })}
          />
        )}
      </div>
    </>
  );
}

export default Quanlykhuyenmai;
