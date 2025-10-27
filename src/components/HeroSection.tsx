import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const HeroSection = () => {
  return (
    <section id="hero" className="relative py-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/projects/8cfe1987-5557-44c8-9da0-8ef59c68253a/files/b2dc8dbb-3b81-4737-a20d-04b2e5f74a4a.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Строительные смеси ВОЛМА
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            Качественные материалы для профессионалов и частных мастеров
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8">
              <Icon name="ShoppingBag" size={20} className="mr-2" />
              Перейти в каталог
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
              <Icon name="Calculator" size={20} className="mr-2" />
              Калькулятор расхода
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
