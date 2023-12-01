class ToastifyConfig {
    
    public static getPopUp(text: string, type: string) {
        const toastifyConfig: Record<string, any> = this.getToastifyTypes(type);
        toastifyConfig.text = text;
        return toastifyConfig;
    }

    private static getToastifyTypes(type: string): Record<string, any> {
        let config: Record<string, any> = {};
        switch (type) {
            case "error":
                config = {
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "linear-gradient(to right, #ff8077, #ff1100)"
                };
                break;
            case "warning":
                config = {
                    duration: 1000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "linear-gradient(to right, #ffc71f, #FF0065)",
                };
                break;
            case "denied":
                config = {
                    duration: 1000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "linear-gradient(to right, #f6d365, #fda085)"
                };
                break;
            case "success":
                config = {
                    duration: 1000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "linear-gradient(to right, #008000, #6eaa5e)"
                };
                break;
        }

        return config;
    }    
}

export default ToastifyConfig;