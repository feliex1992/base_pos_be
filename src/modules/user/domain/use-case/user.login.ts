import { BaseGetOneUseCase } from "src/base/use-cases/process/base-get-one.use-case";
import { LoginDto } from "../../controller/dto/login.dto";
import { UserRepository } from "../../data/user.repository";
import { IUser } from "../interface/user.interface";
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { IUserLogin } from "../interface/user-login.interface";

export class UserLogin extends BaseGetOneUseCase<IUser>{
  token: string = "-";

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private loginDto: LoginDto,
  ) {
    super(userRepository);
  }

  beforeProcess(): Promise<void> {
    return;
  }

  async setFindProperties(): Promise<any> {
    return { user_id: this.loginDto.user_id };
  }

  async process(): Promise<void> {
    let findProperties = {};
    findProperties = await this.setFindProperties();

    const userData = await this.userRepository.getOne({
      where: findProperties,
    });
    if (!userData) throw this.handleErrorLogin();
    this.result = userData;
  }

  async afterProcess(): Promise<void> {
    if (await bcrypt.compare(this.loginDto.password, this.result.password)) {
      const payload: any = {
        id: this.result.id,
        user_id: this.result.user_id,
        user_name: this.result.user_name
      };

      this.result[0] = payload;

      this.token = this.jwtService.sign(payload);

      return;
    }
    this.handleErrorLogin();
  }

  handleErrorLogin(): void {
    throw new Error('User id atau password salah!');
  }

  getResultLogin(): IUserLogin {
    return {
      token: this.token,
      user: this.result,
    }
  }
}
