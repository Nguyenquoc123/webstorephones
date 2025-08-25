package com.bot.bandienthoai.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "PhienBanDienThoai")

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PhienBanDienThoai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaPhienBan")
    private Integer maPhienBan;

    @Column(name = "MauSac")
    private String mauSac;
    @Column(name = "Rom")
    private String rom;
    @Column(name = "Ram")
    private String ram;
    @Column(name = "SoLuong")
    private Integer soLuong;
    

    @Column(name = "GiaBan")
    private Double giaBan;
    @Column(name = "Pin")
    private Integer pin;
    @Column(name = "ManHinh")
    private Double manHinh;
    @Column(name = "Camera")
    private Integer camera;
    @Column(name = "TrangThai")
    private Integer trangThai;
    @Column(name = "MoTa")
    private String moTa;
    @ManyToOne
    @JoinColumn(name = "maDienThoai")
    private DienThoai dienThoai;
    
    @OneToMany(mappedBy = "phienBanDienThoai", fetch = FetchType.LAZY)
    private List<Images> images;
}
