import * as jwt from 'jsonwebtoken';
import config from '../config';
import * as dotenv from 'dotenv';
import { VerifyToken } from '../types/User';
import User from '../models/userModel';

dotenv.config();
const jwtSecret = config.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res
      .status(401)
      .json({ msg: 'No authentication token, authorization denied.' });
    }
    
    const onlyToken = token.slice(7, token.length);
    
    jwt.verify(onlyToken, jwtSecret, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return;
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user: any = await User.findById(req.user.id);
    if (req.user && user.isAdmin) {
      return next();
    }
  } catch (err) {
  return res.status(401).json({ error: err.message });
  }
};

export { auth, isAdmin };
