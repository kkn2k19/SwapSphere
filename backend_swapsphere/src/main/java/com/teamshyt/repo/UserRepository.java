package com.teamshyt.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamshyt.model.User;
import com.teamshyt.model.UserRole;

// import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    Optional<User> findByRole(UserRole role);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
}
