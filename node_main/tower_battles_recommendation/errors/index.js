const CustomAPIError = require('./custom_api.js')
const NotFoundError = require('./not_found.js')
const BadRequestError = require('./bad_request.js')
const UnauthenticatedError = require('./unauthenticated.js')

module.exports = {
  CustomAPIError,
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
}