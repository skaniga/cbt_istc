import { SQLDatabase } from "encore.dev/storage/sqldb";

export default new SQLDatabase("computer_shop", {
  migrations: "./migrations",
});
