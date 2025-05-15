import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
  //console.log("JWT_SECRET in generateToken = ", process.env.JWT_SECRET);

  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};
