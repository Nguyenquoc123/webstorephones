import DSDanhGia from "./dsdanhgia/DSDanhGia";
import ThemDanhGia from "./themdanhgia/ThemDanhGia";
import '../danhgia/DanhGia.css'
import { useEffect, useState } from "react";
import Popup from "../popup/Popup";
function DanhGia({ dsDanhGia, formAddDanhGia, resetFormAddDanhGia, inputData, saveDanhGia }) {
    const [showFormAddDanhGia, setShowFormAddDanhGia] = useState(false);
    const clickCancel = () => {
        setShowFormAddDanhGia(false)
        resetFormAddDanhGia();
    }
    
    useEffect(() => {
        setShowFormAddDanhGia(false)
        resetFormAddDanhGia();
    }, [dsDanhGia])

    
    return (
        <>
            <span className="line"></span>
            <div className="title-danh-gia">
                <h2>Đánh giá sản phẩm</h2>
                <button onClick={() => setShowFormAddDanhGia(true)}>Thêm đánh giá</button>
            </div>
            <ThemDanhGia
                show={showFormAddDanhGia}
                formAddDanhGia={formAddDanhGia}
                clickCancel={clickCancel}
                inpuData={inputData}
                saveDanhGia={saveDanhGia}
            />
            <DSDanhGia
                dsDanhGia={dsDanhGia}

            />

            
        </>
    )
}
export default DanhGia;