import UserTotalValuesResponse from "../models/UserTotalValuesResponse";

class BudgetService {
    
    private BASE_URL: string = "http://localhost:8080";
    
    constructor() {}

    async getBudgetAndEconomies(idUser : Number) : Promise<UserTotalValuesResponse> {
        const response = await fetch(`${this.BASE_URL}/mybudget-dashboard/total/${idUser}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        return await response.json();
    }
}

export default BudgetService;