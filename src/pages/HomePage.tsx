import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  const NavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-end relative overflow-hidden"
      style={{
        backgroundImage: "url('/src/assets/images/background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card className="w-full rounded-t-2xl bg-amber-200 text-center p-4 z-10">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Good Food</h2>
          <img
            src="/goodFood.png"
            alt="Good Food Logo"
            className="w-48 h-48 mx-auto object-contain mb-4"
          />
          <Button
            className="bg-gray-800 text-white px-8 py-2 rounded-xl"
            onClick={NavigateToLogin}
          >
            Start
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
