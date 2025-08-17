package com.bot.bandienthoai.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CartItem")
@IdClass(CartItemId.class)

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItem {
    @Id
    @ManyToOne
    @JoinColumn(name = "cartId")
    private Cart cart;

    @Id
    @ManyToOne
    @JoinColumn(name = "maPhienBan")
    private PhienBanDienThoai phienBanDienThoai;
    
    @Column(name = "SoLuong")
    private int soLuong;
}
