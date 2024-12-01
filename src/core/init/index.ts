export class InitCore {
  public async init(): Promise<void> {
    await this.loadRequirements();
    await this.loadGlobal();
    await this.checkLogFiles();
    this.setupExitHandler();
  }

  private async loadRequirements(): Promise<void> {
    await import('#core/init/requirements');
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
