import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type CalculatorResult = {
  totalKg: string;
  bags30kg: number;
  bags25kg: number;
  bags20kg: number;
  estimatedCost30kg: string;
  estimatedCost25kg: string;
} | null;

type CalculatorSectionProps = {
  area: string;
  setArea: (area: string) => void;
  height: string;
  setHeight: (height: string) => void;
  result: CalculatorResult;
};

export const CalculatorSection = ({ area, setArea, height, setHeight, result }: CalculatorSectionProps) => {
  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                <Icon name="Calculator" size={32} className="text-white" />
              </div>
              <CardTitle className="text-3xl">Калькулятор материалов</CardTitle>
              <CardDescription className="text-base">
                Рассчитайте необходимое количество смеси для вашего проекта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Мешков по 30 кг:</span>
                        <span className="font-bold text-lg">{result.bags30kg} шт</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Примерная стоимость:</span>
                        <span className="font-semibold">≈ {result.estimatedCost30kg} ₽</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Мешков по 25 кг:</span>
                        <span className="font-bold text-lg">{result.bags25kg} шт</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Примерная стоимость:</span>
                        <span className="font-semibold">≈ {result.estimatedCost25kg} ₽</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Мешков по 20 кг:</span>
                        <span className="font-bold text-lg">{result.bags20kg} шт</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-primary/20">
                    <p className="text-sm text-gray-600 mb-3">
                      * Расчёт приблизительный. Расход: 8,5 кг/м² при слое 10 мм
                    </p>
                    <Button className="w-full" size="lg">
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Добавить в корзину рекомендованное количество
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
