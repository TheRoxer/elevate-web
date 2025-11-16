"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Search } from "lucide-react";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastMessage?: string;
  lastSeen?: Date;
  unread?: number;
}

export default function ChatPage() {
  const { profile } = useAuthContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<string | null>("bot");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock contacts data - replace with real data from your backend
  const contacts: Contact[] = [
    {
      id: "bot",
      name: "Chat Assistant",
      email: "assistant@elevate.com",
      lastMessage: "Hello! How can I help you today?",
      lastSeen: new Date(),
    },
    // Add more contacts here from your database
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message! This is a demo response. In production, this would connect to your AI backend.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return profile?.email?.slice(0, 2).toUpperCase() || "U";
  };

  const getContactInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayoutClient>
      <Header />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex gap-4 h-[calc(100vh-69px-3rem)]">
            {/* Contacts Sidebar - 1/4 width */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="w-1/4"
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Contacts</CardTitle>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search contacts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </CardHeader>
                <ScrollArea className="flex-1">
                  <div className="p-2 space-y-1">
                    {filteredContacts.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => setSelectedContact(contact.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors ${
                          selectedContact === contact.id ? "bg-accent" : ""
                        }`}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback
                            className={
                              contact.id === "bot"
                                ? "bg-primary text-primary-foreground"
                                : ""
                            }
                          >
                            {contact.id === "bot" ? (
                              <Bot className="h-5 w-5" />
                            ) : (
                              getContactInitials(contact.name)
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left overflow-hidden">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">
                              {contact.name}
                            </p>
                            {contact.unread && contact.unread > 0 && (
                              <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                                {contact.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {contact.lastMessage || contact.email}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </motion.div>

            {/* Chat Window - 3/4 width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-3/4"
            >
              <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                {contacts.find((c) => c.id === selectedContact)?.name ||
                  "Chat Assistant"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Container */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${
                        message.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            message.sender === "user"
                              ? profile?.avatar_url || undefined
                              : undefined
                          }
                        />
                        <AvatarFallback
                          className={
                            message.sender === "bot"
                              ? "bg-primary text-primary-foreground"
                              : ""
                          }
                        >
                          {message.sender === "bot" ? (
                            <Bot className="h-4 w-4" />
                          ) : (
                            getUserInitials()
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`flex flex-col gap-1 max-w-[70%] ${
                          message.sender === "user" ? "items-end" : ""
                        }`}
                      >
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <span className="text-xs text-muted-foreground px-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg px-4 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isTyping || !inputValue.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayoutClient>
  );
}
