import '../themdanhgia/ThemDanhGia.css'

function ThemDanhGia({ show, formAddDanhGia, clickCancel, inpuData, saveDanhGia}) {
    return (
        <>
            {
                show && (
                    <div className='them-danh-gia'>
                        <div className="main-them-danh-gia">
                            <h2>Thêm đánh giá</h2>
                            <div className="star">
                                <span style={{color: formAddDanhGia.soSao >= 1?"yellow":"black"}}  onClick={() => inpuData("soSao", 1)}>★	</span>
                                <span style={{color: formAddDanhGia.soSao >= 2?"yellow":"black"}}  onClick={() => inpuData("soSao", 2)}>★	</span>
                                <span style={{color: formAddDanhGia.soSao >= 3?"yellow":"black"}}  onClick={() => inpuData("soSao", 3)}>★	</span>
                                <span style={{color: formAddDanhGia.soSao >= 4?"yellow":"black"}}  onClick={() => inpuData("soSao", 4)}>★	</span>
                                <span style={{color: formAddDanhGia.soSao >= 5?"yellow":"black"}}  onClick={() => inpuData("soSao", 5)}>★	</span>
                            </div>
                            <textarea className='content-danh-gia' name="" id="" value={formAddDanhGia.noiDung} onChange={(e) => inpuData("noiDung", e.target.value)}>{formAddDanhGia.noiDung}</textarea>
                            <div className="btn-danh-gia">
                                <button className='cancel' onClick={() => clickCancel(false)}>Hủy bỏ</button>
                                <button className='active' onClick={saveDanhGia}>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}
export default ThemDanhGia