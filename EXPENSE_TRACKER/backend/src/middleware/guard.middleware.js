import jwt from "jsonwebtoken";

export const verifyTokenGuard = async (req, res, next) => {
  
        const authorization = req.headers['authorization'];

        if (!authorization) {
            return res.status(400).send({ message: "Bad Request" });
        }

        const [type, token] = authorization.split(" ");

        if (type !== "Bearer") {
            return res.status(400).send({ message: "Bad Request " });
        }

        const payload = await jwt.verify(token, process.env.FORGOT_TOKEN_SECRET);

        
        req.user = payload;

        next();
    }  

    export const AdminUserGuard = async (req, res, next) => {

        next();
    }  

