const User = require('../models/userModel');
const CatchAsync = require('../utils/catchAsync');

exports.signup = CatchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
