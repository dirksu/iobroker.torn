// Wenn npm nicht bekannt ist oder nicht installiert werden kann, kannst du stattdessen das eingebaute 'https'-Modul von Node.js verwenden.
// Beispiel für eine einfache GET-Anfrage ohne axios:

const https = require('https');

class TornApi {
    constructor(apiKey, logger = console) {
        this.apiKey = apiKey;
        this.logger = logger;
        this.baseUrl = 'https://api.torn.com';
    }

    async request(endpoint, selections = 'basic') {
        const url = `${this.baseUrl}/${endpoint}/?selections=${selections}&key=${this.apiKey}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            this.logger.error(`Torn API error on ${endpoint}/${selections}: ${error.message}`);
            return null;
        }
    }

    async getUserBasic() {
        return this.request('user', 'basic');
    }

    async getUserEvents() {
        return this.request('user', 'events');
    }

    async getUserNotifications() {
        return this.request('user', 'notifications');
    }

    async getUserAttacks() {
        return this.request('user', 'attacks');
    }

    // Weitere Methoden je nach Bedarf hier ergänzen...
}

module.exports = TornApi;
