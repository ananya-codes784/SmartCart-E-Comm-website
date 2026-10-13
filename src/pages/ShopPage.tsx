import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';
import api from '../api/client.js';
import { Product } from '../types/index.js';
import { ProductCard } from '../components/product/ProductCard.js';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const routeParams = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Filters state
  const currentGender = routeParams.gender || searchParams.get('gender') || 'all';
  const currentCategory = searchParams.get('category') || 'all';
  const currentCollection = routeParams.collection || searchParams.get('collection') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentSize = searchParams.get('size') || 'all';
  const maxPriceParam = searchParams.get('maxPrice') || '300';

  const [priceRange, setPriceRange] = useState<number>(Number(maxPriceParam));

  // Category taxonomy defined by prompt
  const categoryTaxonomy: Record<string, string[]> = {
    women: [
      'Dresses',
      'Tops and Shirts',
      'Jeans and Trousers',
      'Kurtis and Ethnic Wear',
      'Co-ord Sets',
      'Jackets and Outerwear',
    ],
    men: [
      'T-shirts and Polos',
      'Shirts',
      'Jeans and Trousers',
      'Ethnic Wear',
      'Jackets and Hoodies',
    ],
    kids: [
      "Boys' Clothing",
      "Girls' Clothing",
      "Kids' Ethnic Wear",
    ],
  };

  const allCategories = [
    'Dresses',
    'Tops and Shirts',
    'Jeans and Trousers',
    'Kurtis and Ethnic Wear',
    'Co-ord Sets',
    'Jackets and Outerwear',
    'T-shirts and Polos',
    'Shirts',
    'Ethnic Wear',
    'Jackets and Hoodies',
    "Boys' Clothing",
    "Girls' Clothing",
    "Kids' Ethnic Wear",
  ];

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        const params: any = {};

        if (currentGender !== 'all') params.gender = currentGender;
        if (currentCategory !== 'all') params.category = currentCategory;
        if (currentCollection !== 'all') params.collection = currentCollection;
        if (currentSearch) params.search = currentSearch;
        if (currentSize !== 'all') params.size = currentSize;
        if (priceRange < 300) params.maxPrice = priceRange;
        if (currentSort) params.sortBy = currentSort;

        const { data } = await api.get('/products', { params });
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [currentGender, currentCategory, currentCollection, currentSearch, currentSort, currentSize, priceRange]);

  const updateFilter = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    setSearchParams(nextParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setPriceRange(300);
  };

  const getPageTitle = () => {
    if (currentSearch) return `Search Results for "${currentSearch}"`;
    if (currentCollection === 'new-arrivals') return 'New Arrivals Collection';
    if (currentCollection === 'best-sellers') return 'Best Sellers';
    if (currentCollection === 'sale') return 'Atelier Sale Archive';
    if (currentGender === 'women') return "Women's Collection";
    if (currentGender === 'men') return "Men's Sartorial";
    if (currentGender === 'kids') return "Kids' Wear";
    return 'All Garments & Collections';
  };

  const displayedCategories = currentGender !== 'all' && categoryTaxonomy[currentGender]
    ? categoryTaxonomy[currentGender]
    : allCategories;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E8E6DF]">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#727D6F] flex items-center gap-2">
            <span>Shop</span>
            <span aria-hidden="true">/</span>
            <span className="capitalize">{currentGender}</span>
            {currentCategory !== 'all' && (
              <>
                <span aria-hidden="true">/</span>
                <span>{currentCategory}</span>
              </>
            )}
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B] mt-1">
            {getPageTitle()}
          </h1>
          <p className="text-xs text-[#727D6F] mt-1 tabular-nums">
            Showing {products.length} {products.length === 1 ? 'garment' : 'garments'}
          </p>
        </div>

        {/* Sort and Mobile Filter Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#DCDAD2] bg-white text-xs uppercase tracking-wider font-medium text-[#18181B]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="relative flex items-center">
            <span className="text-xs text-[#727D6F] mr-2 hidden sm:inline">Sort:</span>
            <select
              value={currentSort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="px-3 py-2 bg-white border border-[#DCDAD2] text-xs font-medium text-[#18181B] focus:outline-none focus:border-[#18181B] cursor-pointer"
            >
              <option value="newest">Featured & Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="best-sellers">Best Sellers</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-8 pr-6 border-r border-[#E8E6DF]">
          
          {/* Active Filters Clear Button */}
          {(currentGender !== 'all' || currentCategory !== 'all' || currentSize !== 'all' || priceRange < 300 || currentSearch) && (
            <div className="pb-4 border-b border-[#E8E6DF] flex items-center justify-between">
              <span className="text-xs text-[#727D6F]">Filters Active</span>
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#9E3A3A] hover:underline font-medium"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Gender Filter */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#18181B] font-semibold mb-3">
              Department
            </h3>
            <div className="space-y-1.5 text-xs">
              {[
                { label: 'All Garments', value: 'all' },
                { label: 'Women', value: 'women' },
                { label: 'Men', value: 'men' },
                { label: 'Kids', value: 'kids' },
              ].map((g) => (
                <button
                  key={g.value}
                  onClick={() => {
                    updateFilter('gender', g.value);
                    updateFilter('category', 'all'); // reset category when gender switches
                  }}
                  className={`block w-full text-left py-1 transition-colors ${
                    currentGender === g.value
                      ? 'font-bold text-[#18181B]'
                      : 'text-[#5C5C60] hover:text-[#18181B]'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#18181B] font-semibold mb-3">
              Category
            </h3>
            <div className="space-y-1.5 text-xs max-h-60 overflow-y-auto pr-2">
              <button
                onClick={() => updateFilter('category', 'all')}
                className={`block w-full text-left py-1 transition-colors ${
                  currentCategory === 'all'
                    ? 'font-bold text-[#18181B]'
                    : 'text-[#5C5C60] hover:text-[#18181B]'
                }`}
              >
                All Categories
              </button>
              {displayedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateFilter('category', cat)}
                  className={`block w-full text-left py-1 transition-colors ${
                    currentCategory === cat
                      ? 'font-bold text-[#18181B]'
                      : 'text-[#5C5C60] hover:text-[#18181B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Collections Filter */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#18181B] font-semibold mb-3">
              Collection
            </h3>
            <div className="space-y-1.5 text-xs">
              {[
                { label: 'All Catalog', value: 'all' },
                { label: 'New Arrivals', value: 'new-arrivals' },
                { label: 'Best Sellers', value: 'best-sellers' },
                { label: 'Archive Sale', value: 'sale' },
              ].map((c) => (
                <button
                  key={c.value}
                  onClick={() => updateFilter('collection', c.value)}
                  className={`block w-full text-left py-1 transition-colors ${
                    currentCollection === c.value
                      ? 'font-bold text-[#18181B]'
                      : 'text-[#5C5C60] hover:text-[#18181B]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#18181B] font-semibold mb-3">
              Available Sizes
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => updateFilter('size', 'all')}
                className={`text-xs px-2.5 py-1.5 border transition-colors ${
                  currentSize === 'all'
                    ? 'bg-[#18181B] text-white border-[#18181B]'
                    : 'bg-white text-[#5C5C60] border-[#DCDAD2] hover:border-[#18181B]'
                }`}
              >
                All
              </button>
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => updateFilter('size', size)}
                  className={`text-xs px-2.5 py-1.5 border transition-colors ${
                    currentSize === size
                      ? 'bg-[#18181B] text-white border-[#18181B]'
                      : 'bg-white text-[#5C5C60] border-[#DCDAD2] hover:border-[#18181B]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-xs uppercase tracking-widest text-[#18181B] font-semibold">
                Max Price
              </h3>
              <span className="text-xs font-semibold tabular-nums text-[#18181B]">
                ${priceRange}
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="300"
              step="5"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#18181B] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#727D6F] mt-1">
              <span>$30</span>
              <span>$300+</span>
            </div>
          </div>

        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col space-y-3">
                  <div className="aspect-[3/4] bg-[#EFECE6]" />
                  <div className="h-3 bg-[#EFECE6] w-2/3" />
                  <div className="h-4 bg-[#EFECE6] w-full" />
                  <div className="h-3 bg-[#EFECE6] w-1/3" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 px-4 border border-dashed border-[#DCDAD2] bg-[#F5F4F0]">
              <p className="font-editorial text-2xl text-[#18181B]">No garments match your selected filters</p>
              <p className="text-xs text-[#727D6F] mt-2 max-w-sm mx-auto">
                Try widening your price range, clearing size restrictions, or switching categories.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-6 px-6 py-2.5 bg-[#18181B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C30]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FBFBFA] h-full shadow-2xl flex flex-col p-6 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E6DF]">
              <h2 className="font-editorial text-xl font-medium">Filter Catalog</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-[#18181B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              {/* Gender */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold mb-2">Gender</h4>
                <div className="flex flex-wrap gap-2">
                  {['all', 'women', 'men', 'kids'].map((g) => (
                    <button
                      key={g}
                      onClick={() => updateFilter('gender', g)}
                      className={`text-xs px-3 py-1.5 border capitalize ${
                        currentGender === g ? 'bg-[#18181B] text-white' : 'bg-white text-[#5C5C60]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold mb-2">Category</h4>
                <select
                  value={currentCategory}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full p-2 bg-white border border-[#DCDAD2] text-xs"
                >
                  <option value="all">All Categories</option>
                  {displayedCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold mb-2">Size</h4>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => updateFilter('size', 'all')}
                    className={`text-xs px-2.5 py-1 border ${currentSize === 'all' ? 'bg-[#18181B] text-white' : 'bg-white'}`}
                  >
                    All
                  </button>
                  {availableSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateFilter('size', s)}
                      className={`text-xs px-2.5 py-1 border ${currentSize === s ? 'bg-[#18181B] text-white' : 'bg-white'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold uppercase tracking-wider">Max Price</span>
                  <span className="tabular-nums font-semibold">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="300"
                  step="5"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#18181B]"
                />
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-[#E8E6DF] flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 border border-[#DCDAD2] text-xs uppercase tracking-wider font-medium"
              >
                Clear
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#18181B] text-white text-xs uppercase tracking-wider font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
