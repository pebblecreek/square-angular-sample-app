interface Scripts {
	name: string;
	src: string;
}
export const ScriptStore: Scripts[] = [
	{ name: 'squarePay', src: 'https://js.squareupsandbox.com/v2/paymentform' },
	{ name: 'squarePaySDK', src: 'https://sandbox.web.squarecdn.com/v1/square.js' },
];