import { useState, useRef, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DollarSign, Users, Eye, TrendingUp, Star, Send, Bot, Loader2 } from "lucide-react";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export default function Insights() {
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI business assistant. Ask me anything about your revenue, customers, top products, or how to improve your performance.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const revenueData = [
    { month: "Jan", revenue: 8500 },
    { month: "Feb", revenue: 9200 },
    { month: "Mar", revenue: 12450 },
  ];

  const customerData = [
    { month: "Jan", new: 45, returning: 28 },
    { month: "Feb", new: 52, returning: 35 },
    { month: "Mar", new: 68, returning: 42 },
  ];

  const topProducts = [
    {
      name: "Chocolate Cake",
      revenue: 1575,
      quantity: 45,
      customers: 42,
      satisfaction: 4.9,
      viewRate: 85,
      clickRate: 68,
      conversionRate: 72,
    },
    {
      name: "Gel Manicure",
      revenue: 1520,
      quantity: 38,
      customers: 38,
      satisfaction: 4.9,
      viewRate: 92,
      clickRate: 75,
      conversionRate: 81,
    },
    {
      name: "Pedicure Service",
      revenue: 1120,
      quantity: 30,
      customers: 30,
      satisfaction: 4.8,
      viewRate: 78,
      clickRate: 62,
      conversionRate: 65,
    },
  ];

  const businessContext = `
You are an AI business assistant for a small business on BizNextDoor, a local neighbourhood marketplace.
Here is the business's current data:

REVENUE:
- Jan: $8,500 | Feb: $9,200 | Mar: $12,450 (total this quarter: $30,150, +18%)

CUSTOMERS:
- Total: 234 | New this month: 68 | Returning: 42% rate

PROFILE:
- Visits: 1,845 (+12% this month) | Conversion rate: 68% (+3%)

TOP PRODUCTS:
1. Chocolate Cake — $1,575 revenue, 45 sold, 4.9★, 72% conversion, 85% view rate
2. Gel Manicure — $1,520 revenue, 38 sold, 4.9★, 81% conversion, 92% view rate
3. Pedicure Service — $1,120 revenue, 30 sold, 4.8★, 65% conversion, 78% view rate

Be concise, friendly, and actionable. Keep responses under 4 sentences. Focus on practical advice.
`;

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || aiLoading) return;
    const userMsg = inputMessage.trim();
    setInputMessage("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setAiLoading(true);

    try {
      const history = chatMessages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: businessContext }] },
          contents: [...history, { role: "user", parts: [{ text: userMsg }] }],
        }),
      });

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response. Try again.";
      setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Analytics</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Insights</h1>
      </div>

      {/* Overall Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        <Card className="p-6 border border-black/5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-black/60">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-black/30" />
          </div>
          <p className="text-3xl mb-1">$30,150</p>
          <p className="text-sm text-green-600">+18% this quarter</p>
        </Card>

        <Card className="p-6 border border-black/5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-black/60">Total Customers</p>
            <Users className="w-5 h-5 text-black/30" />
          </div>
          <p className="text-3xl mb-1">234</p>
          <p className="text-sm text-black/60">68 new this month</p>
        </Card>

        <Card className="p-6 border border-black/5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-black/60">Profile Visits</p>
            <Eye className="w-5 h-5 text-black/30" />
          </div>
          <p className="text-3xl mb-1">1,845</p>
          <p className="text-sm text-green-600">+12% this month</p>
        </Card>

        <Card className="p-6 border border-black/5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-black/60">Conversion Rate</p>
            <TrendingUp className="w-5 h-5 text-black/30" />
          </div>
          <p className="text-3xl mb-1">68%</p>
          <p className="text-sm text-green-600">+3% this month</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        <Card className="p-6 border border-black/5 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold tracking-tighter mb-6">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border border-black/5 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold tracking-tighter mb-6">Customer Acquisition</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="new" fill="#000" name="New Customers" />
              <Bar dataKey="returning" fill="#666" name="Returning" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Product/Service Metrics */}
      <Card className="p-6 mb-8 border border-black/5 rounded-3xl shadow-sm">
        <h2 className="text-2xl font-bold tracking-tighter mb-6">Top Performers</h2>
        <div className="space-y-4">
          {topProducts.map((item, index) => (
            <div key={index} className="border border-black/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center">
                  {index + 1}
                </div>
                <h3 className="text-lg">{item.name}</h3>
              </div>

              <div className="grid grid-cols-4 gap-6 text-sm">
                <div>
                  <p className="text-black/60 mb-1">Revenue</p>
                  <p className="text-xl font-medium">${item.revenue}</p>
                  <p className="text-black/40">
                    {((item.revenue / 30150) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <div>
                  <p className="text-black/60 mb-1">Quantity Sold</p>
                  <p className="text-xl font-medium">{item.quantity}</p>
                  <p className="text-black/40">{item.customers} customers</p>
                </div>
                <div>
                  <p className="text-black/60 mb-1">Satisfaction</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-black" />
                    <p className="text-xl font-medium">{item.satisfaction}</p>
                  </div>
                  <p className="text-black/40">Highly rated</p>
                </div>
                <div>
                  <p className="text-black/60 mb-1">Conversion</p>
                  <p className="text-xl font-medium">{item.conversionRate}%</p>
                  <p className="text-black/40">
                    {item.viewRate}% view, {item.clickRate}% click
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Chatbot */}
      <Card className="p-6 border border-black/5 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Bot className="w-6 h-6" />
          <h2 className="text-2xl">AI Business Assistant</h2>
        </div>

        <div className="border border-black/5 rounded-3xl overflow-hidden mb-4">
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-black/5">
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  message.role === "user" ? "bg-black text-white" : "bg-white border border-black/5"
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
            {aiLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-black/5 p-4 rounded-2xl flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-black/30" />
                  <span className="text-sm text-black/40">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="flex gap-3 p-4 bg-white border-t border-black/5">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about your business insights..."
              disabled={aiLoading}
              className="bg-black/5 border-none rounded-full focus:ring-2 focus:ring-black/10"
            />
            <Button onClick={handleSendMessage} disabled={aiLoading} className="rounded-full">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-xs text-black/40 text-center">
          Powered by Gemini · Try: "How's my revenue?", "What should I improve?", "Who are my best customers?"
        </p>
      </Card>
    </div>
  );
}
