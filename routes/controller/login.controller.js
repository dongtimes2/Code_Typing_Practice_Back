const { User } = require('../../models/User');
const emailTypeValidationCheck = require('../../utils/emailTypeValidationCheck');

exports.post = async (req, res, next) => {
  let result = '';

  try {
    result = await User.findById(req.body.uid);
  } catch (err) {
    return next(err);
  }

  if (!result) {
    const { uid, email, displayName } = req.body;

    if (!uid) {
      return next({ status: 400, message: 'Missing uid' });
    }

    if (!emailTypeValidationCheck(email)) {
      return next({ status: 400, message: 'Invalid Email Type' });
    }

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
