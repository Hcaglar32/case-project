import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

type SortOption = 'price' | 'newest' | 'popular' | 'none'; // Sıralama seçenekleri

interface SortComponentProps {
  onSortChange: (option: SortOption) => void;
}

const SortComponent: React.FC<SortComponentProps> = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState<SortOption>('none'); // Seçilen sıralama seçeneği

  const handleSortChange = (option: SortOption) => {
    setSelectedOption(option); // Seçilen opsiyonu güncelle
    onSortChange(option); // Ana bileşene sıralama değişikliğini bildir
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out">
      <Button asChild variant={"secondary"}>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            <span>
              {/* Sıralama seçenekleri başta varsayılan none*/}
              {selectedOption === 'none'
                ? 'Varsayılan'
                : selectedOption === 'price'
                  ? 'Fiyata Göre'
                  : selectedOption === 'newest'
                    ? 'En Yeniler'
                    : 'En Popüler'}
            </span>
            <ChevronDown className="ml-2" size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* Seçenekler için DropdownMenuItem'ler */}
            <DropdownMenuItem onClick={() => handleSortChange('none')}>Varsayılan</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange('price')}>Fiyata Göre</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange('newest')}>En Yeniler</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange('popular')}>En Popüler</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Button>
    </div>
  );
};

export default SortComponent;
