package com.bot.bandienthoai.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bot.bandienthoai.entity.PhienBanDienThoai;
import com.bot.bandienthoai.request.SearchAndFilterRequest;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Service
public class EntityManagerService {
	@PersistenceContext
	private EntityManager entityManager;

	public List<PhienBanDienThoai> search(List<String> keywords) {
		StringBuilder sql = new StringBuilder("Select pb From PhienBanDienThoai pb JOIN pb.dienThoai dt where");
		for (int i = 0; i < keywords.size(); i++) {
			if (i > 0) {
				sql.append(" OR ");
			}
			sql.append(" (LOWER(pb.mauSac) LIKE :kw" + i + " OR LOWER(pb.ram) LIKE :kw" + i
					+ " OR LOWER(pb.rom) LIKE :kw" + i + " OR LOWER(pb.moTa) LIKE :kw" + i
					+ " OR LOWER(dt.tenDienThoai) LIKE :kw" + i + " OR LOWER(dt.hangSanXuat) LIKE :kw" + i + ")");
		}

		TypedQuery<PhienBanDienThoai> query = entityManager.createQuery(sql.toString(), PhienBanDienThoai.class);
		for (int i = 0; i < keywords.size(); i++) {
			query.setParameter("kw" + i, "%" + keywords.get(i) + "%");
		}

		List<PhienBanDienThoai> lst = query.getResultList();
		lst.sort((item1, item2) -> {
			int scoreItem1 = tinhDiemKetQua(item1, keywords);
			int scoreItem2 = tinhDiemKetQua(item2, keywords);
			return Integer.compare(scoreItem2, scoreItem1);
		});
		return lst;
	}

	public int tinhDiemKetQua(PhienBanDienThoai pb, List<String> keywords) {
		int score = 0;
		String mauSac = kyTuThuong(pb.getMauSac());
		String ram = kyTuThuong(pb.getRam());
		String rom = kyTuThuong(pb.getRom());
		String moTa = kyTuThuong(pb.getMoTa());
		String ten = kyTuThuong(pb.getDienThoai().getTenDienThoai());
		String hang = kyTuThuong(pb.getDienThoai().getHangSanXuat());

		for (String key : keywords) {
			if (mauSac.contains(key))
				score++;
			if (ram.contains(key))
				score++;
			if (rom.contains(key))
				score++;
			if (moTa.contains(key))
				score++;
			if (ten.contains(key))
				score += 2;
			if (hang.contains(key))
				score++;
		}
		return score;
	}

	public String kyTuThuong(String value) {
		return value == null ? "" : value.toLowerCase();
	}

	public List<PhienBanDienThoai> filterPhienBan(List<PhienBanDienThoai> dsPhienBan, SearchAndFilterRequest request) {
		List<String> boNho = request.getBoNho().stream().map(item -> kyTuThuong(item)).collect(Collectors.toList());
		return dsPhienBan.stream().filter(pb -> {
			if (request.getHang() != null && !request.getHang().isEmpty()) {
				String hangSX = kyTuThuong(pb.getDienThoai().getHangSanXuat());
				if (hangSX == null || !request.getHang().contains(hangSX)) {
					return false;
				}
			}
			
			if (request.getMinGia() != null && pb.getGiaBan() < request.getMinGia()) {
                return false;
            }
            if (request.getMaxGia() != null && pb.getGiaBan() > request.getMaxGia()) {
                return false;
            }
            
            if (boNho != null && !boNho.isEmpty()) {
                if (!(boNho.contains(kyTuThuong(pb.getRam()))  || boNho.contains(kyTuThuong( pb.getRom())))) {
                	return false;
                }
            }
			return true;
		}).collect(Collectors.toList());

	}
}
