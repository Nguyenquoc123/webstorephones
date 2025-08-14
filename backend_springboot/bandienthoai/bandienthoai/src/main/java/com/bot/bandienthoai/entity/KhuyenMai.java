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
@Table(name = "KhuyenMai")

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaKhuyenMai")
    private Integer maKhuyenMai;

    @Column(name = "TenKhuyenMai")
    private String tenKhuyenMai;
    @Column(name = "LoaiKhuyenMai")
    private String loaiKhuyenMai;
    @Column(name = "GiaTriGiam")
    private Double giaTriGiam;
    @Column(name = "DieuKien")
    private Double dieuKien;
    @Column(name = "NgayBatDau")
    private Date ngayBatDau;
    @Column(name = "NgayKetThuc")
    private Date ngayKetThuc;
    @Column(name = "TrangThai")
    private Integer trangThai;
}
