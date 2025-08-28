import React, { useEffect, useState } from "react";
import "./HoSoCaNhan.css";
import Box from "../../components/box/Box";
import { Form, useNavigate } from "react-router-dom";
import { fetchGetInfo, fetchUpdateInfo } from "../../api/authApi";
import Loading from "../loading/Loading";
import Popup from "../popup/Popup";

import MenuKhachHang from "../menukhachhang/MenuKhachHang";

const HoSoCaNhan = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [avatarImg, setAvatarImg] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    loadInfo();
  }, []);
  const loadInfo = async () => {
    const response = await fetchGetInfo();
    if (response.code === 200) {
      setInfo(response.result);
      console.log("Thông tin cá nhân ", response.result);
      if (response.result.avatar) setAvatarImg(response.result.avatar);
    }
    console.log(response);
  };
  const editInfo = (key, value) => {
    console.log(key, "  ", value);
    console.log("thông tin ", info);
    if (key === "gioiTinh")
      setInfo({ ...info, [key]: convertValueGioiTinh(value) });
    else setInfo({ ...info, [key]: value });
  };
  const convertValueGioiTinh = (value) => {
    if (value === "Nam") return 1;
    else if (value === "Nữ") return 2;
    return 3;
  };
  const showGioiTinh = (value) => {
    if (!value) return "";
    if (1 === Number.parseInt(value)) return "Nam";
    else if (2 === Number.parseInt(value)) return "Nữ";
    return "Khác";
  };
  const convertDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatNgaySinh = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const title1 = "Thông tin cá nhân";
  const data1 = [
    { label: "Họ và tên", name: "hoTen", value: info?.hoTen, editable: true },
    {
      label: "Giới tính",
      name: "gioiTinh",
      value: showGioiTinh(info?.gioiTinh),
      editable: true,
    },
    {
      label: "Ngày sinh",
      name: "ngaySinh",
      value: convertDate(info?.ngaySinh),
      editable: true,
    },
  ];
  const title2 = "Thông tin liên hệ";
  const data2 = [
    {
      label: "SDT",
      name: "soDienThoai",
      value: info?.soDienThoai,
      editable: true,
    },
    { label: "Email", name: "email", value: info?.email, editable: true },
    { label: "Địa chỉ", name: "diaChi", value: info?.diaChi, editable: true },
  ];
  const title3 = "Thông tin tài khoản";
  const data3 = [
    {
      label: "Tên đăng nhập",
      name: "username",
      value: info?.username,
      editable: true,
    },
    { label: "Mật khẩu", value: "*************", editable: false },
    { label: "Trạng thái TK", value: "Hoạt động", editable: false },
    {
      label: "Ngày tạo TK",
      value: convertDate(info?.ngayDangKy),
      editable: false,
    },
  ];
  const title4 = "Thông tin giao dịch";
  const data4 = [
    { label: "Tổng số đơn hàng", value: info?.soDonHang, editable: false },
    {
      label: "Lần mua hàng gần nhất",
      value: convertDate(info?.ngayDatHangGanNhat),
      editable: false,
    },
    {
      label: "Tổng giá trị mua",
      value: info?.tongTien.toLocaleString("vi-VN") + " đ",
      editable: false,
    },
    { label: "Điểm tích lũy", value: "150.000 điểm", editable: false },
  ];
  // const title1 = "Thông tin cá nhân";
  // const [data1, setData1] = useState([
  //   { label: "Họ và tên", value: "Trương Văn Sang", editable: true },
  //   { label: "Giới tính", value: "Nam", editable: true },
  //   { label: "Ngày sinh", value: "01/03/2005", editable: true },
  // ])
  // const title2 = "Thông tin liên hệ";
  // const [data2, setData2] = useState([
  //   { label: "SDT", value: "0986754321", editable: true },
  //   { label: "Email", value: "Sang@gmail.com", editable: true },
  //   { label: "Địa chỉ", value: "77 Nguyễn Huệ", editable: true },
  // ])
  // const title3 = "Thông tin tài khoản";
  // const [data3, setData3] = useState([
  //   { label: "Tên đăng nhập", value: "Văn Sang", editable: true },
  //   { label: "Mật khẩu", value: "*************", editable: false },
  //   { label: "Trạng thái TK", value: "Hoạt động", editable: false },
  //   { label: "Ngày tạo TK", value: "01/03/2023", editable: false },
  // ])
  // const title4 = "Thông tin giao dịch";
  // const [data4, setData4] = useState([
  //   { label: "Tổng số đơn hàng", value: "21", editable: false },
  //   { label: "Lần mua hàng gần nhất", value: "19/08/2025", editable: false },
  //   { label: "Tổng giá trị mua", value: "132.055.000 đ", editable: false },
  //   { label: "Điểm tích lũy", value: "150.000 điểm", editable: false },
  // ])

  const updateHoSo = async () => {
    console.log(info);
    console.log(formatNgaySinh(info.ngaySinh));
    console.log(info.ngaySinh);
    const data = new FormData();
    data.append("hoTen", info.hoTen);
    data.append("email", info.email);
    data.append("soDienThoai", info.soDienThoai);
    data.append("gioiTinh", info.gioiTinh);
    data.append("ngaySinh", convertDate(info.ngaySinh));
    data.append("userName", info.username);
    data.append("diaChi", info.diaChi);
    data.append("image", avatarImg);

    setShowLoading(true);
    const response = await fetchUpdateInfo(data);
    if (response.code === 200) {
      console.log("Update hồ sơ thành công", response);
      loadInfo();
      setShowPopup({
        show: true,
        type: true,
        message: "Cập nhập thông tin thành công",
      });
    } else {
      console.log("Update hồ sơ thất bại", response);
    }
    setShowLoading(false);
  };
  const selectImg = (e) => {
    const file = e.target.files[0];
    setAvatarImg(file);
  };
  return (
    <div>
      <MenuKhachHang />
      <div className="HSCN-profile-info">
        <label htmlFor="avatar-img">
          <img
            src={
              avatarImg && avatarImg instanceof File
                ? URL.createObjectURL(avatarImg)
                : avatarImg
                ? avatarImg
                : "/images/anh-dai-dien-mac-dinh-18.jpg"
            }
            alt="avatar"
            className="avatar"
            style={{ width: "130px", height: "110px", borderRadius: "50%" }}
          />
        </label>
        <input type="file" id="avatar-img" onChange={selectImg} />
        <h3>Khách hàng: {info?.hoTen}</h3>
      </div>
      <Box title={title1} data={data1} setData={editInfo} />
      <Box title={title2} data={data2} setData={editInfo} />
      <Box title={title3} data={data3} setData={editInfo} />
      <Box title={title4} data={data4} setData={editInfo} />

      <div className="HSCN-btn">
        <button
          className="btn-change-password"
          onClick={() => navigate("/doimatkhau")}
        >
          Đổi mật khẩu
        </button>

        <div className="btn-active-info">
          <button class="HSCN-btn_cancel" onClick={() => navigate("/home")}>
            Quay lại
          </button>
          <button class="HSCN-btn_xac_nhan" onClick={updateHoSo}>
            Xác nhận
          </button>
        </div>
      </div>
      <Loading show={showLoading} />
      {showPopup.show && (
        <Popup
          type={showPopup.type}
          message={showPopup.message}
          onclose={() => setShowPopup({ ...showPopup, show: false })}
        />
      )}
    </div>
  );
};

export default HoSoCaNhan;
