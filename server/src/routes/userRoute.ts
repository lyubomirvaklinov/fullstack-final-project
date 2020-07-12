import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import User from '../models/userModel';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import config from '../config';
import { UserType, VerifyToken } from '../types/User';
import { auth, isAdmin } from '../middleware/auth';

const router = express.Router();

dotenv.config();
const jwtSecret = config.JWT_SECRET;

router.get('/', auth, isAdmin, async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body as UserType;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required!' });

    if (password.length < 5)
      return res
        .status(400)
        .json({ message: 'Password must be at least 5 characters long!' });

    // if (password !== verifyPassword)
    //   return res.status(400).json({ message: "Passwords don't match!" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already taken!' });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: passwordHash,
      isAdmin,
    });
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'All fields are required!' });
    const user: any = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ message: 'No user with that email has been registered!' });

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch)
      return res.status(400).json({ message: 'Passwords do not match!' });
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '48h' });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:id', auth, isAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const userToDelete = await User.findById(userId);
    if (userToDelete) {
      await userToDelete.remove();
      res.status(200).json({ message: 'User deleted!', data: userToDelete });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.delete('/delete', auth, async (req: any, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/edit-user/:id', auth, async (req, res) => {
  try {;
    // const userToUpdate: any = req.body;
    const userToUpdate: any = await User.findOne({ _id: req.body.id });

    const reqData = req.body as UserType;
    if (userToUpdate) {
      (userToUpdate.name = req.body.name),
      (userToUpdate.email = req.body.email),
      (userToUpdate.isAdmin = req.body.isAdmin);
      
      const updatedUser = await userToUpdate.save();

    
      if (updatedUser) {
        return res
          .status(200)
          .json({ message: 'User Updated', data: updatedUser });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
