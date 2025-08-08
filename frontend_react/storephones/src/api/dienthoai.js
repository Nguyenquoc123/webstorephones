import React from "react";
export async function fetchGetDSDienThoai() {
    const token =localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/getdsdienthoai', {
            method:'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

    
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            code: -1,
            message: 'Lỗi hệ thống.'
        }
    }
}

export async function fetchGetDSPhienBanByDienThoai(maDienThoai){
    const token = localStorage.getItem('token')
    try {
       const response = await fetch(`http://localhost:8080/storephones/getdsphienbanbydienthoai/${maDienThoai}`, {
            method:'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

    
        const result = await response.json();
        return result;
    } catch (error) {
        return{
            code: -1,
            message:'Error System.'
        }
    }
}
export async function fetchAddPhienBan(data){
    const token =localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/addphienban', {
            method:'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: data
        })

    
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
        return{
            code: -1,
            message: "Lỗi ồi"
        }
    }
}
export async function fetchUpdatePhienBan(data) {
    const token =localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/updatephienban', {
            method:'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: data
        })

        
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
        return{
            code: -1,
            message: "Lỗi ồi"
        }
    }
}
export async function fetchDetelePhienBan(maPhienBan) {
    const token =localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/deletephienban/${maPhienBan}`, {
            method:'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

    
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi hệ thống"
        }
    }
}

export async function fetchGetDSPhienBan() {
    const token =localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/getdsphienban', {
            method:'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

    
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            code: -1,
            message: 'Lỗi hệ thống.'
        }
    }
}
export async function fetchAddDienThoai(data){
    const token =localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/adddienthoai', {
            method:'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: data
        })

    
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
        return{
            code: -1,
            message: "Lỗi ồi"
        }
    }
}
export async function fetchUpdateDienThoai(data) {
    const token =localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/updatedienthoai', {
            method:'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: data
        })

        
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
        return{
            code: -1,
            message: "Lỗi ồi"
        }
    }
}
export async function fetchDeteleDienThoai(madienthoai) {
    const token =localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/deletedienthoai/${madienthoai}`, {
            method:'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

    
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi hệ thống"
        }
    }
}