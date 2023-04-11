import jwt from 'jsonwebtoken'
import createError from '../utils/createError'

export const verifyToken = (req, res, next) => {
  const token = req.cookie.accessToken
  if(!token) return next(createError(401,"You are not authenticated!"))

  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
    if(err) return next(createError(403, 'Token is not valid!'))
    req.userId = user.id,
    req.isSeller = user.isSeller
   // req.user = user
    next()
  })
}