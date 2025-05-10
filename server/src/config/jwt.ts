export default {
    secret: process.env.JWT_SECRET || "segredo",
    expiresIn: 60 * 60 * 2,
  };