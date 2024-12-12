import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express'
import fs from 'fs'
import https from 'https'
import open from 'open'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

// Express Manager
export class ExpressManager {
  private app: Application
  private port: number
  private https: boolean

  public constructor() {
    this.port = configs.EnvConfig.PORT
    this.https = configs.Args.https

    this.app = express()

    this.localhostMover(this.app)

    this.app.use(express.static(cwd('public')))
    this.app.get('/', (_req: Request, res: Response) => {
      res.sendFile(cwd('public', 'index.html'))
    })

    // Default middleware
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    this.app.disable('x-powered-by')

    this.app.use(this.logMiddleware)
    this.app.use(this.responseSentMiddleware)

    // this.app.use(helmetConfig()); // helmet helper
    // this.app.use(cors(corsOptions));

    this.app.use(this.timeoutMiddleware)

    // Add default health-check route
    this.addRoute(
      '/health',
      Router().get('/', (_req: Request, res: Response) => {
        res.json({ status: 'OK' })
      })
    )
  }

  public addRoute(path: string, router: Router): void {
    this.app.use(path, router)
  }

  public async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      const inlineApp = (https: boolean): void => {
        console.log('Info: Server is running on port: ' + this.port)
        resolve()

        if (configs.Args.dev) {
          this.initSwagger(this.app, this.port)
          if (configs.Args.debug) {
            void open(
              `${https ? 'https' : 'http'}://127.0.0.1:${this.port}/docs`
            )
          }
        }
      }
      if (configs.Args.https) {
        const options = {
          key: fs.readFileSync(cwd('keys', 'private.key')),
          cert: fs.readFileSync(cwd('keys', 'certificate.crt')),
        }
        https
          .createServer(options, this.app)
          .listen(this.port, () => {
            inlineApp(true)
          })
          .on('error', reject)
      } else {
        this.app
          .listen(this.port, () => {
            inlineApp(false)
          })
          .on('error', reject)
      }
    })
  }

  private localhostMover(app: Application): void {
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.hostname === 'localhost') {
        const newUrl = `${this.https ? 'https' : 'http'}://127.0.0.1:${this.port}${req.originalUrl}`
        return res.redirect(301, newUrl) // 301: Moved Permanently
      }
      next()
    })
  }

  private initSwagger(app: Application, port: number): void {
    const options = {
      swaggerDefinition: {
        swagger: '2.0', // api version (changed to 2.0)
        info: {
          title: 'Core utils',
          description: 'API endpoints documented in swagger',
          contact: {
            name: 'MRB',
            email: 'mehrabshafae@gmail.com',
            url: 'https://github.com/MarborisOrg',
          },
          version: '0.0.0', // app version (can change this)
        },
        host: `127.0.0.1:${port}`, // host
        basePath: '/', // base path
        schemes: ['http', 'https'], // supported schemes
      },
      apis: [cwd('**/*.ts'), cwd('**/*.js')],
    }

    const swaggerSpec = swaggerJsdoc(options)
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (_req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })
  }

  private logMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const startTime = Date.now()

    log.info({
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      timestamp: new Date().toISOString(),
    })

    res.on('finish', () => {
      const duration = Date.now() - startTime
      log.info({
        message: 'Response sent',
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      })
    })

    next()
  }

  private responseSentMiddleware = (
    _req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const originalSend = res.send.bind(res)
    const originalJson = res.json.bind(res)

    res.send = (...args: readonly any[]): Response => {
      if (!res.headersSent) {
        return originalSend(...args)
      } else {
        log.warn('Attempted to send response after headers were sent.')
        return res
      }
    }

    res.json = (...args: readonly any[]): Response => {
      if (!res.headersSent) {
        return originalJson(...args)
      } else {
        log.warn('Attempted to send JSON response after headers were sent.')
        return res
      }
    }

    next()
  }

  private timeoutMiddleware = (
    _req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const timeout = 3000 // just 3s

    const timer = setTimeout(() => {
      res.status(503).send('Request timed out!')
    }, timeout)

    res.on('finish', () => {
      clearTimeout(timer)
    })

    next()
  }
}
