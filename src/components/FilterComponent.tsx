import React, { useState } from 'react';
import { Filter, CheckCircle, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { useProductContext } from '../contexts/ProductContext';

interface FilterComponentProps {
  categories: string[];
  onFilterChange: (selectedCategories: string[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ categories, onFilterChange }) => {
  const { setFilteringByPrice } = useProductContext();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [min, setMin] = useState<number | ''>('');
  const [max, setMax] = useState<number | ''>('');

  // Kategori seçimini güncelleme ve filtreleme
  const toggleCategory = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onFilterChange(updatedCategories);
  };

  // Fiyat aralığı filtreleme işlemi
  const handlePriceFilter = () => {
    const minValue = min === '' ? null : Number(min);
    const maxValue = max === '' ? null : Number(max);
    setFilteringByPrice(minValue, maxValue);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {/* Fiyat Aralığı */}
      <Button asChild>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center p-[10px] rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200 ease-in-out">
            <Filter size={16} className="mr-2 text-gray-600" />
            <span className="text-gray-700 font-semibold text-sm">Fiyat Filtrele</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent tabIndex={0} className="w-48 max-h-72 overflow-y-auto shadow-lg bg-white rounded-md border border-gray-200">
            <input
              type="number"
              placeholder="En az"
              value={min}
              tabIndex={1}
              onChange={(e) => setMin(e.target.value ? Number(e.target.value) : '')}
              className="border rounded-md p-2 text-sm w-full mb-2"
            />
            <input
              type="number"
              placeholder="En çok"
              value={max}
              tabIndex={2}
              onChange={(e) => setMax(e.target.value ? Number(e.target.value) : '')}
              className="border rounded-md p-2 text-sm w-full mb-2"
            />
            <Button
              onClick={handlePriceFilter}
              variant={"outline"}
              className="p-[10px] rounded-lg  hover:bg-gray-300 transition duration-200 ease-in-out  w-full text-center"
            >
              <Search size={16} className=" text-gray-600 text-center" />
            </Button>
          </DropdownMenuContent>

        </DropdownMenu>
      </Button>

      {/* Kategori Seçimi */}
      <Button asChild>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center bg-gray-200 p-[10px] rounded-md hover:bg-gray-300 transition duration-200 ease-in-out">
            <Filter size={16} className="mr-2 text-gray-600" />
            <span className="text-gray-700 font-semibold text-sm">Kategori Filtrele</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 max-h-72 overflow-y-auto shadow-lg bg-white rounded-md border border-gray-200">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => toggleCategory(category)}
                className={`flex items-center px-3 py-2 hover:bg-gray-100 transition duration-150 ease-in-out ${selectedCategories.includes(category) ? 'bg-gray-100' : ''
                  }`}
              >
                {selectedCategories.includes(category) ? (
                  <CheckCircle size={16} className="mr-2 text-green-500" />
                ) : (
                  <span className="w-4 h-4 mr-2 border rounded-full border-gray-300" />
                )}
                <span className="text-gray-700 text-sm">{category}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </Button>
    </div>
  );

};

export default FilterComponent;
