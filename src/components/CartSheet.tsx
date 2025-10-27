import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type CartItem = {
  id: number;
  name: string;
  price: number;
  weight: string;
  quantity: number;
};

type CartSheetProps = {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cartItemsCount: number;
  cartTotal: number;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

export const CartSheet = ({ 
  cart, 
  cartOpen, 
  setCartOpen, 
  cartItemsCount, 
  cartTotal, 
  removeFromCart, 
  updateQuantity 
}: CartSheetProps) => {
  return (
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
            {cart.length > 0 ? `Товаров в корзине: ${cartItemsCount}` : 'Корзина пуста'}
          </SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="ShoppingCart" size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
            <p className="text-gray-500 mb-6">Добавьте товары из каталога</p>
            <Button onClick={() => setCartOpen(false)}>
              Перейти к каталогу
            </Button>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{item.weight}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Icon name="Minus" size={14} />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                    <p className="font-semibold text-lg">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Итого:</span>
                <span className="text-primary">{cartTotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              <Button className="w-full" size="lg">
                <Icon name="CreditCard" size={18} className="mr-2" />
                Оформить заказ
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setCartOpen(false)}
              >
                Продолжить покупки
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
