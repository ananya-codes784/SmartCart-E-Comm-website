import { Request, Response, NextFunction } from 'express';
import { verifyToken, UserRepository } from '../models/User.js';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized. No token provided.' });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded || !decoded.id) {
    res.status(401).json({ message: 'Not authorized. Token invalid or expired.' });
    return;
  }

  const user = await UserRepository.findById(decoded.id);
  if (!user) {
    res.status(401).json({ message: 'User belonging to this token no longer exists.' });
    return;
  }

  // Attach user to request without password
  const { password, ...safeUser } = user;
  req.user = safeUser;
  next();
};
