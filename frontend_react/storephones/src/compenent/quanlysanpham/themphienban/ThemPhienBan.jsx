import { useState } from 'react'
import '../themphienban/ThemPhienBan.css'

function ThemPhienBan({ menubar, formAddPhienBan, inputData, dsDienThoai, clickSavePhienBanDienThoai, clickCancelThemPhienBan, delImage}) {
    const [imgNow, setImgNow] = useState(0);
    const changeDienThoai = (e) => {
        inputData('maDienThoai', e.target.value)
    }
    const selectImg = (e) => {
        const value = e.target.files;
        const ds = [...formAddPhienBan.image, ...e.target.files]
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
        if(imgNow > 0 && value < 0 && imgNow - value > 0){
            console.log(imgNow-value)
            setImgNow(imgNow + value);
        }
        else if(imgNow < formAddPhienBan.image.length-1 && value > 0 && imgNow + value < formAddPhienBan.image.length){
            setImgNow(imgNow + value);
        }
    }
    return (
        <div className="menu2" style={{ display: menubar === 2 ? 'block' : 'none' }}>
            <p id="title-menu2">Thêm phiên bản mới</p>
            <div className="content2">
                <div className="select-img2">
                    <img className="img-selected2"  src={formAddPhienBan.image.length > 0 && formAddPhienBan.image[imgNow] instanceof File? URL.createObjectURL(formAddPhienBan.image[imgNow]): null}/>
                    <label htmlFor="select-image2" className="select-btn2"> Chọn ảnh</label>
                    <input id="select-image2" multiple type="file" onChange={selectImg} />
                    <button style={{display: imgNow === 0? 'none':'block'}} onClick={() => nextImg(-1)} id='next-left'>{'<<'}</button>
                    <button style={{display: imgNow === formAddPhienBan.image.length-1? 'none':'block'}} onClick={() => nextImg(1)} id='next-right'>{'>>'}</button>
                    <button id='del-image' style={{display: formAddPhienBan.image.length > 0?'block':'none'}} onClick={() =>{delImage(imgNow); setImgNow(0)}}>x</button>
                </div>
                <div className="main-input">
                    <select id="dien-thoai" onChange={changeDienThoai}>
                        {
                            dsDienThoai.length > 0 && (
                                dsDienThoai.map((dienThoai) => (
                                    <option key={dienThoai.maDienThoai} value={dienThoai.maDienThoai}>{dienThoai.tenDienThoai}</option>
                                ))
                            )
                        }

                    </select>
                    <input id="mau-sac" placeholder="Màu sắc" value={formAddPhienBan.mauSac} onChange={(e) => inputData('mauSac', e.target.value)} />
                    <input id="rom" placeholder="Rom" value={formAddPhienBan.rom} onChange={(e) => inputData('rom', e.target.value)} />
                    <input id="ram" placeholder="Ram" value={formAddPhienBan.ram} onChange={(e) => inputData('ram', e.target.value)} />
                    <input id="so-luong" placeholder="Số lượng" value={formAddPhienBan.soLuong} onChange={(e) => inputData('soLuong', e.target.value)} />
                    <input id="gia-ban" placeholder="Giá bán" value={formAddPhienBan.giaBan} onChange={(e) => inputData('giaBan', e.target.value)} />
                    <input id="pin" placeholder="Pin" value={formAddPhienBan.pin} onChange={(e) => inputData('pin', e.target.value)} />
                    <input id="man-hinh" placeholder="Màn hình" value={formAddPhienBan.manHinh} onChange={(e) => inputData('manHinh', e.target.value)} />
                    <input id="camera" placeholder="Camera" value={formAddPhienBan.camera} onChange={(e) => inputData('camera', e.target.value)} />
                    <textarea id="mo-ta-san-pham" placeholder="Mô tả sản phẩm" value={formAddPhienBan.moTa} onChange={(e) => inputData('moTa', e.target.value)}></textarea>
                </div>
            </div>
            <div className="click-button">
                <p id="cancel-menu2" onClick={clickCancelThemPhienBan}>Hủy</p>
                <p id="save-menu2" type="submit" onClick={clickSavePhienBanDienThoai}>Lưu</p>
            </div>
        </div>
    )
}
export default ThemPhienBan;