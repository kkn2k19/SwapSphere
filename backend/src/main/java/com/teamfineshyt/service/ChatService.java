// package com.teamfineshyt.service;

// import java.util.List;

// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import com.teamfineshyt.dto.chat.ChatResponseDTO;
// // import com.teamfineshyt.enums.ChatStatus;
// import com.teamfineshyt.model.Chat;
// import com.teamfineshyt.model.Message;
// import com.teamfineshyt.model.User;
// import com.teamfineshyt.repo.ChatRepository;
// import com.teamfineshyt.repo.MessageRepository;
// import com.teamfineshyt.repo.UserRepository;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// @Transactional
// public class ChatService {

//     private final ChatRepository chatRepository;
//     private final MessageRepository messageRepository;
//     private final UserRepository userRepository;

//     // send chat request
//     // public Chat requestChat(String senderEmail, String receiverEmail) {
//     // if (senderEmail.equals(receiverEmail)) {
//     // throw new RuntimeException("Cannot chat with yourself");
//     // }

//     // User sender = userRepository.findByEmail(senderEmail)
//     // .orElseThrow(() -> new RuntimeException("User not found"));
//     // User receiver = userRepository.findByEmail(receiverEmail)
//     // .orElseThrow(() -> new RuntimeException("User not found"));

//     // return chatRepository.save(
//     // Chat.builder()
//     // .sender(sender)
//     // .receiver(receiver)
//     // .status(ChatStatus.PENDING)
//     // .build());
//     // }

//     // accept request
//     // public void accept(Long chatId, String email) {
//     // Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new
//     // RuntimeException("Chat not found"));

//     // if (!chat.getReceiver().getEmail().equals(email)) {
//     // throw new RuntimeException("Not allowed");
//     // }

//     // chat.setStatus(ChatStatus.ACCEPTED);

//     // // chatRepository.save(chat)
//     // }

//     // // reject request
//     // public void reject(Long chatId, String email) {
//     // Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new
//     // RuntimeException("Chat not found"));

//     // if (!chat.getReceiver().getEmail().equals(email)) {
//     // throw new RuntimeException("Not allowed");
//     // }

//     // chat.setStatus(ChatStatus.REJECTED);
//     // }

//     public Chat startChat(String senderEmail, String receiverEmail) {
//         if (senderEmail.equals(receiverEmail)) {
//             throw new RuntimeException("Cannot chat with yourself");
//         }

//         User sender = userRepository.findByEmail(senderEmail)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         User receiver = userRepository.findByEmail(receiverEmail)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         // check existing chats
//         List<Chat> chats = chatRepository.findBySenderOrReceiver(sender, sender);

//         for (Chat c : chats) {
//             if ((c.getSender().getEmail().equals(senderEmail) &&
//                     c.getReceiver().getEmail().equals(receiverEmail))
//                     ||
//                     (c.getSender().getEmail().equals(receiverEmail) &&
//                             c.getReceiver().getEmail().equals(senderEmail))) {
//                 return c;
//             }
//         }

//         // create new chat

//         Chat chat = Chat.builder()
//                 .sender(sender)
//                 .receiver(receiver)
//                 .build();

//         return chatRepository.save(chat);

//     }

//     // my chats (accepted only)
//     public List<ChatResponseDTO> getMyChats(String email) {
//         User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

//         return chatRepository.findChatsOrderByLatestMessage(user)
//                 .stream()
//                 // .filter(c -> c.getStatus() == ChatStatus.ACCEPTED)
//                 .map(chat -> {
//                     User other = chat.getSender().getEmail().equals(email)
//                             ? chat.getReceiver()
//                             : chat.getSender();

//                     List<Message> msgs = messageRepository.findByChatOrderBySentAtAsc(chat);

//                     String lastMessage = msgs.isEmpty()
//                             ? "Start chatting..."
//                             : msgs.get(msgs.size() - 1).getContent();

//                     int unreadCount = (int) msgs.stream()
//                             .filter(m -> !m.isSeen()
//                                     && !m.getSender().getEmail().equals(email))
//                             .count();

//                     return new ChatResponseDTO(
//                             chat.getId(),
//                             other.getName(),
//                             other.getEmail(),
//                             lastMessage,
//                             unreadCount);
//                 })
//                 .toList();
//     }

//     // // chat requests (pending)
//     // public List<ChatResponseDTO> getRequests(String email) {
//     // User user = userRepository.findByEmail(email).orElseThrow(() -> new
//     // RuntimeException("User not found"));

//     // return chatRepository.findByReceiverAndStatus(user, ChatStatus.PENDING)
//     // .stream()
//     // .map(chat -> new ChatResponseDTO(
//     // chat.getId(),
//     // chat.getSender().getName(),
//     // chat.getSender().getEmail()))
//     // .toList();
//     // }

//     // send message
//     public Message sendMessage(Long chatId, String senderEmail, String content, Long productId) {
//         Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));

//         // if (chat.getStatus() != ChatStatus.ACCEPTED) {
//         // throw new RuntimeException("Chat not accepted yet");
//         // }

//         System.out.println("Sender email received: " + senderEmail);

//         User sender = userRepository.findByEmail(senderEmail)
//                 .orElseThrow(() -> new RuntimeException("User not found: " + senderEmail));
//         Message msg = Message.builder()
//                 .chat(chat)
//                 .sender(sender)
//                 .senderEmail(senderEmail)
//                 .content(content)
//                 .productId(productId)
//                 .delivered(true) // delivered instantly
//                 .seen(false)
//                 .build();

//         return messageRepository.save(msg);
//     }

//     // get message
//     public List<Message> getMessages(Long chatId) {
//         Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));
//         return messageRepository.findByChatOrderBySentAtAsc(chat);
//     }

//     // mark messages seen
//     public void markSeen(Long chatId, String email) {
//         Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));

//         List<Message> msgs = messageRepository.findByChatOrderBySentAtAsc(chat);
//         for (Message m : msgs) {
//             if (!m.getSender().getEmail().equals(email)) {
//                 m.setSeen(true);
//             }
//         }
//     }

//     // delete chat (full chat)
//     public void deleteChat(Long chatId, String email) {
//         Chat chat = chatRepository.findById(chatId)
//                 .orElseThrow(() -> new RuntimeException("Chat not found"));

//         if (!chat.getSender().getEmail().equals(email) &&
//                 !chat.getReceiver().getEmail().equals(email)) {
//             throw new RuntimeException("Not allowed");
//         }

//         messageRepository.deleteAll(
//                 messageRepository.findByChatOrderBySentAtAsc(chat));

//         chatRepository.delete(chat);
//     }

//     // delete message single
//     public void deleteMessage(Long messageId, String email) {
//         Message msg = messageRepository.findById(messageId)
//                 .orElseThrow(() -> new RuntimeException("Message not found"));

//         if (!msg.getSender().getEmail().equals(email)) {
//             throw new RuntimeException("You can delete only your messages");
//         }

//         messageRepository.delete(msg);
//     }
// }
