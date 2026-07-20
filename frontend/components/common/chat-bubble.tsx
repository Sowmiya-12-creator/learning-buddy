"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { typingDot } from "@/lib/motion";
import { MessageRole } from "@/types";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  role: MessageRole;
  content: string;
  timestamp?: string;
  isTyping?: boolean;
}

export default function ChatBubble({ role, content, timestamp, isTyping }: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-3 mb-4", isUser && "flex-row-reverse")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser
            ? "bg-gradient-to-br from-violet-500 to-purple-600"
            : "bg-gradient-to-br from-blue-500 to-cyan-600",
        )}
      >
        {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
      </div>

      {/* Bubble */}
      <div className={cn("max-w-[78%]", isUser && "items-end flex flex-col")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-gradient-to-br from-violet-600 to-purple-700 text-white rounded-tr-sm"
              : "glass text-white/90 rounded-tl-sm",
          )}
        >
          {isTyping ? (
            <div className="flex gap-1 items-center h-5">
              {[0, 0.15, 0.3].map((delay, i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/60 inline-block"
                  variants={typingDot}
                  initial="start"
                  animate="end"
                  transition={{ delay, duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                />
              ))}
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{content}</p>
          )}
        </div>
        {timestamp && (
          <p className="text-white/30 text-xs mt-1 px-1">{timestamp}</p>
        )}
      </div>
    </motion.div>
  );
}
