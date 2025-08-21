import { useNavigate } from 'react-router-dom'
import '../danhsachmua/DanhSachMua.css'

function DanhSachMua({ lstSanPham, onClose }) {
    const navigate = useNavigate();
    const showTongTien = (lst) => {
        let total = 0
        lst.forEach(item => total += item.soLuong*item.giaBan)
        return total.toLocaleString('vi-VN') + " đ";
    }
    const showThanhTien = (item) => {
        return (item.giaBan*item.soLuong).toLocaleString('vi-VN') + " đ"
    }
    const handleClickMua = () => {
        localStorage.setItem("dsMua", JSON.stringify(lstSanPham))
        navigate("/home/giohang/thongtingiaohang", {state: {dsMua: lstSanPham}})
    }
    return (
        <div className="container-ds-mua">
            <div className="main-ds-mua">
                {lstSanPham && lstSanPham.map(item => (
                    <div className="child-item" key={item.maPhienBan}>
                        <div className="img-child-ds">
                            <img src={item.image} alt="" />
                        </div>
                        <div className="content-child-ds">
                            <h3>{item.tenDienThoai} {item.rom} {item.ram} {item.mauSac}</h3>
                            <p><strong>Số lượng:</strong> {item.soLuong}</p>
                            <p><strong>Giá bán:</strong> {item.giaBan.toLocaleString('vi-VN')} đ</p>
                            <p><strong>Thành tiền:</strong> {showThanhTien(item)}</p>
                        </div>
                    </div>
                ))
                }
                <div className="note-ds">
                    <h3>Tổng tiền: {showTongTien(lstSanPham)}</h3>
                </div>
                <div className="btn-child-ds">
                    <button onClick={() => onClose(false)}>Trở lại</button>
                    <button onClick={handleClickMua}>Tiếp tục</button>
                </div>
            </div>
        </div>
    )
}
export default DanhSachMua;