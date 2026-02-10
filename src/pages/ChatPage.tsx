import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-navy-deep mb-8">Chat</h1>

        <div className="grid md:grid-cols-3 gap-6 h-[600px]">
          {/* Sidebar */}
          <Card className="col-span-1 p-4 shadow-sm">
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Conversations</h2>
              <p className="text-sm text-muted-foreground">No conversations yet.</p>
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="col-span-1 md:col-span-2 p-0 shadow-sm flex flex-col items-center justify-center text-center bg-gray-50/50">
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a chat from the left to start messaging.</p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
