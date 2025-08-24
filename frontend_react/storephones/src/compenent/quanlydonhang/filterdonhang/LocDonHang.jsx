import { useState } from 'react';
import '../filterdonhang/LocDonHang.css'
function LocDonHang({ clickFilter }) {
    const [trangThai, setTrangThai] = useState(-1);

    return (
        <div className="loc-don-hang">
            <select name="loc-don-hang" id="" onChange={(e) => setTrangThai(e.target.value)}>
                <option value="-1">Tất cả</option>
                <option value="1">Đang chờ xử lý</option>
                <option value="2">Đã xác nhận</option>
                <option value="3">Đang giao hàng</option>
                <option value="4">Giao hàng thành công</option>
                <option value="5">Giao hàng thất bại</option>
                <option value="6">Đã hủy</option>
            </select>
            <button id="btn-don-hang" onClick={() => clickFilter(trangThai)}>Lọc</button>
        </div>
    )
}
export default LocDonHang;