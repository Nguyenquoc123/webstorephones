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
import com.bot.bandienthoai.dto.reponse.ChiTietDonHangReponse;
import com.bot.bandienthoai.dto.reponse.DonHangReponse;
import com.bot.bandienthoai.request.DonHangUpdateRequest;
import com.bot.bandienthoai.service.DonHangService;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class DonHangController {
	@Autowired
	DonHangService donHangService;
	
	@GetMapping("/getdsdonhang")
	public APIReponse<List<DonHangReponse>> getDSDonHang(){
		return APIReponse.<List<DonHangReponse>>builder().result(donHangService.getDSDonHang()).build();
	}
	
	@GetMapping("/getdsdonhang/{trangThai}")
	public APIReponse<List<DonHangReponse>> getDSDonHangByTrangThai(@PathVariable(name = "trangThai") Integer trangThai){
		return APIReponse.<List<DonHangReponse>>builder().result(donHangService.getDSByTrangThai(trangThai)).build();
	}
	
	@GetMapping("/getindonhang/{maDonHang}")
	public APIReponse<ChiTietDonHangReponse> getChiTietDonHang(@PathVariable(name = "maDonHang") String maDonHang){
		return APIReponse.<ChiTietDonHangReponse>builder().result(donHangService.getAllInDonHang(maDonHang)).build();
	}
	
	@PostMapping("/updatetrangthai")
	public APIReponse<DonHangReponse> updateTrangThaiDonHang(@Valid @RequestBody DonHangUpdateRequest request){
		return APIReponse.<DonHangReponse>builder().result(donHangService.updateTrangThaiDonHang(request)).build();
	}
}
