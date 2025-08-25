import { useNavigate } from "react-router-dom";

function LichSuDatHang({dsDonHang}){
    const navigate = useNavigate()
    const showTen = (item) => {
        let ten = '';
        item.ds.forEach(t => {
            ten += t.tenDienThoai + " " + t.rom + " " + t.ram + " " + t.mauSac + "  "
        })
        return ten;
    }
    const showTien = (total) => {
        return total.toLocaleString('vi-VN') + " đ"
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

    const tongSoLuong = (ds) =>{
        let total = 0;
        ds.forEach(item => 
            total += item.soLuong
        )
        return total
    }
    const XemChiTiet = (maDonHang) =>{
        navigate(`/home/chitietdonhang/${maDonHang}`)
    }
    return (
        <div className="container-ds-don-hang-kh">
            <h2>Lịch sử đặt hàng</h2>
            {dsDonHang &&
                dsDonHang.map(item =>
                    <div key={item.maDonHang} className="main-don-hang-kh" onClick={() => XemChiTiet(item.maDonHang)}>
                        <div className="img-don-hang-kh">
                            <img src={item.ds[0].image[0].url} alt="" />
                        </div>
                        <div className="content-don-hang-kh">
                            <h3>{showTen(item)}</h3>
                            <p><strong>Tổng số lượng:</strong> {tongSoLuong(item.ds)}</p>
                            <p><strong>Tổng tiền:</strong> {showTien(item.tongTien)}</p>
                            <p><strong>Trạng thái:</strong> {trangThaiDonHang(item.trangThai)}</p>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
export default LichSuDatHang;