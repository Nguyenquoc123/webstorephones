import react from "react";

export async function fetchLogin(data) {
    try {
        console.log(data);
        const response = await fetch('http://localhost:8080/storephones/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        return {
            code: -1,
            message: 'Error Vớ Vẫn nào đó'
        }
    }

}

export async function fetchSigup(data) {
    try {
        console.log(data)
        const response = await fetch('http://localhost:8080/storephones/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        return {
            code: -1,
            message: 'Lỗi vớ vẫn nào đó'
        }
    }
}

export async function fetchGetInfo() {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/getinfo', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return{
            code: -1,
            message: 'Lỗi ồi'
        }
    }
    
}
export  async function fetchUpdateInfo(data) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/updateinfo', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return{
            code: -1,
            message: 'Lỗi ồi'
        }
    }
    
}

export  async function fetchChangePassword(data) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:8080/storephones/changepassword', {
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
        return{
            code: -1,
            message: 'Lỗi ồi'
        }
    }
    
}

