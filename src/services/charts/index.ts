import { IChart } from '../../interfaces';
import { BaseModelService } from '../baseModel';

export class Charts extends BaseModelService {

  public getCurrencies(): Promise<IChart[]> {
    return this.model.charts.findAll({raw: true});
  }

}
