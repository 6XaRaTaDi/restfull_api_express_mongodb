
import express from "express";

import authRoute from './auth.route.js'
import userRoute from './user.route.js'
// import gigRoute from "./routes/gig.route.js";
// import orderRoute from "./routes/order.route.js";
// import conversationRoute from "./routes/conversation.route.js";
// import messageRoute from "./routes/message.route.js";
// import reviewRoute from "./routes/review.route.js";
// import authRoute from "./routes/auth.route.js";

let router = express.Router();

const initAPIRoute = (app) => {
  router.use('/auth', authRoute)
  router.use('/users', userRoute)

  return app.use('/api/', router)
}

export default initAPIRoute;
