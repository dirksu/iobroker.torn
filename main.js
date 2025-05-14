'use strict';

const utils = require('@iobroker/adapter-core'); // für Adapter-Framework
const axios = require('axios'); // Zum Abrufen der API-Daten
let pollInterval = 60; // In Sekunden

// Adapter-Klasse
class TornAdapter extends utils.Adapter {

    // Konstruktor – hier definieren wir die Adapter-Parameter
    constructor(options = {}) {
        super({
            ...options,
            name: 'torn',
        });
        
        this.on('ready', this.onReady.bind(this)); // Adapter initialisieren
        this.on('stateChange', this.onStateChange.bind(this)); // Statusänderungen verarbeiten
        this.on('objectChange', this.onObjectChange.bind(this)); // Objektänderungen verarbeiten
    }

    // Wenn der Adapter bereit ist
    async onReady() {
        // API-Key aus den native-Einstellungen holen
        const apiKey = this.config.apiKey;
        if (!apiKey) {
            this.log.error('No API key configured. Adapter cannot fetch data.');
            return;
        }

        // Poll-Intervall aus der Konfiguration lesen
        if (this.config.pollInterval) {
            pollInterval = this.config.pollInterval;
        }

        // Periodisches Abfragen der Torn-API
        setInterval(() => {
            this.fetchTornData(apiKey);
        }, pollInterval * 1000); // Intervall in ms (Sekunden * 1000)

        // Erste Abfrage direkt nach dem Start
        this.fetchTornData(apiKey);
    }

    // Torn-Daten abfragen
    async fetchTornData(apiKey) {
        try {
            // Torn-API-Request (hier ein Beispiel-Endpunkt)
            const response = await axios.get(`https://api.torn.com/user/?selections=basic&key=${apiKey}`);
            
            // Beispiel: Benutzername und Level aus der Antwort
            const userData = response.data;

            if (userData && userData.name) {
                this.log.info(`Hello, ${userData.name}! Your level is ${userData.level}.`);

                // Beispiel: Setze einen ioBroker-Datenpunkt für den Benutzernamen
                await this.setStateAsync('user.name', { val: userData.name, ack: true });
                await this.setStateAsync('user.level', { val: userData.level, ack: true });
            } else {
                this.log.warn('No user data received.');
            }
        } catch (error) {
            this.log.error(`Failed to fetch data from Torn API: ${error.message}`);
        }
    }

    // Event, wenn sich der Status ändert
    onStateChange(id, state) {
        if (state) {
            this.log.info(`State ${id} changed: ${state.val}`);
        } else {
            this.log.info(`State ${id} deleted`);
        }
    }

    // Event, wenn sich ein Objekt ändert
    onObjectChange(id, obj) {
        this.log.info(`Object ${id} changed`);
    }
}

// Adapter starten
if (module.parent) {
    module.exports = (options) => new TornAdapter(options);
} else {
    new TornAdapter();
}
