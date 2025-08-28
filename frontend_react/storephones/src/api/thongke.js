
export async function fetchGetDashBoard(param) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/getdashboard?${param}`, {
            method: "GET",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi ồi"
        }
    }
    
}

export async function fetchGetDoanhThu(param) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/getdoanhthu?${param}`, {
            method: "GET",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi ồi"
        }
    }
    
}
export async function fetchGetTKDanhMuc(param) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/gettkdanhmuc?${param}`, {
            method: "GET",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi ồi"
        }
    }
    
}

export async function fetchGetSPNoiBat(param) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/getspbanchay?${param}`, {
            method: "GET",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi ồi"
        }
    }
    
}

export async function fetchGetDashBoardKhachHang(param) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/getdashboardkhachhang?${param}`, {
            method: "GET",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi ồi"
        }
    }
    
}
export async function fetchGetTKKhachHang(param) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/getsoluongkhachhang?${param}`, {
            method: "GET",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi ồi"
        }
    }
    
}
export async function fetchGetTKDSKhachHang(param) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/gettkdskhachhang?${param}`, {
            method: "GET",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi ồi"
        }
    }
    
}