package com.example.beercommunity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
@EnableAutoConfiguration
@EntityScan("com.example.beercommunity.model")
public class BeerCommunityApplication {

	public static final Logger logger = LoggerFactory.getLogger(BeerCommunityApplication.class);

	public static void main(String[] args) {

		SpringApplication.run(BeerCommunityApplication.class, args);
	}

}
