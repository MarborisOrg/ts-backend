// check and use

import { config } from "#config/env_get";
import { DatabasesUseType } from "#ts/types";
import df_config from "#config/defaults";

export default function (): DatabasesUseType {
  if (config.database_use == "mongo" || config.database_use == "mysql") {
    return config.database_use;
  } else return df_config.env.database_use;
}
