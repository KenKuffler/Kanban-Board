import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

// Login function
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  console.log('Attempting to login user:', username); // Debugging log

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('User not found');
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
    console.log("Generated Token:", token); // Debugging log to confirm token generation
    res.json({ token });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /login - Login a user
router.post('/login', login);

export default router;
