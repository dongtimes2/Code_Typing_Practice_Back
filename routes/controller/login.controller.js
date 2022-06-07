const { User } = require('../../models/User');

exports.post = async (req, res, next) => {
  let result = '';

  try {
    result = await User.findById(req.body.uid);
  } catch (err) {
    return next(err);
  }

  if (!result) {
    const { uid, email, displayName } = req.body;

    try {
      const user = new User({
        _id: uid,
        email,
        name: displayName,
      });

      await user.save();
    } catch (err) {
      return next(err);
    }
  }

  res.json('login_ok');
};
