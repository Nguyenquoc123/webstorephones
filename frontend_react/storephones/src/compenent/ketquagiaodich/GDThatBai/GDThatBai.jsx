import { Colors } from "chart.js";
import { useNavigate, useParams } from "react-router-dom";
import "./GDThaiBai.css";
function GDThatBai() {
  const navigate = useNavigate();
  const { maDonHang } = useParams();
  return (
    <div className="container-gd-sc">
      <img src="/images/gd-fail.png" alt="" />
      <p className="DG-desc">
        Đơn hàng có mã {maDonHang || ""} của bạn chưa được thanh toán thành
        công.
      </p>
      <div className="btn-gd-sc">
        <button onClick={() => navigate("/home")}>Về trang chủ</button>
      </div>
    </div>
  );
}
export default GDThatBai;
