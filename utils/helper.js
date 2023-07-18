
const crypto = require("crypto")


exports.generateRandomByte = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(30, (err, buff) => {
            if (err) reject(err);
            const buffString = buff.toString('hex')

            //console.log(buffString,"buff")
            resolve(buffString)
        })
    })
}

exports.formatHouse = (actor) => {
    const { name, gender, about, _id, avatar } = actor;
    return {
      id: _id,
      name,
      about,
      gender,
      avatar: avatar?.url,
    };
  };