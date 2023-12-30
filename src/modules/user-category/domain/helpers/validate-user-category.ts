import { UserCategoryRepository } from "../../data/user-category.repository";
import { IUserCategory } from "../interface/user-category.interface";

export async function validateDataUserCategory(
  userCategoryRepository: UserCategoryRepository,
  userCategoryId: string,
  userCategory: IUserCategory,
) {
  const cekData = await userCategoryRepository.getOne({
    where: { code: userCategory.code },
  });
  if (cekData) {
    if (userCategoryId) {
      if (userCategoryId !== cekData.id)
        throw new Error(
          `Kode user kategori: ${userCategory.code} sudah digunakan!`,
        );
    } else {
      throw new Error(
        `Kode user kategori: ${userCategory.code} sudah digunakan!`,
      );
    }
  }
}
