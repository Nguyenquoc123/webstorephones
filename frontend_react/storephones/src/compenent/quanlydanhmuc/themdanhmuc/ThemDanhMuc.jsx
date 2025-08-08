import '../themdanhmuc/ThemDanhMuc.css'

function ThemDanhMuc({ menubar, formDanhMuc, inputData, clickSave, clickCancelAddDanhMuc}) {
    return (
        <>
            {menubar === 2 && (
                <div className="add-danh-muc" >
                    <p id="title-them-danh-muc">Thêm danh mục</p>
                    <div className="ten-danh-muc">
                        <p>Tên danh mục</p>
                        <input id="ten-input" type="text" value={formDanhMuc.tenDanhMuc} onChange={(e) => inputData('tenDanhMuc', e.target.value)}/>
                    </div>
                    <div className="mo-ta">
                        <p>Mô tả</p>
                        <textarea id="mo-ta-input" value={formDanhMuc.moTa} onChange={(e) => inputData('moTa', e.target.value)}>{formDanhMuc.moTa}</textarea>
                    </div>
                    <div className="submit-btn">
                        <button onClick={clickCancelAddDanhMuc} id="cancel">Hủy</button>
                        <button id="save" onClick={clickSave}>Lưu</button>
                    </div>

                </div>
            )}
        </>
    )
}

export default ThemDanhMuc;