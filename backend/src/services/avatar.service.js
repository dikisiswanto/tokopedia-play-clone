const crypto = require("crypto");

const generateAvatar = (username, size = 0) => {
  const avatarModel = ["identicon", "monsterid", "wavatar", "retro"];
  const avatarRandomIndex = Math.floor(Math.random() * avatarModel.length);
  const randomAvatarStyle = avatarModel[avatarRandomIndex];
  
  const hashedUsername = crypto
    .createHash("md5")
    .update(username)
    .digest("hex");

  let avatarUrl = `https://www.gravatar.com/avatar/${hashedUsername}?d=${randomAvatarStyle}`;

  if (size > 80 && size <= 2048) {
    avatarUrl += `&s=${size}`;
  }

  return avatarUrl;
};

module.exports = {
  generateAvatar,
};
