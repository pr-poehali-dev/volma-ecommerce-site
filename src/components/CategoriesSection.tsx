import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  priceStr: string;
  weight: string;
  description: string;
};

type Category = {
  id: string;
  title: string;
  icon: string;
  description: string;
  image: string;
};

type CategoriesSectionProps = {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  allProducts: Product[];
  addToCart: (product: Product) => void;
};

export const CategoriesSection = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  allProducts, 
  addToCart 
}: CategoriesSectionProps) => {
  const displayedProducts = selectedCategory
    ? allProducts.filter(p => p.category === selectedCategory)
    : allProducts;

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Категории товаров</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Выберите категорию для просмотра доступных товаров
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={category.icon as any} size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={selectedCategory || 'all'} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="all" onClick={() => setSelectedCategory('')}>
              Все товары
            </TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                <Icon name={cat.icon as any} size={16} className="mr-2" />
                {cat.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory || 'all'} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-primary">{product.priceStr}</p>
                        <p className="text-sm text-gray-500">{product.weight}</p>
                      </div>
                      <Button onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
