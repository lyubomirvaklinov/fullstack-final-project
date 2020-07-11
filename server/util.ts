import * as jwt from 'jsonwebtoken';
import config from './src/config';
import * as dotenv from 'dotenv';

dotenv.config();
const jwtSecret = config.JWT_SECRET;

const getToken = (user) => {
  jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn:'12h'
  })
}

export default getToken;