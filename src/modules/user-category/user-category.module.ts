import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/data/entities/user.entity';
import { UserRepository } from '../user/data/user.repository';
import { UserCategoryController } from './controller/user-category.controller';
import { UserCategory } from './data/entities/user-category.entity';
import { UserCategoryRepository } from './data/user-category.repository';
import { UserCategoryService } from './domain/user-category.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserCategory, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [UserCategoryController],
  providers: [UserCategoryService, UserCategoryRepository, UserRepository]
})
export class UserCategoryModule {}
