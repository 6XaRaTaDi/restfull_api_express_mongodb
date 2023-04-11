import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from 'bcrypt'

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
    next(err);
  }
}

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isSeller: user.isSeller,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: '120s' }
  )
}

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isSeller: user.isSeller,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: '365d' }
  )
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })
    if (!user) return next(createError(404, 'user not found'))
    const isCorrectPass = bcrypt.compareSync(req.body.password, user.password)
    if(!isCorrectPass) return next(createError(404, 'password incorrect'))

    const accessToken= generateAccessToken(user);
    // const refreshToken = generateRefreshToken(user)

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


