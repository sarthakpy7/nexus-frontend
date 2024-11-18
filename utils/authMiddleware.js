import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token not found' });
        }
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(403).json({ message: 'Invalid token or user ID not found' });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }
       if (user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not an admin' });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
