package com.bytesquad.CConnect.cconnectapp.repository;

import com.bytesquad.CConnect.cconnectapp.entity.Company;
import com.bytesquad.CConnect.cconnectapp.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CompanyRepository extends MongoRepository<Company, Integer> {
}
