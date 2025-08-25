import '../chitietdonhangkhachhang/ChiTietDonHangKhachHang.css'
function ChiTietDonHangKhachHang({ ChiTietDonHang , huyDonHang}) {
    const showThongTin = (item) => {
        if (!item) return ''
        let thongtin = 'Họ và tên: ' + item.hoTen + ' - Email: '
            + item.email + ' - SĐT: ' +
            item.soDienThoai + ' - Địa chỉ: ' + item.diaChiNhanHang;
        return thongtin;
    }
    const TongTien = (ChiTietDonHang) => {
        if(!ChiTietDonHang) return '';
        let total = 0
        ChiTietDonHang.ds.forEach(item => total += item.soLuong*item.giaBan)
        return total.toLocaleString('vi-VN') + ' đ'
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

    const trangThaiThanhToan = (value) => {
        if (value === 1) {
            return "Chưa thanh toán";
        }
        else if (value === 2) {
            return "Thanh toán thành công"
        }
        else if (value === 3)
            return "Thanh toán thất bại"
        
    }

    const phuongThucThanhToan = (value) => {
        if (value === 1) {
            return "Thanh toán khi nhận hàng";
        }
        else if (value === 2) {
            return "Thanh toán online"
        }
    }
    
    return (
        <div className="container-chi-tiet-don-hang-kh">
            <h2>Chi tiết đơn hàng</h2>
            <div className="thong-tin-kh-chi-tiet">
                <p><strong>Thông tin nhận hàng: </strong>{showThongTin(ChiTietDonHang)}</p>
            </div>
            <div className="main-ds-chi-tiet-don-hang-kh">
                {ChiTietDonHang &&
                    ChiTietDonHang.ds.map(item =>
                        <div key={item.maDonHang} className="main-chi-tiet-don-hang-kh">
                            <div className="img-chi-tiet-don-hang-kh">
                                <img src={item.image[0].url} alt="" />
                            </div>
                            <div className="content-chi-tiet-don-hang-kh">
                                <h3>{item.tenDienThoai} {item.rom} {item.ram} {item.mauSac}</h3>
                                <p><strong>Số lượng:</strong> {item.soLuong}</p>
                                <p><strong>Giá bán:</strong> {item.giaBan.toLocaleString('vi-VN')} đ</p>

                            </div>
                        </div>
                    )
                }



            </div>

            <div className="total-chi-tiet-kh">
                <h3>Tổng tiền: </h3>
                <span>{TongTien(ChiTietDonHang)}</span>
            </div>
            <div className="trang-thai-chi-tiet-kh">
                <h3>Phương thức thanh toán: </h3>
                {ChiTietDonHang && <span>{phuongThucThanhToan(ChiTietDonHang.phuongThucThanhToan)}</span>}
            </div>
            <div className="trang-thai-chi-tiet-kh">
                <h3>Trạng thái đơn hàng: </h3>
                {ChiTietDonHang && <span>{trangThaiDonHang(ChiTietDonHang.trangThai)}</span>}
            </div>
            <div className="trang-thai-chi-tiet-kh">
                <h3>Trạng thái thanh toán: </h3>
                {ChiTietDonHang && <span>{trangThaiThanhToan(ChiTietDonHang.trangThaiThanhToan)}</span>}
            </div>


            {ChiTietDonHang && ChiTietDonHang.trangThai === 1 &&
                <button className='huy-don' onClick={() => huyDonHang(ChiTietDonHang.maDonHang)}>Hủy đơn</button>
            }
        </div>
    )
}
export default ChiTietDonHangKhachHang;