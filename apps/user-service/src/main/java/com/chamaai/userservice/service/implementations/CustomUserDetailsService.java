package com.chamaai.userservice.service.implementations;

import com.chamaai.userservice.entity.User;
import com.chamaai.userservice.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user;

        if (login.contains("@")) {
            user = userRepository.findByEmail(login)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + login));
        } else {
            user = userRepository.findByPhoneNumber(new BigInteger(login))
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with phone: " + login));
        }

        // Usa os dados necessários, sem manter o proxy do Hibernate
        return org.springframework.security.core.userdetails.User
                .withUsername(login)
                .password(user.getPassword())
                .authorities(user.getAuthorities())
                .accountExpired(!user.isAccountNonExpired())
                .accountLocked(!user.isAccountNonLocked())
                .credentialsExpired(!user.isCredentialsNonExpired())
                .disabled(!user.isEnabled())
                .build();
    }


}

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        var user = userRepository.findByEmail(username);
//        if (user == null) {
//            throw new UsernameNotFoundException("User not found: " + username);
//        }
//        return new User(user.get().getUsername(), user.get().getPassword(), user.get().getAuthorities());
//    }

//        return org.springframework.security.core.userdetails.User
//                .withUsername(login)
//                .password(user.getPasswordHash())
//                .authorities("ROLE_" + user.getRole().name())
//                .accountExpired(false)
//                .accountLocked(false)
//                .credentialsExpired(false)
//                .disabled(!user.isActive())
//                .build();