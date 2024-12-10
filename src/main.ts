
export default class {
  public constructor() {
    void this.initialize();
  }

  public async initialize(): Promise<void> {
    echo('info: Application is initializing...');

    /**
     * Initializes the global library.
     * If successful, starts the application; otherwise, logs the error.
     */
    try {
      await new InitLib().init();
      void this.start();
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Runs the core application logic after environment loading.
   * Logs the running status and initializes the core functionality.
   *
   * @private
   * @returns {void}
   */
  #run(): void {
    echo('info: Running the application...');
    $.env
      .init()
      .then(function () {
        void $.core();
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  /**
   * Starts the application by initializing the core components.
   * Calls the private run method to execute the main application logic.
   *
   * @returns {void}
   */
  public async start(): Promise<void> {
    /**
     * Initializes the core functionality for the current file.
     */
    new InitCore();
    await new Init().init();
    where();
    this.#run();
  }
}
