import router from "@/router";

export class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ServerError';
    }
}

export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
    handle() {
        router.push({ name: 'login' })
    }
}

export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
    }
}

export class PaymentRequiredError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PaymentRequiredError';
    }
}
