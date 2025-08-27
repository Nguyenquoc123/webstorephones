import '../LoaiThongKe/LoaiThongKe.css'
function LoaiThongKe({ type, value, inputData, clickThongKe}) {
    return (
        <>
            {type === 'year' &&
                <div className="container-year">
                    <input type="number" value={value} placeholder='Nhập năm' onChange={(e) => inputData(e.target.value)}/>
                    <button onClick={clickThongKe}>Ok</button>
                </div>
            }
            {type === 'month' &&
                <div className="container-month">
                    <input type="month" lang="vi" value={value} onChange={(e) => inputData(e.target.value)}/>
                    <button onClick={clickThongKe}>Ok</button>
                </div>
            }
            {type === 'day' &&
                <div className="container-day">
                    <input type="date" value={value} onChange={(e) => inputData(e.target.value)}/>
                    <button onClick={clickThongKe}>Ok</button>
                </div>
            }
        </>
    )
}
export default LoaiThongKe;