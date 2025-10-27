import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [area, setArea] = useState('');
  const [height, setHeight] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const allProducts = [
    { id: 1, name: 'ВОЛМА-Слой', category: 'plaster', price: '450 ₽', weight: '30 кг' },
    { id: 2, name: 'ВОЛМА-Холст', category: 'plaster', price: '380 ₽', weight: '30 кг' },
    { id: 3, name: 'ВОЛМА-Пласт', category: 'plaster', price: '420 ₽', weight: '30 кг' },
    { id: 4, name: 'ВОЛМА-Керамик', category: 'glue', price: '320 ₽', weight: '25 кг' },
    { id: 5, name: 'ВОЛМА-Блок', category: 'glue', price: '280 ₽', weight: '25 кг' },
    { id: 6, name: 'ВОЛМА-Акваслой', category: 'putty', price: '520 ₽', weight: '20 кг' },
    { id: 7, name: 'ВОЛМА-Шов', category: 'putty', price: '350 ₽', weight: '25 кг' },
    { id: 8, name: 'ВОЛМА-Монтаж', category: 'mortar', price: '290 ₽', weight: '30 кг' },
    { id: 9, name: 'ВОЛМА-Люкс', category: 'putty', price: '480 ₽', weight: '20 кг' },
    { id: 10, name: 'ВОЛМА-Фасад', category: 'plaster', price: '550 ₽', weight: '25 кг' },
  ];

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
    const consumption = 8.5;
    const layerThickness = heightNum;
    const totalKg = totalArea * consumption * (layerThickness / 10);
    const bags30kg = Math.ceil(totalKg / 30);
    const bags25kg = Math.ceil(totalKg / 25);
    
    return {
      totalKg: totalKg.toFixed(1),
      bags30kg,
      bags25kg
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
                      <CommandItem key={product.id}>
                        <Icon name="Package" size={16} className="mr-2" />
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-xs text-gray-500">{product.price} • {product.weight}</span>
                        </div>
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
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Личный кабинет</DialogTitle>
                    <DialogDescription>Управление профилем и заказами</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Имя</Label>
                      <Input value={user.name} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={user.email} readOnly />
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setUser(null)}
                    >
                      Выйти
                    </Button>
                  </div>
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
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                    Перейти в каталог
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
                          <div className="h-px bg-gray-300" />
                          <div className="flex justify-between items-center text-lg">
                            <span className="text-gray-700">Мешков по 30 кг:</span>
                            <span className="font-bold text-xl">{result.bags30kg} шт</span>
                          </div>
                          <div className="flex justify-between items-center text-lg">
                            <span className="text-gray-700">Мешков по 25 кг:</span>
                            <span className="font-bold text-xl">{result.bags25kg} шт</span>
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-300">
                          <p className="text-sm text-gray-600">
                            * Расчёт приблизительный. Расход: 8,5 кг/м² при слое 10 мм
                          </p>
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

      <footer className="bg-gray-900 text-white py-12">
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
                <li><a href="#" className="hover:text-white transition-colors">Клеи</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Штукатурки</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Шпатлёвки</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Растворы</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Новости</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Вакансии</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
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