import EconomiesModel from "../models/Economies.model";
import RegisterRequest from "../models/RegisterRequest.model";

class UserService {

    private HOST: string = import.meta.env.VITE_REACT_APP_USER_MANAGER || "";

    constructor() { }

    async authenticateUser(request: FormData) {
        const data = Object.fromEntries(request);
        const response = await fetch(`${this.HOST}/user/authenticate`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });

        return response;
    }

    async createUser(request: RegisterRequest) {
        const response = await fetch(`${this.HOST}/user/register`, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-type': 'application/json'
            }
        });

        return response;
    }

    async getBudgetByUser(userId: number): Promise<EconomiesModel> {
        const response = await fetch(`${this.HOST}/budget/economies/${userId}`);
        return await response.json();
    }

    async updateBudgetAndEconomies(request: EconomiesModel) {
        const response = await fetch(`${this.HOST}/budget/update`, {
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