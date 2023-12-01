import EconomiesModel from "../models/Economies.model";
import RegisterRequest from "../models/RegisterRequest.model";

class UserService {

    private BASE_URL: string = "http://localhost:8081/mybudget";

    constructor() { }

    async authenticateUser(request: FormData) {
        const data = Object.fromEntries(request);
        const response = await fetch(`${this.BASE_URL}/user/authenticate`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });

        return response;
    }

    async createUser(request: RegisterRequest) {
        const response = await fetch(`${this.BASE_URL}/user/register`, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-type': 'application/json'
            }
        });

        return response;
    }

    async getBudgetByUser(userId: number): Promise<EconomiesModel> {
        const response = await fetch(`${this.BASE_URL}/budget/economies/${userId}`);
        return await response.json();
    }

    async updateBudgetAndEconomies(request: EconomiesModel) {
        const response = await fetch(`${this.BASE_URL}/budget/update`, {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-type': 'application/json'
            }
        });
        return response;
    }
}

export default UserService;