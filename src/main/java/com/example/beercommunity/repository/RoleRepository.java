package com.example.beercommunity.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.beercommunity.model.Role;


@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {

}
