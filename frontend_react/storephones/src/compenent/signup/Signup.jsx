import react, { useState } from "react";

import '../signup/Signup.css'
import { useNavigate } from "react-router-dom";
import { fetchSigup } from "../../api/authApi";

function Signup() {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        email:'',
        userName:'',
        hoTen:'',
        soDienThoai:'',
        gioiTinh:'Nam',
        ngaySinh:'',
        password:'',
        againpassword:''
    })


    const handleclick = () => {
        navigate('/');
    }
    const clickSignup = async (e) => {
        e.preventDefault();
        if (formInput.password !== formInput.againpassword) {
            console.log(formInput.password, "   ", formInput.againpassword)
            console.log('con gà');
            return;
        }

        const data = {
            "email": formInput.email,
            "userName": formInput.userName,
            "hoTen": formInput.hoTen,
            "soDienThoai": formInput.soDienThoai,
            "gioiTinh": getGender(formInput.gioiTinh),
            "ngaySinh": formInput.ngaySinh,
            "password": formInput.password
        }
        console.log(formInput)
        const result = await fetchSigup(data);
        console.log("no");
        console.log(result);
        if (result.code === 200) {
            localStorage.setItem("token", result.result.token);
            navigate(`/home/${result.result.id}`);
        }

    }
    

    const getGender = (gender) => {
        console.log(gender)
        if (gender === "Nam")
            return 1;
        else if (gender === "Nữ")
            return 2;
        else if (gender === "Khác")
            return 3;
    }

    const changeInput = (key, value) =>{
        setFormInput({...formInput, [key]: value})
    }
    return (
        <div className="containersignup">
        <form id="signup">
            <p id="signup-title">Đăng ký</p>
            <div className="username">
                <img src='/images/user.png' />
                <input id="username" type="text" placeholder="username" name="username" value={formInput.userName} onChange={(e) => changeInput('userName', e.target.value)}/>
            </div>
            <div className="email">
                <img src='/images/email.png' />
                <input id="email" type="text" placeholder="Email" name="email" value={formInput.email} onChange={(e) => changeInput('email', e.target.value)}/>
            </div>
            <div className="sdt">
                <img src='/images/phone-call.png' />
                <input id="sdt" type="text" placeholder="Số điện thoại" name="sdt" value={formInput.soDienThoai} onChange={(e) => changeInput('soDienThoai', e.target.value)}/>
            </div>
            <div className="ho-ten">
                <img src='/images/user.png' />
                <input id="hoten" type="text" placeholder="Họ và tên" name="hoten" value={formInput.hoTen} onChange={(e) => changeInput('hoTen', e.target.value)}/>
            </div>
            <div className="gioi-tinh">
                <p>Giới tính:</p>
                <input type="radio" value="Nam" checked={formInput.gioiTinh === "Nam"} onChange={(e) => changeInput('gioiTinh', e.target.value)} /> Nam
                <input type="radio" value="Nữ" checked={formInput.gioiTinh === "Nữ"} onChange={(e) => changeInput('gioiTinh', e.target.value)} /> Nữ
                <input type="radio" value="Khác" checked={formInput.gioiTinh === "Khác"} onChange={(e) => changeInput('gioiTinh', e.target.value)} /> Khác

            </div>
            <div className="ngay-sinh">
                <label>Ngày sinh:</label>
                <input type="date" lang="vi" value={formInput.ngaySinh} onChange={(e) => changeInput('ngaySinh', e.target.value)} />
            </div>
            <div className="password">
                <img src='/images/password.png' />
                <input id="password" type="password" placeholder="mật khẩu" name="password" value={formInput.password} onChange={(e) => changeInput('password', e.target.value)}/>
            </div>
            <div className="password">
                <img src='/images/password.png' />
                <input id="password-again" type="password" placeholder="nhập lại mật khẩu" name="password" value={formInput.againpassword} onChange={(e) => changeInput('againpassword', e.target.value)}/>
            </div>
            <button id="click-signup" type="submit" onClick={clickSignup}>Đăng ký</button>
            <div className="change-login">
                <p>Đã có tài khoản.</p>
                <a onClick={handleclick}>Đăng nhập</a>
            </div>
        </form>
        </div>
    )

}

export default Signup;
