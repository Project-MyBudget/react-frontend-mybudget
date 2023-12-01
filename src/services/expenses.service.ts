import ExpenseUserRequest from "../models/ExpenseUserRequest.model";
import ExpensesResponse from "../models/ExpensesResponse.model";

class ExpensesService {

    private HOST: string = import.meta.env.VITE_REACT_APP_USER_MANAGER || "";

    constructor() {}

    async findAllExpensesType(): Promise<ExpensesResponse> {
        const response = await fetch(`${this.HOST}/find-expenses`);
        return await response.json();
    }

    async createExpenses(request: ExpenseUserRequest) {
        const response = await fetch(`${this.HOST}/expenses/register`, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-type': 'application/json'
            }
        });

        return response;
    }
}

export default ExpensesService;