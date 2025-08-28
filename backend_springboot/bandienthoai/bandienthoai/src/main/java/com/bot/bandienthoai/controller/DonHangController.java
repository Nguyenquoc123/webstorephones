package com.bot.bandienthoai.controller;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bot.bandienthoai.dto.reponse.APIReponse;
import com.bot.bandienthoai.dto.reponse.ChiTietDonHangReponse;
import com.bot.bandienthoai.dto.reponse.DashBoardReponse;
import com.bot.bandienthoai.dto.reponse.DoanhThuReponse;
import com.bot.bandienthoai.dto.reponse.DonHangKhachHangReponse;
import com.bot.bandienthoai.dto.reponse.DonHangReponse;
import com.bot.bandienthoai.dto.reponse.KetQuaDonHangReponse;
import com.bot.bandienthoai.dto.reponse.SanPhamBanChayReponse;
import com.bot.bandienthoai.dto.reponse.ThongKeDanhMucReponse;
import com.bot.bandienthoai.entity.DonHang;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.request.DonHangAddRequest;
import com.bot.bandienthoai.request.DonHangUpdateRequest;
import com.bot.bandienthoai.service.BuildVnpayService;
import com.bot.bandienthoai.service.DonHangService;
import com.bot.bandienthoai.service.EntityManagerService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping
public class DonHangController {
	@Autowired
	DonHangService donHangService;
	
	@Autowired
	BuildVnpayService buildVnpayService;
	
	@Autowired
	EntityManagerService entityManagerService;
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
	
	@GetMapping("/dsdonhangkhachhanghientai")
	public APIReponse<List<DonHangKhachHangReponse>> getDSDonHangKhachHangHienTai(){
		return APIReponse.<List<DonHangKhachHangReponse>>builder().result(donHangService.getDSDonHangByKhachHangHienTai()).build();
	}
	@GetMapping("/dsdonhangkhachhanglichsu")
	public APIReponse<List<DonHangKhachHangReponse>> getDSDonHangKhachHangLichSu(){
		return APIReponse.<List<DonHangKhachHangReponse>>builder().result(donHangService.getDSDonHangByKhachHangLichSu()).build();
	}
	
	@GetMapping("/getdashboard")
	public APIReponse<DashBoardReponse> getDashboard( @RequestParam(name = "type", required = false) String type,
	        @RequestParam(name = "nam", required = false) Integer nam,
	        @RequestParam(name = "month", required = false) Integer month,
	        @RequestParam(name = "day", required = false)  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day ){
		if ("year".equalsIgnoreCase(type) && nam != null) {
	        return APIReponse.<DashBoardReponse>builder().result(entityManagerService.getDashBoardTheoNam(nam)).build() ;
	    } else if ("month".equalsIgnoreCase(type) && nam != null && month != null) {
	    	return APIReponse.<DashBoardReponse>builder().result(entityManagerService.getDashBoardTheoThang(nam, month)).build() ;
	    } else if ("day".equalsIgnoreCase(type) && day != null) {
	    	return APIReponse.<DashBoardReponse>builder().result(entityManagerService.getDashBoardTheoNgay(day)).build() ;
	    } else {
	        return APIReponse.<DashBoardReponse>builder()
	                .code(400)
	                .message("Tham số không hợp lệ")
	                .build();
	    }
	}
	@GetMapping("/getdoanhthu")
	public APIReponse<List<DoanhThuReponse>> getDoanhThu( @RequestParam(name = "type", required = false) String type,
	        @RequestParam(name = "nam", required = false) Integer nam,
	        @RequestParam(name = "month", required = false) Integer month,
	        @RequestParam(name = "day", required = false)  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day ){
		if ("year".equalsIgnoreCase(type) && nam != null) {
	        return APIReponse.<List<DoanhThuReponse>>builder().result(entityManagerService.getDoanhThuNam(nam)).build() ;
	    } else if ("month".equalsIgnoreCase(type) && nam != null && month != null) {
	    	return APIReponse.<List<DoanhThuReponse>>builder().result(entityManagerService.doanhThuThang(nam, month)).build() ;
	    } else if ("day".equalsIgnoreCase(type) && day != null) {
	    	return APIReponse.<List<DoanhThuReponse>>builder().result(entityManagerService.doanhThuNgay(day)).build() ;
	    } else {
	        return APIReponse.<List<DoanhThuReponse>>builder()
	                .code(400)
	                .message("Tham số không hợp lệ")
	                .build();
	    }
	}
	
	@GetMapping("/gettkdanhmuc")
	public APIReponse<List<ThongKeDanhMucReponse>> getThongKeDanhMuc( @RequestParam(name = "type", required = false) String type,
	        @RequestParam(name = "nam", required = false) Integer nam,
	        @RequestParam(name = "month", required = false) Integer month,
	        @RequestParam(name = "day", required = false)  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day ){
		if ("year".equalsIgnoreCase(type) && nam != null) {
	        return APIReponse.<List<ThongKeDanhMucReponse>>builder().result(entityManagerService.thongKeDanhMucNam(nam)).build() ;
	    } else if ("month".equalsIgnoreCase(type) && nam != null && month != null) {
	    	return APIReponse.<List<ThongKeDanhMucReponse>>builder().result(entityManagerService.thongKeDanhMucThang(nam, month)).build() ;
	    } else if ("day".equalsIgnoreCase(type) && day != null) {
	    	return APIReponse.<List<ThongKeDanhMucReponse>>builder().result(entityManagerService.thongKeDanhMucNgay(day)).build() ;
	    } else {
	        return APIReponse.<List<ThongKeDanhMucReponse>>builder()
	                .code(400)
	                .message("Tham số không hợp lệ")
	                .build();
	    }
	}
	
	@GetMapping("/getspbanchay")
	public APIReponse<List<SanPhamBanChayReponse>> getSPBanChay( @RequestParam(name = "type", required = false) String type,
	        @RequestParam(name = "nam", required = false) Integer nam,
	        @RequestParam(name = "month", required = false) Integer month,
	        @RequestParam(name = "day", required = false)  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day ){
		if ("year".equalsIgnoreCase(type) && nam != null) {
	        return APIReponse.<List<SanPhamBanChayReponse>>builder().result(entityManagerService.getSPBanChayNam(nam)).build() ;
	    } else if ("month".equalsIgnoreCase(type) && nam != null && month != null) {
	    	return APIReponse.<List<SanPhamBanChayReponse>>builder().result(entityManagerService.getSPBanChayThang(nam, month)).build() ;
	    } else if ("day".equalsIgnoreCase(type) && day != null) {
	    	return APIReponse.<List<SanPhamBanChayReponse>>builder().result(entityManagerService.getSPBanChayNgay(day)).build() ;
	    } else {
	        return APIReponse.<List<SanPhamBanChayReponse>>builder()
	                .code(400)
	                .message("Tham số không hợp lệ")
	                .build();
	    }
	}
}
