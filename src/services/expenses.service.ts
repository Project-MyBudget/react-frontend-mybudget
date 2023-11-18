import ExpensesResponse from "../models/ExpensesResponse.model";

class ExpensesService {

    private HOST: string = "http://localhost:8080";

    constructor() {}

    async findAllExpensesType(): Promise<ExpensesResponse> {
        const response = await fetch(`${this.HOST}/mybudget/find-expenses`);
        return await response.json();
    }
}

export default ExpensesService;