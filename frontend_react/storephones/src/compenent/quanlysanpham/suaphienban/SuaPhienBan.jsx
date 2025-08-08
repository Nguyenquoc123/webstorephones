import { useState } from 'react';
import '../suaphienban/SuaPhienBan.css'

function SuaPhienBan({ menubar, formUpdatePhienBan, dsDienThoai, inputData, clickCancelUpdatePhienBan, clickSaveUpdatePhienBan, delImage }) {
    const [imgNow, setImgNow] = useState(0);
    const changeDienThoai = (e) => {
        inputData('maDienThoai', e.target.value)
    }
    const selectImg = (e) => {
        const value = e.target.files;
        const ds = [...formUpdatePhienBan.image, ...e.target.files]
        const lstFile = ds.filter(
            (file, index, self) =>
                index === self.findIndex(f =>
                    file.name === f.name && file.size === f.size
                )
        )
        inputData('image', lstFile)
    }
    const nextImg = (value) => {
        console.log(imgNow, value)
        if (imgNow > 0 && value < 0 && imgNow - value > 0) {
            console.log(imgNow - value)
            setImgNow(imgNow + value);
        }
        else if (imgNow < formUpdatePhienBan.image.length - 1 && value > 0 && imgNow + value < formUpdatePhienBan.image.length) {
            setImgNow(imgNow + value);
        }
    }


    return (
        <>
            {menubar === 3 && (

                <div className="container-edit-phien-ban">
                    <div className="menu6">
                        <p id="title-menu-edit">Sửa phiên bản điện thoại</p>
                        <div className="content-edit">
                            <div className="select-img-edit">
                                <img className="img-selected-edit2" src={formUpdatePhienBan.image.length > 0 && formUpdatePhienBan.image[imgNow] instanceof File ? URL.createObjectURL(formUpdatePhienBan.image[imgNow]) : formUpdatePhienBan.image[imgNow].url} />
                                <label htmlFor="select-image-edit2" className="select-btn2"> Chọn ảnh</label>
                                <input id="select-image-edit2" type="file" multiple onChange={(e) => selectImg(e, 'img-selected-edit2')} />
                                <button style={{ display: imgNow === 0 ? 'none' : 'block' }} onClick={() => nextImg(-1)} id='next-left'>{'<<'}</button>
                                <button style={{ display: imgNow === formUpdatePhienBan.image.length - 1 ? 'none' : 'block' }} onClick={() => nextImg(1)} id='next-right'>{'>>'}</button>
                                <button id='del-image' style={{ display: formUpdatePhienBan.image.length > 0 ? 'block' : 'none' }} onClick={() => { delImage(imgNow); setImgNow(0) }}>x</button>
                            </div>
                            <div className="main-input-edit">
                                <select id="dien-thoai-edit" onChange={changeDienThoai}>
                                    {
                                        dsDienThoai.length > 0 && (
                                            dsDienThoai.map((dienThoai) => (
                                                <option key={dienThoai.maDienThoai} value={dienThoai.maDienThoai} selected={formUpdatePhienBan.maDienThoai === dienThoai.maDienThoai ? true : false}>{dienThoai.tenDienThoai}</option>
                                            ))
                                        )
                                    }
                                </select>
                                <input id="mau-sac-edit" placeholder="Màu sắc" value={formUpdatePhienBan.mauSac} onChange={(e) => inputData('mauSac', e.target.value)}/>
                                <input id="rom-edit" placeholder="Rom" value={formUpdatePhienBan.rom} onChange={(e) => inputData('rom', e.target.value)}/>
                                <input id="ram-edit" placeholder="Ram" value={formUpdatePhienBan.ram} onChange={(e) => inputData('ram', e.target.value)}/>
                                <input id="so-luong-edit" placeholder="Số lượng" value={formUpdatePhienBan.soLuong} onChange={(e) => inputData('soLuong', e.target.value)}/>
                                <input id="gia-ban-edit" placeholder="Giá bán" value={formUpdatePhienBan.giaBan} onChange={(e) => inputData('giaBan', e.target.value)}/>
                                <input id="pin-edit" placeholder="Pin" value={formUpdatePhienBan.pin} onChange={(e) => inputData('pin', e.target.value)}/>
                                <input id="man-hinh-edit" placeholder="Màn hình" value={formUpdatePhienBan.manHinh} onChange={(e) => inputData('manHinh', e.target.value)}/>
                                <input id="camera-edit" placeholder="Camera" value={formUpdatePhienBan.camera} onChange={(e) => inputData('camera', e.target.value)}/>
                                <textarea id="mo-ta-san-pham-edit" placeholder="Mô tả sản phẩm" value={formUpdatePhienBan.moTa} onChange={(e) => inputData('moTa', e.target.value)}>{formUpdatePhienBan.moTa}</textarea>
                            </div>
                        </div>
                        <div className="btn-edit-phien-ban">
                            <button id="cancel-menu-edit-phien-ban" onClick={clickCancelUpdatePhienBan}>Hủy</button>
                            <button id="save-menu-edit-phien-ban" type="submit" onClick={() => clickSaveUpdatePhienBan(formUpdatePhienBan.maPhienBan)}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}
export default SuaPhienBan;