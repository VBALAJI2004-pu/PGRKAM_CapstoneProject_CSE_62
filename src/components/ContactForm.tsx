import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ContactFormProps {
  onContactSubmit: (formData: { name: string; email: string; subject: string; message: string }) => void;
  fontSizeClass: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onContactSubmit, fontSizeClass }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    onContactSubmit({ name, email, subject, message });
    toast({
      title: "Message Sent!",
      description: "Your message has been sent successfully.",
    });
    // Clear form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card rounded-lg shadow-md border border-border">
      <h3 className={`text-2xl font-bold text-primary flex items-center gap-2 ${fontSizeClass}`}>
        <MessageCircle className="w-6 h-6" />
        Send Us a Message
      </h3>
      <div>
        <Label htmlFor="contact-name" className={fontSizeClass}>Name</Label>
        <Input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={fontSizeClass}
        />
      </div>
      <div>
        <Label htmlFor="contact-email" className={fontSizeClass}>Email</Label>
        <Input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={fontSizeClass}
        />
      </div>
      <div>
        <Label htmlFor="contact-subject" className={fontSizeClass}>Subject</Label>
        <Input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className={fontSizeClass}
        />
      </div>
      <div>
        <Label htmlFor="contact-message" className={fontSizeClass}>Message</Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
          className={fontSizeClass}
        />
      </div>
      <Button type="submit" className={`w-full bg-primary hover:bg-primary/90 ${fontSizeClass}`}>
        Submit Message
      </Button>
    </form>
  );
};
