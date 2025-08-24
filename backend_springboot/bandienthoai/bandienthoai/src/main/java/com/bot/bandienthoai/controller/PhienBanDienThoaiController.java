package com.bot.bandienthoai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.bot.bandienthoai.dto.reponse.DienThoaiUpdateReponse;
import com.bot.bandienthoai.dto.reponse.PhienBanDienThoaiAndKhuyenMaiReponse;
import com.bot.bandienthoai.dto.reponse.PhienBanDienThoaiKhuyenMaiReponse;
import com.bot.bandienthoai.dto.reponse.PhienBanDienThoaiReponse;
import com.bot.bandienthoai.request.DienThoaiAddRequest;
import com.bot.bandienthoai.request.DienThoaiUpdateRequets;
import com.bot.bandienthoai.request.PhienBanDienThoaiAddRequest;
import com.bot.bandienthoai.request.PhienBanDienThoaiUpdateRequest;
import com.bot.bandienthoai.request.SearchAndFilterRequest;
import com.bot.bandienthoai.service.PhienBanDienThoaiService;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class PhienBanDienThoaiController {
	@Autowired
	private PhienBanDienThoaiService phienBanDienThoaiService;
	
	@GetMapping("/getdsphienban")
	public APIReponse<List<PhienBanDienThoaiReponse>> getDSPhienBan(){
		return APIReponse.<List<PhienBanDienThoaiReponse>>builder().result(phienBanDienThoaiService.getAllPhienBan()).build();
	}
	
//	@GetMapping("/getdsphienbanandkhuyenmai")
//	public APIReponse<List<PhienBanDienThoaiAndKhuyenMaiReponse>> getDSPhienBanAndKhuyenMai(){
//		return APIReponse.<List<PhienBanDienThoaiAndKhuyenMaiReponse>>builder().result(phienBanDienThoaiService.getDSPhienBanAndKhuyenMai()).build();
//	}
	@GetMapping("/getdsphienbanandkhuyenmai")
	public APIReponse<List<PhienBanDienThoaiKhuyenMaiReponse>> getDSPhienBanAndKhuyenMai(){
		return APIReponse.<List<PhienBanDienThoaiKhuyenMaiReponse>>builder().result(phienBanDienThoaiService.getDSPhienBanAndKhuyenMai()).build();
	}
	
	@GetMapping("getdsphienbanphantrang/{page}")
	public APIReponse<Page<PhienBanDienThoaiReponse>> getDSPhienBanPhanTrang(@PathVariable(name = "page") Integer page){
		return APIReponse.<Page<PhienBanDienThoaiReponse>>builder().result(phienBanDienThoaiService.getDSPhienBanPhanTrang(page, 10)).build();
	}
	
	@GetMapping("/getdsphienbanbydienthoai/{maDienThoai}")
	public APIReponse<List<PhienBanDienThoaiKhuyenMaiReponse>> getDSPhienBanByDienThoai(@PathVariable(name = "maDienThoai")  Integer maDienThoai){
		return APIReponse.<List<PhienBanDienThoaiKhuyenMaiReponse>>builder().result(phienBanDienThoaiService.getDSPhienBanByMaDienThoai(maDienThoai)).build();
	}

	@PostMapping("/addphienban")
	public APIReponse<PhienBanDienThoaiReponse> addPhienBan(@Valid @ModelAttribute PhienBanDienThoaiAddRequest request, @RequestPart("image") List<MultipartFile> image) {
		System.out.println("Lỗi rồi nè");
		return APIReponse.<PhienBanDienThoaiReponse>builder().result(phienBanDienThoaiService.addPhienBanDienThoai(request, image)).message("Thêm thành công.").build();
	}
	
	@PostMapping("/updatephienban")
	public APIReponse<PhienBanDienThoaiReponse> updatePhienBan(@Valid @ModelAttribute PhienBanDienThoaiUpdateRequest request, @RequestPart(value = "image", required = false) List<MultipartFile> image, @RequestParam(name = "imageDelete", required = false) List<Integer> lstImgDelete ){
		return APIReponse.<PhienBanDienThoaiReponse>builder().result(phienBanDienThoaiService.updatePhienBanDienThoai(request, image, lstImgDelete)).message("Cập nhập thành công.").build();
	}
	
	@DeleteMapping("/deletephienban/{maPhienBan}")
	public APIReponse<String> deletePhienBan(@PathVariable(name = "maPhienBan") Integer maPhienBan){
		return APIReponse.<String>builder().result(phienBanDienThoaiService.deletePhienBanDienThoai(maPhienBan)).message("Xóa thành công.").build();
	}
	
	// tìm kiếm và lọc
	@PostMapping("/timkiemvaloc")
	public APIReponse<List<PhienBanDienThoaiKhuyenMaiReponse>> searchAndFilter(@RequestBody SearchAndFilterRequest request){
		return APIReponse.<List<PhienBanDienThoaiKhuyenMaiReponse>>builder().result(phienBanDienThoaiService.searchAndFilter(request)).build();
	}
}
