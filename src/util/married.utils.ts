class MarriedUtils {

    constructor() { }

    static getMarriedStatus(civilStatus: string): string {
        switch (civilStatus) {
            case "M":
                return "MARRIED";
            case "S":
                return "SINGLE";
            case "D":
                return "DIVORCED";
            case "W":
                return "WIDOWER";
            default:
                return "SINGLE";
        }
    }
}

export default MarriedUtils;