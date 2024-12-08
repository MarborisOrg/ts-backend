/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license UNLICENSED
 * @description This module re-exports specific components and configurations from various parts of the application.
 * It provides a centralized access point for commonly used elements, improving code organization and readability.
 */

// Re-exporting the HttpStatus object for standardized HTTP status codes
export { HttpStatus } from '#apps/server/routes/config/status';

// Re-exporting the core module for the main application functionality
export { default as core } from '#core/core';

// Re-exporting the 'cuse' module for database interactions
export { default as cuse } from '#databases/modules/database.use';

// Re-exporting the application configuration object
export { config } from '#app.main.arg';

export { default as env } from '#env.config.service';
