import { InitReq } from '#core/init/requirements';

export class InitCore {
  public async init(): Promise<void> {
    this.loadRequirements();
    await this.loadGlobal();
    await this.checkLogFiles();
    this.setupExitHandler();
  }

  private loadRequirements(): void {
    new InitReq().init();
  }

  private async loadGlobal(): Promise<void> {
    await import('#core/global/index');
  }

  private async checkLogFiles(): Promise<void> {
    const { checkAndRenameLogFiles } = await import('#core/misc/logBakChecker');
    await checkAndRenameLogFiles();
  }

  private setupExitHandler(): void {
    void import('#core/misc/onexit');
  }
}
