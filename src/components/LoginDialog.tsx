import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

type LoginDialogProps = {
  loginOpen: boolean;
  setLoginOpen: (open: boolean) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: { name: string; email: string; phone?: string; address?: string }) => void;
};

export const LoginDialog = ({ loginOpen, setLoginOpen, isLogin, setIsLogin, setUser }: LoginDialogProps) => {
  return (
    <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Icon name="User" size={16} />
          <span className="hidden lg:inline">Войти</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Вход' : 'Регистрация'}</DialogTitle>
          <DialogDescription>
            {isLogin ? 'Войдите в личный кабинет' : 'Создайте новый аккаунт'}
          </DialogDescription>
        </DialogHeader>
        <form 
          className="space-y-4 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            setUser({
              name: formData.get('name') as string || 'Пользователь',
              email: formData.get('email') as string
            });
            setLoginOpen(false);
          }}
        >
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" name="name" placeholder="Иван Иванов" required />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="ivan@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <Button 
            type="button"
            variant="link" 
            className="w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
