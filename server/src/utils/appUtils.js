const messages = require("../messages");
const { exceptions } = require("../core");

const validator = function (obj) {
  obj = {
    container: obj.container || {},
    return: obj.return || false,
    fields: obj.fields || [],
  };
  let isValid = true;
  let message = "";

  for (field of obj.fields) {
    let value = obj.container[field.key];
    isUndefined = value == undefined;

    //should be required
    if ((field.required || field.trimmed) && value == undefined) {
      isValid = false;
      message = messages.missingKey.replace("{key}", field.key);
      break;
    }

    //should be trimmed
    if (!isUndefined && field.trimmed && value.trim() == "") {
      isValid = false;
      message = messages.invalidValue.replace("{key}", field.key);
      break;
    }

    //should be integer id
    if (
      !isUndefined &&
      field.type == "id" &&
      (parseInt(value) != value || value == "0")
    ) {
      isValid = false;
      message = messages.invalidIntegerValue.replace("{key}", field.key);
      break;
    }

    //should be valid email
    if (
      !isUndefined &&
      field.type == "email" &&
      !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      isValid = false;
      message = messages.invalidValue.replace("{key}", field.key);
      break;
    }

    //should be integer or float
    if (
      !isUndefined &&
      field.type == "number" &&
      !value.match(/^-?\d*(\.\d+)?$/)
    ) {
      isValid = false;
      message = messages.invalidValue.replace("{key}", field.key);
      break;
    }

    if (
      !isUndefined &&
      field.type == "between" &&
      !(value >= field.range[0] && value <= field.range[1])
    ) {
      isValid = false;
      message = messages.invalidValue.replace("{key}", field.key);
      break;
    }

    if (!isUndefined && field.type == "in") {
      field.match = field.match.map((v) => String(v));
      if (field.match.indexOf(value) === -1) {
        isValid = false;
        message = messages.invalidValue.replace("{key}", field.key);
        break;
      }
    }
  }

  if (obj.return) {
    return isValid;
  } else if (!isValid) {
    throw exceptions.badRequestError(message);
  }
};

module.exports = {
  validator,
};
