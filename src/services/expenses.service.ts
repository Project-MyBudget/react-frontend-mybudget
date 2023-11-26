import ExpenseUserRequest from "../models/ExpenseUserRequest.model";
import ExpensesResponse from "../models/ExpensesResponse.model";

class ExpensesService {

    private HOST: string = "http://localhost:8081";

    constructor() {}

    async findAllExpensesType(): Promise<ExpensesResponse> {
        const response = await fetch(`${this.HOST}/mybudget/find-expenses`);
        return await response.json();
    }

    async createExpenses(request: ExpenseUserRequest) {
        const response = await fetch(`${this.HOST}/mybudget/expenses/register`, {
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