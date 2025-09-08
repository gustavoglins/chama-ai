package com.chamaai.userservice.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Value("${spring.application.name}")
    private String title;

    @Value("${spring.application.version}")
    private String version;

    @Value("${spring.application.description}")
    private String description;

    @Value("${spring.application.contact.name}")
    private String contactName;

    @Value("${spring.application.contact.email}")
    private String contactEmail;

    @Value("${spring.application.contact.url}")
    private String contactUrl;

    @Value("${spring.application.license.name}")
    private String licenseName;

    @Value("${spring.application.license.url}")
    private String licenseUrl;

    @Value("${spring.application.server.url}")
    private String serverUrl;

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title(title)
                        .version(version)
                        .description(description)
                        .contact(new Contact()
                                .name(contactName)
                                .email(contactEmail)
                                .url(contactUrl))
                        .license(new License()
                                .name(licenseName)
                                .url(licenseUrl)))
                .addServersItem(new Server()
                        .url(serverUrl)
                        .description("Servidor local de desenvolvimento"));
    }
}
