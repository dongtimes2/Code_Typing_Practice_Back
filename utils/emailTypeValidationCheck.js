/* eslint-disable no-useless-escape */
const emailTypeValidationCheck = email => {
  const reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return reg.test(email);
};

module.exports = emailTypeValidationCheck;
