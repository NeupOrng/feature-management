import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { AdapterConstant } from 'src/common';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: AdapterConstant.DRIZZLE_ORM,
            inject: [ConfigService],
            useFactory: async (ConfigService: ConfigService) => {
                const connectionString = ConfigService.get<string>('DATABASE_URL');
                if(!connectionString) {
                    throw new Error('DATABASE_URL is not defined');
                }

                const pool = new Pool({
                    connectionString,
                    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
                })
                return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
            }
        }
    ],
    exports: [AdapterConstant.DRIZZLE_ORM]
})
export class DatabaseModule {}
