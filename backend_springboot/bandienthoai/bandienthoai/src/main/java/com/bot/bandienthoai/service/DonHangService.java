package com.bot.bandienthoai.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.bot.bandienthoai.dto.reponse.ChiTietDonHangReponse;
import com.bot.bandienthoai.dto.reponse.DonHangKhachHangReponse;
import com.bot.bandienthoai.dto.reponse.DonHangReponse;
import com.bot.bandienthoai.dto.reponse.KetQuaDonHangReponse;
import com.bot.bandienthoai.entity.ChiTietDonHang;
import com.bot.bandienthoai.entity.DonHang;
import com.bot.bandienthoai.entity.KhachHang;
import com.bot.bandienthoai.entity.PhienBanDienThoai;
import com.bot.bandienthoai.exception.ErrorCode;
import com.bot.bandienthoai.exception.RunException;
import com.bot.bandienthoai.mapper.DonHangMapper;
import com.bot.bandienthoai.repository.ChiTietDonHangRepository;
import com.bot.bandienthoai.repository.DonHangRepository;
import com.bot.bandienthoai.repository.KhachHangRepository;
import com.bot.bandienthoai.repository.PhienBanDienThoaiRepository;
import com.bot.bandienthoai.request.DonHangAddRequest;
import com.bot.bandienthoai.request.DonHangUpdateRequest;
import com.bot.bandienthoai.request.SanPhamMuaRequest;

@Service
public class DonHangService {
	@Autowired
	DonHangRepository donHangRepository;
	@Autowired
	KhachHangRepository khachHangRepository;
	@Autowired
	DonHangMapper donHangMapper;
	@Autowired
	PhienBanDienThoaiRepository phienBanDienThoaiRepository;
	@Autowired
	ChiTietDonHangRepository chiTietDonHangRepository;

	
	
	public List<DonHangReponse> getDSDonHang() {
		List<DonHang> lst = donHangRepository.findAll();
		return lst.stream().map(donHangMapper::toDonHangReponse).collect(Collectors.toList());
	}

	public List<DonHangKhachHangReponse> getDSDonHangByKhachHang() {
		Integer maKhachHang_ = Integer.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
		List<DonHang> lst = donHangRepository.findByKhachHang_maKhachHang(maKhachHang_);
		return lst.stream().map(donHangMapper::toDonHangKhachHangReponse).collect(Collectors.toList());
	}

	public List<DonHangReponse> getDSByTrangThai(Integer trangThai) {
		if (trangThai == -1) {
			return getDSDonHang();
		}
		List<DonHang> lst = donHangRepository.findByTrangThai(trangThai);
		return lst.stream().map(donHangMapper::toDonHangReponse).collect(Collectors.toList());
	}

	public void updateSoLuong(List<ChiTietDonHang> ctdh, Integer type) {
		for (ChiTietDonHang dh : ctdh) {
			Optional<PhienBanDienThoai> pb = phienBanDienThoaiRepository.findById(dh.getPhienBanDienThoai().getMaPhienBan());
			if (pb.isPresent()) {
				PhienBanDienThoai t = pb.get();
				t.setSoLuong(t.getSoLuong() + type * dh.getSoLuong());
				t = phienBanDienThoaiRepository.save(t);
				System.out.println("Cập nhập số lượng");
			}
			System.out.println("Không cập nhập số lượng");
		}
	}

	public DonHangReponse updateTrangThaiDonHang(DonHangUpdateRequest request) {
		Optional<DonHang> donHang = donHangRepository.findByMaDonHang(request.getMaDonHang());
		if (donHang.isEmpty()) {
			throw new RunException(ErrorCode.Error_System);
		}
		DonHang dh = donHang.get();
		dh.setTrangThai(request.getTrangThai());
		try {
			dh = donHangRepository.save(dh);
		} catch (Exception e) {
			throw new RunException(ErrorCode.Error_System);
		}

		if (request.getTrangThai() == 6) {
			updateSoLuong(dh.getChiTietDonHang(), 1);
		}
		return donHangMapper.toDonHangReponse(dh);
	}

	public ChiTietDonHangReponse getAllInDonHang(String maDonHang) {
		Optional<DonHang> donHang = donHangRepository.findByMaDonHang(maDonHang);
		if (donHang.isEmpty()) {
			throw new RunException(ErrorCode.Error_System);
		}
		DonHang dh = donHang.get();
		return donHangMapper.toChiTietDonHangReponse(dh);
	}

	public KetQuaDonHangReponse addDonHang(DonHangAddRequest request) {
		Integer maKhachHang_ = Integer.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
		Optional<KhachHang> khachHang = khachHangRepository.findById(maKhachHang_);
		if (khachHang.isEmpty()) {
			throw new RunException(ErrorCode.KhachHang_Not_Found);
		}
		String maDonHang = "DH" + String.valueOf(System.currentTimeMillis());
		DonHang dh = new DonHang();
		dh.setMaDonHang(maDonHang);
		dh.setKhachHang(khachHang.get());
		dh.setDiaChiGiaoHang(request.getDiaChi());
		dh.setGhiChu(request.getGhiChu());
		dh.setNgayTao(new Date());
		dh.setPhuongThucThanhToan(request.getPhuongThucThanhToan());
		dh.setTongTien(request.getTongTien());
		dh.setTrangThai(1);
		dh.setTrangThaiThanhToan(request.getTrangThaiThanhToan());

		dh = donHangRepository.save(dh);
		List<ChiTietDonHang> dsChiTiet = new ArrayList<ChiTietDonHang>();
		for (SanPhamMuaRequest sp : request.getDsMua()) {
			Optional<PhienBanDienThoai> phienBan = phienBanDienThoaiRepository.findById(sp.getMaPhienBan());
			if (phienBan.isPresent()) {
				ChiTietDonHang ctdh = new ChiTietDonHang();
				ctdh.setDonHang(dh);
				ctdh.setGiaBan(sp.getGiaBan());
				ctdh.setSoLuong(sp.getSoLuong());
				ctdh.setPhienBanDienThoai(phienBan.get());

				ctdh = chiTietDonHangRepository.save(ctdh);

				dsChiTiet.add(ctdh);
			}

		}

		updateSoLuong(dsChiTiet, -1);
		
		return new KetQuaDonHangReponse(dh.getMaDonHang(), dh.getTongTien(), "");
	}
	
	public Optional<DonHang> getDonHangByMaDonHang(String maDonHang){
		return donHangRepository.findByMaDonHang(maDonHang);
	}
	public void updateTrangThaiThanhToan(String maDonHang, Integer trangThaiThanhToan) {
		Optional<DonHang> donHang = donHangRepository.findByMaDonHang(maDonHang);
		if(donHang.isEmpty()) {
			throw new RunException(ErrorCode.DonHang_Not_Found);
		}
		DonHang dh = donHang.get();
		dh.setTrangThaiThanhToan(trangThaiThanhToan);
		
		dh = donHangRepository.save(dh);
	}
}
