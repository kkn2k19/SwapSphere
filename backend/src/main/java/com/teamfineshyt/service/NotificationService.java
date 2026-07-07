package com.teamfineshyt.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamfineshyt.model.Notification;
import com.teamfineshyt.model.User;
import com.teamfineshyt.repo.NotificationRepository;
import com.teamfineshyt.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public void create(String email, String message, String type, Long refId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .type(type)
                .referenceId(refId)
                .build();

        notificationRepository.save(notification);
    }

    public List<Notification> getMy(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public long unreadCount(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return notificationRepository.countByUserAndReadFalse(user);
    }

    public void markRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("notification not found"));

        notification.setRead(true);
        notificationRepository.save(notification);
    }
}
