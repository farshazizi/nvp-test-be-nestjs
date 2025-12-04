import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { UserSeeder } from './user.seed';

async function run() {
  const dataSource: DataSource = AppDataSource;
  await dataSource.initialize();

  const seeder = new UserSeeder();
  await seeder.run(dataSource);

  await dataSource.destroy();
}

run().catch((err) => console.error(err));
