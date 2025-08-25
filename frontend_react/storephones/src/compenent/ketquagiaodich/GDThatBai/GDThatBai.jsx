import {useNavigate, useParams } from "react-router-dom";

function GDThatBai(){
    const navigate = useNavigate()
    const {maDonHang} = useParams();
    return(
        <div className="container-gd-sc">
            <img src="/images/gd-fail.png" alt="" />
            <p>Đơn hàng có mã {maDonHang || ''} của bạn chưa được thanh toán thành công.</p>
            <div className="btn-gd-sc">
                <button onClick={() => navigate("/home")}>Về trang chủ</button>
            </div>
        </div>

    )
}
export default GDThatBai