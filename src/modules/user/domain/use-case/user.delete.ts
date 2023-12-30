import { BaseDeleteUseCase } from "src/base/use-cases/process/base-delete.use-case";
import { Connection } from "typeorm";
import { User } from "../../data/entities/user.entity";
import { UserRepository } from "../../data/user.repository";
import { IUser } from "../interface/user.interface";

export class UserDelete extends BaseDeleteUseCase<IUser> {
  constructor(
    private userConn: Connection,
    private userRepository: UserRepository,
    private dataId: string,
  ) {
    super(userConn, userRepository, User, dataId);
  }

  validateProcess(): Promise<void> {
    return;
  }

  beforeProcess(): Promise<void> {
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}