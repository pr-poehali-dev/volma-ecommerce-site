import Icon from '@/components/ui/icon';

export const ContactSection = () => {
  return (
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
  );
};
