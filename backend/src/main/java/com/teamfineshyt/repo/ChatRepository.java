package com.teamfineshyt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

// import com.teamfineshyt.enums.ChatStatus;
import com.teamfineshyt.model.Chat;
import com.teamfineshyt.model.User;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findBySenderOrReceiver(User s, User r);

    // List<Chat> findByReceiverAndStatus(User user, ChatStatus status);

    @Query("""
            SELECT c FROM Chat c
            LEFT JOIN Message m ON m.chat = c
            WHERE c.sender = :user OR c.receiver=:user
            GROUP BY c
            ORDER BY MAX(m.sentAt) DESC NULLS LAST
            """)
    List<Chat> findChatsOrderByLatestMessage(@Param("user") User user);
}
