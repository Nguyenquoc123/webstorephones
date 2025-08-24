package com.bot.bandienthoai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bot.bandienthoai.dto.reponse.APIReponse;
import com.bot.bandienthoai.dto.reponse.AuthenticationReponse;
import com.bot.bandienthoai.dto.reponse.KhachHangReponse;
import com.bot.bandienthoai.request.ChangePasswordRequest;
import com.bot.bandienthoai.request.KhachHangRequest;
import com.bot.bandienthoai.request.UpdateHoSoRequest;
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
	
	@GetMapping("/getinfo")
	public APIReponse<KhachHangReponse> getInfo(){
		return APIReponse.<KhachHangReponse>builder().result(khachHangService.getInfo()).build();
	}
	
	@PostMapping("/updateinfo")
	public APIReponse<KhachHangReponse> updateInfo(@Valid @ModelAttribute UpdateHoSoRequest request, @RequestPart(name = "image", required = false) MultipartFile image){
		return APIReponse.<KhachHangReponse>builder().result(khachHangService.updateHoSo(request, image)).build();
	}
	
	@PostMapping("/changepassword")
	public APIReponse<String> changePassword(@Valid @RequestBody ChangePasswordRequest request){
		return APIReponse.<String>builder().result(khachHangService.changePassword(request)).build();
	}
	
}
