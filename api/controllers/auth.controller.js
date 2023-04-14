import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from 'bcrypt'
import randToken from 'rand-token'

export const register = async (req, res, next) => {
  try {
    const passwordHash = bcrypt.hashSync(req.body.password, 10)
    const newUser = new User({
      ...req.body,
      password: passwordHash,
    })
    await newUser.save()
    res.status(201).send("User has been created.");
  } catch (error) {
    next(error);
  }
}

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_LIFE }
  )
}

export const updateRefreshToken = async (userId, refreshToken) => {
  const user = await User.findOne({_id: userId})
  user.refreshToken = refreshToken
  user.save();
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404, 'user not found'))
    const isCorrectPass = bcrypt.compareSync(req.body.password, user.password)
    if(!isCorrectPass) return next(createError(404, 'password incorrect'))

    const accessToken = generateToken(user);

    if(!accessToken) return res.status(401).send('login failed')
   // const refreshToken = randtoken.generate(jwtVariable.refreshTokenSize)
    const refreshToken = randToken.generate(16)
    if(!user.refreshToken) {
      await updateRefreshToken(user._id, refreshToken)
    }
    const { password, ...info } = user._doc
    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .send(info);

  } catch (error) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res
    .clearCookie('accessToken', {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};


