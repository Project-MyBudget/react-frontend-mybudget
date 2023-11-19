import ExpenseType from "./ExpenseType.model";

interface ExpenseUserRequest {
    idUser: number,
    expenses: Array<ExpenseType>
}

export default ExpenseUserRequest;