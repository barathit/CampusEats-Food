const Joi = require("joi");

exports.validateCart = (data) => {
  const schema = Joi.object({
    items: Joi.array().items(
      Joi.object({
        menuItem: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
      })
    ),
  });
  return schema.validate(data);
};

exports.validateTimeslot = (data) => {
  const schema = Joi.object({
    vendorId: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    maxOrders: Joi.number().min(1).required(),
  });
  return schema.validate(data);
};
