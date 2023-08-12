const setCookies = (res, cookies) => {
  const maxAgeInMilliseconds = 1000 * 60 * 60 * 24 * 365 * 10;

  Object.entries(cookies).forEach(([name, value]) => {
    res.cookie(name, value, {
      maxAge: maxAgeInMilliseconds,
      httpOnly: true,
      path: '/',
      secure: false,
    });
  });

  return true;
};

module.exports = {
  setCookies,
};
