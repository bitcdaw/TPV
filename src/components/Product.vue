<template>
    <v-card  max-width="275" max-height="275" elevation="8" outlined tile>
      <v-container>
      <v-img contain :src="product.imgURL" :alt="`${product.name}`" height="100px">
      </v-img>
      <v-card-title class="subtitle-1">
        <v-container class="text-center" >{{product.name}}</v-container>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-actions>
        <v-btn class="text-center" color="primary" block elevation="2" @click="addToCart()">
          {{product.price}} €
        </v-btn>
      </v-card-actions>
      </v-container>
    </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'Product',
  props: ['product'],

  computed:{
  },
  methods: {
    ...mapActions(['addToShoppingCart']),
    ...mapMutations('totals',['increaseTotalAmount','increaseTotalPrice']),

    addToCart(){
      this.increaseTotalAmount();
      this.increaseTotalPrice(this.product.price);
      this.addToShoppingCart(this.product);
    }
  }
}
</script>
