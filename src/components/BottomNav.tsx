import Icon from '@/components/ui/icon';

export const BottomNav = () => {
  return (
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
  );
};
