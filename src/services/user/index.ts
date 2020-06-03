import { IUser } from '../../interfaces';
import { HttpError } from '../../utils/httpError';
import { BaseModelService } from '../baseModel';

export class UserService extends BaseModelService {

  static checkExistUser(isUser: boolean): never | void {
    if (isUser) {
      throw new HttpError(409, 'User has already registered', 'CAN_NOT_REGISTER');
    }
  }

  async checkExistUserAndCreate(params: any): Promise<any> {
    const {telegramId} = params;

    const existsUser = await this.model.users.findOne({
      where: {
        telegramId
      },
      raw: true
    });

    if (!existsUser) {
      params.email = `test${new Date().getTime()}`;
      params.birthdayDate = '2020-01-16';
      params.password = 'test';
      console.log('params', params);
      await this.model.users.create(params);
    }

    return existsUser;
  }

  async getUsers(): Promise<void> {
    return this.model.users.findAll({});
  }

  async getUser(id: number): Promise<any> {
    return this.model.users.findOne({
      where: {
        id
      }
    });
  }

  async getUserByEmail(email: string): Promise<IUser> {
    return this.model.users.findOne({
      where: {
        email
      }
    });
  }

  async createUser(user: object): Promise<{dataValues: IUser}> {
    return this.model.users.create(user);
  }

  async updateUser(id: number, newData: any): Promise<void> {
    return this.model.users.update(newData, {
      where: {
        id
      }
    });
  }

  async deleteUser(id: number): Promise<void> {
    return this.model.users.destroy({
      where: {
        id
      }
    });
  }
}
