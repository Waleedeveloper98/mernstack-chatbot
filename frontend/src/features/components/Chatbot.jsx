import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Sparkles, Bot } from "lucide-react";
import { handleChat } from "../service/chat.api";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hey 👋 Welcome back. How can I help you today?",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");
    setLoading(true);

    try {
      const data = await handleChat({
        message: currentMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: data?.aiData?.reply || "I couldn't process that.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Something went wrong. Please try again.",
        },
      ]);

      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* CHAT WINDOW */}
      <div
        className={`absolute bottom-20 right-0 transition-all duration-500 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="relative w-[95vw] sm:w-[420px] h-[55vh] sm:h-[600px] max-h-[75vh] overflow-hidden rounded-[30px] border border-white/10 bg-[#071018]/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.65)]">
          {/* BACKGROUND EFFECTS */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-[120px]" />

            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:18px_18px]" />
          </div>

          {/* HEADER */}
          <div className="relative z-20 flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Bot className="text-white w-5 h-5" />
              </div>

              <div>
                <h2 className="text-white text-[15px] font-semibold tracking-wide">
                  AI Assistant
                </h2>

                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>

                  <p className="text-xs text-zinc-400">
                    Online & ready to help
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-zinc-300 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="relative z-10 h-[calc(100%-145px)] overflow-y-auto px-4 py-5 space-y-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-3xl text-sm leading-relaxed shadow-xl transition-all duration-300 hover:scale-[1.01]
                  ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-md"
                      : "bg-white/5 border border-white/10 text-zinc-200 rounded-bl-md backdrop-blur-xl"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-3xl rounded-bl-md flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>

                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-100"></span>

                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-200"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          {/* INPUT */}
          <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10 bg-[#071018]/90 backdrop-blur-2xl z-20">
            <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-cyan-400/40 transition-all">
              <input
                type="text"
                placeholder="Ask anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-zinc-500"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="group relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all bg-white/20"></div>

                <Send size={18} className="text-white relative z-10" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-zinc-500">
              <Sparkles size={12} />
              Powered by intelligent AI support
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="group relative w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_10px_40px_rgba(6,182,212,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all"></div>

        <div className="absolute inset-0 rounded-3xl animate-ping bg-cyan-400/20"></div>

        <MessageCircle className="text-white relative z-10" size={28} />
      </button>
    </div>
  );
};

export default Chatbot;
