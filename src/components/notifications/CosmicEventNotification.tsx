import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, BellOff, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { DailyAstrologyData, AstrologicalEvent } from '@/lib/astrology-service';

type NotificationType = 'lunarPhase' | 'retrograde' | 'planetaryTransit' | 'zodiacChange';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

interface NotificationPreferences {
  lunarPhase: boolean;
  retrograde: boolean;
  planetaryTransit: boolean;
  zodiacChange: boolean;
}

const CosmicEventNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    lunarPhase: true,
    retrograde: true,
    planetaryTransit: false,
    zodiacChange: false
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'lunarPhase',
        title: 'Luna Nueva en Géminis',
        message: 'Mañana habrá Luna Nueva en Géminis. Es un buen momento para comenzar nuevos proyectos relacionados con comunicación y aprendizaje.',
        date: new Date(Date.now() + 86400000), // Mañana
        read: false
      },
      {
        id: '2',
        type: 'retrograde',
        title: 'Mercurio Retrógrado',
        message: 'Mercurio entrará en fase retrógrada en 3 días. Prepárate para posibles retrasos en comunicaciones y tecnología.',
        date: new Date(Date.now() + 259200000), // En 3 días
        read: false
      },
      {
        id: '3',
        type: 'planetaryTransit',
        title: 'Venus entra en Leo',
        message: 'Venus entrará en Leo la próxima semana, favoreciendo expresiones creativas de amor y afecto.',
        date: new Date(Date.now() + 604800000), // En una semana
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
    updateUnreadCount(mockNotifications);
    
    if ('Notification' in window) {
      Notification.requestPermission();
    }
    
    const timer = setTimeout(() => {
      const newNotification: Notification = {
        id: '4',
        type: 'zodiacChange',
        title: 'Sol entra en Cáncer',
        message: 'El Sol entrará en Cáncer, marcando el inicio del solsticio de verano.',
        date: new Date(Date.now() + 432000000), // En 5 días
        read: false
      };
      
      const updatedNotifications = [...mockNotifications, newNotification];
      setNotifications(updatedNotifications);
      updateUnreadCount(updatedNotifications);
      
      toast({
        title: "Nuevo evento cósmico",
        description: newNotification.title,
      });
      
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Vero Cosmos: Nuevo evento cósmico', {
          body: newNotification.title,
          icon: '/favicon.ico'
        });
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const updateUnreadCount = (notifs: Notification[]) => {
    setUnreadCount(notifs.filter(n => !n.read).length);
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(note => 
      note.id === id ? { ...note, read: true } : note
    );
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(note => ({ ...note, read: true }));
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter(note => note.id !== id);
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  const togglePreference = (type: keyof NotificationPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    
    toast({
      title: preferences[type] ? "Notificaciones desactivadas" : "Notificaciones activadas",
      description: `Has ${preferences[type] ? "desactivado" : "activado"} las notificaciones de ${getPreferenceLabel(type)}.`
    });
  };

  const getPreferenceLabel = (type: keyof NotificationPreferences): string => {
    switch (type) {
      case 'lunarPhase': return 'fases lunares';
      case 'retrograde': return 'retrogradaciones';
      case 'planetaryTransit': return 'tránsitos planetarios';
      case 'zodiacChange': return 'cambios zodiacales';
      default: return '';
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'lunarPhase': return '🌙';
      case 'retrograde': return '⟲';
      case 'planetaryTransit': return '⚫';
      case 'zodiacChange': return '♈';
      default: return '✨';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative"
      >
        {unreadCount > 0 ? (
          <>
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-cosmos-pink text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount}
            </span>
          </>
        ) : (
          <Bell className="h-5 w-5" />
        )}
      </Button>
      
      {showNotifications && (
        <Card className="absolute right-0 mt-2 w-80 sm:w-96 z-50 glass-card">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="text-sm font-medium">Notificaciones Cósmicas</h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs h-7 px-2"
              >
                Marcar todo como leído
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setShowNotifications(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {notifications.length > 0 ? (
            <ScrollArea className="h-64">
              <div className="divide-y">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-3 ${notification.read ? '' : 'bg-cosmos-pink/5'}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-start space-x-2">
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                        <div>
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.date).toLocaleDateString('es-ES', { 
                              day: 'numeric', 
                              month: 'short'
                            })}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-50 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500">No tienes notificaciones</p>
            </div>
          )}
          
          <div className="p-3 border-t">
            <h4 className="text-xs font-medium mb-2">Preferencias de notificación</h4>
            <div className="space-y-2">
              {Object.keys(preferences).map((key) => (
                <div key={key} className="flex items-center justify-between">
                  <label htmlFor={key} className="text-xs">
                    {getPreferenceLabel(key as keyof NotificationPreferences)}
                  </label>
                  <Switch
                    id={key}
                    checked={preferences[key as keyof NotificationPreferences]}
                    onCheckedChange={() => togglePreference(key as keyof NotificationPreferences)}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs"
                onClick={() => navigate('/calendario')}
              >
                <Calendar className="h-3 w-3 mr-1" />
                Ver calendario completo
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CosmicEventNotification;
