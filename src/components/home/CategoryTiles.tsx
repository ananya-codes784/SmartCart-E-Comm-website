import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FashionImage } from '../common/FashionImage.js';

interface CategoryItem {
  name: string;
  gender: 'women' | 'men' | 'kids';
  itemCount: string;
  image: string;
  path: string;
}

export const CategoryTiles: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'women' | 'men' | 'kids'>('women');

  const categoriesData: Record<'women' | 'men' | 'kids', CategoryItem[]> = {
    women: [
      {
        name: 'Dresses',
        gender: 'women',
        itemCount: 'Midi, Slip & Linen',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80',
        path: '/shop?gender=women&category=Dresses',
      },
      {
        name: 'Co-ord Sets',
        gender: 'women',
        itemCount: 'Tailored & Ribbed',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',
        path: '/shop?gender=women&category=Co-ord Sets',
      },
      {
        name: 'Kurtis and Ethnic Wear',
        gender: 'women',
        itemCount: 'Chanderi & Mulmul Sets',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
        path: '/shop?gender=women&category=Kurtis and Ethnic Wear',
      },
      {
        name: 'Tops and Shirts',
        gender: 'women',
        itemCount: 'Poplin & Draped Blouses',
        image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80',
        path: '/shop?gender=women&category=Tops and Shirts',
      },
      {
        name: 'Jeans and Trousers',
        gender: 'women',
        itemCount: 'Wide-Leg & Selvedge',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80',
        path: '/shop?gender=women&category=Jeans and Trousers',
      },
      {
        name: 'Jackets and Outerwear',
        gender: 'women',
        itemCount: 'Double-Faced Wool & Trench',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80',
        path: '/shop?gender=women&category=Jackets and Outerwear',
      },
    ],
    men: [
      {
        name: 'Shirts',
        gender: 'men',
        itemCount: 'Camp Collar Linen & Oxford',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80',
        path: '/shop?gender=men&category=Shirts',
      },
      {
        name: 'T-shirts and Polos',
        gender: 'men',
        itemCount: 'Heavyweight Supima & Milano Knit',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
        path: '/shop?gender=men&category=T-shirts and Polos',
      },
      {
        name: 'Jeans and Trousers',
        gender: 'men',
        itemCount: 'Japanese Selvedge & Pleated',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=700&q=80',
        path: '/shop?gender=men&category=Jeans and Trousers',
      },
      {
        name: 'Ethnic Wear',
        gender: 'men',
        itemCount: 'Handwoven Silk-Linen Kurtas',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80',
        path: '/shop?gender=men&category=Ethnic Wear',
      },
      {
        name: 'Jackets and Hoodies',
        gender: 'men',
        itemCount: 'Field Jackets & French Terry',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80',
        path: '/shop?gender=men&category=Jackets and Hoodies',
      },
    ],
    kids: [
      {
        name: "Boys' Clothing",
        gender: 'kids',
        itemCount: 'Linen Sets & Dungarees',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=80',
        path: "/shop?gender=kids&category=Boys' Clothing",
      },
      {
        name: "Girls' Clothing",
        gender: 'kids',
        itemCount: 'Muslin Tiered Dresses',
        image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=700&q=80',
        path: "/shop?gender=kids&category=Girls' Clothing",
      },
      {
        name: "Kids' Ethnic Wear",
        gender: 'kids',
        itemCount: 'Handloom Dhoti & Kurta Sets',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80',
        path: "/shop?gender=kids&category=Kids' Ethnic Wear",
      },
    ],
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8E6DF]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium">Curated Wardrobe</span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B] mt-1">
              Shop by Category
            </h2>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#F5F4F0] border border-[#E8E6DF]">
            {(['women', 'men', 'kids'] as const).map((gender) => (
              <button
                key={gender}
                onClick={() => setActiveTab(gender)}
                className={`px-5 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                  activeTab === gender
                    ? 'bg-[#18181B] text-white shadow-xs'
                    : 'text-[#5C5C60] hover:text-[#18181B]'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tiles Grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {categoriesData[activeTab].map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="group relative aspect-[4/5] overflow-hidden bg-[#EFECE6] border border-[#E8E6DF] flex flex-col justify-end p-6 transition-all duration-300"
            >
              <FashionImage
                src={cat.image}
                alt={cat.name}
                category={cat.name}
                gender={cat.gender}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity group-hover:from-black/85" />
              
              <div className="relative z-10 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#D2D8CF] font-medium">
                  {cat.itemCount}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-medium mt-1 flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
