import { exec } from "node:child_process";
import { promisify } from "node:util";
import detectPackageManager from "@bredele/detect-package-manager";

const execAsync = promisify(exec);

export default async (
  packages: string,
  options?: { dev?: boolean; cwd?: string }
): Promise<void> => {
  const pm = detectPackageManager();
  const { engine } = pm;

  let command: string;
  const devFlag = options?.dev ? "--save-dev" : "";

  switch (engine) {
    case "npm":
      await execAsync("npm set progress=false");
      const prefixFlag = options?.cwd ? `--prefix ${options.cwd}` : "";
      command =
        `npm install ${packages} ${devFlag} ${prefixFlag} --prefer-offline --no-audit --silent`.trim();
      break;
    case "yarn":
      const yarnCwdFlag = options?.cwd ? `--cwd ${options.cwd}` : "";
      command = `yarn ${yarnCwdFlag} add ${packages} ${
        options?.dev ? "--dev" : ""
      } --prefer-offline --no-audit --silent`.trim();
      break;
    case "pnpm":
      const pnpmDirFlag = options?.cwd ? `--dir ${options.cwd}` : "";
      command =
        `pnpm ${pnpmDirFlag} add ${packages} ${devFlag} --prefer-offline --no-audit --silent`.trim();
      break;
    case "bun":
      const bunCwdFlag = options?.cwd ? `--cwd ${options.cwd}` : "";
      command =
        `bun ${bunCwdFlag} add ${packages} ${devFlag} --prefer-offline --no-audit --silent`.trim();
      break;
    default:
      await execAsync("npm set progress=false");
      const defaultPrefixFlag = options?.cwd ? `--prefix ${options.cwd}` : "";
      command =
        `npm install ${packages} ${devFlag} ${defaultPrefixFlag} --prefer-offline --no-audit --silent`.trim();
  }

  await execAsync(command);
};
