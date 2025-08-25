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
import com.bot.bandienthoai.request.AuthenticationRequest;
import com.bot.bandienthoai.service.AuthenticationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping

public class AuthenticationController {
	@Autowired
	AuthenticationService authenticationService;
	
	@PostMapping("/login")
	APIReponse<AuthenticationReponse> checkLogin(@RequestBody @Valid AuthenticationRequest request){
		System.out.println(request.getUserName());
		return APIReponse.<AuthenticationReponse>builder().result(authenticationService.checkLogin(request)).message("Đăng nhập thành công.").build();
	}
	
}
