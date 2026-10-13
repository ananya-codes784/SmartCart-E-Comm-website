import { Request, Response } from 'express';
import { NewsletterRepository } from '../models/Newsletter.js';

export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@') || !email.includes('.')) {
      res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
      return;
    }

    const result = await NewsletterRepository.subscribe(email);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error subscribing to newsletter' });
  }
};
