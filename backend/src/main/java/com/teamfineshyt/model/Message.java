// package com.teamfineshyt.model;

// import java.time.LocalDateTime;

// import org.hibernate.annotations.CreationTimestamp;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;
// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @Entity
// @Table(name = "messages")
// @Getter
// @Setter
// @AllArgsConstructor
// @NoArgsConstructor
// @Builder
// public class Message {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne
//     private Chat chat;

//     @ManyToOne
//     private User sender;

//     private String senderEmail;

//     private String content;

//     private Long productId; // (for product sharing)

//     private boolean delivered;
//     private boolean seen;

//     @CreationTimestamp
//     private LocalDateTime sentAt;
// }
