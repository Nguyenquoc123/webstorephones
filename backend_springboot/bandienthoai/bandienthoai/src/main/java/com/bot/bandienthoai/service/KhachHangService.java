package com.bot.bandienthoai.service;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bot.bandienthoai.configuration.JWTUtil;
import com.bot.bandienthoai.dto.reponse.AuthenticationReponse;
import com.bot.bandienthoai.dto.reponse.KhachHangInQuanLyReponse;
import com.bot.bandienthoai.dto.reponse.KhachHangReponse;
import com.bot.bandienthoai.dto.reponse.ThongKeTaiKhoanReponse;
import com.bot.bandienthoai.dto.reponse.ThongTinGiaoDichReponse;
import com.bot.bandienthoai.entity.KhachHang;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.mapper.KhachHangMapper;
import com.bot.bandienthoai.mapper.ThongKeMapper;
import com.bot.bandienthoai.mapper.ThongTinGiaoDichMapper;
import com.bot.bandienthoai.repository.DonHangRepository;
import com.bot.bandienthoai.repository.KhachHangRepository;
import com.bot.bandienthoai.request.ChangePasswordRequest;
import com.bot.bandienthoai.request.EditKhachHangRequest;
import com.bot.bandienthoai.request.KhachHangRequest;
import com.bot.bandienthoai.request.UpdateHoSoRequest;

@Service
public class KhachHangService {
	@Autowired
	KhachHangRepository khachHangRepository;

	@Autowired
	DonHangRepository donHangRepository;

	@Autowired
	KhachHangMapper khachHangMapper;

	@Autowired
	ThongTinGiaoDichMapper thongTinGiaoDichMapper;
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	ThongKeMapper thongKeMapper;
	public AuthenticationReponse signUp(KhachHangRequest kh) {
		Optional<KhachHang> khachhang_ = khachHangRepository.findByUserName(kh.getUserName());
		if (khachhang_.isPresent()) {
			throw new RunException(ErrorCode.UserName_Exists);
		}
		khachhang_ = khachHangRepository.findByEmail(kh.getEmail());
		if (khachhang_.isPresent()) {
			throw new RunException(ErrorCode.Email_Exists);
		}
		khachhang_ = khachHangRepository.findBySoDienThoai(kh.getSoDienThoai());
		if (khachhang_.isPresent()) {
			throw new RunException(ErrorCode.SDT_Exists);
		}
		KhachHang tmp = new KhachHang();
		tmp.setEmail(kh.getEmail());
		tmp.setHoTen(kh.getHoTen());
		tmp.setSoDienThoai(kh.getSoDienThoai());
		tmp.setGioiTinh(kh.getGioiTinh());
		tmp.setNgaySinh(kh.getNgaySinh());
		tmp.setUserName(kh.getUserName());
		tmp.setPassword(passwordEncoder.encode(kh.getPassword()));
		tmp.setTrangThai(1);
		tmp.setNgayDangKy(new Date());
		try {
			tmp = khachHangRepository.save(tmp);

		} catch (Exception e) {
			throw new RunException(ErrorCode.Create_Failed);
		}
		String token = JWTUtil.generateToken(tmp.getMaKhachHang(), tmp.role);
		return new AuthenticationReponse(tmp.getMaKhachHang(), token, tmp.role);
	}

