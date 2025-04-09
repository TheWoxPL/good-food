import { GalleryVerticalEnd } from 'lucide-react';
import { LoginForm } from '@/components/login-form';
import { UserAuth } from '@/context';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const LoginPage = () => {
  const { user, loading } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/restaurants');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div></div>;
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Good Food
        </a>
        <LoginForm />
      </div>
    </div>
  );
};
