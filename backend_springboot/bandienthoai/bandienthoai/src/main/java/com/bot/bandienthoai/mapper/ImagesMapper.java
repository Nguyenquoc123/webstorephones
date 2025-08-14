package com.bot.bandienthoai.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.bot.bandienthoai.dto.reponse.ImagesReponse;
import com.bot.bandienthoai.entity.Images;

@Mapper(componentModel = "spring")
public interface ImagesMapper {

    default ImagesReponse toImagesReponse(Images img) {
        if (img == null) return null;

        ImagesReponse dto = new ImagesReponse();
        dto.setId(img.getId());
        dto.setUrl("http://localhost:8080/storephones/uploads/" + img.getUrl());
        return dto;
    }

    List<ImagesReponse> toImagesDTOList(List<Images> images);
}
