let cart = new Vue({
    el: '#cart',
    data: {
        amount: 0,
        countGoods: 0,
        cartItems: []
    },
    mounted(){
        that = this;
        fetch('getCart.json')
            .then(result => result.json())
            .then(data => {
                that.cartItems = data.contents;
                that.amount = data.amount;
                that.countGoods = data.countGoods;
            })
    },
    methods: {
        removeProduct: function(e) {
            let element = e.target,
                productId = +$(element).data('id'),
                find = this.cartItems.find(product => product.id_product === +productId);
            if(find.quantity > 1){
                find.quantity--;
                this.countGoods--;
                this.amount -= find.price;
            } else {
                this.countGoods--;
                this.amount -= find.price;
                this.cartItems = this.cartItems.filter(product => product.id_product != productId);
            }
        }
    }
});


let catalog = new Vue({
    el: '#products',
    data: {
        products: [
            {
                id_product: 123,
                product_name: "Ноутбук",
                price: 45600,
                image: 'https://placehold.it/200x150',
                alt: "Some img"
            },
            {
                id_product: 124,
                product_name: "Mouse",
                price: 600,
                image: 'https://placehold.it/200x150',
                alt: "Some img"
            },
            {
                id_product: 125,
                product_name: "Keyboard",
                price: 1600,
                image: 'https://placehold.it/200x150',
                alt: "Some img"
            }
        ]
    },
    methods: {
        addProduct: function(e) {
            let element = e.target,
                productId = +$(element).data('id'),
                find = cart.cartItems.find(product => product.id_product === productId);
            if(find){
                find.quantity++;
                cart.countGoods++;
                cart.amount += find.price;
            } else {
                cart.cartItems.push({id_product: +$(element).data('id'),
                                     product_name: $(element).data('title'),
                                     price: +$(element).data('price'),
                                     quantity: 1});
                cart.countGoods++;
                cart.amount += +$(element).data('price');
            }
        }
    }
});