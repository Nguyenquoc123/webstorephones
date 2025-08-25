import { useState } from 'react';
import '../menutaikhoan/MenuTaiKhoan.css'
function MenuTaiKhoan({clickSearch}){
    const [search, setSearch] = useState('')
    return (
        <div className="container-menu-tk">
            <div className="menu-search-tk">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <img src="/images/icon-search.png" alt="" onClick={() => clickSearch(search)}/>
            </div>
            <div className="select-trang-thai-tk">
                <select name="" id="">
                    <option value="">Tất cả trạng thái</option>
                    <option value="">Hoạt động</option>
                    <option value="">Bị khóa</option>
                </select>
            </div>
            <div className="btn-menu-tk">
                <button>
                    <img src="/images/ip.png" alt="" />
                    Thêm tài khoản
                </button>
            </div>
        </div>
    
    )
}
export default MenuTaiKhoan;