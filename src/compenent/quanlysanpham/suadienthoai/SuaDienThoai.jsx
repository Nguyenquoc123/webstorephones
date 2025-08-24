import { useEffect, useState } from 'react';
import '../suadienthoai/SuaDienThoai.css'
import { fetchGetDSDanhMuc } from '../../../api/danhmuc';

function SuaDienThoai({ menubar, formUpdateDienThoai, inputData, clickCancelEdit, clickSaveEditDienThoai }) {
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

    const changeDanhMuc = (e) => {
        const value = e.target.value;
        inputData('maDanhMuc', value);
    }

    return (
        <>
            {
                menubar === 1 && (
                    <div style={{ display: menubar === 1 ? 'block' : 'none' }} className="container-edit">
                        <div className="menu5">
                            <p id="title-menu1">Sửa mẫu điện thoại</p>
                            <div className="content">
                                <div className="select-img">
                                    <img className="img-selected-edit" src={formUpdateDienThoai.image instanceof File ? URL.createObjectURL(formUpdateDienThoai.image) : formUpdateDienThoai.image} />
                                    <label htmlFor="select-image-edit" className="select-btn"> Chọn ảnh</label>
                                    <input id="select-image-edit" type="file" onChange={(e) => inputData('image', e.target.files[0])} />
                                </div>
                                <div className="input-dien-thoai">
                                    <input id="name-dien-thoai-edit" type="text" placeholder="Tên điện thoại" value={formUpdateDienThoai.tenDienThoai} onChange={(e) => inputData('tenDienThoai', e.target.value)}/>
                                    <input id="name-hang-san-xuat-edit" type="text" placeholder="Hãng sản xuất" value={formUpdateDienThoai.hangSanXuat} onChange={(e) => inputData('hangSanXuat', e.target.value)}/>
                                    <select id="select-danh-muc-edit" placeholder="Danh Mục" onChange={changeDanhMuc}>
                                        {
                                            dsDanhMuc.length > 0 && (
                                                dsDanhMuc.map((danhMuc) => (
                                                    <option key={danhMuc.maDanhMuc} value={danhMuc.maDanhMuc}>{danhMuc.tenDanhMuc}</option>
                                                ))
                                            )
                                        }
                                    </select>
                                    <textarea id="mo-ta-edit" placeholder="Mô tả tổng quan" value={formUpdateDienThoai.moTa}  onChange={(e) => inputData('moTa', e.target.value)}>{formUpdateDienThoai.moTa}</textarea>
                                </div>
                            </div>
                            <div className="click-button-edit">
                                <p id="cancel-edit" onClick={clickCancelEdit}>Hủy</p>
                                <p id="save-edit" onClick={() => clickSaveEditDienThoai()}>Lưu</p>
                            </div>
                        </div>
                    </div>
                )
            }

        </>

    )
}

export default SuaDienThoai;