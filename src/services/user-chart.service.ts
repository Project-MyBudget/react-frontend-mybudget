import ChartResponseModel from "../models/ChartsResponse.model";
import HistoricResponseModel from "../models/HistoricResponse.model";

class UserChartService {

    private HOST: string = import.meta.env.VITE_REACT_APP_USER_DASHBOARD_BASE_URL || "";

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