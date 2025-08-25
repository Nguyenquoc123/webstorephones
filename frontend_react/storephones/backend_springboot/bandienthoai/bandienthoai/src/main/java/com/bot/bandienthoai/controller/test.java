package com.bot.bandienthoai.controller;

import java.io.File;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class test {
    @GetMapping("/checkfile")
    public String checkFile() {
    	System.out.println("REAL PATH = " + new File("uploads").getAbsolutePath());
        File f = new File("uploads/a.jpg");
        if (f.exists()) {
            return "File FOUND!";
        } else {
            return "File NOT FOUND!";
        }
    }
}
