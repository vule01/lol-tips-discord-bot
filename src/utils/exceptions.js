class InvalidChampionException extends Exception {
    constructor() {
        super("Invalid Champion Name");
        this.name = "InvalidChampionException";
    }
}

module.exports = { InvalidChampionException };