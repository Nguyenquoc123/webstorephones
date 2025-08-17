import { useEffect, useState } from 'react';
import '../themdienthoai/themdienthoai.css'
import { fetchGetDSDanhMuc } from '../../../api/danhmuc';

function ThemDienThoai({ formAddDienThoai, inputData, menubar, clickSaveDienThoai, clickCancelThemDienThoai, delImage}) {
    const [dsDanhMuc, setDSDanhMuc] = useState([]);

    useEffect(() => {
        const fetchDanhMuc = async () => {
            const result = await fetchGetDSDanhMuc();
            console.log(result);
            if (result.code === 200) {
                setDSDanhMuc(result.result)
            }
        }
        fetchDanhMuc();
    }, [])

    const changeDanhMuc = (e) =>{
        const value = e.target.value;
        inputData('maDanhMuc', value);
    }
    return (
        <div className="menu1" style={{ display: menubar === 1 ? 'block' : 'none' }}>
            <p id="title-menu1">Thêm mẫu điện thoại mới</p>
            <div className="content">
                <div className="select-img">
                    <img className="img-selected" src={formAddDienThoai.image instanceof File? URL.createObjectURL(formAddDienThoai.image) : null} />
                    <label htmlFor="select-image" className="select-btn"> Chọn ảnh</label>
                    <input id="select-image" type="file" onChange={(e) => inputData('image', e.target.files[0])} />
                    <button id='del-image' style={{display: formAddDienThoai.image?'block':'none'}} onClick={delImage}>x</button>
                </div>
                <div className="input-dien-thoai">
                    <input id="name-dien-thoai" name='tenDienThoai' type="text" placeholder="Tên điện thoại" value={formAddDienThoai.tenDienThoai} onChange={(e) => inputData('tenDienThoai', e.target.value)} />
                    <input id="name-hang-san-xuat" name='hangSanXuat' type="text" placeholder="Hãng sản xuất" value={formAddDienThoai.hangSanXuat} onChange={(e) => inputData('hangSanXuat', e.target.value)}/>
                    <select id="select-danh-muc" placeholder="Danh Mục" onChange={changeDanhMuc}>
                        {
                            dsDanhMuc.length > 0 && (
                                dsDanhMuc.map((danhMuc) => (
                                    <option key={danhMuc.maDanhMuc} value={danhMuc.maDanhMuc}>{danhMuc.tenDanhMuc}</option>
                                ))
                            )
                        }
                    </select>
                    <textarea id="mo-ta" name='moTa' placeholder="Mô tả tổng quan" value={formAddDienThoai.moTa} onChange={(e) => inputData('moTa', e.target.value)}></textarea>
                </div>
            </div>
            <div className="click-button">
                <p onClick={clickCancelThemDienThoai}>Hủy</p>
                <p type="submit" onClick={clickSaveDienThoai}>Lưu</p>
            </div>
        </div>
    )
}

export default ThemDienThoai;