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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-300 to-orange-400 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-500 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-orange-600 rounded-full blur-3xl opacity-30"></div>

      <Card className="w-11/12 max-w-md rounded-3xl bg-white shadow-lg text-center p-6 z-10">
        <CardContent>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Good Food
          </h2>
          <img
            src="/goodFood.png"
            alt="Good Food Logo"
            className="w-40 h-40 mx-auto object-contain mb-6"
          />
          <p className="text-gray-600 mb-6">
            Discover delicious meals and order your favorites with ease.
          </p>
          <Button
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-3 rounded-full shadow-md transition-transform transform hover:scale-105"
            onClick={NavigateToLogin}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
