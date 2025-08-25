import { useNavigate, useParams } from 'react-router-dom';
import '../GDThanhCong/GDThanhCong.css'
function GDThanhCong(){
    const {maDonHang} = useParams();
    const navigate = useNavigate()
    return(
        <div className="container-gd-sc">
            <img src="/images/gd-success.png" alt="" />
            <p>Đơn hàng có mã {maDonHang || ''} của bạn đã được thanh toán thành công</p>
            <div className="btn-gd-sc">
                <button onClick={() => navigate('/home')}>Về trang chủ</button>
                <button onClick={() => navigate(`/home/chitietdonhang/${maDonHang}`)}>Xem chi tiết</button>
            </div>
        </div>

    )
}
export default GDThanhCong