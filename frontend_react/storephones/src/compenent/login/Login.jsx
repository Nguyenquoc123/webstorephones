import react, { useState } from "react";
import '../login/Login.css'
import { fetchLogin } from "../../api/authApi";
import { useNavigate } from "react-router-dom";


function Login() {
    const [inputData, setInputData] = useState({
        userName:'',
        password:''
    })
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const handleclick = () => {
        console.log('run')
        navigate('/signup');
    }
    const clickLogin = async (events) => {
        events.preventDefault();
        const data = {
            "userName": inputData.userName,
            "password": inputData.password
        }
        const result = await fetchLogin(data);
        if (result.code === 200) {
            console.log(result.result.role);
            console.log(result.result.token)
            localStorage.setItem("token", result.result.token);
            console.log(localStorage.getItem("token"))
            if (result.result.role === "KHACHHANG") {
                navigate('/home');
            }
            else if (result.result.role === "ADMIN") {
                navigate('/dienthoai');
            }



        }


    }

    const changeInput = (key, value) =>{
        setInputData({...inputData, [key]: value})
    }
    return (
        <div className="containerlogin">
            <form id="login">
                <p id="text-login">Đăng nhập</p>
                <div className="username">
                    <img src='/images/user.png' />
                    <input id="username-value" type="text" placeholder="username" name="email" value={inputData.userName} onChange={(e) => changeInput('userName', e.target.value)}/>
                </div>
                <div className="password">
                    <img src='/images/password.png' />
                    <input id="password-value" type={showPass?'text':'password'} placeholder="password" name="password" value={inputData.password} onChange={(e) => changeInput('password', e.target.value)}/>
                </div>
                <div className="checkbox-group">
                    <input id="show-password" type="checkbox" onClick={() => setShowPass(showPass?false:true)} />
                    <label htmlFor="show-password">Hiện mật khẩu</label>
                </div>
                <button id="click-login" type="submit" onClick={clickLogin}>Đăng nhập</button>
                <div className="create-signup">
                    <p>Đăng ký tài khoản.</p>
                    <a onClick={handleclick}>Đăng ký</a>
                </div>

            </form>
        </div>
    );
}
export default Login;