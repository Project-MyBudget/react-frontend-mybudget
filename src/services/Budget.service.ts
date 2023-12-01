import UserTotalValuesResponse from "../models/UserTotalValuesResponse";

class BudgetService {
    
    // private BASE_URL: string = "http://localhost:8080";
    private HOST: string = import.meta.env.VITE_REACT_APP_USER_DASHBOARD_BASE_URL || "";
    
    constructor() {}

    async getBudgetAndEconomies(idUser : number) : Promise<UserTotalValuesResponse> {
        const response = await fetch(`${this.HOST}/total/${idUser}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        return await response.json();
    }
}

export default BudgetService;