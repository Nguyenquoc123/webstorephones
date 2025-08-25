package com.bot.bandienthoai.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "KhachHang")

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KhachHang {
	public static final String role = "KHACHHANG";
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MaKhachHang")
	private Integer maKhachHang;
	
	@Column(name = "HoTen")
	private String hoTen;
	
	@Column(name = "GioiTinh")
	private Integer gioiTinh;
	
	@Column(name = "NgaySinh")
	private Date ngaySinh;
	
	@Column(name = "SoDienThoai")
	private String soDienThoai;
	
	@Column(name = "Email")
	private String email;
	@Column(name = "DiaChi")
	private String diaChi; 
	@Column(name = "TrangThai")
	private Integer trangThai;
	
	@Column(name = "NgayDangKy")
	private Date ngayDangKy;
	@Column(name = "Avatar")
	private String avatar;
	@Column(name = "UserName")
	private String userName;
	
	@Column(name = "Password")
	private String password;
}
