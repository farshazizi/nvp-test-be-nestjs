// src/database/seeds/user.seed.ts
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

export class UserSeeder {
  public async run(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(User);

    const users = [
      { email: 'user1@example.com' },
      { email: 'user2@example.com' },
      { email: 'user3@example.com' },
      { email: 'user4@example.com' },
      { email: 'user5@example.com' },
    ];

    for (const u of users) {
      const user = new User();
      user.email = u.email;
      user.password = await bcrypt.hash('@Abc12345', 10);
      await userRepository.save(user);
    }

    console.log('5 users created successfully with UUID!');
  }
}
