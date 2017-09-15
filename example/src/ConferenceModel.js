import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

export default class ConferenceModel {
	constructor() {

		// create a new Lokka client
		this.client = new Lokka({
			transport: new Transport('https://graphql-europe.org/graphql')
        });
        
        this.ticketInfo = this.client.createFragment(`
            fragment on Ticket {
                name
                price
                availableUntil
            }
        `);
	}

	getConference(conferenceName) {

        if (conferenceName === "") {
            return new Promise((resolve, reject) => {
                resolve(null);
            });
        }

		var dataPromise = this.client
			// invoke the GraphQL query to get all the items
			.query(
				`
                {
                    conference(edition: ${conferenceName}) {
                        name
                        dateStart
                        edition
                        tickets {
                            ...${this.ticketInfo}
                        }
                    }
                }
                `
			);

		return dataPromise.then(res => {
                return res.conference;
            }
        );
	}
}
