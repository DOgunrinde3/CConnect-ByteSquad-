package com.bytesquad.CConnect.cconnectapp.service;
import com.bytesquad.CConnect.cconnectapp.entity.CustomUserDetails;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.ws.rs.NotFoundException;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MongoTemplate mongoTemplate;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));

        User user = mongoTemplate.findOne(query, User.class);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        // Create and return an instance of your UserDetails implementation (e.g., CustomUserDetails)
        return new CustomUserDetails(user.getEmail(), user.getPassword(), "USER");
    }
}