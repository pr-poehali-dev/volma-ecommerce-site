import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type NewsItem = {
  date: string;
  title: string;
  description: string;
};

type NewsSectionProps = {
  news: NewsItem[];
};

export const NewsSection = ({ news }: NewsSectionProps) => {
  return (
    <section id="news" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Новости компании</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Следите за последними событиями и обновлениями
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
  );
};
