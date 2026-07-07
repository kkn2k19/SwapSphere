package com.teamfineshyt.controller.notifications;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamfineshyt.model.Notification;
import com.teamfineshyt.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public List<Notification> my(Authentication auth) {
        return notificationService.getMy(auth.getName());
    }

    @GetMapping("/count")
    public long count(Authentication auth) {
        return notificationService.unreadCount(auth.getName());
    }

    @PutMapping("/{id}/read")
    public void markRead(@PathVariable Long id) {
        notificationService.markRead(id);
    }
}
