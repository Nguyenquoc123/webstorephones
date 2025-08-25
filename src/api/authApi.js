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