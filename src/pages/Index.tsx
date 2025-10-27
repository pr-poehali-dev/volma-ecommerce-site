import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategoriesSection } from '@/components/CategoriesSection';
import { CalculatorSection } from '@/components/CalculatorSection';
import { NewsSection } from '@/components/NewsSection';
import { ContactSection } from '@/components/ContactSection';
import { BottomNav } from '@/components/BottomNav';
import { Footer } from '@/components/Footer';

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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const allProducts = [
    { id: 1, name: 'ВОЛМА-Слой', category: 'plaster', price: 450, priceStr: '450 ₽', weight: '30 кг', description: 'Гипсовая штукатурка для внутренних работ' },
    { id: 2, name: 'ВОЛМА-Холст', category: 'plaster', price: 380, priceStr: '380 ₽', weight: '30 кг', description: 'Штукатурка повышенной прочности' },
    { id: 3, name: 'ВОЛМА-Пласт', category: 'plaster', price: 420, priceStr: '420 ₽', weight: '30 кг', description: 'Универсальная гипсовая штукатурка' },
    { id: 10, name: 'ВОЛМА-Фасад', category: 'plaster', price: 550, priceStr: '550 ₽', weight: '25 кг', description: 'Цементная штукатурка для фасадов' },
    { id: 11, name: 'ВОЛМА-Акватинк', category: 'plaster', price: 490, priceStr: '490 ₽', weight: '30 кг', description: 'Влагостойкая штукатурка' },
    { id: 12, name: 'ВОЛМА-Гипс Актив', category: 'plaster', price: 410, priceStr: '410 ₽', weight: '30 кг', description: 'Быстротвердеющая гипсовая штукатурка' },
    { id: 4, name: 'ВОЛМА-Керамик', category: 'glue', price: 320, priceStr: '320 ₽', weight: '25 кг', description: 'Клей для керамической плитки' },
    { id: 5, name: 'ВОЛМА-Блок', category: 'glue', price: 280, priceStr: '280 ₽', weight: '25 кг', description: 'Клей для газобетонных блоков' },
    { id: 13, name: 'ВОЛМА-Керамик Плюс', category: 'glue', price: 380, priceStr: '380 ₽', weight: '25 кг', description: 'Усиленный плиточный клей' },
    { id: 14, name: 'ВОЛМА-Флекс', category: 'glue', price: 450, priceStr: '450 ₽', weight: '25 кг', description: 'Эластичный клей для плитки' },
    { id: 15, name: 'ВОЛМА-Аква Керамик', category: 'glue', price: 340, priceStr: '340 ₽', weight: '25 кг', description: 'Влагостойкий клей для влажных помещений' },
    { id: 6, name: 'ВОЛМА-Акваслой', category: 'putty', price: 520, priceStr: '520 ₽', weight: '20 кг', description: 'Влагостойкая полимерная шпатлёвка' },
    { id: 7, name: 'ВОЛМА-Шов', category: 'putty', price: 350, priceStr: '350 ₽', weight: '25 кг', description: 'Шпатлёвка для швов ГКЛ' },
    { id: 9, name: 'ВОЛМА-Люкс', category: 'putty', price: 480, priceStr: '480 ₽', weight: '20 кг', description: 'Финишная шпатлёвка премиум-класса' },
    { id: 16, name: 'ВОЛМА-Стандарт', category: 'putty', price: 320, priceStr: '320 ₽', weight: '20 кг', description: 'Универсальная шпатлёвка' },
    { id: 17, name: 'ВОЛМА-Финиш', category: 'putty', price: 390, priceStr: '390 ₽', weight: '20 кг', description: 'Финишная шпатлёвка' },
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
    const consumption = 8.5;
    const layerThickness = heightNum;
    const totalKg = totalArea * consumption * (layerThickness / 10);
    const bags30kg = Math.ceil(totalKg / 30);
    const bags25kg = Math.ceil(totalKg / 25);
    const bags20kg = Math.ceil(totalKg / 20);
    const estimatedCost30kg = bags30kg * 450;
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
      <Header
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredProducts={filteredProducts}
        addToCart={addToCart}
        user={user}
        setUser={setUser}
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItemsCount={cartItemsCount}
        cartTotal={cartTotal}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />

      <HeroSection />

      <CategoriesSection
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        allProducts={allProducts}
        addToCart={addToCart}
      />

      <CalculatorSection
        area={area}
        setArea={setArea}
        height={height}
        setHeight={setHeight}
        result={result}
      />

      <NewsSection news={news} />

      <ContactSection />

      <BottomNav />

      <Footer />
    </div>
  );
};

export default Index;
