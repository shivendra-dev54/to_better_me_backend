import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserSchema from '../Models/UserModel';

interface customRequest extends Request {
  user?: any;
}

const validateTokens = async (req: customRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', async (err, decoded: any) => {
      if (err || !decoded?.username) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }

      try {
        // Fetch full user from DB, exclude password
        const user = await UserSchema.findOne({ username: decoded.username }).select('-password');
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Assign full user object to req.user
        req.user = user;
        next();
      } catch (error) {
        return res.status(500).json({ message: 'Error retrieving user' });
      }
    });
  } else {
    res.status(401).json({ message: 'Authorization token is required' });
  }
};

export default validateTokens;