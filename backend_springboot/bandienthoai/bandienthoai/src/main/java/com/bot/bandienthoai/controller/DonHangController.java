package com.bot.bandienthoai.controller;

import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bot.bandienthoai.dto.reponse.APIReponse;
import com.bot.bandienthoai.dto.reponse.ChiTietDonHangReponse;
import com.bot.bandienthoai.dto.reponse.DonHangKhachHangReponse;
import com.bot.bandienthoai.dto.reponse.DonHangReponse;
import com.bot.bandienthoai.dto.reponse.KetQuaDonHangReponse;
import com.bot.bandienthoai.entity.DonHang;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.request.DonHangAddRequest;
import com.bot.bandienthoai.request.DonHangUpdateRequest;
import com.bot.bandienthoai.service.BuildVnpayService;
import com.bot.bandienthoai.service.DonHangService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping
public class DonHangController {
	@Autowired
	DonHangService donHangService;
	
	@Autowired
	BuildVnpayService buildVnpayService;
	
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
	@PostMapping("/adddonhang")
	public APIReponse<KetQuaDonHangReponse> addDonHang(@Valid @RequestBody DonHangAddRequest request, HttpServletRequest sv){
		if(request.getPhuongThucThanhToan() == 1)
			return APIReponse.<KetQuaDonHangReponse>builder().result(donHangService.addDonHang(request)).build();
		else {
			KetQuaDonHangReponse dh = donHangService.addDonHang(request);
			Map<String, String> url_Params = buildVnpayService.buildVnpayParams(dh, sv);
			try {
				String urlQuery = buildVnpayService.buildPaymentUrl(url_Params);
				dh.setQueryUrl(urlQuery);
				
			} catch (Exception e) {
				throw new RunException(ErrorCode.Error_System);
			}
			return APIReponse.<KetQuaDonHangReponse>builder().result(dh).build();
		}
	}
	@GetMapping("/dsdonhangkhachhang")
	public APIReponse<List<DonHangKhachHangReponse>> getDSDonHangKhachHang(){
		return APIReponse.<List<DonHangKhachHangReponse>>builder().result(donHangService.getDSDonHangByKhachHang()).build();
	}
	
	
}
