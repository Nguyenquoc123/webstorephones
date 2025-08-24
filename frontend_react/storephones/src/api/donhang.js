export async function fetchGetDSDonHang() {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:8080/storephones/getdsdonhang', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return (
            {
                code: -1,
                message: "Lôi ồi"
            }
        )
    }

}

export async function fetchGetDSDonHangByTrangThai(trangThai) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:8080/storephones/getdsdonhang/${trangThai}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return (
            {
                code: -1,
                message: "Lôi ồi"
            }
        )
    }

    
}

export async function fetchGetChiTietDonHang(maDonHang) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:8080/storephones/getindonhang/${maDonHang}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return (
            {
                code: -1,
                message: "Lôi ồi"
            }
        )
    }
}

export async function fetchUpdateTrangThaiDonHang(data) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:8080/storephones/updatetrangthai', {
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
        return (
            {
                code: -1,
                message: "Lôi ồi"
            }
        )
    }
}


export async function fetchAddDonHang(data) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:8080/storephones/adddonhang', {
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
        return (
            {
                code: -1,
                message: "Lôi ồi"
            }
        )
    }
}


export async function fetchGetDSDonHangKhachHang() {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:8080/storephones/dsdonhangkhachhang`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        return (
            {
                code: -1,
                message: "Lôi ồi"
            }
        )
    }

    
}