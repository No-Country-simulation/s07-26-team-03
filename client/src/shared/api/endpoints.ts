export const ENDPOINTS = {

    calculator:{

        calculate:"/calculator/calculate",

        scenarios:"/calculator/scenarios",

    },

    report:{

        generate:"/reports"

    },

    auth:{

        login:"/auth/login",

        signup: "/auth/signup",

    }

} as const;