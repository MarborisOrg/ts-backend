import { Express, Router } from 'express';
import fs from 'fs';
import path from 'path';

// export const loadRoutes = async (app: Express): Promise<void> => {
//     const routesDir = path.join(process.cwd(), '..', 'apps');

//     fs.readdir(routesDir, async (err, folders) => {
//         if (err) {
//             console.error('Error reading routes directory:', err);
//             return;
//         }

//         for (const folder of folders) {
//             const folderPath = path.join(routesDir, folder);
//             if (fs.statSync(folderPath).isDirectory()) {
//                 const usersRoutePath = path.join(folderPath, 'index.js');
//                 // const productsRoutePath = path.join(folderPath, 'products.js');

//                 if (fs.existsSync(usersRoutePath)) {
//                     const { default: router }: { default: Router } = await import(usersRoutePath);
//                     app.use(`/api/${folder}`, router);
//                 }
//                 // if (fs.existsSync(productsRoutePath)) {
//                 //     const { default: router }: { default: Router } = await import(productsRoutePath);
//                 //     app.use(`/api/${folder}/products`, router);
//                 // }
//             }
//         }
//     });
// };

export const loadRoutes = async (app: Express): Promise<void> => {
    const routesDir = path.join(process.cwd(), '..', 'apps');

    const latestFolderPath = path.join(routesDir, 'latest');
    if (fs.existsSync(latestFolderPath) && fs.statSync(latestFolderPath).isDirectory()) {
        const usersRoutePath = path.join(latestFolderPath, 'index.js');

        if (fs.existsSync(usersRoutePath)) {
            const { default: router }: { default: Router } = await import(usersRoutePath);
            app.use('/api/users', router);
        }
    }

    fs.readdir(routesDir, async (err, folders) => {
        if (err) {
            console.error('Error reading routes directory:', err);
            return;
        }

        for (const folder of folders) {
            if (folder === 'latest') continue;

            const folderPath = path.join(routesDir, folder);
            if (fs.statSync(folderPath).isDirectory()) {
                const usersRoutePath = path.join(folderPath, 'index.js');

                if (fs.existsSync(usersRoutePath)) {
                    const { default: router }: { default: Router } = await import(usersRoutePath);
                    app.use(`/api/${folder}/users`, router);
                }
            }
        }
    });
};
