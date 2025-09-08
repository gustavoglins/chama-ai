package com.chamaai.userservice.infrastructure.security;

import com.chamaai.userservice.infrastructure.config.JwtProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class AuthenticationFilter extends BasicAuthenticationFilter {

    private final JwtProvider jwtProvider;
    private final UserDetailsService userDetailsService;

    public AuthenticationFilter(AuthenticationManager authenticationManager, JwtProvider jwtProvider, UserDetailsService userDetailsService) {
        super(authenticationManager);
        this.jwtProvider = jwtProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    }

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//
//        String token = recoverToken(request);
//
//        if (token != null && !token.isEmpty()) {
//            String username = jwtProvider.validateToken(token, TokenPurpose.SESSION);
//
//            if (username != null && !username.isEmpty() &&
//                    SecurityContextHolder.getContext().getAuthentication() == null) {
//
//                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//
//                var authentication = new UsernamePasswordAuthenticationToken(
//                        userDetails,
//                        null,
//                        userDetails.getAuthorities()
//                );
//
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        }
//
//        filterChain.doFilter(request, response);
//    }

    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) return null;
        return authHeader.substring(7);
    }
}
