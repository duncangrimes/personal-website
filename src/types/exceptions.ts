export class ServerError extends Error {
    constructor(message = 'We encountered a server error') {
        super(message);
        this.name = 'ServerError';
    }
}