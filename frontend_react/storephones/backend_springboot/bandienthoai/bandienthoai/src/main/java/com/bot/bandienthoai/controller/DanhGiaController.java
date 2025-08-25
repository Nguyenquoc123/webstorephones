package com.bot.bandienthoai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bot.bandienthoai.dto.reponse.APIReponse;
import com.bot.bandienthoai.dto.reponse.DanhGiaReponse;
import com.bot.bandienthoai.request.DanhGiaRequest;
import com.bot.bandienthoai.service.DanhGiaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class DanhGiaController {
	@Autowired
	private DanhGiaService danhGiaService;
	
	
	@GetMapping("/getdsdanhgia")
	public APIReponse<List<DanhGiaReponse>> getDSDanhGia(){
		return APIReponse.<List<DanhGiaReponse>>builder().result(danhGiaService.getAllDanhGia()).build();
	}
	
	@GetMapping("/getdsdanhgia/{maPhienBan}")
	public APIReponse<List<DanhGiaReponse>> getDSDanhGiaByMaPhienBan(@PathVariable(name = "maPhienBan") Integer maPhienBan){
		return APIReponse.<List<DanhGiaReponse>>builder().result(danhGiaService.getDSDanhGiaByMaPhienBan(maPhienBan)).build();
	}
	@PostMapping("/adddanhgia")
	public APIReponse<DanhGiaReponse> addDanhGia(@RequestBody @Valid DanhGiaRequest request){
		return APIReponse.<DanhGiaReponse>builder().result(danhGiaService.themDanhGia(request)).build();
	}
}
