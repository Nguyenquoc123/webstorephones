package com.bot.bandienthoai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import com.bot.bandienthoai.dto.reponse.APIReponse;
import com.bot.bandienthoai.dto.reponse.DienThoaiAdminReponse;

import com.bot.bandienthoai.dto.reponse.DienThoaiUpdateReponse;
import com.bot.bandienthoai.request.DienThoaiAddRequest;
import com.bot.bandienthoai.request.DienThoaiUpdateRequets;
import com.bot.bandienthoai.service.DienThoaiService;

import jakarta.validation.Valid;


@RestController
@RequestMapping()
public class DienThoaiController {
	@Autowired
	DienThoaiService dienThoaiService;
	
	@GetMapping("/getdsdienthoai")
	public APIReponse<List<DienThoaiAdminReponse>> getDSDienThoai(){
		System.out.println("con gà");
		return APIReponse.<List<DienThoaiAdminReponse>>builder().result(dienThoaiService.getDSDienThoaiAdmin()).build();
	}
	
	// get ds dien thoai phan trang
	@GetMapping("/getdsdienthoaiphantrang/{page}")
	public APIReponse<Page<DienThoaiAdminReponse>> getDSDienThoaiPhanTrang(@PathVariable(name = "page") Integer page){
		return APIReponse.<Page<DienThoaiAdminReponse>>builder().result(dienThoaiService.getDSDienThoaiPhanTrang(page, 10)).build();
	}
	
	@PostMapping("/adddienthoai")
	public APIReponse<DienThoaiAdminReponse> addDienThoai(@Valid @ModelAttribute DienThoaiAddRequest request, @RequestPart("image") MultipartFile image) {
		return APIReponse.<DienThoaiAdminReponse>builder().result(dienThoaiService.addDienThoai(request, image)).message("Thêm thành công").build();
	}
	
	@PostMapping("/updatedienthoai")
	public APIReponse<DienThoaiAdminReponse> updateDienThoai(@Valid @ModelAttribute DienThoaiUpdateRequets request, @RequestPart(value = "image", required = false) MultipartFile image){
		return APIReponse.<DienThoaiAdminReponse>builder().result(dienThoaiService.updateDienThoai(request, image)).message("Cập nhập thành công.").build();
	}
	
	@DeleteMapping("/deletedienthoai/{maDienThoai}")
	public APIReponse<String> deleteDienThoai(@PathVariable(name = "maDienThoai") Integer maDienThoai){
		return APIReponse.<String>builder().result(dienThoaiService.deleteDienThoai(maDienThoai)).message("Xóa thành công.").build();
	}
}
