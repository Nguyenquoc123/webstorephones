import react, { useState } from "react";

import '../signup/Signup.css'
import { useNavigate } from "react-router-dom";
import { fetchSigup } from "../../api/authApi";
import Loading from "../loading/Loading"

function Signup() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        email: '',
        userName: '',
        hoTen: '',
        soDienThoai: '',
        gioiTinh: 'Nam',
        ngaySinh: '',
        password: '',
        againpassword: ''
    })

    const [err, setErr] = useState({
        email: '',
        userName: '',
        hoTen: '',
        soDienThoai: '',
        gioiTinh: 'Nam',
        ngaySinh: '',
        password: '',
        againpassword: ''
    })

    const validCheck = () => {
        let hasError = false;
        let newErr = {
            email: '',
            userName: '',
            hoTen: '',
            soDienThoai: '',
            gioiTinh: 'Nam',
            ngaySinh: '',
            password: '',
            againpassword: ''
        }
        // check username
        if (!formInput.userName.trim()) {
            newErr.userName = "Vui lòng nhập username";
            hasError = true;
        } else if (formInput.userName.length < 6) {
            newErr.userName = "Username phải có ít nhất 6 ký tự";
            hasError = true;
        } else if (!/^[A-Za-z0-9]+$/.test(formInput.userName)) {
            newErr.userName = "Username chỉ được chứa chữ và số";
            hasError = true;
        }

        // email
        if (!formInput.email.trim()) {
            newErr.email = "Vui lòng nhập email";
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formInput.email)) {
            newErr.email = "Email không hợp lệ";
            hasError = true;
        }
        // số điện thoại
        if (!formInput.soDienThoai.trim()) {
            newErr.soDienThoai = "Vui lòng nhập số điện thoại";
            hasError = true;
        } else if (!/^(0[0-9]{9,10})$/.test(formInput.soDienThoai)) {
            newErr.soDienThoai = "Số điện thoại không hợp lệ";
            hasError = true;
        }
        // họ và tên
        if (!formInput.hoTen.trim()) {
            newErr.hoTen = "Vui lòng nhập họ và tên";
            hasError = true;
        } else if (!/^[\p{L}\s]+$/u.test(formInput.hoTen)) {
            newErr.hoTen = "Họ và tên chỉ chứa chữ cái";
            hasError = true;
        }
        // ngày sinh
        if (!formInput.ngaySinh) {
            newErr.ngaySinh = "Vui lòng nhập ngày sinh";
            hasError = true;
        } else {
            const today = new Date();
            const ngaySinh = new Date(formInput.ngaySinh);
            if (ngaySinh > today) {
                newErr.ngaySinh = "Ngày sinh không hợp lệ";
                hasError = true;
            }
        }
        // check password
        if (!formInput.password.trim()) {
            newErr.password = "Vui lòng nhập password";
            hasError = true;
        } else if (formInput.password.length < 8) {
            newErr.password = "Password phải có ít nhất 8 ký tự";
            hasError = true;
        }
        // confirm password
        if (!formInput.againpassword.trim()) {
            newErr.againpassword = "Vui lòng nhập lại password";
            hasError = true;
        } else if (formInput.againpassword !== formInput.password) {
            newErr.confirmPassword = "Mật khẩu nhập lại không khớp";
            hasError = true;
        }
        setErr(newErr);
        return !hasError;
    }
    const handleclick = () => {
        navigate('/');
    }
    const clickSignup = async (e) => {
        e.preventDefault();

        //check valid
        if (!validCheck())
            return;

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
        setLoading(true)
        const result = await fetchSigup(data);
        setLoading(false)
        console.log("no");
        console.log(result);
        if (result.code === 200) {
            localStorage.setItem("token", result.result.token);
            navigate('/home');
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

    const changeInput = (key, value) => {
        setFormInput({ ...formInput, [key]: value })
    }
    return (
        <div className="containersignup">
            <form id="signup">
                <p id="signup-title">Đăng ký</p>
                <div className="username">
                    <img src='/images/user.png' />
                    <input id="username" type="text" placeholder="username" name="username" value={formInput.userName} onChange={(e) => changeInput('userName', e.target.value)} />
                    {err.userName && <span className="Err">{err.userName}</span>}
                </div>
                <div className="email">
                    <img src='/images/email.png' />
                    <input id="email" type="email" placeholder="Email" name="email" value={formInput.email} onChange={(e) => changeInput('email', e.target.value)} />
                    {err.email && <span className="Err">{err.email}</span>}
                </div>
                <div className="sdt">
                    <img src='/images/phone-call.png' />
                    <input id="sdt" type="number" placeholder="Số điện thoại" name="sdt" value={formInput.soDienThoai} onChange={(e) => changeInput('soDienThoai', e.target.value)} />
                    {err.soDienThoai && <span className="Err">{err.soDienThoai}</span>}
                </div>
                <div className="ho-ten">
                    <img src='/images/user.png' />
                    <input id="hoten" type="text" placeholder="Họ và tên" name="hoten" value={formInput.hoTen} onChange={(e) => changeInput('hoTen', e.target.value)} />
                    {err.hoTen && <span className="Err">{err.hoTen}</span>}
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
                    {err.ngaySinh && <span className="Err">{err.ngaySinh}</span>}
                </div>
                <div className="password">
                    <img src='/images/password.png' />
                    <input id="password" type="password" placeholder="mật khẩu" name="password" value={formInput.password} onChange={(e) => changeInput('password', e.target.value)} />
                    {err.password && <span className="Err">{err.password}</span>}
                </div>
                <div className="password">
                    <img src='/images/password.png' />
                    <input id="password-again" type="password" placeholder="nhập lại mật khẩu" name="password" value={formInput.againpassword} onChange={(e) => changeInput('againpassword', e.target.value)} />
                    {err.againpassword && <span className="Err">{err.againpassword}</span>}
                </div>
                <button id="click-signup" type="submit" onClick={clickSignup}>Đăng ký</button>
                <div className="change-login">
                    <p>Đã có tài khoản.</p>
                    <a onClick={handleclick}>Đăng nhập</a>
                </div>
            </form>

            <Loading show={loading} />
        </div>
    )

}

export default Signup;
