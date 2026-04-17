package com.photography.cms.service;

import com.photography.cms.dto.AuthResponse;
import com.photography.cms.dto.LoginRequest;
import com.photography.cms.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authManager;
    private final JwtTokenProvider tokenProvider;

    public AuthResponse login(LoginRequest request) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        String username = auth.getName();
        return new AuthResponse(
                tokenProvider.generateToken(username),
                tokenProvider.generateRefreshToken(username));
    }

    public AuthResponse refresh(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }
        String username = tokenProvider.getUsernameFromToken(refreshToken);
        return new AuthResponse(
                tokenProvider.generateToken(username),
                tokenProvider.generateRefreshToken(username));
    }
}
