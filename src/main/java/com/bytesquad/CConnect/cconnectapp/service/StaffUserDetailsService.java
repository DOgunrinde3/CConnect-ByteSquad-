package com.bytesquad.CConnect.cconnectapp.service;

import com.bytesquad.CConnect.cconnectapp.entity.CustomUserDetails;
import com.bytesquad.CConnect.cconnectapp.entity.Staff;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import com.bytesquad.CConnect.cconnectapp.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service("staffUserDetailsService")
@RequiredArgsConstructor
public class StaffUserDetailsService implements UserDetailsService {

    private final MongoTemplate mongoTemplate;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));

            Staff staff = mongoTemplate.findOne(query, Staff.class);

        if (staff == null) {
            throw new UsernameNotFoundException("Staff not found");
        }



        // Create and return an instance of your UserDetails implementation (e.g., CustomUserDetails)
        return new CustomUserDetails(staff.getEmail(), staff.getPassword(), "STAFF");

    }
}