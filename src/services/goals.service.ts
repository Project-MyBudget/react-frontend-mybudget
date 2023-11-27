import GoalsResponseModel from "../models/GoalsResponse.model";

class GoalsService {

    private HOST: string = 'http://localhost:8081';

    constructor(){}

    async findGoalsByUser(userId: number): Promise<GoalsResponseModel> {
        const response = await fetch(`${this.HOST}/mybudget/goals/${userId}`);
        return await response.json();
    }

    async deleteGoal(goalId: number): Promise<any> {
        const response = await fetch(`${this.HOST}/mybudget/goals/delete/${goalId}`, {
            method: 'DELETE'
        });
        
        return response;
    }

}

export default GoalsService;