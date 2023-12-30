import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.RETAIL_DB_HOST,
  port: parseInt(process.env.RETAIL_DB_PORT),
  username: process.env.RETAIL_DB_USER,
  password: process.env.RETAIL_DB_PASS,
  database: process.env.RETAIL_DB_NAME,
  entities: [
    'src/modules/**/*.entity.ts',
  ],
  migrationsTableName: 'migrations',
  migrations: ['migrations/files/*.ts'],
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
})

export default dataSource
