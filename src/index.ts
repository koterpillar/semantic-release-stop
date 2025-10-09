import { PrepareContext } from "semantic-release";

export function prepare(_pluginConfig: unknown = {}, context: PrepareContext): void {
  const { logger } = context;

  logger.info("Stopping the release process.");
  process.exit(0);
}
