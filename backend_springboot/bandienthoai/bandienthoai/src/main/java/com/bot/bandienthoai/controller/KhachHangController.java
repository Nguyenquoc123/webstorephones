package com.bot.bandienthoai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bot.bandienthoai.dto.reponse.APIReponse;
import com.bot.bandienthoai.dto.reponse.AuthenticationReponse;
import com.bot.bandienthoai.dto.reponse.KhachHangReponse;
import com.bot.bandienthoai.request.ChangePasswordRequest;
import com.bot.bandienthoai.request.KhachHangRequest;
import com.bot.bandienthoai.service.KhachHangService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.Builder;

@RestController
@RequestMapping
public class KhachHangController {
	
	@Autowired
	KhachHangService khachHangService;
	
	@PostMapping("/signup")
	public APIReponse<AuthenticationReponse> signUp(@RequestBody @Valid KhachHangRequest kh){
		System.out.println("create");
		return APIReponse.<AuthenticationReponse>builder().result(khachHangService.signUp(kh)).message("Đăng ký thành công.").build();
	}
	

	
	
}
