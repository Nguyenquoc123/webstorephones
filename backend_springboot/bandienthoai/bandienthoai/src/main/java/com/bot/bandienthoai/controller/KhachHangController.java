package com.bot.bandienthoai.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bot.bandienthoai.dto.reponse.APIReponse;
import com.bot.bandienthoai.dto.reponse.AuthenticationReponse;
import com.bot.bandienthoai.dto.reponse.DSKhachHangReponse;
import com.bot.bandienthoai.dto.reponse.KhachHangInQuanLyReponse;
import com.bot.bandienthoai.dto.reponse.KhachHangReponse;
import com.bot.bandienthoai.dto.reponse.SanPhamBanChayReponse;
import com.bot.bandienthoai.dto.reponse.ThongKeKhachHangReponse;
import com.bot.bandienthoai.dto.reponse.ThongKeTaiKhoanReponse;
import com.bot.bandienthoai.request.ChangePasswordRequest;
import com.bot.bandienthoai.request.EditKhachHangRequest;
import com.bot.bandienthoai.request.KhachHangRequest;
import com.bot.bandienthoai.request.UpdateHoSoRequest;
import com.bot.bandienthoai.service.EntityManagerService;
import com.bot.bandienthoai.service.KhachHangService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.Builder;

@RestController
@RequestMapping
public class KhachHangController {
	
	@Autowired
	KhachHangService khachHangService;
	
	@Autowired
	EntityManagerService entityManagerService;
	
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
	
	@GetMapping("/thongketaikhoan")
	public APIReponse<ThongKeTaiKhoanReponse> thongKeTaiKhoan(){
		return APIReponse.<ThongKeTaiKhoanReponse>builder().result(khachHangService.thongKeTaiKhoan()).build();
	}
	@GetMapping("/dstaikhoan")
	public APIReponse<List<KhachHangInQuanLyReponse>> getDSKhachHang(@RequestParam(name = "trangThai", required = false) Integer trangThai){
		return APIReponse.<List<KhachHangInQuanLyReponse>>builder().result(khachHangService.getDSKhachHang(trangThai)).build();
	}
	
	@GetMapping("/searchkhachhang")
	public APIReponse<List<KhachHangInQuanLyReponse>> searchKhachHang(@RequestParam(required = false, defaultValue = "") String keyword){
		return APIReponse.<List<KhachHangInQuanLyReponse>>builder().result(khachHangService.search(keyword)).build();
	}
	
	@GetMapping("/khoamotaikhoan/{maKhachHang}")
	public APIReponse<String> khoaMoTaiKhoan(@PathVariable(name = "maKhachHang") Integer maKhachHang){
		return APIReponse.<String>builder().result(khachHangService.khoaMoTaiKhoan(maKhachHang)).build();
	}
	
	@GetMapping("/xoamottaikhoan/{maKhachHang}")
	public APIReponse<String> xoaMotTaiKhoan(@PathVariable(name = "maKhachHang") Integer maKhachHang){
		return APIReponse.<String>builder().result(khachHangService.xoaTaiKhoan(maKhachHang)).build();
	}
	
	@PostMapping("/xoanhieutaikhoan")
	public APIReponse<String> xoaNhieuTaiKhoan(@RequestBody List<Integer> ds){
		return APIReponse.<String>builder().result(khachHangService.xoaNhieuTaiKhoan(ds)).build();
	}
	
	@GetMapping("/getdashboardkhachhang")
	public APIReponse<ThongKeTaiKhoanReponse> getSPBanChay( @RequestParam(name = "type", required = false) String type,
	        @RequestParam(name = "nam", required = false) Integer nam,
	        @RequestParam(name = "month", required = false) Integer month,
	        @RequestParam(name = "day", required = false)  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day ){
		if ("year".equalsIgnoreCase(type) && nam != null) {
	        return APIReponse.<ThongKeTaiKhoanReponse>builder().result(entityManagerService.getThongKeKhachHangNam(nam)).build() ;
	    } else if ("month".equalsIgnoreCase(type) && nam != null && month != null) {
	    	return APIReponse.<ThongKeTaiKhoanReponse>builder().result(entityManagerService.getThongKeKhachHangThang(nam, month)).build() ;
	    } else if ("day".equalsIgnoreCase(type) && day != null) {
	    	return APIReponse.<ThongKeTaiKhoanReponse>builder().result(entityManagerService.getThongKeKhachHangNgay(day)).build() ;
	    } else {
	        return APIReponse.<ThongKeTaiKhoanReponse>builder()
	                .code(400)
	                .message("Tham số không hợp lệ")
	                .build();
	    }
	}
	
	@GetMapping("/getsoluongkhachhang")
	public APIReponse<List<ThongKeKhachHangReponse>> getSoLuongKhachHang( @RequestParam(name = "type", required = false) String type,
	        @RequestParam(name = "nam", required = false) Integer nam,
	        @RequestParam(name = "month", required = false) Integer month,
	        @RequestParam(name = "day", required = false)  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day ){
		if ("year".equalsIgnoreCase(type) && nam != null) {
	        return APIReponse.<List<ThongKeKhachHangReponse>>builder().result(entityManagerService.getTKKhachHangNam(nam)).build() ;
	    } else if ("month".equalsIgnoreCase(type) && nam != null && month != null) {
	    	return APIReponse.<List<ThongKeKhachHangReponse>>builder().result(entityManagerService.getTKKhachHangThang(nam, month)).build() ;
	    } else if ("day".equalsIgnoreCase(type) && day != null) {
	    	return APIReponse.<List<ThongKeKhachHangReponse>>builder().result(entityManagerService.getTKKhachHangNgay(day)).build() ;
	    } else {
	        return APIReponse.<List<ThongKeKhachHangReponse>>builder()
	                .code(400)
	                .message("Tham số không hợp lệ")
	                .build();
	    }
	}
	
	@GetMapping("/gettkdskhachhang")
	public APIReponse<List<DSKhachHangReponse>> getTKDSKhachHang( @RequestParam(name = "type", required = false) String type,
	        @RequestParam(name = "nam", required = false) Integer nam,
	        @RequestParam(name = "month", required = false) Integer month,
	        @RequestParam(name = "day", required = false)  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day ){
		if ("year".equalsIgnoreCase(type) && nam != null) {
	        return APIReponse.<List<DSKhachHangReponse>>builder().result(entityManagerService.getDSKhachHangNam(nam)).build() ;
	    } else if ("month".equalsIgnoreCase(type) && nam != null && month != null) {
	    	return APIReponse.<List<DSKhachHangReponse>>builder().result(entityManagerService.getDSKhachHangThang(nam, month)).build() ;
	    } else if ("day".equalsIgnoreCase(type) && day != null) {
	    	return APIReponse.<List<DSKhachHangReponse>>builder().result(entityManagerService.getDSKhachHangNgay(day)).build() ;
	    } else {
	        return APIReponse.<List<DSKhachHangReponse>>builder()
	                .code(400)
	                .message("Tham số không hợp lệ")
	                .build();
	    }
	}
	
	@PostMapping("/editkhachhang")
	public APIReponse<String> editKhachHang(@Valid @RequestBody EditKhachHangRequest request){
		return APIReponse.<String>builder().result(khachHangService.editKhachHang(request)).build();
	}
}
