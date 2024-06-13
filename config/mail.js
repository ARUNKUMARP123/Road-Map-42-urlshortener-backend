exports.emailTemplate = (url) => {
    return `
      <h1>Account Activation</h1>
      <p>Please click the following link to activate your account:</p>
      <a href="${url}">${url}</a>
    `;
  };
  