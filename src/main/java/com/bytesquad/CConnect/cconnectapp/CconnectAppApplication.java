package com.bytesquad.CConnect.cconnectapp;

import com.bytesquad.CConnect.cconnectapp.repository.CompanyRepository;
import com.bytesquad.CConnect.cconnectapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.repository.support.Repositories;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class CconnectAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CconnectAppApplication.class, args);
	}


}
