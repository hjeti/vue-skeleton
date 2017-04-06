export default class Ts {
	constructor() {
		const kaas:string = 'test';

		console.log('test1');

		switch (kaas) {
			case 'test': {
				console.log('111');
				break;
			}
			default: {
				console.log('finally');
			}
		}
	}
}
