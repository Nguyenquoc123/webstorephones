import React, { useState } from "react";
import "./HoSoCaNhan.css";
import Box from "../../components/box/Box";
import { useNavigate } from "react-router-dom";

const HoSoCaNhan = () => {
  const navigate = useNavigate();
  const title1 = "Thông tin cá nhân";
  const [data1, setData1] = useState([
    { label: "Họ và tên", value: "Trương Văn Sang", editable: true },
    { label: "Giới tính", value: "Nam", editable: true },
    { label: "Ngày sinh", value: "01/03/2005", editable: true },
  ]);
  const title2 = "Thông tin liên hệ";
  const [data2, setData2] = useState([
    { label: "SDT", value: "0986754321", editable: true },
    { label: "Email", value: "Sang@gmail.com", editable: true },
    { label: "Địa chỉ", value: "77 Nguyễn Huệ", editable: true },
  ]);
  const title3 = "Thông tin tài khoản";
  const [data3, setData3] = useState([
    { label: "Tên đăng nhập", value: "Văn Sang", editable: true },
    { label: "Mật khẩu", value: "*************", editable: false },
    { label: "Trạng thái TK", value: "Hoạt động", editable: false },
    { label: "Ngày tạo TK", value: "01/03/2023", editable: false },
  ]);
  const title4 = "Thông tin giao dịch";
  const [data4, setData4] = useState([
    { label: "Tổng số đơn hàng", value: "21", editable: false },
    { label: "Lần mua hàng gần nhất", value: "19/08/2025", editable: false },
    { label: "Tổng giá trị mua", value: "132.055.000 đ", editable: false },
    { label: "Điểm tích lũy", value: "150.000 điểm", editable: false },
  ]);
  return (
    <div>
      <div className="HSCN-profile-info">
        <img
          src="/images/anh-dai-dien-mac-dinh-18.jpg"
          alt="avatar"
          className="avatar"
          style={{ width: "130px", height: "110px", borderRadius: "50%" }}
        />
        <h3>Khách hàng: Truong Van Sang</h3>
      </div>
      <Box title={title1} data={data1} setData={setData1} />
      <Box title={title2} data={data2} setData={setData2} />
      <Box title={title3} data={data3} setData={setData3} />
      <Box title={title4} data={data4} setData={setData4} />

      <div className="HSCN-btn">
        <button
          className="HSCN-btn_doi_mat_khau"
          onClick={() => navigate("/doimatkhau")}
        >
          Đổi mật khẩu
        </button>
        <div className="HSCN-btn-right">
          <button
            className="HSCN-QL"
            onClick={() => navigate("/home/:makhachhang")}
          >
            Quay lại
          </button>
          <button class="HSCN-btn_xac_nhan" onClick={() => navigate("/home")}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default HoSoCaNhan;
