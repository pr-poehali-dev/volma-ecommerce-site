import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import Icon from '@/components/ui/icon';
import { UserDialog } from './UserDialog';
import { LoginDialog } from './LoginDialog';
import { CartSheet } from './CartSheet';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  priceStr: string;
  weight: string;
  description: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  weight: string;
  quantity: number;
};

type User = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
} | null;

type HeaderProps = {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts: Product[];
  addToCart: (product: Product) => void;
  user: User;
  setUser: (user: User) => void;
  loginOpen: boolean;
  setLoginOpen: (open: boolean) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cartItemsCount: number;
  cartTotal: number;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

export const Header = ({
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  filteredProducts,
  addToCart,
  user,
  setUser,
  loginOpen,
  setLoginOpen,
  isLogin,
  setIsLogin,
  cart,
  cartOpen,
  setCartOpen,
  cartItemsCount,
  cartTotal,
  removeFromCart,
  updateQuantity,
}: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img 
            src="https://cdn.poehali.dev/files/1c4da8c0-6931-4304-9f2d-fe205f8a8406.png" 
            alt="ВОЛМА" 
            className="h-10"
          />
        </div>

        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full max-w-md gap-2 justify-start text-gray-500">
              <Icon name="Search" size={16} />
              <span>Поиск товаров...</span>
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
            <UserDialog user={user} setUser={setUser} />
          ) : (
            <LoginDialog 
              loginOpen={loginOpen}
              setLoginOpen={setLoginOpen}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              setUser={setUser}
            />
          )}

          <CartSheet
            cart={cart}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            cartItemsCount={cartItemsCount}
            cartTotal={cartTotal}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        </div>
      </div>
    </header>
  );
};
