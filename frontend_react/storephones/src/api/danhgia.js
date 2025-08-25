export async function fetchDSDanhGia(){
    const token = localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/getdsdanhgia',{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const result =await response.json();
        return result;
    } catch (error) {
        return{
            code: -1,
            message: "Lỗi ồi"    
        }
    }
}

export async function fetchDSDanhGiaByMaPhienBan(maPhienBan){
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/getdsdanhgia/${maPhienBan}`,{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const result =await response.json();
        return result;
    } catch (error) {
        return{
            code: -1,
            message: "Lỗi ồi"    
        }
    }
}

export async function fetchAddDanhGia(data) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/adddanhgia',{
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
        if(response.status === 401){
            window.location.href = '/'
        }
        const result =await response.json();
        return result;
    } catch (error) {
        return{
            code: -1,
            message: "Lỗi ồi"    
        }
    }
}