export class TestService {
    get(): String {
        const now = new Date();
        return `Service health ${now}`;
    }
}