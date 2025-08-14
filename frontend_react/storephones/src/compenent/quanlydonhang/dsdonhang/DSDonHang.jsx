
import '../dsdonhang/DSDonHang.css'
function DSDonHang({ dsDonHang, clickXemChiTiet }) {
    const thanhToan = (value) => {
        return value ? "Đã thanh toán" : "Chưa thanh toán";
    }
    const phuongThucThanhToan = (value) => {
        if (value === 1) {
            return "Thanh toán khi nhận hàng";
        }
        return "Thanh toán online";
    }
    const trangThaiDonHang = (value) => {
        if (value === 1) {
            return "Đang chờ xử lý";
        }
        else if (value === 2) {
            return "Đã xác nhận"
        }
        else if (value === 3)
            return "Đang giao hàng"
        else if (value === 4)
            return "Đã giao hàng"
        else if (value === 5)
            return "Giao hàng thất bại"
        else if(value === 6)
            return "Đã hủy"
    }

    return (
        <div className="main-don-hang">
            <h2 id='title-don-hang'>Danh sách đơn hàng</h2>
            <div className="content-don-hang">
                <table className='table-don-hang' border={1}>
                    <thead id='thead-don-hang'>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Ngày đặt hàng</th>
                            <th>Thông tin khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Thanh toán</th>
                            <th>Hình thức thanh toán</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dsDonHang &&
                            (
                                dsDonHang.map(item => (
                                    <tr key={item.maDonHang}>
                                        <td>{item.maDonHang}</td>
                                        <td>{item.ngayTao}</td>
                                        <td className='thong-tin-khach-hang'>
                                            <p>{item.hoTen}</p>
                                            <p>SĐT: {item.soDienThoai}</p>
                                            <p>Email: {item.email}</p>
                                            <p>Địa chỉ: {item.diaChiNhanHang}</p>
                                        </td>
                                        <td>{item.tongTien}</td>
                                        <td>{thanhToan(item.trangThaiThanhToan)}</td>
                                        <td>{phuongThucThanhToan(item.phuongThucThanhToan)}</td>
                                        <td>{trangThaiDonHang(item.trangThai)}</td>
                                        <td><button className='xem-don-hang' onClick={() => clickXemChiTiet(item.maDonHang)}>Xem chi tiết</button></td>
                                    </tr>
                                ))
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DSDonHang;