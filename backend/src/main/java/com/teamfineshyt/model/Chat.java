// package com.teamfineshyt.model;

// import java.time.LocalDateTime;

// import org.hibernate.annotations.CreationTimestamp;

// // import com.teamfineshyt.enums.ChatStatus;

// import jakarta.persistence.Entity;
// import jakarta.persistence.EnumType;
// import jakarta.persistence.Enumerated;
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
// @Table(name = "chats")
// @Getter
// @Setter
// @AllArgsConstructor
// @NoArgsConstructor
// @Builder
// public class Chat {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne
//     private User sender; // who requested

//     @ManyToOne
//     private User receiver; // who will accept

//     // @Enumerated(EnumType.STRING)
//     // private ChatStatus status;

//     @CreationTimestamp
//     private LocalDateTime createdAt;
// }
