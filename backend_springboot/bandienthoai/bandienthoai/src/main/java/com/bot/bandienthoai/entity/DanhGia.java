package com.bot.bandienthoai.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DanhGia")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDanhGia")
    private Integer maDanhGia;

    @Column(name = "NoiDung")
    private String noiDung;
    @Column(name = "SoSao")
    private Integer soSao;
    @Column(name = "NgayDanhGia")
    private Date ngayDanhGia;

    @ManyToOne
    @JoinColumn(name = "maKhachHang")
    private KhachHang khachHang;

    @ManyToOne
    @JoinColumn(name = "maPhienBan")
    private PhienBanDienThoai phienBanDienThoai;
}
