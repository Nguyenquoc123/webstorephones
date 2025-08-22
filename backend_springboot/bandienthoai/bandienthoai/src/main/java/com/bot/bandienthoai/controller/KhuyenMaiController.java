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
import com.bot.bandienthoai.dto.reponse.KhuyenMaiReponse;
import com.bot.bandienthoai.request.KhuyenMaiRequest;
import com.bot.bandienthoai.request.KhuyenMaiUpdateRequest;
import com.bot.bandienthoai.service.KhuyenMaiService;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class KhuyenMaiController {
	@Autowired
	KhuyenMaiService khuyenMaiService;
	
	@GetMapping("/getdskhuyenmai")
	public APIReponse<List<KhuyenMaiReponse>> getDSKhuyenMai(){
		return APIReponse.<List<KhuyenMaiReponse>>builder().result(khuyenMaiService.getDSKhuyenMai()).build();
	}
	
	@PostMapping("/addkhuyenmai")
	public APIReponse<KhuyenMaiReponse> addKhuyenMai(@Valid @RequestBody KhuyenMaiRequest request){
		return APIReponse.<KhuyenMaiReponse>builder().result(khuyenMaiService.addKhuyenMai(request)).build();
	}
	
	@PostMapping("/updatekhuyenmai")
	public APIReponse<KhuyenMaiReponse> updateKhuyenMai(@Valid @RequestBody KhuyenMaiUpdateRequest request){
		return APIReponse.<KhuyenMaiReponse>builder().result(khuyenMaiService.updateKhuyenMai(request)).build();
	}
	
	@GetMapping("/deletekhuyenmai/{makhuyenmai}")
	public APIReponse<String> deleteKhuyenMai(@PathVariable(name = "makhuyenmai") Integer maKhuyenMai){
		return APIReponse.<String>builder().result(khuyenMaiService.deleteKhuyenMai(maKhuyenMai)).build();
	}
}
