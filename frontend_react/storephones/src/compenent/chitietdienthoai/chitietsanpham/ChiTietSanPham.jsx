
import '../chitietsanpham/ChiTietSanPham.css'
import { fetchGetDSPhienBanByDienThoai } from '../../../api/dienthoai';
import { useState } from 'react';

function ChiTietSanPham({dsPhienBan, selectNow, clickChangeCauHinh, clickChangeMauSac, soLuong, changeSoLuong, themVaoGioHang}) {
    const [imgNow, setImgNow] = useState(0);
    const clickNextImg = (value)=>{
        console.log("run", imgNow+1)
        if(value < 0){
            if(imgNow > 0)
                setImgNow(imgNow-1);
            else{
                setImgNow(selectNow.image.length-1);
            }
        }
        else if(value > 0 ){
            if(imgNow < selectNow.image.length -1)
                setImgNow(imgNow+1);
            else{
                setImgNow(0)
            }
            
        }
    }
    const clickChangeSoLuong = (value) =>{
        if(value < 0 && soLuong > 1){
            changeSoLuong(Number.parseInt(soLuong) - 1)
        }
        else if(value > 0 ){
            changeSoLuong(Number.parseInt(soLuong) + 1)
        }
    }
    return (
        <div className="content-details">
            <div className="dien-thoai">
                <div className="img">
                    <img src={selectNow ? selectNow.image[imgNow].url : null} alt="" />
                    <button id='left-img' onClick={() => clickNextImg(-1)}>{"<"}</button>
                    <button id='right-img' onClick={() => clickNextImg(1)}>{">"}</button>
                </div>
                <div className="thong-tin">
                    <h2>{selectNow !== null ? selectNow.tenDienThoai : ""}</h2>

                    <div className="cau-hinh">
                        <h3>Cấu hình:</h3>
                        <div className="main-cau-hinh">
                            {
                                Array.from(dsPhienBan.keys()).map(
                                    (key) => (
                                        <button className={key == `${selectNow.ram}-${selectNow.rom}` ? 'selected' : ''} onClick={() => clickChangeCauHinh(key)} key={key}>{key}</button>
                                    )
                                )
                            }


                        </div>
                    </div>
                    <div className="mau-sac">
                        <h3>Màu sắc:</h3>
                        <div className="main-mau-sac">
                            {

                                dsPhienBan.size > 0 && dsPhienBan.get(`${selectNow.ram}-${selectNow.rom}`).map(
                                    (item) => (
                                        <div key={item.maPhienBan} onClick={() => clickChangeMauSac(`${item.ram}-${item.rom}`, item.maPhienBan)} className={`child-mau-sac-gia ${item.maPhienBan === selectNow.maPhienBan ? 'selected' : ''}`}>
                                            <img src={item.image[0].url} alt="" />
                                            <div className="mau-sac-gia">
                                                <p>{item.mauSac}</p>
                                                <p>{item.giaBan}đ</p>
                                            </div>
                                        </div>
                                    )
                                )
                            }



                        </div>
                    </div>

                    <div className="so-luong">
                        <h3>Số lượng:</h3>
                        <div className="btn-so-luong">
                            <button onClick={() => clickChangeSoLuong(-1)}>-</button>
                            <input type="text" value={soLuong} onChange={(e) => changeSoLuong(e.target.value)}/>
                            <button onClick={() => clickChangeSoLuong(1)}>+</button>
                        </div>
                    </div>
                    <div className="kho">
                        <h3>Kho:</h3>
                        <span>{selectNow !== null ? selectNow.soLuong : ""}</span>
                    </div>
                    <div className="btn-chi-tiet">
                        <button id="mua-ngay">Mua ngay</button>
                        <div className="btn-gio-hang" onClick={themVaoGioHang}>
                            <button>Thêm vào giỏ hàng</button>
                            <img src="/images/ip.png" alt="" />
                        </div>
                    </div>
                </div>


            </div>
            <span className='line'></span>
        </div>
    )
}

export default ChiTietSanPham;