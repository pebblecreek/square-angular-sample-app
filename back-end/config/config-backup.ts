const config = {
	secret: "ZtnOMQ8rUJDxA2wYIawMIWYkhkFhg6TTlOUHxISw7MxwqTcZ2oAiYSFEQbbwIvZhvcY3coPAncMbbPcgJUsklLjsN409O8sCuP9E",
	port: 3000,
	host: "0.0.0.0",
	allowedDomains: ["http://localhost:4200", "http://localhost:3000"],
	tokenLife: 9999999,
	refreshTokenLife: 9999999,
	pagination: {
		page_size: 50,
		offset: 0,
		maxLimit: 100
	},
	uploads: {
		path: "/files/",
	},
	syncDb: true,
	squareUp: {
		Application_ID: 'sandbox-sq0idb-hXLs2Ohxeysy7kTPfUhOmQ',
		Application_Secret: 'sandbox-sq0csb-_3a1Qpymsr2mq6GFNiNrhg5zabxNzoYlDKCvCHwrDDk',
		base_url: 'https://connect.squareupsandbox.com'
	}
};
export default config;