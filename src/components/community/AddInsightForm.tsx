
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'El título debe tener al menos 3 caracteres.',
  }),
  content: z.string().min(10, {
    message: 'El contenido debe tener al menos 10 caracteres.',
  }),
  type: z.string({
    required_error: 'Por favor selecciona una categoría.',
  }),
});

type InsightFormValues = z.infer<typeof formSchema>;

interface AddInsightFormProps {
  onSuccess?: () => void;
}

const AddInsightForm: React.FC<AddInsightFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<InsightFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      type: '',
    },
  });

  const onSubmit = async (values: InsightFormValues) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para compartir un consejo.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase.from('community_insights').insert({
        user_id: user.id,
        title: values.title,
        content: values.content,
        type: values.type,
      });

      if (error) throw error;

      toast({
        title: 'Consejo compartido',
        description: 'Tu consejo ha sido compartido con la comunidad.',
      });
      
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error al compartir consejo:', error);
      toast({
        title: 'Error',
        description: 'No se pudo compartir tu consejo. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-4 bg-cosmos-pink/10 rounded-lg">
      <h3 className="text-lg font-playfair mb-4 text-cosmos-darkGold">Comparte tu Consejo Cósmico</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título de tu consejo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="wealth">Riqueza</SelectItem>
                    <SelectItem value="career">Carrera</SelectItem>
                    <SelectItem value="relationship">Relaciones</SelectItem>
                    <SelectItem value="spiritual">Espiritualidad</SelectItem>
                    <SelectItem value="health">Salud</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenido</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Comparte tu consejo o experiencia..." 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-cosmos-darkGold/70 hover:bg-cosmos-darkGold">
            Compartir Consejo
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddInsightForm;
