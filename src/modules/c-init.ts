// check and init database

import cuse from "./c-use.js";
import assert from "assert";
import MONGO from "#databases/mongo/service";
import ConnectToMysql from "#databases/mysql/use/index";

const dbUse = cuse();

export default async function () {
  if (dbUse === "mongo") {
    await MONGO();
  } else if (dbUse === "mysql") {
    await ConnectToMysql();
  } else {
    assert(false, "MCI15: ??");
  }
}
