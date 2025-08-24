import { useEffect, useState } from 'react';
import '../chitietdonhang/ChiTietDonHang.css'

function ChiTietDonHang({ dataChiTiet, btnTrangThai, updateTrangThai }) {

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
            return "Giao hàng thành công"
        else if (value === 5)
            return "Giao hàng thất bại"
        else if(value === 6)
            return "Đã hủy"
    }
    const showGiaBan = (value) => {
        if(!value) return '';
        return value.toLocaleString('vi-VN')
    }
    const showToTalSoLuong = (ds) => {
        if(!ds) return '';
        let total = 0;
        ds.forEach(element => {
            total += element.soLuong
        });
        return total;
    }
    const showTongTien = (ds) => {
        if(!ds) return '';
        let total = 0;
        ds.forEach(element => {
            total += (element.soLuong*element.giaBan);
        });
        return total.toLocaleString('vi-VN');
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
        <>


            {dataChiTiet && (
                <div className="main-chi-tiet-don-hang">
                    <h2 id='title-chi-tiet-don-hang'>Chi tiết đơn hàng</h2>
                    <h3 className='title-thong-tin-don-hang'>Thông tin khách hàng</h3>
                    <div className="info">
                        <div>
                            <p><strong>Họ và tên: </strong>{dataChiTiet?.hoTen}</p>
                            <p><strong>SĐT: </strong>{dataChiTiet?.soDienThoai}</p>
                        </div>
                        <div>
                            <p><strong>Email: </strong>{dataChiTiet?.email}</p>
                            <p><strong>Địa chỉ: </strong>{dataChiTiet?.diaChiNhanHang}</p>
                        </div>
                    </div>
                    <h3 className='title-thong-tin-don-hang'>Thông tin sản phẩm</h3>
                    <table className='table-chi-tiet' border={1}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Sản phẩm</th>
                                <th>Giá bán</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataChiTiet &&
                                (dataChiTiet.ds.map(item => (
                                    <tr key={item.maPhienBan}>
                                        <td><img className='img-chi-tiet' src={item.image[0].url} alt="iphone" /></td>
                                        <td>{item.tenDienThoai} {item.rom} {item.ram} {item.mauSac}</td>
                                        <td>{showGiaBan(item.giaBan)} đ</td>
                                        <td>{item.soLuong}</td>
                                        <td>{showGiaBan(item.soLuong*item.giaBan)} đ</td>
                                    </tr>
                                )))
                            }


                            <tr className="total-row">
                                <td id='total' colSpan={3}>Tổng cộng</td>
                                <td>{showToTalSoLuong(dataChiTiet.ds)}</td>
                                <td>{showTongTien(dataChiTiet.ds)} đ</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="note">
                        <strong>Ghi chú:</strong> {dataChiTiet?.ghiChu}
                    </div>

                    <div className="status-don-hang">
                        <strong>Phương thức thanh toán:</strong> {phuongThucThanhToan(dataChiTiet?.phuongThucThanhToan)}
                    </div>
                    <div className="status-don-hang">
                        <strong>Trạng thái đơn hàng:</strong> {trangThaiDonHang(dataChiTiet?.trangThai)}
                    </div>
                    <div className="status-don-hang">
                        <strong>Trạng thái thanh toán:</strong> {trangThaiThanhToan(dataChiTiet?.trangThaiThanhToan)}
                    </div>
                    <div className="action-don-hang">
                        {btnTrangThai[dataChiTiet.trangThai]
                            && (
                                btnTrangThai[dataChiTiet?.trangThai].map((item, index) => (
                                    <button key={index + 1} onClick={() => updateTrangThai(item.trangThai)}>{item.name}</button>
                                ))
                            )

                        }
                    </div>
                </div>
            )}
        </>
    )
}
export default ChiTietDonHang;