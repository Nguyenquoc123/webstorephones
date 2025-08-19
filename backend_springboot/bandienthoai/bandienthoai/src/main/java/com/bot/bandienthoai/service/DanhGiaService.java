package com.bot.bandienthoai.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.bot.bandienthoai.dto.reponse.DanhGiaReponse;
import com.bot.bandienthoai.dto.reponse.DanhMucReponse;
import com.bot.bandienthoai.entity.DanhGia;
import com.bot.bandienthoai.entity.KhachHang;
import com.bot.bandienthoai.entity.PhienBanDienThoai;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.mapper.DanhGiaMapper;
import com.bot.bandienthoai.repository.DanhGiaRepository;
import com.bot.bandienthoai.repository.KhachHangRepository;
import com.bot.bandienthoai.repository.PhienBanDienThoaiRepository;
import com.bot.bandienthoai.request.DanhGiaRequest;

@Service
public class DanhGiaService {
	@Autowired
	private DanhGiaRepository danhGiaRepository;
	
	@Autowired
	private KhachHangRepository khachHangRepository;
	
	@Autowired
	private PhienBanDienThoaiRepository phienBanDienThoaiRepository;
	
	@Autowired
	private DanhGiaMapper danhGiaMapper;
	
	public List<DanhGiaReponse> getAllDanhGia(){
		List<DanhGia> lst = danhGiaRepository.findAll();
		return lst.stream().map(danhGiaMapper::toDanhGiaReponse).collect(Collectors.toList());
	}
	
	public List<DanhGiaReponse> getDSDanhGiaByMaPhienBan(Integer maPhienBan){
		List<DanhGia> lst = danhGiaRepository.findByPhienBanDienThoai_MaPhienBan(maPhienBan);
		return lst.stream().map(danhGiaMapper::toDanhGiaReponse).collect(Collectors.toList());
	}
	
	public DanhGiaReponse themDanhGia(DanhGiaRequest request) {
		String tmp = SecurityContextHolder.getContext().getAuthentication().getName();
		Integer maKhachHang_ = Integer.valueOf(tmp);
		System.out.println("Mã khách hang là: " + maKhachHang_);
		Optional<KhachHang> khachHang = khachHangRepository.findById(maKhachHang_);
		if(khachHang.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		Optional<PhienBanDienThoai> phienBan = phienBanDienThoaiRepository.findById(request.getMaPhienBan());
		if(phienBan.isEmpty()) {
			throw new RunException(ErrorCode.PhienBanDienThoai_Not_Found);
		}
		DanhGia danhGia = new DanhGia();
		danhGia.setKhachHang(khachHang.get());
		danhGia.setPhienBanDienThoai(phienBan.get());
		danhGia.setSoSao(request.getSoSao());
		danhGia.setNoiDung(request.getNoiDung());
		danhGia.setNgayDanhGia(new Date());
		try {
			danhGia = danhGiaRepository.save(danhGia);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RunException(ErrorCode.Error_System);
		}
		return danhGiaMapper.toDanhGiaReponse(danhGia);
	}
}
