import type { Application } from 'express'
import express, { NextFunction, Request, Response, Router } from 'express'
import fs from 'fs'
import https from 'https'
import open from 'open'
import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { CatchErrors, Singleton } from './decorators.js'

// Express Manager
@Singleton
export class ExpressManager {
  private app: Application
  private port: number
  private https: boolean

  public constructor() {
    this.port = configs.EnvConfig.PORT || configs.Args.port || 3000
    this.https = configs.Args.https

    console.log('debug: port: ' + configs.Args.port)

    this.app = express()

    this.localhostMover()

    const publicDir = cwd('public')

    this.app.use(express.static(publicDir))
    this.app.get('/', (_req: Request, res: Response) => {
      const indexPath = path.join(publicDir, 'index.html')

      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath)
      } else {
        res.status(404).send('404 Not Found')
      }
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
          this.initSwagger()
          if (configs.Args.debug) {
            void open(
              `${https ? 'https' : 'http'}://127.0.0.1:${this.port}/docs`
            )
          }
        }
      }
      if (this.https) {
        https
          .createServer(this.findKeyFiles(), this.app)
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

  private findKeyFiles(): { key: string; cert: string } {
    const keyFileName = 'private.key'
    const certFileName = 'certificate.crt'
    let currentDir = cwd()

    let keyFilePath = ''
    let certFilePath = ''

    while (currentDir) {
      const possibleKeyPath = path.join(currentDir, 'keys', keyFileName)
      const possibleCertPath = path.join(currentDir, 'keys', certFileName)

      console.log('debug key: ' + possibleKeyPath)
      console.log('debug cert: ' + possibleCertPath)

      try {
        if (fs.existsSync(possibleKeyPath)) {
          keyFilePath = possibleKeyPath
        }
        if (fs.existsSync(possibleCertPath)) {
          certFilePath = possibleCertPath
        }

        if (keyFilePath && certFilePath) {
          break
        }
      } catch (err: any) {
        throw new Error('Error while checking files: ' + err.message)
      }

      const parentDir = path.dirname(currentDir)
      if (parentDir === currentDir) break
      currentDir = parentDir
    }

    if (!keyFilePath) {
      throw new Error('Private key file (private.key) is missing.')
    }

    if (!certFilePath) {
      throw new Error('Certificate file (certificate.crt) is missing.')
    }

    return { key: keyFilePath, cert: certFilePath }
  }

  private localhostMover(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.hostname === 'localhost') {
        const newUrl = `${this.https ? 'https' : 'http'}://127.0.0.1:${this.port}${req.originalUrl}`
        return res.redirect(301, newUrl) // 301: Moved Permanently
      }
      next()
    })
  }

  @CatchErrors
  private initSwagger(): void {
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
        host: `127.0.0.1:${this.port}`, // host
        basePath: '/', // base path
        schemes: ['http', 'https'], // supported schemes
      },
      apis: [cwd('**/*.ts')],
    }

    const swaggerSpec = swaggerJsdoc(options)
    // Swagger Page
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    this.app.get('/docs.json', (_req, res) => {
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
