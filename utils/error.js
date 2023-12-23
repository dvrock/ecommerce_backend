class createCustomError extends Error {
  constructor(msg = "Something Went Wrong", status = 500) {
    super(msg);
    this.statusCode = status;
    this.name = "CustomError";
  }
}
module.exports = {
  createCustomError,
};
