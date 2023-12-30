import { UserCategoryRepository } from "src/modules/user-category/data/user-category.repository";
import { UserRepository } from "../../data/user.repository";
import { IUser } from "../interface/user.interface";

export async function validateDataUser(
  userRepository: UserRepository,
  userCategoryRepository: UserCategoryRepository,
  userId: string,
  user: IUser,
): Promise<void> {
  const checkUsers = await userRepository.getOne({
    where: { user_id: user.user_id },
  });

  if (checkUsers) {
    if (userId) {
      if (userId !== checkUsers.id) throw new Error('User id sudah digunakan!');
    } else {
      throw new Error('User id sudah digunakan!');
    }
  }

  const checkUserCategory = await userCategoryRepository.getOne({
    where: { id: user.user_category.id },
  });
  if (!checkUserCategory) throw new Error('User category tidak ditemukan!');
}
