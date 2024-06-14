// Activation email template
exports.EmailTemplate = (url) => {
  return `
    <h1>Account Activation</h1>
    <p>Please click the following link to activate your account:</p>
    <a href="${url}">${url}</a>
  `;
};

// Password reset email template
exports.EmailTemplate2 = (url) => {
  return `
    <h1>Password Reset</h1>
    <p>Please click the following link to reset your account password:</p>
    <a href="${url}">${url}</a>
  `;
};
