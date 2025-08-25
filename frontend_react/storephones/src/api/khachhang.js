export async function fetchGetThongKeTK() {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/thongketaikhoan`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return {
            code: -1,
            message: "Lỗi ồi"
        }
    }
    
}

export async function fetchGetDSKhachHang() {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/dstaikhoan`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return {
            code: -1,
            message: "Lỗi ồi"
        }
    }
    
}

export async function fetchTimKiemKhachHang(keyword) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/searchkhachhang?keyword=${keyword}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return {
            code: -1,
            message: "Lỗi ồi"
        }
    }
    
}
