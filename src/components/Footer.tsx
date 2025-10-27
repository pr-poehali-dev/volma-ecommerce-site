export const Footer = () => {
  return (
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
  );
};
