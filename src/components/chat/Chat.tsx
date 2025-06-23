"use client";

import * as React from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "lucide-react";

import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { getNameInitials } from "@/utils/getNameInitials";
import { ChatMessageType, ChatPropsType } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@components/ui/avatar";

import Title from "@components/common/Title";
import Container from "@components/common/Container";

const Chat: React.FC<ChatPropsType> = ({ currentUser, otherUser }) => {
  const [messages, setMessages] = React.useState<ChatMessageType[]>([
    {
      id: 1,
      senderId: otherUser.id,
      senderName: otherUser.name,
      message: "Hi! I'm interested in learning more about your project.",
      timestamp: "15:20",
      isCurrentUser: false,
    },
    {
      id: 2,
      senderId: currentUser.id,
      senderName: currentUser.name,
      message: "Thanks for reaching out! I'd be happy to share more details.",
      timestamp: "15:30",
      isCurrentUser: true,
    },
  ]);
  const [newMessage, setNewMessage] = React.useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        senderId: currentUser.id,
        senderName: currentUser.name,
        message: newMessage,
        timestamp: "18:20",
        isCurrentUser: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <Container className="mx-auto max-w-4xl p-6">
      <div className="flex h-[600px] flex-col overflow-hidden rounded-xl shadow-lg">
        <div className="border-border bg-secondary flex items-center justify-between border-b p-4">
          <div className="flex items-center space-x-3">
            <Button asChild variant={"ghost"} className="text-card-foreground">
              <Link href={`/dashboard/${currentUser.role}/`}>
                <ArrowLeftIcon className="text-current" />
              </Link>
            </Button>

            <Avatar>
              <AvatarImage src={otherUser.avatar} />

              <AvatarFallback>
                <p>{getNameInitials(otherUser.name)}</p>
              </AvatarFallback>
            </Avatar>

            <div>
              <Title level="h3" ariaLevel={3} className="text-card-foreground font-semibold">
                {otherUser.name}
              </Title>
              <p className="text-muted-foreground text-sm">
                {otherUser.startupName || otherUser.firm}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-card-foreground text-sm">Online</span>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message: ChatMessageType) => (
            <div
              key={message.id}
              className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                  message.isCurrentUser
                    ? "bg-primary text-white"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <small
                  className={`mt-1 text-xs ${
                    message.isCurrentUser ? "text-blue-100" : "text-muted-foreground"
                  }`}
                >
                  {"15:20"}
                </small>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="focus:ring-primary flex-1 rounded-lg border border-border px-4 py-4 focus:border-transparent focus:ring-2"
            />

            <Button onClick={sendMessage} className="bg-primary px-6 py-4">
              Send
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Chat;
