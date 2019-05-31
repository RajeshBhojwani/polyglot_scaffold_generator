package com.dellemc.<%= _.slugify(domainName) %>.config;

  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
  import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
  import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
  import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
  import org.springframework.cloud.netflix.ribbon.RibbonAutoConfiguration;
  import org.springframework.context.annotation.ComponentScan;
  import org.springframework.context.annotation.Configuration;
  <% if (service == 'eureka') { %>import org.springframework.cloud.client.discovery.EnableDiscoveryClient;<% } %>

@Configuration
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, RibbonAutoConfiguration.class})
@ComponentScan({"com.dellemc.<%= _.slugify(domainName) %>"})
<% if (service == 'eureka') { %>@EnableDiscoveryClient<% } %>

public class <%= className %>ServiceApplication  {

	public static void main(String[] args) {
		SpringApplication.run(<%= className %>ServiceApplication.class, args);
	}

}
