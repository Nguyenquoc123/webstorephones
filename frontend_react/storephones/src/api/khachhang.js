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

export async function fetchGetDSKhachHang(trangThai) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/dstaikhoan?trangThai=${trangThai}`, {
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

export async function fetchKhoaMoKhachHang(maKhachHang) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/khoamotaikhoan/${maKhachHang}`, {
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
export async function fetchXoa1TaiKhoan(maKhachHang) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/xoamottaikhoan/${maKhachHang}`, {
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

export async function fetchXoaNhieuTaiKhoan(data) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/xoanhieutaikhoan`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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

export async function fetchEditKhachHang(data) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/editkhachhang`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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