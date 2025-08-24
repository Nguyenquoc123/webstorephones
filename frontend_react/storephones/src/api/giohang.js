export async function fetchGetDSInGioHang() {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch("http://localhost:8080/storephones/getdsgiohang", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,

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

export async function fetchAddVaoGioHang(data) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/themvaogiohang', {
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
            message: "Error ồi"
        }
    }

}
export async function fetchXoaKhoiGioHang(maPhienBan) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/xoakhoigiohang/${maPhienBan}`, {
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

export async function fetchCheckSoLuong(data) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/checksoluong`, {
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