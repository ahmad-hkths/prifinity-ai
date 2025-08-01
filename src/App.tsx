import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { sendMessage } from './api/openrouter';
import { getQlooRecommendations } from './api/qloo';
import { Analytics } from "@vercel/analytics/react";



interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  category?: string;
}

const categories = [
  { id: 'pt', label: 'Prifinity Taste', emoji: '✨' },
  { id: 'movies', label: 'Movies', emoji: '🎬' },
  { id: 'restaurants', label: 'Restaurants', emoji: '🍽️' },
  { id: 'books', label: 'Books', emoji: '📚' },
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'tv', label: 'TV Shows', emoji: '📺' },
  { id: 'fashion', label: 'Fashion', emoji: '👗' },
];

function App() {
   
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm PrifinityAI, your intelligent taste companion. Ask me anything or select a category above for personalized recommendations!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      category: activeCategory || undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      let response: string;
      
      if (activeCategory) {
    
        response = await getQlooRecommendations(inputValue, activeCategory);
        response = await sendMessage(inputValue);
       } else {
        
        response = await sendMessage(inputValue);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
        category: activeCategory || undefined,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    inputRef.current?.focus();
  };

  return (
     
    <div>
      {/* ... */}
      <Analytics />
    </div>

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white shadow-lg">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              PrifinityAI
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Your intelligent taste companion for personalized recommendations</p>
        </div>

        {/* Category Selector */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700 shadow-md hover:shadow-lg hover:scale-105 border border-gray-600'
                }`}
              >
                <span>{category.emoji}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
          {activeCategory && (
            <div className="text-center mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-900/50 text-purple-300 border border-purple-700">
                <Sparkles className="w-4 h-4 mr-1" />
                {categories.find(c => c.id === activeCategory)?.label} mode active
              </span>
            </div>
          )}
        </div>

        {/* Chat Container */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-800">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'} animate-fadeIn`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  message.isUser 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-500'
                }`}>
                  {message.isUser ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
                  message.isUser ? 'flex justify-end' : 'flex justify-start'
                }`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    message.isUser
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-sm'
                      : 'bg-gray-700 text-gray-100 rounded-bl-sm border border-gray-600'
                  }`}>
                    {message.text}
                    {message.category && (
                      <div className="mt-2 text-xs opacity-75">
                        {categories.find(c => c.id === message.category)?.emoji} {categories.find(c => c.id === message.category)?.label}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 animate-pulse">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-500 flex items-center justify-center text-white">
                  <Bot size={16} />
                </div>
                <div className="flex-1 max-w-xs">
                  <div className="bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-sm border border-gray-600">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700 p-4 bg-gray-800">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={activeCategory 
                    ? `Ask for ${categories.find(c => c.id === activeCategory)?.label.toLowerCase()} recommendations...`
                    : "Ask me anything or select a category above..."
                  }
                  className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm bg-gray-700 text-gray-100 placeholder-gray-400"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 shadow-lg"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>Powered by Qloo Taste API & OpenAI GPT-3.5-turbo </p>
        </div>
      </div>
    </div>
  );
}

export default App;

