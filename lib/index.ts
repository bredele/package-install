import { exec } from "node:child_process";
import { promisify } from "node:util";
import detectPackageManager from "@bredele/detect-package-manager";

const execAsync = promisify(exec);

export default async (
  packages: string,
  isDev: boolean = false
): Promise<void> => {
  const pm = detectPackageManager();
  const { engine } = pm;

  let command: string;
  const devFlag = isDev ? "--save-dev" : "";

  switch (engine) {
    case "npm":
      await execAsync("npm set progress=false");
      command =
        `npm install ${packages} ${devFlag} --prefer-offline --no-audit --silent`.trim();
      break;
    case "yarn":
      command = `yarn add ${packages} ${
        isDev ? "--dev" : ""
      } --prefer-offline --no-audit --silent`.trim();
      break;
    case "pnpm":
      command =
        `pnpm add ${packages} ${devFlag} --prefer-offline --no-audit --silent`.trim();
      break;
    case "bun":
      command =
        `bun add ${packages} ${devFlag} --prefer-offline --no-audit --silent`.trim();
      break;
    default:
      await execAsync("npm set progress=false");
      command =
        `npm install ${packages} ${devFlag} --prefer-offline --no-audit --silent`.trim();
  }

  await execAsync(command);
};
