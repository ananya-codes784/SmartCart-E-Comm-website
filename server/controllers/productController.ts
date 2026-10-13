import { Request, Response } from 'express';
import { ProductRepository } from '../models/Product.js';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      gender,
      category,
      collection,
      minPrice,
      maxPrice,
      size,
      search,
      sortBy
    } = req.query;

    const filter: any = {};
    if (gender) filter.gender = String(gender);
    if (category) filter.category = String(category);
    if (size) filter.size = String(size);
    if (search) filter.search = String(search);
    if (sortBy) filter.sortBy = String(sortBy);
    if (minPrice !== undefined) filter.minPrice = Number(minPrice);
    if (maxPrice !== undefined) filter.maxPrice = Number(maxPrice);

    if (collection === 'new-arrivals') {
      filter.isNewArrival = true;
    } else if (collection === 'best-sellers') {
      filter.isBestSeller = true;
    } else if (collection === 'sale') {
      filter.onSale = true;
    }

    const products = await ProductRepository.find(filter);
    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductRepository.findById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.json({ success: true, product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error retrieving product' });
  }
};

export const addProductReview = async (req: Request, res: Response) => {
  try {
    const { userName, rating, comment } = req.body;
    if (!userName || !rating || !comment) {
      res.status(400).json({ success: false, message: 'Please provide user name, rating (1-5), and review text.' });
      return;
    }

    const updatedProduct = await ProductRepository.addReview(req.params.id, {
      userName,
      rating: Number(rating),
      comment,
    });

    if (!updatedProduct) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.status(201).json({ success: true, product: updatedProduct });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error submitting review' });
  }
};
