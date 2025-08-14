package com.bot.bandienthoai.service;

import java.util.Optional;

import javax.swing.JWindow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bot.bandienthoai.configuration.JWTUtil;
import com.bot.bandienthoai.dto.reponse.AuthenticationReponse;
import com.bot.bandienthoai.entity.Admin;
import com.bot.bandienthoai.entity.KhachHang;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.repository.AdminRepository;
import com.bot.bandienthoai.repository.KhachHangRepository;
import com.bot.bandienthoai.request.AuthenticationRequest;
@Service
public class AuthenticationService {
	@Autowired
	private AdminRepository adminRepo;
	
	@Autowired
	private KhachHangRepository khachHangRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public AuthenticationReponse checkLogin(AuthenticationRequest request) {
		String token ;
		Optional<Admin> admin = adminRepo.findByUserName(request.getUserName());
		if(admin.isPresent()) {
			
			Admin tmp = admin.get();

			if(!passwordEncoder.matches(request.getPassword(), tmp.getPassword())) {
				throw new RunException(ErrorCode.Password_InValid);
			}
			System.out.println("Create token admin");
			token = JWTUtil.generateToken(tmp.getId(), tmp.role);
			return new AuthenticationReponse(tmp.getId(),token, tmp.role);
		}
		Optional<KhachHang> khachhang = khachHangRepo.findByUserName(request.getUserName());
		if(khachhang.isPresent()) {
			System.out.println("Create token khach hang");
			KhachHang kh = khachhang.get();
			if(!passwordEncoder.matches(request.getPassword(), kh.getPassword())) {
				throw new RunException(ErrorCode.Password_InValid);
			}
			token = JWTUtil.generateToken(kh.getMaKhachHang(), kh.role);
			return new AuthenticationReponse(kh.getMaKhachHang(), token, kh.role);
		}
		throw new RunException(ErrorCode.UserNameNotFound);
	}
	
	
}
