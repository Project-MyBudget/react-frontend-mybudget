import ChartModel from "./Chart.model";

interface ChartResponseModel {
    chartRecommendedDebts: ChartModel,
    chartUserDebts: ChartModel
}

export default ChartResponseModel;