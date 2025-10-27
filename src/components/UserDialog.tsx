import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type User = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
};

type UserDialogProps = {
  user: User;
  setUser: (user: User | null) => void;
};

export const UserDialog = ({ user, setUser }: UserDialogProps) => {
  const [editMode, setEditMode] = useState(false);
  const [profileTab, setProfileTab] = useState<'info' | 'orders'>('info');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Icon name="User" size={16} />
          <span className="hidden lg:inline">{user.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Личный кабинет</DialogTitle>
          <DialogDescription>Управление профилем и заказами</DialogDescription>
        </DialogHeader>
        
        <Tabs value={profileTab} onValueChange={(v) => setProfileTab(v as 'info' | 'orders')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info" className="gap-2">
              <Icon name="User" size={16} />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Icon name="Package" size={16} />
              История заказов
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-500">Клиент с 2025 года</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setEditMode(!editMode)}
              >
                <Icon name={editMode ? "X" : "Edit"} size={16} className="mr-2" />
                {editMode ? 'Отменить' : 'Редактировать'}
              </Button>
            </div>

            <Separator />

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              setUser({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                address: formData.get('address') as string,
              });
              setEditMode(false);
            }}>
              <div className="space-y-2">
                <Label htmlFor="profile-name" className="flex items-center gap-2">
                  <Icon name="User" size={16} />
                  Имя
                </Label>
                <Input 
                  id="profile-name"
                  name="name"
                  defaultValue={user.name} 
                  readOnly={!editMode}
                  className={editMode ? '' : 'bg-gray-50'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email" className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  Email
                </Label>
                <Input 
                  id="profile-email"
                  name="email"
                  type="email"
                  defaultValue={user.email} 
                  readOnly={!editMode}
                  className={editMode ? '' : 'bg-gray-50'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-phone" className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  Телефон
                </Label>
                <Input 
                  id="profile-phone"
                  name="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  defaultValue={user.phone} 
                  readOnly={!editMode}
                  className={editMode ? '' : 'bg-gray-50'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-address" className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Адрес доставки
                </Label>
                <Input 
                  id="profile-address"
                  name="address"
                  placeholder="Город, улица, дом, квартира"
                  defaultValue={user.address} 
                  readOnly={!editMode}
                  className={editMode ? '' : 'bg-gray-50'}
                />
              </div>

              {editMode && (
                <Button type="submit" className="w-full">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить изменения
                </Button>
              )}
            </form>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">12</div>
                    <p className="text-sm text-gray-500 mt-1">Всего заказов</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">15%</div>
                    <p className="text-sm text-gray-500 mt-1">Ваша скидка</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => {
                setUser(null);
                setEditMode(false);
              }}
            >
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти из аккаунта
            </Button>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4 mt-6">
            <div className="space-y-4">
              {[
                { id: '#2025-001', date: '15.10.2025', status: 'Доставлен', items: 3, total: '12 450 ₽', statusColor: 'bg-green-500' },
                { id: '#2025-002', date: '20.10.2025', status: 'В пути', items: 5, total: '18 200 ₽', statusColor: 'bg-blue-500' },
                { id: '#2025-003', date: '25.10.2025', status: 'Обработка', items: 2, total: '7 600 ₽', statusColor: 'bg-yellow-500' },
              ].map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Заказ {order.id}</CardTitle>
                      <Badge className={`${order.statusColor} text-white`}>
                        {order.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Calendar" size={14} />
                      {order.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Icon name="Package" size={16} />
                        <span>{order.items} товара</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-right justify-end">
                        <Icon name="DollarSign" size={16} className="text-primary" />
                        <span>{order.total}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      <Icon name="Eye" size={14} className="mr-2" />
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
