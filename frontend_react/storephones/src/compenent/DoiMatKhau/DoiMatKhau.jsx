  import React, { useState } from "react";
  import "./DoiMatKhau.css";
  import close_eye from "../../../src/icons/eye_close.png";
  import open_eye from "../../../src/icons/eye_open.png";
  import { useNavigate } from "react-router-dom";
  import { fetchChangePassword } from "../../api/authApi";

  const DoiMatKhau = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState({
      old: false,
      new: false,
      confirm: false,
    });
    const [formPassword, setFormPassword] = useState({
      passwordOld: '',
      passwordNew: '',
      passwordAgain: ''
    })
    const [formError, setFormError] = useState({
      passwordOld: '',
      passwordNew: '',
      passwordAgain: ''
    })
    const togglePassword = (field) => {
      setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const validateData = () => {
      let hasErr = false;
      const err = {
        passwordOld: '',
        passwordNew: '',
        passwordAgain: ''
      }
      if (!formPassword.passwordOld) {
        err.passwordOld = 'Vui lòng nhập password'
        hasErr = true;
      }
      else if (formPassword.passwordOld.length < 8) {
        err.passwordOld = 'Password phải có ít nhất 8 kí tự'
        hasErr = true;
      }
      if (!formPassword.passwordNew) {
        err.passwordNew = 'Vui lòng nhập password'
        hasErr = true;
      }
      else if (formPassword.passwordNew.length < 8) {
        err.passwordNew = 'Password phải có ít nhất 8 kí tự'
        hasErr = true;
      }
      if (!formPassword.passwordAgain) {
        err.passwordAgain = 'Vui lòng nhập password'
        hasErr = true;
      }
      else if (formPassword.passwordAgain.length < 8) {
        err.passwordAgain = 'Password phải có ít nhất 8 kí tự'
        hasErr = true;
      }
      else if (formPassword.passwordNew !== formPassword.passwordAgain) {
        err.passwordAgain = 'Password không giống'
        hasErr = true;
      }
      else if(formPassword.passwordOld === formPassword.passwordNew){
        err.passwordAgain = 'Password mới không được trùng với password cũ'
        err.passwordNew = 'Password mới không được trùng với password cũ'
        hasErr = true;
      }
      setFormError(err)
      return hasErr;
    }
    const clickChangePassword = async () => {
      console.log(formPassword)
      if (validateData())
        return;

      const data = {
        'passwordOld': formPassword.passwordOld,
        'passwordNew': formPassword.passwordNew
      }
      const response = await fetchChangePassword(data);
      if(response.code === 200){
        console.log("Change password thành công")
        navigate("/home/hosocanhan")
      }
    }
    const inputData = (key, value) => {
      setFormPassword({ ...formPassword, [key]: value })
    }
    return (
      <div className="DMK-container">
        <h2 className="DMK-title">Đổi mật khẩu</h2>


        <div className="DMK-form-group">
          <label>Mật khẩu cũ</label>
          <div className="DMK-input-password">
            <input
              type={showPassword.old ? "text" : "password"}
              placeholder="Nhập mật khẩu cũ"
              value={formPassword.passwordOld}
              onChange={(e) => inputData("passwordOld", e.target.value)}
            />
            <span onClick={() => togglePassword("old")} className="DMK-eye-icon">
              <img
                src={showPassword.old ? open_eye : close_eye}
                alt="toggle visibility"
              />
            </span>
          </div>
          {formError.passwordOld && <span className="err-message">{formError.passwordOld}</span>}
        </div>

        <div className="DMK-form-group">
          <label>Mật khẩu mới</label>
          <div className="DMK-input-password">
            <input
              type={showPassword.new ? "text" : "password"}
              placeholder="Nhập mật khẩu mới"
              value={formPassword.passwordNew}
              onChange={(e) => inputData("passwordNew", e.target.value)}
            />
            <span onClick={() => togglePassword("new")} className="DMK-eye-icon">
              <img
                src={showPassword.new ? open_eye : close_eye}
                alt="toggle visibility"
              />
            </span>
          </div>
          {formError.passwordNew && <span className="err-message">{formError.passwordNew}</span>}
        </div>

        <div className="DMK-form-group">
          <label>Nhập lại mật khẩu mới</label>
          <div className="DMK-input-password">
            <input
              type={showPassword.confirm ? "text" : "password"}
              placeholder="Nhập lại mật khẩu mới"
              value={formPassword.passwordAgain}
              onChange={(e) => inputData("passwordAgain", e.target.value)}
            />
            <span
              onClick={() => togglePassword("confirm")}
              className="DMK-eye-icon"
            >
              <img
                src={showPassword.confirm ? open_eye : close_eye}
                alt="toggle visibility"
              />
            </span>
          </div>
          {formError.passwordAgain && <span className="err-message">{formError.passwordAgain}</span>}
        </div>

        <div className="DMK-password-rules">
          <h4>Quy tắc mật khẩu:</h4>
          <ul>
            <li>✔️ Mật khẩu dài tối thiểu 8 ký tự</li>
            <li>✔️ Không trùng mật khẩu cũ</li>
          </ul>
        </div>

        <div className="DMK-form-footer">
          <button className="DMK-btn-cancel" onClick={() => navigate(-1)}>Hủy</button>
          <button className="DMK-btn-confirm" onClick={clickChangePassword}>Xác nhận</button>
        </div>
      </div>
    );
  };

  export default DoiMatKhau;