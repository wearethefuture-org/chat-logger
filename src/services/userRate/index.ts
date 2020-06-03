import { IUser } from '../../interfaces';
import { HttpError } from '../../utils/httpError';
import { BaseModelService } from '../baseModel';

export class userRates extends BaseModelService {

    async userRates(): Promise<void> {
        return this.model.userRates.findAll({});
    }

    async userRate(id: number): Promise<any> {
        return this.model.userRates.findOne({
            where: {
                id
            }
        });
    }

    async createUserRates(userRates: object): Promise<{dataValues: any}> {
        return this.model.userRates.create(userRates);
    }

    async updateUser(id: number, newData: any): Promise<void> {
        return this.model.userRates.update(newData, {
            where: {
                id
            }
        });
    }

    async deleteUser(id: number): Promise<void> {
        return this.model.userRates.destroy({
            where: {
                id
            }
        });
    }
}
