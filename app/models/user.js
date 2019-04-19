import mongoose, { Schema } from "mongoose";
var schemaValidator = require("./validator/schemaValidator");

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    validate: schemaValidator.nameValidator
  },
  lastname: {
    type: String,
    required: true,
    validate: schemaValidator.nameValidator
  },
  username: {
    type: String,
    required: true,
    unique: "User with Username `{VALUE}` already present",
    validate: schemaValidator.nameValidator
  },
  email: {
    type: String,
    required: true,
    unique: "User with Email Address `{VALUE}` already present",
    validate: schemaValidator.emailValidator
  },
  password: {
    type: String,
    required: true,
    validate: schemaValidator.passwordValidator
  },
  token: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false,
    validate: schemaValidator.isAlphaNumericValidator
  },
  state: {
    type: String,
    required: false,
    validate: schemaValidator.isAlphaNumericValidator
  },
  country: {
    type: String,
    required: false,
    validate: schemaValidator.isAlphaNumericValidator
  },
  postal_code: {
    type: String,
    required: false,
    validate: schemaValidator.postalCodeValidator
  },
  phone_number: {
    type: String,
    required: false,
    validate: schemaValidator.phoneNumberValidator
  },
  role: {
    type: String,
    default: "user"
  },
  deleted: {
    type: String,
    default: "no"
  },
  active: {
    type: String,
    default: "no"
  },
  disabled: {
    type: String,
    default: "no"
  },
  nonce: String,
  created_at: Date,
  updated_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("user", UserSchema);
