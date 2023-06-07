package com.bytesquad.CConnect.cconnectapp.repository;

import com.bytesquad.CConnect.cconnectapp.entity.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
