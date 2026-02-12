package com.teamshyt.repo;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.teamshyt.model.Email;
import com.teamshyt.model.VerificationType;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {
    Optional<Email> findFirstByEmailAndTypeOrderByExpiryTimeDesc(String email, VerificationType type);
    // this query will give us the newest otp
    // first it will fetch all otp of the email with that type and then order them
    // in descending and then provide the first(latest) one

    // adding a method for delete old otp by types
    @Modifying
    @Transactional
    @Query("DELETE FROM Email AS e WHERE e.email = :email AND e.type = :type")
    public void deleteByEmailAndType(@Param("email") String email, @Param("type") VerificationType type);

    @Modifying // this annotation used when delete or update queries written
    @Transactional
    @Query("DELETE FROM Email AS e WHERE e.expiryTime < :now OR e.consumed = true")
    public void deleteExpiredorConsumed(@Param("now") LocalDateTime now);
}
