const Joi = require("joi");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{10,32}$/;
const loginRegex = /^[a-zA-Z0-9_]{8,20}$/;

const register = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().regex(new RegExp(passwordRegex)),
    login: Joi.string().regex(new RegExp(loginRegex)),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    switch (error.details[0].context.key) {
      case "email":
        res.status(400).json({
          error: "Format de l'email non valide: exemple@pattesperdues.com",
        });
        break;
      case "password":
        res.status(400).json({
          error:
            "Format du mot de passe non valide. Doit contenir entre 10 et 32 caractères alphanumériques dont des majuscules, minuscules, caractères spéciaux et des chiffres.",
        });
        break;
      case "login":
        res.status(400).json({
          error:
            "Format du login non valide. Doit être compris entre 8 et 20 caractères alphanumériques.  ",
        });
        break;
      default:
        res.status(400).json({
          error: "Informations non-valides",
        });
    }
  } else {
    next();
  }
};

module.exports = { register };
