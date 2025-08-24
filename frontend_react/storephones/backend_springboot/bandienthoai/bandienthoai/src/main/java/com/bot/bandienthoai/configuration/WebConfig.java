package com.bot.bandienthoai.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration 
public class WebConfig implements WebMvcConfigurer { // 
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadPath = System.getProperty("user.dir") + "/uploads/";
        String fixedPath = uploadPath.replace("\\", "/");

        System.out.println("Serving static files from: " + fixedPath);

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:///" + fixedPath);
        
       
    }
}
