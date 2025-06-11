import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

let nextId = 1;

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([
    { id: nextId++, text: 'Olá! Como posso te ajudar hoje?', fromUser: false },
  ]);
  const [input, setInput] = useState('');

  const getBotReply = (message: string) => {
    const lower = message.toLowerCase();
    if (lower.includes('email')) return 'Você pode alterar seu email nas configurações de perfil.';
    if (lower.includes('depósito')) return 'Depósitos podem levar até 24h para processar.';
    if (lower.includes('ajuda')) return 'Estou aqui para ajudar! Pergunte algo específico.';
    return 'Desculpe, não entendi. Pode reformular?';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: nextId++, text: input.trim(), fromUser: true };
    const botMsg = { id: nextId++, text: getBotReply(input), fromUser: false };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[styles.messageBubble, item.fromUser ? styles.user : styles.bot]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatArea}
      />

      <View style={styles.inputArea}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#888"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <View style={styles.sendInnerCircle} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatBotScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1c1e' },
  chatArea: { padding: 20 },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    maxWidth: '80%',
  },
  user: { backgroundColor: '#2b2b2b', alignSelf: 'flex-end' },
  bot: { backgroundColor: '#333', alignSelf: 'flex-start' },
  messageText: { color: '#fff', fontSize: 14 },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 13,
  },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendInnerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1c1c1e',
  },
});
