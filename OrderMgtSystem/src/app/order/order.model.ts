export class Order {
    constructor(public id: number,
        public name: string,
        public item_name: string,
        public price: number,
        public quantity: number) {
    }
}
