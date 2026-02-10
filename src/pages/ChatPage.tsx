import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Hash, Users, Send } from "lucide-react";
import { useState } from "react";

const chatRooms = [
  { id: "general", name: "General Chat", icon: Hash, description: "Open discussion for all alumni" },
  { id: "set-chat", name: "Set Chat", icon: Users, description: "Chat by graduation set/year" },
];

export default function ChatPage() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: send message logic
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-navy-deep mb-8">Chat Room</h1>

        <div className="grid md:grid-cols-3 gap-6 h-[600px]">
          {/* Sidebar */}
          <Card className="col-span-1 p-4 shadow-sm">
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Chat Rooms</h2>
              <div className="space-y-2">
                {chatRooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoom(room.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      activeRoom === room.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <room.icon className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{room.name}</p>
                      <p className={`text-xs ${activeRoom === room.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {room.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="col-span-1 md:col-span-2 p-0 shadow-sm flex flex-col bg-muted/30">
            {/* Messages area */}
            <div className="flex-1 flex items-center justify-center text-center">
              {activeRoom ? (
                <div className="p-8">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    {activeRoom === "general" ? <Hash className="w-8 h-8" /> : <Users className="w-8 h-8" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {chatRooms.find((r) => r.id === activeRoom)?.name}
                  </h3>
                  <p className="text-muted-foreground">Be the first to send a message!</p>
                </div>
              ) : (
                <div className="p-8">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Select a chat room</h3>
                  <p className="text-muted-foreground">Choose a room from the left to start chatting.</p>
                </div>
              )}
            </div>

            {/* Input field */}
            {activeRoom && (
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button onClick={handleSend} disabled={!message.trim()} size="icon" className="shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
}