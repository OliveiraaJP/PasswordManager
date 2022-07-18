import jwt from 'jsonwebtoken';

export const validateToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};