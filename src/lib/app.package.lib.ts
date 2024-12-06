/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license UNLICENSED
 * @description This module re-exports commonly used Node.js and third-party libraries.
 * It simplifies imports throughout the application by providing a single access point for these libraries.
 */

// Re-exporting 'express' and its types for handling HTTP requests and responses
export { NextFunction, Request, Response, default as express } from 'express';

// Re-exporting the 'fs' module for file system operations
export { default as fs } from 'fs';

// Re-exporting the 'https' module for secure HTTP requests
export { default as https } from 'https';

// Re-exporting 'Joi' for data validation
export { default as Joi } from 'joi';

// Re-exporting 'jsonwebtoken' for handling JSON Web Tokens
export { default as jwt } from 'jsonwebtoken';

// Re-exporting 'mongoose' for MongoDB object modeling
export { default as mongoose } from 'mongoose';

// Re-exporting 'mysql2' for MySQL database interactions
export { default as mysql } from 'mysql2';

// Re-exporting the 'os' module for operating system-related utility methods
export { default as os } from 'os';

// Re-exporting the 'path' module for handling and transforming file paths
export { default as path } from 'path';

// Re-exporting the 'url' module for URL resolution and parsing
export { default as url } from 'url';

// Re-exporting 'yargs' for command-line argument parsing
export { default as yargs } from 'yargs/yargs';
