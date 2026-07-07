// package com.teamfineshyt.controller.chats;

// import java.util.List;

// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.teamfineshyt.dto.chat.ChatMessageDTO;
// import com.teamfineshyt.dto.chat.ChatRequestDTO;
// import com.teamfineshyt.dto.chat.ChatResponseDTO;
// import com.teamfineshyt.model.Chat;
// import com.teamfineshyt.model.Message;
// import com.teamfineshyt.service.ChatService;

// import lombok.RequiredArgsConstructor;

// @RestController
// @RequestMapping("/api/chats")
// @RequiredArgsConstructor
// @PreAuthorize("hasRole('USER')")
// public class ChatController {
//     private final ChatService chatService;

//     // direct start chat
//     @PostMapping("/start")
//     public Chat startChat(@RequestBody ChatRequestDTO request, Authentication auth) {
//         return chatService.startChat(auth.getName(), request.getUserEmail());
//     }

//     // send
//     @PostMapping("/{id}/send")
//     public Message sendMessage(@PathVariable Long id, @RequestBody ChatMessageDTO dto, Authentication auth) {
//         return chatService.sendMessage(
//                 id,
//                 auth.getName(),
//                 dto.getContent(),
//                 dto.getProductId());
//     }

//     // chats
//     @GetMapping("/my")
//     public List<ChatResponseDTO> myChats(Authentication auth) {
//         return chatService.getMyChats(auth.getName());
//     }

//     // get messages
//     @GetMapping("/{id}/messages")
//     public List<Message> messages(@PathVariable Long id) {
//         return chatService.getMessages(id);
//     }

//     // messages mark seen
//     @PutMapping("/{id}/seen")
//     public void markSeen(@PathVariable Long id, Authentication auth) {
//         chatService.markSeen(id, auth.getName());
//     }

//     // delete chat
//     @DeleteMapping("/{id}")
//     public void deleteChat(@PathVariable Long id, Authentication auth) {
//         chatService.deleteChat(id, auth.getName());
//     }

//     // delete message
//     @DeleteMapping("/message/{id}")
//     public void deleteMessage(@PathVariable Long id, Authentication auth) {
//         chatService.deleteMessage(id, auth.getName());
//     }

//     // request chat
//     // @PostMapping("/request")
//     // public Chat request(@RequestBody ChatRequestDTO request, Authentication auth)
//     // {
//     // return chatService.requestChat(auth.getName(), request.getUserEmail());
//     // }

//     // // pending requests
//     // @GetMapping("/requests")
//     // public List<ChatResponseDTO> requests(Authentication auth) {
//     // return chatService.getRequests(auth.getName());
//     // }

//     // // accept
//     // @PutMapping("/{id}/accept")
//     // public void accept(@PathVariable Long id, Authentication auth) {
//     // chatService.accept(id, auth.getName());
//     // }

//     // // reject
//     // @PutMapping("/{id}/reject")
//     // public void reject(@PathVariable Long id, Authentication auth) {
//     // chatService.reject(id, auth.getName());
//     // }

// }
