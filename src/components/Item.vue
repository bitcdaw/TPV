<template>
        <tr class="text-center">
            <td class="text-center">{{cartItem.name}}</td>
            <td class="text-center">{{cartItem.amount}}</td>
            <td class="text-center">
                <v-btn class="text-center" color="accent" icon block @click="increase(cartItem.id)">+</v-btn>
                <v-btn class="text-center" color="#805D25" icon block @click="decrease(cartItem.id)">-</v-btn>
            </td>
            <td class="text-center">{{ Math.round((cartItem.price * cartItem.amount)*100)/100 }}€</td>
        </tr>
</template>

<script>

import {mapActions, mapMutations, mapState} from 'vuex';

export default {
    name: 'Item',
    props: ['cartItem'],
    computed:{
	},
    methods: {
        ...mapMutations(['increaseAmount','decreaseAmount']),
        ...mapMutations('totals',['increaseTotalAmount','decreaseTotalAmount','increaseTotalPrice','decreaseTotalPrice']),
        increase(id){
            this.increaseAmount(id);
            this.increaseTotalAmount();
            this.increaseTotalPrice(this.cartItem.price);
            this.$forceUpdate();
        },
        decrease(id){
            this.decreaseAmount(id);
            this.decreaseTotalAmount();
            this.decreaseTotalPrice(this.cartItem.price);
            this.$forceUpdate();
            if(this.cartItem.amount == 0){
                this.$emit('update-row');
            }
        },
    },
}
</script>