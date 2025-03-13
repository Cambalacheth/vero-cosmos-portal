
import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';

type RegisterFormProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  setEmail,
  password,
  setPassword
}) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white opacity-70" />
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="pl-10 bg-white/10 border-cosmos-gold/30 text-white"
        />
      </div>
      
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white opacity-70" />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="pl-10 bg-white/10 border-cosmos-gold/30 text-white"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
