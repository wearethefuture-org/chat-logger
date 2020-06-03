export class BotService {

  private static instance: BotService;
  private _idCurrency: string;

  get idCurrency(): string {
    return this._idCurrency;
  }

  set idCurrency(value: string) {
    this._idCurrency = value;
  }

  constructor() {
    if (BotService.instance) {
      return BotService.instance;
    }
    BotService.instance = this;
  }

}
