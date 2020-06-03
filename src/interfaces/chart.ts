export interface IChart {
  id: number;
  name: string;
  key: string;
  numCurrency: string;
  idBank: string;
  forecast: boolean;
  humanForecast: string;
  createdAt: Date;
  updatedAt: Date;
}
