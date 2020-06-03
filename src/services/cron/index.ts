import * as moment from 'moment';
import * as cron from 'node-cron';
import {History} from '../history';
import {BaseModelService} from "../baseModel";
import {dataForCreateCharts} from "../../constants";
import {IChart} from "../../interfaces";

export class UpdateData extends BaseModelService {

  async getData(): Promise<void> {
    const history = new History();

    let charts: IChart[] = await this.model.charts.findAll({
      raw: true
    });
    console.log(dataForCreateCharts);
    if (!charts || !charts.length) {
      try {
        console.log('charts create')
        await this.model.charts.bulkCreate(dataForCreateCharts)
      } catch (e) {
        console.log(e)
      }
    }
    charts = await this.model.charts.findAll({
      raw: true
    });
    // await history.updateHistory(1,'10','840');
    charts.forEach(({id, idBank, numCurrency}) => {
      history.updateHistory(id, idBank, numCurrency);
    })
  }
}


// const task = cron.schedule('0 * * * * *', async () => {
//     console.log('working');
//     console.log(new Date());
//
//     // if (process.env.ISERROR !== 'true') {
//     //     const history = new History();
//     //
//     //     const from = new Date(moment(new Date())
//     //         .subtract(16, 'm')
//     //         .format()).getTime() / 1000;
//     //     const to = new Date(moment(new Date())
//     //         .subtract(1, 'm')
//     //         .format()).getTime() / 1000;
//     //
//     //     await history.updateHistory(from, to);
//     // }
// }, {scheduled: true});
// task.start();
