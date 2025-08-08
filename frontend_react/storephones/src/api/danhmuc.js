import React from "react";

export async function fetchAddDanhMuc(data, token) {
    console.log("Chạy")
    console.log(data)
    console.log(token)
    try {
        const response = await fetch('http://localhost:8080/storephones/adddanhmuc', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {

            const error = await response.json();
            console.log(error.code);
            console.log("run")
            return error;
        }
        const result = await response.json();
        console.log(result.code);
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi hệ thống"
        }
    }

}

export async function fetchGetDSDanhMuc(page){
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/getdsdanhmuc/${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok){
            const error = await response.json();
            return error;
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return {
            code: -1,
            message: 'Error System'
        }
    }
}

export async function fetchUpdateDanhMuc(data){
    const token = localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/updatedanhmuc', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {

            const error = await response.json();
            console.log(error.code);
            console.log("run")
            return error;
        }
        const result = await response.json();
        console.log(result.code);
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi hệ thống"
        }
    }
}
export async function fetchDeleteDanhMuc(maDanhMuc) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8080/storephones/deletedanhmuc/${maDanhMuc}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {

            const error = await response.json();
            console.log(error);
            console.log("run")
            return error;
        }
        const result = await response.json();
        console.log(result.code);
        return result;
    } catch (error) {
        return {
            code: -1,
            message: "Lỗi hệ thống"
        }
    }
}