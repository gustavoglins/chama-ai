package com.chamaai.userservice.infrastructure.config;

import com.chamaai.userservice.domain.services.UserDomainService;
import com.chamaai.userservice.domain.specification.UserEligibilitySpec;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DomainConfig {

    @Bean
    public UserEligibilitySpec userEligibilitySpec() {
        return new UserEligibilitySpec();
    }

    @Bean
    public UserDomainService userDomainService(UserEligibilitySpec eligibilitySpec) {
        return new UserDomainService(eligibilitySpec);
    }
}
