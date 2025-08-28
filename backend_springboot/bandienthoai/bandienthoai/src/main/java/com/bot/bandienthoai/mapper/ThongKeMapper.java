package com.bot.bandienthoai.mapper;

import org.mapstruct.Mapper;

import com.bot.bandienthoai.dto.reponse.DSKhachHangReponse;
import com.bot.bandienthoai.dto.reponse.DashBoardReponse;
import com.bot.bandienthoai.dto.reponse.DoanhThuReponse;
import com.bot.bandienthoai.dto.reponse.SanPhamBanChayReponse;
import com.bot.bandienthoai.dto.reponse.ThongKeDanhMucReponse;
import com.bot.bandienthoai.dto.reponse.ThongKeKhachHangReponse;
import com.bot.bandienthoai.dto.reponse.ThongKeTaiKhoanReponse;

@Mapper(componentModel = "spring")
public interface ThongKeMapper {
	default ThongKeTaiKhoanReponse toThongKeTaiKhoanReponse(Object[] data) {
		ThongKeTaiKhoanReponse tk = new ThongKeTaiKhoanReponse();
		tk.setTongTaiKhoan(Integer.valueOf(data[0].toString()));
		tk.setHoatDong(Integer.valueOf(data[1].toString()));
		tk.setBiKhoa(Integer.valueOf(data[2].toString()));
		tk.setMoiDangKy(Integer.valueOf(data[3].toString()));
		
		return tk;
	}
	
	default DashBoardReponse toDashBoardReponse(Object[] data) {
		if (data == null || data.length < 4) {
	        return null;
	    }

	    DashBoardReponse response = new DashBoardReponse();

	    response.setDoanhThu(data[0] != null ? Double.valueOf(data[0].toString()) : 0.0);
	    response.setDonHang(data[1] != null ? Integer.valueOf(data[1].toString()) : 0);
	    response.setKhachHang(data[2] != null ? Integer.valueOf(data[2].toString()) : 0);
	    response.setDoanhSo(data[3] != null ? Double.valueOf(data[3].toString()) : 0.0);
	    
	    return response;
	}
	default DoanhThuReponse toDoanhThuReponse(Object[] data) {
		if(data == null || data.length < 2)
			return null;
		DoanhThuReponse response = new DoanhThuReponse();
		if(data[0] != null) {
			response.setName(data[0].toString());
			response.setValue(Double.valueOf(data[1].toString()));
		}
		return response;
		
	}
	default ThongKeDanhMucReponse tothoDanhMucReponse(Object[] data) {
		if(data == null || data.length < 2)
			return null;
		ThongKeDanhMucReponse response = new ThongKeDanhMucReponse();
		if(data[0] != null) {
			response.setName(data[0].toString());
			response.setValue(Integer.valueOf(data[1].toString()));
		}
		return response;
		
	}
	
	default SanPhamBanChayReponse toSanPhamBanChayReponse(Object[] data) {
		if(data == null || data.length < 3)
			return null;
		SanPhamBanChayReponse response = new SanPhamBanChayReponse();
		if(data[0] != null) {
			response.setName(data[0].toString());
			response.setPrice(Double.valueOf(data[1].toString()));
			response.setOrders(Integer.valueOf(data[2].toString()));
		}
		return response;
		
	}
	default ThongKeKhachHangReponse toKeKhachHangReponse(Object[] data) {
		if(data == null || data.length < 2)
			return null;
		ThongKeKhachHangReponse response = new ThongKeKhachHangReponse();
		if(data[0] != null) {
			response.setName(data[0].toString());
			response.setValue(Integer.valueOf(data[1].toString()));
			
		}
		return response;
		
	}
	
	default DSKhachHangReponse toDSKhachHangReponse(Object[] data) {
		if(data == null || data.length < 4)
			return null;
		DSKhachHangReponse response = new DSKhachHangReponse();
		if(data[0] != null) {
			response.setId(Integer.valueOf(data[0].toString()));
			response.setName(data[1].toString());
			response.setEmail(data[1].toString());
			response.setStatus(data[3].toString());
			
		}
		return response;
		
	}
}
