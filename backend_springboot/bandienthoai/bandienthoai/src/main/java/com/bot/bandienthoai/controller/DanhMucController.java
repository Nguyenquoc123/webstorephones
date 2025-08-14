package com.bot.bandienthoai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bot.bandienthoai.dto.reponse.APIReponse;
import com.bot.bandienthoai.dto.reponse.DanhMucReponse;
import com.bot.bandienthoai.request.DanhMucAddRequest;

import com.bot.bandienthoai.request.DanhMucUpdateRequest;
import com.bot.bandienthoai.service.DanhMucService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping
public class DanhMucController {
	@Autowired
	DanhMucService danhMucSerive;
	
	@GetMapping("/getdsdanhmuc")
	public APIReponse<List<DanhMucReponse>> getdsdanhmuc(){
		return APIReponse.<List<DanhMucReponse>>builder().result(danhMucSerive.getDSDanhMuc()).build();
	}
	
	@GetMapping("/getdsdanhmuc/{page}")
	public APIReponse<Page<DanhMucReponse>> getdsdanhmuc(@PathVariable(name = "page") Integer page){
		return APIReponse.<Page<DanhMucReponse>>builder().result(danhMucSerive.getDSDanhMucPhanTrang(page, 10)).build();
	}
	
	@PostMapping("/adddanhmuc")
	public APIReponse<DanhMucReponse> addDanhMuc(@RequestBody @Valid DanhMucAddRequest request){
		System.out.println(request.getTenDanhMuc());
		System.out.println(request.getMoTa());
		System.out.println("Không");
		return APIReponse.<DanhMucReponse>builder().result(danhMucSerive.addDanhMuc(request)).message("Đã thêm danh mục.").build();
	}
	
	@PutMapping("/updatedanhmuc")
	public APIReponse<DanhMucReponse> updateDanhMuc(@RequestBody @Valid DanhMucUpdateRequest request ){
		return APIReponse.<DanhMucReponse>builder().result(danhMucSerive.updateDanhMuc(request)).message("Cập nhập thành công.").build();
	}
	
	@DeleteMapping("/deletedanhmuc/{maDanhMuc}")
	public APIReponse<String> deleteDanhMuc(@PathVariable(value = "maDanhMuc") Integer maDanhMuc){
		System.out.println("delete");
		return APIReponse.<String>builder().result(danhMucSerive.deleteDanhMuc(maDanhMuc)).message("Đã xóa.").build();
	}
}
