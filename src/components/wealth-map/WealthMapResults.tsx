
import React, { useState, useRef, useEffect } from 'react';
import { NatalChartData } from '@/lib/natal-chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Calendar, MessageSquare, TrendingUp, Send, CheckCircle2 } from 'lucide-react';
import { getWealthMapFullAnalysis } from '@/lib/wealth-map-service';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface WealthMapResultsProps {
  natalChart: NatalChartData;
}

type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

type ActionStatus = {
  id: number;
  completed: boolean;
};

const WealthMapResults: React.FC<WealthMapResultsProps> = ({ natalChart }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const fullAnalysis = getWealthMapFullAnalysis(natalChart);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', content: '¡Hola! Soy tu asistente astrológico financiero. Pregúntame lo que quieras saber sobre tu carta natal y cómo puede influir en tu prosperidad financiera.', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionStatuses, setActionStatuses] = useState<ActionStatus[]>(
    fullAnalysis.actionPlan.map((_, index) => ({ id: index, completed: false }))
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
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
  
  // Mark an action as completed
  const markActionComplete = (index: number) => {
    setActionStatuses(prev => 
      prev.map(status => 
        status.id === index ? { ...status, completed: !status.completed } : status
      )
    );
    
    toast({
      title: actionStatuses.find(s => s.id === index)?.completed 
        ? "Acción pendiente" 
        : "Acción completada",
      description: actionStatuses.find(s => s.id === index)?.completed 
        ? "Has marcado esta acción como pendiente." 
        : "Has marcado esta acción como completada. ¡Buen trabajo!",
    });
  };
  
  // Format date for displaying in the calendar
  const formatCalendarDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long'
    };
    
    try {
      return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-playfair text-cosmos-darkGold flex items-center">
          <span className="mr-2">Tu Mapa de Riqueza Astrológica</span>
          <span className="text-yellow-500 text-sm">✧ Versión Premium ✧</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" /> Visión General
            </TabsTrigger>
            <TabsTrigger value="strategy" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" /> Plan de Acción
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs">
              <Calendar className="w-3 h-3 mr-1" /> Calendario
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-xs">
              <MessageSquare className="w-3 h-3 mr-1" /> Consulta
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="space-y-4">
              <section className="mb-4">
                <h3 className="text-sm font-medium mb-2 text-cosmos-gold">Tu Perfil Financiero</h3>
                <p className="text-sm">{fullAnalysis.summary}</p>
              </section>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <section className="bg-cosmos-pink/10 p-3 rounded-lg">
                  <h4 className="text-sm font-medium mb-1 text-cosmos-darkGold">Casa 2: Tu Relación con el Dinero</h4>
                  <p className="text-xs">{fullAnalysis.house2Analysis}</p>
                </section>
                
                <section className="bg-cosmos-pink/10 p-3 rounded-lg">
                  <h4 className="text-sm font-medium mb-1 text-cosmos-darkGold">Casa 10: Tu Carrera Ideal</h4>
                  <p className="text-xs">{fullAnalysis.house10Analysis}</p>
                </section>
                
                <section className="bg-cosmos-pink/10 p-3 rounded-lg">
                  <h4 className="text-sm font-medium mb-1 text-cosmos-darkGold">Júpiter & Saturno</h4>
                  <p className="text-xs">{fullAnalysis.jupiterSaturnAnalysis}</p>
                </section>
                
                <section className="bg-cosmos-pink/10 p-3 rounded-lg">
                  <h4 className="text-sm font-medium mb-1 text-cosmos-darkGold">Casas 8 y 11</h4>
                  <p className="text-xs">{fullAnalysis.houses8And11Analysis}</p>
                </section>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="strategy" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-cosmos-gold">Plan de Acción Personalizado</h3>
              <p className="text-xs italic mb-4">Acciones específicas para manifestar prosperidad basadas en tu carta natal</p>
              
              <ScrollArea className="max-h-[400px] pr-2">
                <div className="space-y-3">
                  {fullAnalysis.actionPlan.map((action, index) => (
                    <div 
                      key={index} 
                      className={`bg-cosmos-pink/10 p-3 rounded-lg transition-all ${
                        actionStatuses[index]?.completed ? 'bg-green-50 border border-green-200' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium mb-1 ${
                            actionStatuses[index]?.completed ? 'text-green-700 line-through' : 'text-cosmos-darkGold'
                          }`}>
                            {action.title}
                          </h4>
                          <p className={`text-xs ${
                            actionStatuses[index]?.completed ? 'text-green-600' : ''
                          }`}>
                            {action.description}
                          </p>
                          {action.timing && (
                            <p className="text-xs mt-2 text-cosmos-darkGold">Mejor momento: {action.timing}</p>
                          )}
                        </div>
                        <Button 
                          variant={actionStatuses[index]?.completed ? "default" : "ghost"}
                          size="icon" 
                          className={`h-8 w-8 rounded-full ${
                            actionStatuses[index]?.completed 
                              ? 'bg-green-500 text-white hover:bg-green-600' 
                              : 'text-cosmos-darkGold hover:text-cosmos-gold'
                          }`}
                          onClick={() => markActionComplete(index)}
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-cosmos-gold">Calendario Financiero</h3>
              <p className="text-xs italic mb-4">Fechas clave para tomar decisiones económicas en los próximos meses</p>
              
              <ScrollArea className="max-h-[400px] pr-2">
                <div className="space-y-3">
                  {fullAnalysis.financialCalendar.map((entry, index) => (
                    <div key={index} className="bg-cosmos-pink/10 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium text-cosmos-darkGold">
                          {formatCalendarDate(entry.date)}
                        </h4>
                        <span className="text-xs bg-yellow-500/20 px-2 py-0.5 rounded-full text-yellow-700">
                          {entry.transitType}
                        </span>
                      </div>
                      <p className="text-xs">{entry.recommendation}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="focus-visible:outline-none focus-visible:ring-0">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Function to generate AI responses based on user input and natal chart data
const generateAIResponse = (message: string, chart: NatalChartData, analysis: any): string => {
  const lowerMessage = message.toLowerCase();
  
  // Detect what the question is about and provide a relevant response
  if (lowerMessage.includes('casa 2') || lowerMessage.includes('dinero') || lowerMessage.includes('finanzas')) {
    return `Según tu carta natal, tu Casa 2 en ${chart.houses[1].sign} indica que ${analysis.house2Analysis}`;
  } else if (lowerMessage.includes('casa 10') || lowerMessage.includes('carrera') || lowerMessage.includes('profesión')) {
    return `Tu Casa 10 en ${chart.houses[9].sign} sugiere que ${analysis.house10Analysis}`;
  } else if (lowerMessage.includes('júpiter') || lowerMessage.includes('jupiter') || lowerMessage.includes('expansión')) {
    return `Júpiter en tu carta se encuentra en ${chart.jupiter.sign} en la casa ${chart.jupiter.house}. Esto indica que ${analysis.jupiterSaturnAnalysis.split('.')[0]}.`;
  } else if (lowerMessage.includes('saturno') || lowerMessage.includes('disciplina') || lowerMessage.includes('limitaciones')) {
    return `Saturno en tu carta se encuentra en ${chart.saturn.sign} en la casa ${chart.saturn.house}. ${analysis.jupiterSaturnAnalysis.split('.')[1] || 'Esto sugiere áreas donde necesitas desarrollar disciplina financiera.'}`;
  } else if (lowerMessage.includes('inversiones') || lowerMessage.includes('casa 8')) {
    return `Tu Casa 8 en ${chart.houses[7].sign} indica que ${analysis.houses8And11Analysis.split('.')[0]}.`;
  } else if (lowerMessage.includes('redes') || lowerMessage.includes('amigos') || lowerMessage.includes('casa 11')) {
    return `Tu Casa 11 en ${chart.houses[10].sign} sugiere que ${analysis.houses8And11Analysis.split('.')[1] || 'las redes y conexiones sociales pueden ser importantes para tu riqueza.'}`;
  } else if (lowerMessage.includes('fecha') || lowerMessage.includes('cuando') || lowerMessage.includes('momento')) {
    // Return information about upcoming dates from the financial calendar
    const nextDate = analysis.financialCalendar[0];
    return `Según tu calendario astrológico financiero, el próximo evento importante es el ${nextDate.date}: un ${nextDate.transitType} que sugiere: ${nextDate.recommendation}`;
  } else if (lowerMessage.includes('acción') || lowerMessage.includes('hacer') || lowerMessage.includes('pasos')) {
    // Return a suggestion from the action plan
    const randomAction = analysis.actionPlan[Math.floor(Math.random() * analysis.actionPlan.length)];
    return `Te recomendaría esta acción de tu plan personalizado: ${randomAction.title} - ${randomAction.description}`;
  } else if (lowerMessage.includes('consejo') || lowerMessage.includes('recomendación') || lowerMessage.includes('qué debo hacer')) {
    // Return a random action from the action plan
    const randomAction = analysis.actionPlan[Math.floor(Math.random() * analysis.actionPlan.length)];
    return `Te recomendaría: ${randomAction.title} - ${randomAction.description}`;
  } else {
    return 'Basándome en tu carta natal, puedo ver que tienes potencial para la prosperidad financiera. ¿Te gustaría saber más sobre algún aspecto específico como tu Casa 2 (dinero), Casa 10 (carrera), o la influencia de Júpiter y Saturno en tus finanzas?';
  }
};

export default WealthMapResults;
