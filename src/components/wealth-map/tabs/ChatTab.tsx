
import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { NatalChartData } from '@/lib/natal-chart';
import { generateAIResponse } from '../utils/chatUtils';

type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

interface ChatTabProps {
  natalChart: NatalChartData;
  fullAnalysis: any;
}

const ChatTab: React.FC<ChatTabProps> = ({ natalChart, fullAnalysis }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'ai', 
      content: '¡Hola! Soy tu asistente astrológico financiero. Pregúntame lo que quieras saber sobre tu carta natal y cómo puede influir en tu prosperidad financiera.', 
      timestamp: new Date() 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Effect to scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle sending a chat message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      // Generate a response based on the user's question and the natal chart data
      const aiResponse = generateAIResponse(inputMessage, natalChart, fullAnalysis);
      
      const aiMessage: ChatMessage = {
        role: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };
  
  // Handle keypress in the input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-cosmos-gold">Consulta con IA Astrológica</h3>
      <p className="text-xs italic mb-2">
        Haz preguntas específicas sobre tu situación financiera y recibe consejos basados en tu carta natal
      </p>
      
      <div className="border border-cosmos-pink/30 rounded-lg p-3 mb-3 h-[280px] overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 pr-2 mb-2">
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-2 rounded-lg text-xs ${
                    msg.role === 'user' 
                      ? 'bg-cosmos-pink/30 text-cosmos-darkGold' 
                      : 'bg-cosmos-gold/20 text-cosmos-darkGold'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="flex gap-2 items-center mt-auto">
          <textarea 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Haz una pregunta sobre tu carta natal y abundancia..." 
            className="flex-1 px-3 py-2 text-sm bg-white bg-opacity-30 border border-cosmos-pink rounded-lg h-[60px] resize-none"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isProcessing || !inputMessage.trim()}
            className="px-3 py-2 h-[60px] w-[60px] bg-cosmos-pink/20 rounded-lg text-cosmos-darkGold border border-cosmos-pink flex items-center justify-center"
          >
            {isProcessing ? (
              <div className="h-5 w-5 rounded-full border-2 border-cosmos-darkGold border-t-transparent animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="bg-cosmos-gold/10 p-3 rounded-lg">
        <h4 className="text-xs font-medium text-cosmos-darkGold mb-1">Sugerencias de preguntas:</h4>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            "¿Cómo puedo mejorar mi relación con el dinero?",
            "¿Qué carrera es ideal según mi carta natal?",
            "¿Cómo influye Júpiter en mis finanzas?",
            "¿Cuáles son mis mejores fechas para inversiones?"
          ].map((question, i) => (
            <Button 
              key={i}
              variant="ghost" 
              size="sm"
              className="text-xs justify-start h-auto py-1 px-2 bg-white/20 hover:bg-white/30 text-cosmos-darkGold"
              onClick={() => setInputMessage(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatTab;
