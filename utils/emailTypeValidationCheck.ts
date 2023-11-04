/* eslint no-useless-escape: "off" */
export const emailTypeValidationCheck = (email: string) => {
  const reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return reg.test(email);
};
