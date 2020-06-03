// tslint:disable-next-line:no-implicit-dependencies
import * as PromiseBlue from 'bluebird';
import * as moment from 'moment';
import * as rp from 'request-promise';
import { dataForCreateCharts } from '../../constants';
import { IChart } from '../../interfaces';
import { BaseModelService } from '../baseModel';

export class History extends BaseModelService {

  async getData(idBank: string, numCurrency: string): Promise<any> {

    return rp.get({
      uri: `https://${process.env.DATA_APP_URL}?id=${idBank}&currency=${numCurrency}`,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      json: true
    });
    // return  [
    //     [[1589226452000, 26.720951], [1589312848000, 26.74614], [1589399235000, 26.640345]],
    //     [ [1589226452000, 27.031919], [1589312848000, 27.013521],[1589399235000, 26.927889]],
    //     [[1589226452000, 26.65],[1589312847000, 26.6],[1589399234000, 26.549999]],
    //     [[1589226452000, 27.110001],[1589312847000, 27],[1589399234000, 26.9]]
    // ]
    // return [
    //     [[1589226452000, 26.720951], [1589312848000, 26.74614], [1589399235000, 26.640345],[1589485634000, 26.628246],[1589536026000, 26.589832]],
    //     [ [1589226452000, 27.031919], [1589312848000, 27.013521],[1589399235000, 26.927889],[1589485634000, 26.902136],[1589536026000, 26.856134]],
    //     [[1589226452000, 26.65],[1589312847000, 26.6],[1589399234000, 26.549999],[1589485633000, 26.549999],[1589536026000, 26.5]],
    //     [[1589226452000, 27.110001],[1589312847000, 27],[1589399234000, 26.9],[1589485633000, 26.9],[1589536026000, 26.85]]
    // ]
  }

  async getCurrentData(chartId: number | string): Promise<any> {
    // отримую два  найсвіжіших елемента з бази (по даті)
    return this.model.dataOfCharts.findAll({
      where: {
        chartId
      },
      raw: true,
      limit: 2,
      offset: 0,
      order: [['timestamp', 'DESC']]
    });
  }

  public getCurrencyByDate(chartId: number | string, date: string): Promise<any> {
    return this.model.dataOfCharts.findAll({
      where: {
        chartId,
        timestamp: {[this.model.Op.gte]: new Date(date)}
      },
      raw: true,
      limit: 2,
      offset: 0,
      order: [['timestamp', 'DESC']]
    });
  }

  async dataSort(result: any): Promise<any> {
    const resultObject: any = {}
    const sortResult: any = {}
    // фільтрую елементи створюючи обєкт в якому ключами роблю дату створення
    result.forEach((element: any, index: number) => {
      let valueName;
      switch (index) {
        case 0:
          valueName = 'o';
          break;
        case 1:
          valueName = 'c';
          break;
        case 2:
          valueName = 'l';
          break;
        case 3:
          valueName = 'h';
          break
        default:
          valueName = 'er'
      }
      for (let i = 0; i <= element.length - 1; i++) {
        let timeStamp = moment(new Date(element[i][0])).format('YYYY-MM-DD')
        if (!Object.keys(resultObject).includes(timeStamp)) {
          resultObject[`${timeStamp}`] = {}
        }
        resultObject[`${timeStamp}`][valueName] = +element[i][1].toFixed(2)
      }
    })
    // сортую елементи в порядку зростання по даті і переписую в новий обєкт.
    Object.keys(resultObject).sort().forEach(el => sortResult[el] = resultObject[el])
    return sortResult
  }

  async dateConversion(Obj: any): Promise<any> {
    const resultArr: any = []
    // роблю з обєкта масив перебираючи його властивості.
    for (let key in Obj) {
      resultArr.push({
        l: Obj[key].l,
        h: Obj[key].h,
        o: Obj[key].o,
        c: Obj[key].c,
        timestamp: key
      })

    }
    return resultArr;

  }

  async setUpPartOfData(result: any, chartId: number): Promise<void> {
    // жертвую першим елементом при повній загрузці даних.
    // при оновленні даних поступає останній елемент який є в базі для порівння в базу не пушиться
    const resultArr: any = []
    for (let i = 1; i <= result.length - 1; i++) {
      const currentTime = moment(new Date())
        .format();
      resultArr.push({
        chartId,
        currentPosition: result[i].o && result[i].c ? ((+result[i].o + +result[i].c) / 2) : 0,
        isGrowing: result[i - 1] ?
          (((+result[i - 1].o + +result[i - 1].c) / 2) < ((+result[i].o + +result[i].c) / 2)) : null,
        prevPosition: result[i - 1] && +result[i - 1].o && +result[i - 1].c ? ((+result[i - 1].o + +result[i - 1].c) / 2) : 0,
        open: result[i].o ? result[i].o : 0,
        closed: result[i].c ? result[i].c : 0,
        higher: result[i].h ? result[i].h : 0,
        lower: result[i].l ? result[i].l : 0,
        timestamp: result[i].timestamp,
        createdAt: currentTime
      })
    }
    await this.model.dataOfCharts.bulkCreate(resultArr);
  }

  async updateHistory(chartId: number, idBank: string, numCurrency: string): Promise<any> {
    try {


      const result = await this.getData(idBank, numCurrency);

      const currentData = await this.getCurrentData(chartId);

      const sortResultObj = await this.dataSort(result);

      const resultArr = await this.dateConversion(sortResultObj)

      // перевірка на наявність елементів в базі якщо немає значить пушу всі
      if (!currentData.length && result && result.length) {
        await this.setUpPartOfData(resultArr, chartId);
        return;
      }
      // роблю перевірку з останніми дваома елементами з бази даних і даних які прийшли коли співпадуть нові елементи + 1 який вже є в базі відправляю на пуш
      for (let i = (resultArr.length - 1); i >= 1; i--) {
        if (+currentData[0].lower === (resultArr[i].l ? +resultArr[i].l : 0) && moment(new Date(`${currentData[0].timestamp}`)).format('YYYY-MM-DD') === resultArr[i].timestamp &&
          +currentData[1].lower === (resultArr[i - 1].l ? +resultArr[i - 1].l : 0) && moment(new Date(`${currentData[1].timestamp}`)).format('YYYY-MM-DD') === resultArr[i - 1].timestamp
        ) {
          console.log('success')
          await this.setUpPartOfData(resultArr.slice(i), chartId)
          break;
        }
      }
    } catch (error) {
      console.log(error)
      process.env.ISERROR = 'true';
    }
  }

// o - [2  покупки]
//    с [ 3  продажу]
//    h [1  cередня ціна продажу]
//    l [0  середня ціна  покупка ]
}
