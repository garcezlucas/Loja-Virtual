package com.virtualstore.backend.security.jwt;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.virtualstore.backend.entity.Person;
import com.virtualstore.backend.repository.PersonRepository;
import com.virtualstore.backend.service.PersonDetailService;
import com.virtualstore.backend.service.RefreshTokenService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PersonDetailService personDetailService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private PersonRepository personRepository;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(@SuppressWarnings("null") HttpServletRequest request,
            @SuppressWarnings("null") HttpServletResponse response, @SuppressWarnings("null") FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = getToken(request);
            if (jwt != null && jwtUtil.tokenValidation(jwt)) {
                String email = jwtUtil.getEmailToken(jwt);

                UserDetails userDetails = personDetailService.loadUserByUsername(email);

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                handleExpiredToken(request, response);
            }
        } catch (Exception e) {
            System.out.println("Não foi possível setar a autenticação do usuário");
        }

        filterChain.doFilter(request, response);

    }

    private void handleExpiredToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String jwt = getToken(request);

        String emailUser = jwtUtil.getEmailFromExpiredToken(jwt);

        Long userId = personRepository.findByEmail(emailUser).getId();

        String refreshToken = refreshTokenService.findByUserId(userId).getToken();

        if (refreshToken != null && refreshTokenService.isValid(refreshToken)) {
            Person user = refreshTokenService.getUsernameFromRefreshToken(refreshToken);
            String newAccessToken = jwtUtil.generateTokenUsername(user);
            refreshTokenService.createRefreshToken(user).getToken();

            response.setHeader("Authorization", "Bearer " + newAccessToken);

            UserDetails userDetails = personDetailService.loadUserByUsername(user.getEmail());
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        } else {
            logger.error("Refresh token inválido ou expirado");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Refresh token inválido ou expirado");
        }
    }

    private String getToken(HttpServletRequest request) {
        String headerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(headerToken) && headerToken.startsWith("Bearer ")) {
            return headerToken.replace("Bearer ", "");
        }

        return null;
    }

}
