export class MenuItem {
    name: String;
    route: String;
    ensureAuthenticated: Boolean;

    constructor(name: String, route: String, ensureAuthenticated: Boolean) {
        this.name = name;
        this.route = route;
        this.ensureAuthenticated = ensureAuthenticated;
    }
}
