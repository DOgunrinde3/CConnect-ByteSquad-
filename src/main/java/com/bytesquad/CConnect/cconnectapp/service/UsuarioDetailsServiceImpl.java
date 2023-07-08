package com.bytesquad.CConnect.cconnectapp.service

import com.bytesquad.CConnect.cconnectapp.entity.User;
import com.bytesquad.CConnect.cconnectapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.api.rest.v1.security.entities.Usuario;
import com.api.rest.v1.security.entities.UsuarioDetails;

@Service
public class UsuarioDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
    	User user = userService.getByEmail(email);
    	
        return user;
    }


}
