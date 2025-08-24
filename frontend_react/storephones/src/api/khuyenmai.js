export async function fetchGetDSKhuyenMai() {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/getdskhuyenmai', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const result = await response.json();
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "lỗi ồi"
        }
    }
}

export async function fetchAddKhuyenMai(data) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/addkhuyenmai', {
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
        return {
            code: -1,
            message: "lỗi ồi"
        }
    }
}

export async function fetchUpdateKhuyenMai(data) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/updatekhuyenmai', {
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
        return {
            code: -1,
            message: "lỗi ồi"
        }
    }
}

export async function fetchDeleteKhuyenMai(maKhuyenMai) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/deletekhuyenmai/${maKhuyenMai}`, {
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