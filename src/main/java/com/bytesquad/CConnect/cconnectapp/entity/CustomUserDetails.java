package com.bytesquad.CConnect.cconnectapp.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(String email, String password, String role) {

        this.email = email;
        this.password = password;
        this.authorities = List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    // Implement the remaining methods of UserDetails interface

    @Override
    public boolean isAccountNonExpired() {
        // Implement account expiration logic
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Implement account locking logic
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Implement credentials expiration logic
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Implement account enabled logic
        return true;
    }
}
