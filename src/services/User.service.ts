class UserService {

    private BASE_URL: string = "http://localhost:8080/mybudget";

    constructor() { }

    async authenticateUser(request: FormData) {
        const data = Object.fromEntries(request);
        console.log(data, JSON.stringify(data));
        const response = await fetch(`${this.BASE_URL}/user/authenticate`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });

        return response;
    }
}

export default UserService;