import { InitReq } from '#core/init/requirements';
import { LogFileChecker } from '#core/misc/logBakChecker';

export class InitCore {
  public constructor() {
    this.loadRequirements();
    this.loadGlobal();
    this.checkLogFiles();
    this.setupExitHandler();
  }

  private loadRequirements(): void {
    new InitReq().init();
  }

  private loadGlobal(): void {
    void import('#core/global/index');
  }

  private checkLogFiles(): void {
    new LogFileChecker();
  }

  private setupExitHandler(): void {
    void import('#core/misc/onexit');
  }
}
