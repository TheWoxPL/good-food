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
    if (!platform) newErrors.platform = 'Platform selection is required';
    if (!category)
      newErrors.category = 'Selection of where the problem occured is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    alert(
      'Thank you for your submission. You will receive feedback via email soon.'
    );

    setPlatform('');
    setCategory('');
    setSubject('');
    setDescription('');
    setErrors({});
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans text-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Support</h1>

      <Alert className="mb-6">
        <AlertTitle>Need help?</AlertTitle>
        <AlertDescription>
          If you've encountered an issue, please fill out the form below. We
          will get back to you as soon as possible!
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
        {/* Full Name */}
        <div className="bg-gray-100 p-4 rounded-md">
          <strong>Full Name:</strong> {user?.displayName || 'Unknown User'}
        </div>

        {/* Email with icon and tooltip */}
        <div className="bg-gray-100 p-4 rounded-md flex items-center gap-2">
          <span>
            <strong>Email Address:</strong>{' '}
            {maskEmail(user?.email || 'noemail@domain.com')}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Feedback will be sent to this email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="platform" className="mb-1">
            Select Platform
          </Label>
          <div className="w-full">
            <Select value={platform} onValueChange={setPlatform} required>
              <SelectTrigger id="platform" className="w-full">
                <SelectValue placeholder="Select platform" />
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
            Where did the issue occur?
          </Label>
          <div className="w-full">
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="logowanie">Login issues</SelectItem>
                <SelectItem value="platnosci">Payments</SelectItem>
                <SelectItem value="dzialanie">App functionality</SelectItem>
                <SelectItem value="zamowienie">Order issue</SelectItem>
                <SelectItem value="dostawa">Delivery issue</SelectItem>
                <SelectItem value="inne">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="subject" className="mb-1">
            Subject
          </Label>
          <Input
            id="subject"
            value={subject}
            maxLength={100}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            required
          />
        </div>

        <div>
          <Label htmlFor="description" className="mb-1">
            Issue Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Request
        </Button>
      </form>
    </div>
  );
};
