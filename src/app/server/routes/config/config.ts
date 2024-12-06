import { env_config } from '#config/env.service';

export const refreshPass = env_config.SECRET_KEY + ':refresh';
export const accessPass = env_config.SECRET_KEY + ':access';
