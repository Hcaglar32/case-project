import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useProductContext } from '../contexts/ProductContext';
import { DebounceInput } from 'react-debounce-input';
import SortComponent from "./SortComponent";
import FilterComponent from "./FilterComponent";

const Navbar = () => {
  const { setSorting, setFiltering, categories } = useProductContext();
  const { searchQuery, setSearchQuery } = useProductContext();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (option: string) => {
    setSorting(option);
  };

  const handleFilterChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setFiltering(categories);
  };

  return (
    <div className="bg-white w-full sticky z-50 my-10 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-20 h-16">
      

          {/* Sıralama , filtreleme ve arama */}
          <div className="flex flex-wrap justify-center mb-2 lg:flex-nowrap items-center gap-2   mt-2 lg:mt-0">
            <SortComponent onSortChange={handleSortChange} />
            <FilterComponent categories={categories} onFilterChange={handleFilterChange} />
          </div>
  
          <div className="flex items-center w-full  lg:w-auto justify-center lg:justify-end gap-2 mt-2 lg:mt-0">
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Arama yap..."
              className="w-full sm:w-72 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
