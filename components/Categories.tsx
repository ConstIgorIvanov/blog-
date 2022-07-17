import React from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

import { Category } from '../types/types';

const Categories = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category) => (
        <div key={category.id}>
          <Link href={`/category/${category.slug}`}>
            <span className="cursor-pointer block pb-3 mb-3">{category.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
