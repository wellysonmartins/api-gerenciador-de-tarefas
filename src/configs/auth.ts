export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || "supersecretkey",
    expiresIn: "1d",
  },
};
