const { User } = require('../../models/User');

exports.post = async (req, res, next) => {
  const result = await User.findById(req.body.uid);

  if (!result) {
    const { uid, email, displayName } = req.body;
    const user = new User({
      _id: uid,
      email,
      name: displayName,
    });

    await user.save();
  }

  res.json('login_ok');
};
