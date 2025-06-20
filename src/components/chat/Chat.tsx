"use client";

import * as React from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "lucide-react";

import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@components/ui/avatar";
import { getNameInitials } from "@/utils/getNameInitials";
import Container from "@components/common/Container";
import Title from "@components/common/Title";

const Chat = ({ currentUser, otherUser }: any) => {
  const [messages, setMessages] = React.useState<any>([
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
      <div className="flex h-[600px] flex-col overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b bg-gray-50 p-4">
          <div className="flex items-center space-x-3">
            <Button asChild variant={"ghost"}>
              <Link href={`/dashboard/${currentUser.role}/`}>
                <ArrowLeftIcon />
              </Link>
            </Button>

            <Avatar>
              <AvatarImage src={otherUser.avatar} />

              <AvatarFallback className="bg-primary/30">
                <p>{getNameInitials(otherUser.name)}</p>
              </AvatarFallback>
            </Avatar>

            <div>
              <Title level="h3" ariaLevel={3} className="font-semibold text-gray-900">
                {otherUser.name}
              </Title>
              <p className="text-sm text-gray-500">{otherUser.startupName || otherUser.firm}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-sm text-gray-500">Online</span>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message: any) => (
            <div
              key={message.id}
              className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                  message.isCurrentUser ? "bg-primary text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <small
                  className={`mt-1 text-xs ${
                    message.isCurrentUser ? "text-blue-100" : "text-gray-500"
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
              className="focus:ring-primary flex-1 rounded-lg border border-gray-300 px-4 py-4 focus:border-transparent focus:ring-2"
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
