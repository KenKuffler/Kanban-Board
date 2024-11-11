import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

// Define a specific interface for the JWT payload
interface CustomJwtPayload extends JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer <token>"

  if (!token) {
    res.sendStatus(401); // Unauthorized if no token
    return; // Ensure the function exits here
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: VerifyErrors | null, decoded: unknown) => {
    if (err || !decoded || typeof decoded === 'string') {
      res.sendStatus(403); // Forbidden if token is invalid or user is undefined
      return; // Ensure the function exits here
    }

    req.user = decoded as CustomJwtPayload; // Cast decoded to CustomJwtPayload
    next(); // Proceed to the next middleware or route handler
  });
};
