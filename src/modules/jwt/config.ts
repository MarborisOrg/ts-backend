import { config } from "#config/env_get";

export const refreshPass = config.SECRET_KEY + ":refresh";
export const accessPass = config.SECRET_KEY + ":access";
