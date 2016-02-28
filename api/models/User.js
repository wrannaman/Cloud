var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },
    firstName  : { type: "string" },
    lastName   : { type: "string" },
    products: {
      collection: 'products',
      via: 'user'
    }
  }
};

module.exports = User;
