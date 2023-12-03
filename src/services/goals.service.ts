import GoalsResponseModel from "../models/GoalsResponse.model";
import GoalsModel from "../models/Goals.model";


class GoalsService {

    private HOST: string = import.meta.env.VITE_REACT_APP_USER_MANAGER || "";

    constructor(){}

    async findGoalsByUser(userId: number): Promise<GoalsResponseModel> {
        const response = await fetch(`${this.HOST}/goals/${userId}`);
        return await response.json();
    }

    async deleteGoal(goalId: number): Promise<any> {
        const response = await fetch(`${this.HOST}/goals/delete/${goalId}`, {
            method: 'DELETE'
        });
        
        return response;
    }

    async saveGoals(request: GoalsModel) {
        const response = await fetch(`${this.HOST}/goals/save`, {
            method: 'PUT',
            body: JSON.stringify(request),
            headers: {
                'Content-type': 'application/json'
            }
        });
        
        return response;
    }

}

export default GoalsService;