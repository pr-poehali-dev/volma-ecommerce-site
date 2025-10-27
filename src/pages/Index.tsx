import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type CartItem = {
  id: number;
  name: string;
  price: number;
  weight: string;
  quantity: number;
};

const Index = () => {
  const [area, setArea] = useState('');
  const [height, setHeight] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string; phone?: string; address?: string } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [profileTab, setProfileTab] = useState<'info' | 'orders'>('info');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const allProducts = [
    // Штукатурки
    { id: 1, name: 'ВОЛМА-Слой', category: 'plaster', price: 450, priceStr: '450 ₽', weight: '30 кг', description: 'Гипсовая штукатурка для внутренних работ' },
    { id: 2, name: 'ВОЛМА-Холст', category: 'plaster', price: 380, priceStr: '380 ₽', weight: '30 кг', description: 'Штукатурка повышенной прочности' },
    { id: 3, name: 'ВОЛМА-Пласт', category: 'plaster', price: 420, priceStr: '420 ₽', weight: '30 кг', description: 'Универсальная гипсовая штукатурка' },
    { id: 10, name: 'ВОЛМА-Фасад', category: 'plaster', price: 550, priceStr: '550 ₽', weight: '25 кг', description: 'Цементная штукатурка для фасадов' },
    { id: 11, name: 'ВОЛМА-Акватинк', category: 'plaster', price: 490, priceStr: '490 ₽', weight: '30 кг', description: 'Влагостойкая штукатурка' },
    { id: 12, name: 'ВОЛМА-Гипс Актив', category: 'plaster', price: 410, priceStr: '410 ₽', weight: '30 кг', description: 'Быстротвердеющая гипсовая штукатурка' },
    
    // Клеи
    { id: 4, name: 'ВОЛМА-Керамик', category: 'glue', price: 320, priceStr: '320 ₽', weight: '25 кг', description: 'Клей для керамической плитки' },
    { id: 5, name: 'ВОЛМА-Блок', category: 'glue', price: 280, priceStr: '280 ₽', weight: '25 кг', description: 'Клей для газобетонных блоков' },
    { id: 13, name: 'ВОЛМА-Керамик Плюс', category: 'glue', price: 380, priceStr: '380 ₽', weight: '25 кг', description: 'Усиленный плиточный клей' },
    { id: 14, name: 'ВОЛМА-Флекс', category: 'glue', price: 450, priceStr: '450 ₽', weight: '25 кг', description: 'Эластичный клей для плитки' },
    { id: 15, name: 'ВОЛМА-Аква Керамик', category: 'glue', price: 340, priceStr: '340 ₽', weight: '25 кг', description: 'Влагостойкий клей для влажных помещений' },
    
    // Шпатлёвки
    { id: 6, name: 'ВОЛМА-Акваслой', category: 'putty', price: 520, priceStr: '520 ₽', weight: '20 кг', description: 'Влагостойкая полимерная шпатлёвка' },
    { id: 7, name: 'ВОЛМА-Шов', category: 'putty', price: 350, priceStr: '350 ₽', weight: '25 кг', description: 'Шпатлёвка для швов ГКЛ' },
    { id: 9, name: 'ВОЛМА-Люкс', category: 'putty', price: 480, priceStr: '480 ₽', weight: '20 кг', description: 'Финишная шпатлёвка премиум-класса' },
    { id: 16, name: 'ВОЛМА-Стандарт', category: 'putty', price: 320, priceStr: '320 ₽', weight: '20 кг', description: 'Универсальная шпатлёвка' },
    { id: 17, name: 'ВОЛМА-Финиш', category: 'putty', price: 390, priceStr: '390 ₽', weight: '20 кг', description: 'Финишная шпатлёвка' },
    
    // Растворы
    { id: 8, name: 'ВОЛМА-Монтаж', category: 'mortar', price: 290, priceStr: '290 ₽', weight: '30 кг', description: 'Монтажный гипсовый раствор' },
    { id: 18, name: 'ВОЛМА-Кладка', category: 'mortar', price: 260, priceStr: '260 ₽', weight: '30 кг', description: 'Кладочный цементный раствор' },
    { id: 19, name: 'ВОЛМА-Ремстройка', category: 'mortar', price: 310, priceStr: '310 ₽', weight: '25 кг', description: 'Ремонтная смесь быстрого твердения' },
  ];

  const addToCart = (product: typeof allProducts[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price,
        weight: product.weight,
        quantity: 1 
      }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    {
      id: 'glue',
      title: 'Клеи',
      icon: 'Droplet',
      description: 'Для плитки, газоблока, гипсокартона',
      image: 'https://cdn.poehali.dev/projects/8cfe1987-5557-44c8-9da0-8ef59c68253a/files/ceebca8c-19d9-40a4-95d9-13591318481e.jpg'
    },
    {
      id: 'plaster',
      title: 'Штукатурки',
      icon: 'Paintbrush',
      description: 'Гипсовые, цементные, фасадные',
      image: 'https://cdn.poehali.dev/projects/8cfe1987-5557-44c8-9da0-8ef59c68253a/files/2f0b7781-4b32-4ad7-9322-eb8d8886c543.jpg'
    },
    {
      id: 'putty',
      title: 'Шпатлёвки',
      icon: 'Brush',
      description: 'Финишные, базовые, универсальные',
      image: 'https://cdn.poehali.dev/projects/8cfe1987-5557-44c8-9da0-8ef59c68253a/files/bc4fcf9a-c3c3-47c0-a920-95ce51e180fe.jpg'
    },
    {
      id: 'mortar',
      title: 'Растворы',
      icon: 'Container',
      description: 'Кладочные, монтажные смеси',
      image: 'https://cdn.poehali.dev/projects/8cfe1987-5557-44c8-9da0-8ef59c68253a/files/ceebca8c-19d9-40a4-95d9-13591318481e.jpg'
    }
  ];

  const news = [
    {
      date: '25 октября 2025',
      title: 'Новая линейка экологичных штукатурок',
      description: 'ВОЛМА представляет обновлённую серию материалов с улучшенными характеристиками'
    },
    {
      date: '18 октября 2025',
      title: 'Открытие нового производства',
      description: 'Запущен современный завод по производству строительных смесей'
    },
    {
      date: '10 октября 2025',
      title: 'ВОЛМА - лауреат премии "Бренд года"',
      description: 'Компания получила награду за качество продукции и инновации'
    }
  ];

  const calculateMaterial = () => {
    const areaNum = parseFloat(area);
    const heightNum = parseFloat(height);
    
    if (!areaNum || !heightNum) return null;
    
    const totalArea = areaNum;
    const consumption = 8.5; // кг/м² при слое 10мм
    const layerThickness = heightNum;
    const totalKg = totalArea * consumption * (layerThickness / 10);
    const bags30kg = Math.ceil(totalKg / 30);
    const bags25kg = Math.ceil(totalKg / 25);
    const bags20kg = Math.ceil(totalKg / 20);
    const estimatedCost30kg = bags30kg * 450; // средняя цена
    const estimatedCost25kg = bags25kg * 380;
    
    return {
      totalKg: totalKg.toFixed(1),
      bags30kg,
      bags25kg,
      bags20kg,
      estimatedCost30kg: estimatedCost30kg.toLocaleString('ru-RU'),
      estimatedCost25kg: estimatedCost25kg.toLocaleString('ru-RU')
    };
  };

  const result = calculateMaterial();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src="https://cdn.poehali.dev/files/1c4da8c0-6931-4304-9f2d-fe205f8a8406.png" 
              alt="ВОЛМА" 
              className="h-12"
            />
          </div>
          
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[300px] justify-start text-left font-normal hidden lg:flex">
                <Icon name="Search" size={16} className="mr-2" />
                <span className="text-gray-500">Поиск товаров...</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Поиск товаров..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>Товары не найдены</CommandEmpty>
                  <CommandGroup heading="Результаты">
                    {filteredProducts.slice(0, 5).map((product) => (
                      <CommandItem 
                        key={product.id}
                        onSelect={() => {
                          addToCart(product);
                          setSearchOpen(false);
                        }}
                      >
                        <Icon name="Package" size={16} className="mr-2" />
                        <div className="flex flex-col flex-1">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-xs text-gray-500">{product.priceStr} • {product.weight}</span>
                        </div>
                        <Icon name="Plus" size={16} className="text-primary" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#categories" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Каталог
            </a>
            <a href="#calculator" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Калькулятор
            </a>
            <a href="#news" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Новости
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
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
            ) : (
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
            )}

            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative gap-2">
                  <Icon name="ShoppingCart" size={16} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                  <span className="hidden lg:inline">Корзина</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина покупок</SheetTitle>
                  <SheetDescription>
                    {cartItemsCount > 0 ? `Товаров: ${cartItemsCount}` : 'Корзина пуста'}
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full py-6">
                  {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <Icon name="ShoppingCart" size={64} className="text-gray-300 mb-4" />
                      <p className="text-gray-500 mb-2">Ваша корзина пуста</p>
                      <p className="text-sm text-gray-400">Добавьте товары из каталога</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-4">
                        {cart.map((item) => (
                          <Card key={item.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold">{item.name}</h4>
                                  <p className="text-sm text-gray-500">{item.weight}</p>
                                  <p className="text-primary font-semibold mt-1">{item.price} ₽</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={16} className="text-red-500" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                                  className="w-16 text-center"
                                  min="1"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <span className="ml-auto font-semibold">
                                  {item.price * item.quantity} ₽
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="border-t pt-4 space-y-4">
                        <div className="flex justify-between items-center text-lg font-semibold">
                          <span>Итого:</span>
                          <span className="text-2xl text-primary">{cartTotal} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          <Icon name="CreditCard" size={20} className="mr-2" />
                          Оформить заказ
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setCart([])}
                        >
                          Очистить корзину
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            
            <Button className="bg-secondary hover:bg-secondary/90 hidden lg:flex">
              <Icon name="Phone" size={16} className="mr-2" />
              8-800-100-20-30
            </Button>
          </div>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://cdn.poehali.dev/projects/8cfe1987-5557-44c8-9da0-8ef59c68253a/files/ceebca8c-19d9-40a4-95d9-13591318481e.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Строительные материалы ВОЛМА
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-95">
            Профессиональные решения для строительства и ремонта
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8">
            Выбрать материалы
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="categories" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Категории товаров</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Выберите категорию для просмотра каталога
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={category.id} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Icon name={category.icon as any} size={32} className="mb-2" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    {allProducts.filter(p => p.category === category.id).slice(0, 2).map(product => (
                      <div key={product.id} className="flex items-center justify-between text-gray-600">
                        <span className="truncate flex-1">{product.name}</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => addToCart(product)}
                          className="h-7 w-7 p-0"
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                    Все {category.title.toLowerCase()}
                    <Icon name="ChevronRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Калькулятор материалов</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Рассчитайте необходимое количество материала для вашего проекта
            </p>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Расчёт штукатурки</CardTitle>
                <CardDescription>
                  Введите параметры для точного расчёта
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="area" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="area">По площади</TabsTrigger>
                    <TabsTrigger value="walls">По стенам</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="area" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="area" className="text-base">Площадь поверхности (м²)</Label>
                        <Input 
                          id="area"
                          type="number" 
                          placeholder="Например: 50"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          className="text-lg h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height" className="text-base">Толщина слоя (мм)</Label>
                        <Input 
                          id="height"
                          type="number" 
                          placeholder="Например: 10"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="text-lg h-12"
                        />
                      </div>
                    </div>

                    {result && (
                      <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Icon name="Calculator" size={24} className="mr-2 text-primary" />
                          Результаты расчёта
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-lg">
                            <span className="text-gray-700">Требуется материала:</span>
                            <span className="font-bold text-xl text-primary">{result.totalKg} кг</span>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Мешков по 30 кг:</span>
                              <span className="font-bold text-lg">{result.bags30kg} шт</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                              <span>Примерная стоимость:</span>
                              <span className="font-semibold">≈ {result.estimatedCost30kg} ₽</span>
                            </div>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Мешков по 25 кг:</span>
                              <span className="font-bold text-lg">{result.bags25kg} шт</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                              <span>Примерная стоимость:</span>
                              <span className="font-semibold">≈ {result.estimatedCost25kg} ₽</span>
                            </div>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Мешков по 20 кг:</span>
                              <span className="font-bold text-lg">{result.bags20kg} шт</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-primary/20">
                          <p className="text-sm text-gray-600 mb-3">
                            * Расчёт приблизительный. Расход: 8,5 кг/м² при слое 10 мм
                          </p>
                          <Button className="w-full" size="lg">
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            Добавить в корзину рекомендованное количество
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="walls" className="space-y-4">
                    <p className="text-gray-600">
                      Функция расчёта по стенам будет доступна в ближайшее время
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="news" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Новости компании</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Будьте в курсе последних событий ВОЛМА
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {news.map((item, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    {item.date}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                  <Button variant="link" className="mt-4 p-0 text-primary">
                    Читать далее
                    <Icon name="ArrowRight" size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-b from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Горячая линия</h2>
          <p className="text-xl mb-8 opacity-90">
            Наши специалисты помогут выбрать материалы и ответят на все вопросы
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-4 rounded-full">
                <Icon name="Phone" size={32} />
              </div>
              <div className="text-left">
                <p className="text-sm opacity-90">Бесплатный звонок</p>
                <p className="text-3xl font-bold">8-800-100-20-30</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-4 rounded-full">
                <Icon name="Mail" size={32} />
              </div>
              <div className="text-left">
                <p className="text-sm opacity-90">Email</p>
                <p className="text-xl font-semibold">info@volma.ru</p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm opacity-75">Работаем ежедневно с 8:00 до 20:00</p>
        </div>
      </section>

      <nav className="bg-white border-t border-gray-200 sticky bottom-0 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <a 
              href="#hero" 
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors group"
            >
              <Icon name="Home" size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Главная</span>
            </a>
            <a 
              href="#categories" 
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors group"
            >
              <Icon name="LayoutGrid" size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Категории</span>
            </a>
            <a 
              href="#calculator" 
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors group"
            >
              <Icon name="Calculator" size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Калькулятор</span>
            </a>
            <a 
              href="#news" 
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors group"
            >
              <Icon name="Newspaper" size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Новости</span>
            </a>
            <a 
              href="#contact" 
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary transition-colors group"
            >
              <Icon name="Phone" size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Контакты</span>
            </a>
          </div>
        </div>
      </nav>

      <footer className="bg-gray-900 text-white py-12 pb-20 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img 
                src="https://cdn.poehali.dev/files/1c4da8c0-6931-4304-9f2d-fe205f8a8406.png" 
                alt="ВОЛМА" 
                className="h-10 mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 text-sm">
                Лидер российского рынка сухих строительных смесей
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Продукция</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#categories" className="hover:text-white transition-colors">Клеи</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Штукатурки</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Шпатлёвки</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Растворы</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#hero" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#news" className="hover:text-white transition-colors">Новости</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Вакансии</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>8-800-100-20-30</li>
                <li>info@volma.ru</li>
                <li>Москва, Россия</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© 2025 ВОЛМА. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;