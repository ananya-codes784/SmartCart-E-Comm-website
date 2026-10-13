import mongoose from 'mongoose';
import { dbInstance } from '../config/db.js';

export const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  subscribedAt: { type: Date, default: Date.now },
});

export const NewsletterModel = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);

export const NewsletterRepository = {
  async subscribe(email: string): Promise<{ success: boolean; message: string }> {
    const cleanEmail = email.toLowerCase().trim();

    if (dbInstance.isMongo()) {
      try {
        const existing = await NewsletterModel.findOne({ email: cleanEmail });
        if (existing) {
          return { success: true, message: 'You are already subscribed to the SmartCart Gazette.' };
        }
        await NewsletterModel.create({ email: cleanEmail });
        return { success: true, message: 'Welcome to SmartCart. You will receive private previews and runway releases.' };
      } catch (e) {
        // Fallback
      }
    }

    const state = dbInstance.getState();
    const existing = state.newsletter.find(n => n.email === cleanEmail);
    if (existing) {
      return { success: true, message: 'You are already subscribed to the SmartCart Gazette.' };
    }

    state.newsletter.push({
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
    });
    dbInstance.save();

    return {
      success: true,
      message: 'Welcome to SmartCart. You will receive private previews and runway releases.',
    };
  }
};
