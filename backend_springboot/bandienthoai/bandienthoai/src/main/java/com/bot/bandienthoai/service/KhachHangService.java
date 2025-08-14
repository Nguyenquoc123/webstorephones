package com.bot.bandienthoai.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bot.bandienthoai.configuration.JWTUtil;
import com.bot.bandienthoai.dto.reponse.AuthenticationReponse;

import com.bot.bandienthoai.entity.KhachHang;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.mapper.KhachHangMapper;
import com.bot.bandienthoai.repository.KhachHangRepository;
import com.bot.bandienthoai.request.ChangePasswordRequest;
import com.bot.bandienthoai.request.KhachHangRequest;

@Service
public class KhachHangService {
	@Autowired
	KhachHangRepository khachHangRepository;
	
	@Autowired
	KhachHangMapper khachHangMapper;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	public AuthenticationReponse signUp(KhachHangRequest kh) {
		Optional<KhachHang> khachhang_ = khachHangRepository.findByUserName(kh.getUserName());
		if(khachhang_.isPresent()) {
			throw new RunException(ErrorCode.UserName_Exists);
		}
		khachhang_ = khachHangRepository.findByEmail(kh.getEmail());
		if(khachhang_.isPresent()) {
			throw new RunException(ErrorCode.Email_Exists);
		}
		khachhang_ = khachHangRepository.findBySoDienThoai(kh.getSoDienThoai());
		if(khachhang_.isPresent()) {
			throw new RunException(ErrorCode.SDT_Exists);
		}
		KhachHang tmp = new KhachHang();
		tmp.setEmail(kh.getEmail());
		tmp.setHoTen(kh.getHoTen());
		tmp.setSoDienThoai(kh.getSoDienThoai());
		tmp.setGioiTinh(kh.getGioiTinh());
		tmp.setNgaySinh(kh.getNgaySinh());
		tmp.setUserName(kh.getUserName());
		tmp.setPassword(passwordEncoder.encode(kh.getPassword()));
		try {
			tmp = khachHangRepository.save(tmp);
			
		} catch (Exception e) {
			throw new RunException(ErrorCode.Create_Failed);
		}
		String token = JWTUtil.generateToken(tmp.getMaKhachHang(), tmp.role); 
		return new AuthenticationReponse(tmp.getMaKhachHang(), token, tmp.role);
	}
	

	public String changePassword(ChangePasswordRequest request) {
		Optional<KhachHang> kh = khachHangRepository.findById(request.getMaKhachHang());
		if(kh.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		KhachHang tmp = kh.get();
		if(!tmp.getPassword().equals(request.getPasswordOld())) {
			throw new RunException(ErrorCode.Password_Old_Not_Valid);
		}
		tmp.setPassword(request.getPasswordNew());
		try {
			khachHangRepository.save(tmp);	
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}
		
		return "Đổi mật khẩu thành công.";
	}
}
