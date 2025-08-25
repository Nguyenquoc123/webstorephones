import '../thongketaikhoan/ThongKeTaiKhoan.css'
function ThongKeTaiKhoan({thongKe}) {
    return (
        <div className="container-thong-ke-tk">
            <div className="tk-tong">
                <p className='title-tk'>Tổng tài khoản</p>
                <p>{thongKe?.tongTaiKhoan}</p>
            </div>
            <div className="tk-tong">
                <p className='title-tk'>Hoạt động</p>
                <p>{thongKe?.hoatDong}</p>
            </div>
            <div className="tk-tong">
                <p className='title-tk'>Bị khóa</p>
                <p>{thongKe?.biKhoa}</p>
            </div>
            <div className="tk-tong">
                <p className='title-tk'>Mới đăng ký</p>
                <p>{thongKe?.moiDangKy}</p>
            </div>
        </div>


    )
}
export default ThongKeTaiKhoan