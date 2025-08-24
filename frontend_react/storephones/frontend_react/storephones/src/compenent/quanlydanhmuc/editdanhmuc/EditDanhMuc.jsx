import '../editdanhmuc/EditDanhMuc.css'

function EditDanhMuc({ menubar, formDanhMuc, inputData, clickCancelEditDanhMuc, clickSaveEditDanhMuc}) {
    return (
        <>
            {menubar === 1 && (
                <div className="container-edit-danh-muc">
                    <div className="edit-danh-muc" value={1}>
                        <p id="title-edit-danh-muc">Sửa danh mục</p>
                        <div className="ten-danh-muc-edit">
                            <p>Tên danh mục</p>
                            <input id="ten-input-edit" type="text" value={formDanhMuc.tenDanhMuc} onChange={(e) => inputData('tenDanhMuc', e.target.value)}/>
                        </div>
                        <div className="mo-ta-edit">
                            <p>Mô tả</p>
                            <textarea id="mo-ta-input-edit" value={formDanhMuc.moTa} onChange={(e) => inputData('moTa', e.target.value)}>{formDanhMuc.moTa}</textarea>
                        </div>
                        <div className="submit-btn-edit">
                            <button onClick={clickCancelEditDanhMuc} id="cancel-edit">Hủy</button>
                            <button id="save-edit" onClick={() => clickSaveEditDanhMuc(formDanhMuc.maDanhMuc)}>Lưu</button>
                        </div>

                    </div>

                </div>
            )}
        </>
    )
}

export default EditDanhMuc;