	public String changePassword(ChangePasswordRequest request) {
		Integer maKhachHang_ = Integer.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
		Optional<KhachHang> kh = khachHangRepository.findById(maKhachHang_);
		if (kh.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		KhachHang tmp = kh.get();
		if(!passwordEncoder.matches(request.getPasswordOld(), tmp.getPassword())) {
			throw new RunException(ErrorCode.Password_InValid);
		}
		tmp.setPassword(passwordEncoder.encode(request.getPasswordNew()));
		try {
			khachHangRepository.save(tmp);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}

		return "Đổi mật khẩu thành công.";
	}

	public KhachHangReponse getInfo() {
		Integer maKhachHang_ = Integer.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
		Optional<KhachHang> khachHang = khachHangRepository.findById(maKhachHang_);
		if (khachHang.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		System.out.println("Chạy ko");
		Optional<Object> tt = donHangRepository.getThongTinGiaoDich(maKhachHang_);
		System.out.println("Chạy ko");
		System.out.println(tt.get().getClass());
		ThongTinGiaoDichReponse thongTin = thongTinGiaoDichMapper.toThongTinGiaoDichReponse((Object[]) tt.get());
		System.out.println("Chạy ko");
		KhachHangReponse tmp = new KhachHangReponse();
		tmp.setMaKhachHang(khachHang.get().getMaKhachHang());
		tmp.setHoTen(khachHang.get().getHoTen());
		tmp.setEmail(khachHang.get().getEmail());
		tmp.setSoDienThoai(khachHang.get().getSoDienThoai());
		tmp.setNgaySinh(khachHang.get().getNgaySinh());
		tmp.setGioiTinh(khachHang.get().getGioiTinh());
		tmp.setDiaChi(khachHang.get().getDiaChi());
		tmp.setTongTien(thongTin.getTongTien());
		tmp.setSoDonHang(thongTin.getSoDonHang());
		tmp.setNgayDatHangGanNhat(thongTin.getNgayDatHangGanNhat());
		tmp.setUsername(khachHang.get().getUserName());
		if(khachHang.get().getAvatar() != null)
			tmp.setAvatar("http://localhost:8080/storephones/uploads/" + khachHang.get().getAvatar());
		tmp.setNgayDangKy(khachHang.get().getNgayDangKy());
		return tmp;
	}

	public KhachHangReponse updateHoSo(UpdateHoSoRequest request, MultipartFile image) {
		String urlImg = "";
		if (image != null) {
			String urlFolder = System.getProperty("user.dir") + "\\uploads";

			File uploadFolder = new File(urlFolder);
			if (!uploadFolder.exists()) {
				uploadFolder.mkdirs();
			}

			String fileName = System.currentTimeMillis() + image.getOriginalFilename();
			File destination = new File(uploadFolder, fileName);
			
			try {
				image.transferTo(destination);
				urlImg = fileName;
				System.out.println("Daluu");
				System.out.println(urlFolder);
			} catch (Exception e) {
				System.out.println("Lỗi rồi");
				throw new RunException(ErrorCode.Image_Not_Valid);

			}
		}

		Integer maKhachHang_ = Integer.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
		Optional<KhachHang> khachHang = khachHangRepository.findById(maKhachHang_);
		if (khachHang.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		KhachHang kh = khachHang.get();
		if (!kh.getUserName().equals(request.getUserName())) {
			Optional<KhachHang> tmp = khachHangRepository.findByUserName(request.getUserName());
			if (tmp.isPresent())
				throw new RunException(ErrorCode.UserName_Exists);
		}
		if (!kh.getEmail().equals(request.getEmail())) {
			Optional<KhachHang> tmp = khachHangRepository.findByEmail(request.getEmail());
			if (tmp.isPresent())
				throw new RunException(ErrorCode.Email_Exists);
		}
		if (!kh.getSoDienThoai().equals(request.getSoDienThoai())) {
			Optional<KhachHang> tmp = khachHangRepository.findBySoDienThoai(request.getSoDienThoai());
			if (tmp.isPresent())
				throw new RunException(ErrorCode.SDT_Exists);
		}
		System.out.println("Update hồ sở");
		System.out.println(request.getNgaySinh());
		kh.setHoTen(request.getHoTen());
		kh.setDiaChi(request.getDiaChi());
		kh.setEmail(request.getEmail());
		kh.setGioiTinh(request.getGioiTinh());
		kh.setNgaySinh(request.getNgaySinh());
		kh.setSoDienThoai(request.getSoDienThoai());
		kh.setUserName(request.getUserName());
		if(urlImg != "") {
			kh.setAvatar(urlImg);
		}
		kh = khachHangRepository.save(kh);
		return getInfo();
	}
	
	
	public ThongKeTaiKhoanReponse thongKeTaiKhoan() {
		Optional<Object> tmp = khachHangRepository.thongKeKhachHang();
		return thongKeMapper.toThongKeTaiKhoanReponse((Object[]) tmp.get());
	}
	
	public List<KhachHangInQuanLyReponse> search(String keyword){
		if(keyword == null || keyword.isEmpty())
			return getDSKhachHang(null);
		keyword = "%" + keyword.toLowerCase() + "%";
		List<KhachHang> lst = khachHangRepository.search(keyword);
		return lst.stream().map(khachHangMapper::toKhachHangInQuanLyReponse).collect(Collectors.toList());
	}
	public List<KhachHangInQuanLyReponse> getDSKhachHang(Integer search){
		List<KhachHang> lst = khachHangRepository.getDSKhachHang(search);
		return lst.stream().map(khachHangMapper::toKhachHangInQuanLyReponse).collect(Collectors.toList());
	}
	
	public String khoaMoTaiKhoan(Integer maKhachHang) {
		Optional<KhachHang> kh = khachHangRepository.findById(maKhachHang);
		if(kh.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		KhachHang khachHang = kh.get();
		if(khachHang.getTrangThai() == 1)
			khachHang.setTrangThai(0);
		else
			khachHang.setTrangThai(1);
		khachHang = khachHangRepository.save(khachHang);
		return khachHang.getTrangThai() == 0 ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản";
	}
	public String xoaTaiKhoan(Integer maKhachHang) {
		Optional<KhachHang> kh = khachHangRepository.findById(maKhachHang);
		if(kh.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		KhachHang khachHang = kh.get();	
		khachHang.setTrangThai(-1);
		khachHang = khachHangRepository.save(khachHang);
		return "Đã xóa tài khoản";
	}
	
	public String xoaNhieuTaiKhoan(List<Integer> ds) {
		for(Integer maKhachHang : ds) {
			Optional<KhachHang> kh = khachHangRepository.findById(maKhachHang);
			if(kh.isEmpty()) {
				throw new RunException(ErrorCode.KhachHang_Not_Found);
			}
			KhachHang khachHang = kh.get();	
			khachHang.setTrangThai(-1);
			khachHang = khachHangRepository.save(khachHang);
		}
		
		return "Đã xóa tài khoản";
	}
	public String khoaTaiKhoan(Integer maKhachHang) {
		Optional<KhachHang> kh = khachHangRepository.findById(maKhachHang);
		if(kh.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		KhachHang khachHang = kh.get();
		khachHang.setTrangThai(-1);
		khachHang = khachHangRepository.save(khachHang);
		return "Đã khóa tài khoản";
	}
	public String moKhoaTaiKhoan(Integer maKhachHang) {
		Optional<KhachHang> kh = khachHangRepository.findById(maKhachHang);
		if(kh.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		KhachHang khachHang = kh.get();
		khachHang.setTrangThai(1);
		khachHang = khachHangRepository.save(khachHang);
		return "Đã mở khóa tài khoản";
	}
	
	public String editKhachHang(EditKhachHangRequest request) {
		Optional<KhachHang> kh = khachHangRepository.findById(request.getMaKhachHang());
		if(kh.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		
		Optional<KhachHang> khachhang_ = khachHangRepository.findByEmail(request.getEmail());
		if (khachhang_.isPresent()) {
			throw new RunException(ErrorCode.Email_Exists);
		}
		khachhang_ = khachHangRepository.findBySoDienThoai(request.getSoDienThoai());
		if (khachhang_.isPresent()) {
			throw new RunException(ErrorCode.SDT_Exists);
		}
		
		KhachHang khachHang = new KhachHang();
		khachHang.setHoTen(request.getHoTen());
		khachHang.setEmail(request.getEmail());
		khachHang.setSoDienThoai(request.getSoDienThoai());
		if(request.isResetpassword()) {
			khachHang.setPassword(passwordEncoder.encode("11111111"));
		}
		
		khachHang = khachHangRepository.save(khachHang);
		return "Update thành công";
	}
}
