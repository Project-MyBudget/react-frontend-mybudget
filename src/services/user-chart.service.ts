import ChartResponseModel from "../models/ChartsResponse.model";
import HistoricResponseModel from "../models/HistoricResponse.model";

class UserChartService {

    private HOST: string = "http://localhost:8080/mybudget-dashboard";

    constructor() {}

    async getUserHistoric(userId: number): Promise<Array<HistoricResponseModel>> {
        const response = await fetch(`${this.HOST}/historic/${userId}`);
        return await response.json();
    }

    async getUserCharts(userId: number): Promise<ChartResponseModel> {
        const response = await fetch(`${this.HOST}/charts/${userId}`);
        return await response.json();
    }

}

export default UserChartService;