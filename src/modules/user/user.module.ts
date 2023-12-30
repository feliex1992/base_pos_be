import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCategory } from '../user-category/data/entities/user-category.entity';
import { UserCategoryRepository } from '../user-category/data/user-category.repository';
import { UserController } from './controller/user.controller';
import { User } from './data/entities/user.entity';
import { UserRepository } from './data/user.repository';
import { UserService } from './domain/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, UserCategory]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserCategoryRepository]
})
export class UserModule {}
