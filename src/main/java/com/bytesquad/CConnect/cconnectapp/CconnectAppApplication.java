package com.bytesquad.CConnect.cconnectapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class CconnectAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CconnectAppApplication.class, args);
	}


}
