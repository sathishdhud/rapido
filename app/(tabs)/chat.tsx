import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MessageCircle, Send, Phone, MoveVertical as MoreVertical, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Mock chat data
const mockChats = [
  {
    id: '1',
    name: 'Sarah Wilson',
    lastMessage: 'I\'ll be there in 5 minutes!',
    time: '2 min ago',
    unread: 2,
    avatar: '👩‍💼',
    status: 'active',
    rating: 4.9,
    confidence: 96,
  },
  {
    id: '2',
    name: 'Mike Johnson',
    lastMessage: 'Thanks for the ride!',
    time: '1 hour ago',
    unread: 0,
    avatar: '👨‍💻',
    status: 'completed',
    rating: 4.7,
    confidence: 89,
  },
];

const mockMessages = [
  {
    id: '1',
    text: 'Hi! I\'m on my way to pick you up',
    time: '10:30 AM',
    sender: 'other',
  },
  {
    id: '2',
    text: 'Great! I\'m waiting at the entrance',
    time: '10:32 AM',
    sender: 'me',
  },
  {
    id: '3',
    text: 'I\'ll be there in 5 minutes!',
    time: '10:35 AM',
    sender: 'other',
  },
];

export default function ChatScreen() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  if (selectedChat) {
    return (
      <LinearGradient
        colors={['#E0F2FE', '#EDE9FE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedChat(null)}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatHeaderName}>Sarah Wilson</Text>
            <View style={styles.chatHeaderMeta}>
              <View style={styles.chatHeaderRating}>
                <Star size={12} color="#FCD34D" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceText}>96%</Text>
                <Text style={styles.confidenceLabel}>AI Match</Text>
              </View>
            </View>
          </View>
          <View style={styles.chatHeaderActions}>
            <TouchableOpacity style={styles.headerAction}>
              <Phone size={20} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <MoreVertical size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {mockMessages.map((message) => (
            <LinearGradient
              key={message.id}
              colors={message.sender === 'me' ? ['#3B82F6', '#2563EB'] : ['#ffffff', '#f8f9ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.messageCard,
                message.sender === 'me' ? styles.myMessage : styles.otherMessage,
              ]}
            >
              <Text style={[
                styles.messageText,
                message.sender === 'me' ? styles.myMessageText : styles.otherMessageText,
              ]}>
                {message.text}
              </Text>
              <Text style={[
                styles.messageTime,
                message.sender === 'me' ? styles.myMessageTime : styles.otherMessageTime,
              ]}>
                {message.time}
              </Text>
            </LinearGradient>
          ))}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              style={styles.sendButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Send size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#E0F2FE', '#EDE9FE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>Chat with your ride partners</Text>
      </View>

      {/* Chat List */}
      <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
        {mockChats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={() => setSelectedChat(chat)}
            style={styles.chatItem}
          >
            <View style={styles.chatItemContent}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{chat.avatar}</Text>
                <View style={[
                  styles.statusIndicator,
                  { backgroundColor: chat.status === 'active' ? '#10B981' : '#6B7280' },
                ]} />
              </View>

              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <View style={styles.chatMeta}>
                    <View style={styles.ratingContainer}>
                      <Star size={12} color="#FCD34D" />
                      <Text style={styles.chatRating}>{chat.rating}</Text>
                    </View>
                    <View style={styles.confidenceContainer}>
                      <Text style={styles.confidenceText}>{chat.confidence}%</Text>
                      <Text style={styles.confidenceLabel}>AI Match</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
              </View>

              <View style={styles.chatRight}>
                <Text style={styles.chatTime}>{chat.time}</Text>
                {chat.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Empty State */}
        {mockChats.length === 0 && (
          <View style={styles.emptyState}>
            <MessageCircle size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No messages yet</Text>
            <Text style={styles.emptySubtitle}>
              Start a ride to chat with your driver or passenger
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  chatItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  chatItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
    width: 48,
    height: 48,
    textAlign: 'center',
    lineHeight: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  chatMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  chatRating: {
    fontSize: 12,
    color: '#6B7280',
  },
  confidenceContainer: {
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#10B981',
  },
  confidenceLabel: {
    fontSize: 8,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
  },
  chatRight: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 231, 235, 0.5)',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 24,
    color: '#3B82F6',
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  chatHeaderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 2,
  },
  chatHeaderRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  chatHeaderActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerAction: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageCard: {
    maxWidth: '80%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  messageText: {
    fontSize: 14,
    marginBottom: 4,
  },
  myMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: '#1F2937',
  },
  messageTime: {
    fontSize: 10,
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: '#9CA3AF',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(229, 231, 235, 0.5)',
    gap: 12,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: 'white',
  },
  sendButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    padding: 12,
  },
});