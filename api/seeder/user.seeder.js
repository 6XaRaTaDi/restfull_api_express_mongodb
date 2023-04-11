import User from '../models/user.model.js'
import mongoose from "mongoose";
import crypto from crypto

const tempPassword = 'testPasw0rd'

const seedUser = [
  {
    username: 'name1',
    email: 'test1@gmail.com',
    password: crypto.createHash('md5').update(tempPassword).digest('hex'),
    img: '/upload/img1.png',
    country: 'USA',
    phone: '',
    desc: 'awt',
    isSeller: true
  },
  {
    username: 'name2',
    email: 'test2@gmail.com',
    password: crypto.createHash('md5').update(tempPassword).digest('hex'),
    img: '/upload/img2.png',
    country: 'NA',
    phone: '',
    desc: 'awt',
    isSeller: true
  },
]

const userSeeder = async () => {
  await User.deleteMany({})
  await User.insertMany(seedUser)
}

userSeeder().then(() => {
  mongoose.connection.close()
})