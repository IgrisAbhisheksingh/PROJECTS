import jwt from "jsonwebtoken";

export const verifyTokenGuard = async (req, res, next) => {
  
    const authorization = req.headers['authorization'];

    if (!authorization) {
        return res.status(400).send({ message: "Bad Request" });
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
        return res.status(400).send({ message: "Bad Request" });
    }

    const payload = await jwt.verify(token, process.env.FORGOT_TOKEN_SECRET);

    req.user = payload;
    next();
};  

const invalid = async (res) => {
  res.cookie('authToken', null, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT !== "DEV",
    sameSite: process.env.ENVIRONMENT === "DEV" ? "lax" : "none",
    path: "/",
    maxAge: 0,
  });
  return res.status(401).json({ message: "Unauthorized" });
};

export const AdminUserGuard = async (req, res, next) => {
  const { authToken } = req.cookies;
  if (!authToken) return invalid(res);

  const payload = await jwt.verify(authToken, process.env.AUTH_SECRET);
  if (payload.role !== "user" && payload.role !== "admin") return invalid(res);

  req.user = payload;
  next();
};