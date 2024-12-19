import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    // If token is not provided, return an error
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the decoded token's userId
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user information to request object for further use
    req.user = user;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    // Catch token errors or other exceptions
    return res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};

export default authMiddleware;