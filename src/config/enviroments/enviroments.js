import "dotenv/config"

import env from "env-var"

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    NODE_ENV: env.get("NODE_ENV").required().asString(),
    DB_URI: env.get("DB_URI").required().asString(),
    SECRET_JWD_SEED: env.get("SECRET_JWD_SEED").required().asString(),
    JWT_EXPIRE_IN: env.get("JWT_EXPIRE_IN").required().asString(),
    CLOUDINARY_CLOUD_NAME: env.get("CLOUDINARY_CLOUD_NAME").required().asString(),
    CLOUDINARY_API_KEY: env.get("CLOUDINARY_API_KEY").required().asString(),
    CLOUDINARY_API_SECRET: env.get("CLOUDINARY_API_SECRET").required().asString(),
    // MERCADOPAGO_TOKEN: env.get("MERCADOPAGO_TOKEN").required().asString(),
}