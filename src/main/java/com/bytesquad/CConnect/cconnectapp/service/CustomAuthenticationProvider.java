package com.bytesquad.CConnect.cconnectapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final UserDetailsService userDetailsService;
    private final StaffUserDetailsService staffUserDetailsService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private boolean isStaff;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();


        UserDetails userDetails;
        if (isStaff) {
            userDetails = staffUserDetailsService.loadUserByUsername(username);
        } else {
            userDetails = userDetailsService.loadUserByUsername(username);
        }

        if (userDetails == null) {
            throw new BadCredentialsException("Wrong Credentials");
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Wrong Credentials");
        }



        Authentication authenticatedToken;
        if (isStaff) {
            authenticatedToken = new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
        } else {
            authenticatedToken = new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
        }

        return authenticatedToken;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    public Authentication authenticate(Authentication authentication, boolean isStaff){
        this.isStaff = isStaff;
        return authenticate(authentication);
    }


}