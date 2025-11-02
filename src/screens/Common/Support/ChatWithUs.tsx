// ChatSupport.tsx

import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import SubHeader from '../../../navigation/SubHeader';
// --- Type Definitions ---
type User = {
  id: number;
  name: string;
  avatar?: any; // Using `any` for require()
};

type Message = {
  id: string;
  text: string;
  timestamp: string;
  user: User;
};

// --- Mock Data ---
const SUPPORT_USER: User = {
  id: 1,
  name: 'Arjun Mehta',
  avatar: require('../../../assets/images/png/callSupport.png'), // Add a placeholder avatar in your assets folder
};

const CURRENT_USER: User = {
  id: 2,
  name: 'You',
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Track My Installation',
    timestamp: '12:20 am',
    user: CURRENT_USER,
  },
  {
    id: '2',
    text: 'Sure! Please share your Request ID or registered phone number.',
    timestamp: '11:59 pm', // Note: Timestamps in screenshot are out of order
    user: SUPPORT_USER,
  },
  {
    id: '3',
    text: '9876543210',
    timestamp: '12:05 am',
    user: CURRENT_USER,
  },
  {
    id: '4',
    text: 'Status: Vendor Assigned\nNext Step: Site survey scheduled for 18th July, 11 AM\nLocation: Bengaluru\nIs there anything else I can help you with?',
    timestamp: '12:16 am',
    user: SUPPORT_USER,
  },
  {
    id: '5',
    text: 'Perfect! Thank you',
    timestamp: '12:20 am',
    user: CURRENT_USER,
  },
];

// --- The Component ---
const ChatSupport = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
      user: CURRENT_USER,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.user.id === CURRENT_USER.id;

    if (isCurrentUser) {
      // Current user's message (right side)
      return (
        <View style={styles.myMessageContainer}>
          <View style={styles.myMessageBubble}>
            <Text style={styles.myMessageText}>{item.text}</Text>
          </View>
          <View style={styles.myMessageDetails}>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            <Icon name="check" size={16} color="#4CAF50" style={{marginLeft: 4}}/>
          </View>
        </View>
      );
    } else {
      // Support agent's message (left side)
      return (
        <View style={styles.supportMessageContainer}>
          <Image source={item.user.avatar} style={styles.avatar} />
          <View>
            <Text style={styles.supportUserName}>{item.user.name}</Text>
            <View style={styles.supportMessageBubble}>
              <Text style={styles.supportMessageText}>{item.text}</Text>
            </View>
             <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SubHeader title="Rengy support" type="default" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
      >
        {/* Chat Area */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.chatArea}
          contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 12 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter message"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="paperclip" size={22} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Icon name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },

  chatArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  // My Message (Current User)
  myMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  myMessageBubble: {
    backgroundColor: '#E2FCD4',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    maxWidth: '80%',
  },
  myMessageText: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#333',
  },
  myMessageDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  // Support Agent Message
  supportMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  supportUserName: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  supportMessageBubble: {
    backgroundColor: '#F1F1F1',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    maxWidth: '80%',
  },
  supportMessageText: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'GeneralSans-Medium',
    color: '#888',
    marginTop: 4,
    alignSelf: 'flex-end'
  },
  // Input Area
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#F1F1F1',
    borderRadius: 22,
    paddingHorizontal: 18,
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF', // A standard blue send button color
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default ChatSupport;