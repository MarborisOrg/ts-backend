/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license UNLICENSED
 * @description This module re-exports specific components and configurations from various parts of the application.
 * It provides a centralized access point for commonly used elements, improving code organization and readability.
 */

// Re-exporting the HttpStatus object for standardized HTTP status codes
export { HttpStatus } from '#app/server/routes/config/status';

// Re-exporting the core module for the main application functionality
export { default as core } from '#core/index';

// Re-exporting the 'cuse' module for database interactions
export { default as cuse } from '#databases/modules/c-use';

// Re-exporting the application configuration object
export { config } from '#utils/mode';

export { default as env } from '#config/env.service';
