import Employment from "./Employment.model";
interface RegisterRequest{
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    phoneNumber: string,
    email: string,
    password: string,
    hasChild: number,
    childrenNumber: number,
    status: string,
    gender: string,
    civilStatus: string,
    isUpdatePassword: boolean,
    employment: Employment
}

export default RegisterRequest;