import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import fs from "fs";
import { diskStorage } from "multer";
import path, { join } from "path";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {

    getRootPath = () => {
        return process.cwd()
    }

    ensureExists(targetDirectory: string) {
        fs.mkdir(targetDirectory, { recursive: true },
            (error) => {
                if (!error) {
                    console.log('Director successfully created or exists')
                    return;
                }
                switch (error.code) {
                    case 'ENOENT':
                        console.error(`Directory ${targetDirectory} does not exist, creating it...`);
                        this.ensureExists(path.dirname(targetDirectory));
                        this.ensureExists(targetDirectory);
                        break;
                    default:
                        console.error(`Error occurred while creating directory ${targetDirectory}:`, error);
                        break;
                }
            }
        )
    }
   async createMulterOptions(): Promise<MulterModuleOptions> {
       return {
           storage: diskStorage({
               destination: async (req, file, callback) => {
                   const folder = req?.headers?.folder_type ?? 'default';
                   await this.ensureExists(`public/images/${folder}`)
                   callback(null, join(this.getRootPath(), `public/images/${folder}`));
               },
               filename(req, file, callback) {
                   let extName = path.extname(file.originalname)

                   let baseName = path.basename(file.originalname, extName)

                   let finalName = `${baseName}-${Date.now()}${extName}`

                   callback(null, finalName)
               },
           }),
       };
   }
}