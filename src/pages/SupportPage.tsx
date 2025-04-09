import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

import { useState } from 'react';
import { UserAuth } from '@/context';

export const SupportPage = () => {
  const { user } = UserAuth();

  const [platform, setPlatform] = useState('');
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{
    platform?: string;
    category?: string;
  }>({});

  const maskEmail = (email: string): string => {
    const [name, domain] = email.split('@');
    if (name.length <= 2) return `${name[0]}***@${domain}`;
    return `${name[0]}***${name[name.length - 1]}@${domain}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { platform?: string; category?: string } = {};
    if (!platform) newErrors.platform = 'Wybór platformy jest wymagany';
    if (!category)
      newErrors.category = 'Wybór gdzie wystąpił problem jest wymagany';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    alert(
      'Dziękujemy za zgłoszenie, informacja zwrotna dostarczona zostanie niezwłocznie drogą mailową.'
    );

    setPlatform('');
    setCategory('');
    setSubject('');
    setDescription('');
    setErrors({});
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans text-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">
        Kontakt z wsparciem
      </h1>

      <Alert className="mb-6">
        <AlertTitle>Potrzebujesz pomocy?</AlertTitle>
        <AlertDescription>
          Jeśli napotkałeś problem, wypełnij poniższy formularz. Odezwiemy się
          jak najszybciej!
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
        {/* Imię i nazwisko */}
        <div className="bg-gray-100 p-4 rounded-md">
          <strong>Imię i nazwisko:</strong>{' '}
          {user?.displayName || 'Nieznany użytkownik'}
        </div>

        {/* Email z ikoną i tooltipem */}
        <div className="bg-gray-100 p-4 rounded-md flex items-center gap-2">
          <span>
            <strong>Adres e-mail:</strong>{' '}
            {maskEmail(user?.email || 'brak@email.com')}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Na ten mail zostanie wysłana informacja zwrotna</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="platform" className="mb-1">
            Wybierz platformę
          </Label>
          <div className="w-full">
            <Select value={platform} onValueChange={setPlatform} required>
              <SelectTrigger id="platform" className="w-full">
                <SelectValue placeholder="Wybierz platformę" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="android">Android</SelectItem>
                <SelectItem value="ios">iOS</SelectItem>
                <SelectItem value="web">Mac</SelectItem>
                <SelectItem value="web">PC</SelectItem>
              </SelectContent>
            </Select>
            {errors.platform && (
              <p className="text-sm text-red-600 mt-1">{errors.platform}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="category" className="mb-1">
            Gdzie wystąpił problem
          </Label>
          <div className="w-full">
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Wybierz temat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="logowanie">Problemy z logowaniem</SelectItem>
                <SelectItem value="platnosci">Płatności</SelectItem>
                <SelectItem value="dzialanie">Działanie aplikacji</SelectItem>
                <SelectItem value="zamowienie">
                  Problem z zamówieniem
                </SelectItem>
                <SelectItem value="dostawa">Problem z dostawą</SelectItem>
                <SelectItem value="inne">Inne</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="subject" className="mb-1">
            Temat
          </Label>
          <Input
            id="subject"
            value={subject}
            maxLength={100}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Wpisz temat"
            required
          />
        </div>

        <div>
          <Label htmlFor="description" className="mb-1">
            Opis problemu
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Opisz problem jak najdokładniej"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Wyślij zgłoszenie
        </Button>
      </form>
    </div>
  );
};
