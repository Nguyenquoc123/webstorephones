import '../dskhachhang/DSKhachHang.css'
function DSKhachhang({ DSKhachhang }) {
    const showNgay = (ngay) => {
        const date = new Date(ngay);
        return date.toLocaleString('vi-VN', {
            'year': 'numeric',
            'month': '2-digit',
            'day' : '2-digit'
        })
    }
    const showTrangThai = (tt) => {
        return tt === 1 ? "Hoạt động" : "Bị khóa"
    }

    return (
        <div className="container-ds-kh">
            <table className="table-ds-kh">
                <thead>
                    <tr>
                        <th>Tên đăng nhập</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Ngày đăng ký</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        DSKhachhang &&
                        DSKhachhang.map(item =>
                            <tr>
                                <td>{item.userName}</td>
                                <td>{item.hoTen}</td>
                                <td>{item.email}</td>
                                <td>{item.soDienThoai}</td>
                                <td>{showTrangThai(item.trangThai)}</td>
                                <td>{showNgay(item.ngayDangKy)}</td>
                                <td>
                                    <div className="btn-action-kh">

                                    </div>
                                </td>
                            </tr>
                        )
                    }

                    
                </tbody>
            </table>
        </div>
    )
}
export default DSKhachhang