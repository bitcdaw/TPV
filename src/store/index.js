import Vue from 'vue'
import Vuex from 'vuex'
import { fb, db } from '../main'
import totals from '../modules/totals';
import parkedCart from '../modules/parkedCart';
import ticket from '../modules/ticket';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    shoppingCart: {}
  },
  mutations: {
    setProducts(state,requestedProducts){
      state.products = requestedProducts;
    },
    setShoppingCart(state,product){
      state.shoppingCart[product.id] = product;
    },
    fullShoppingCart(state,Obj){
      state.shoppingCart = Obj;
    },
    cleanShoppingCart(state){
      state.shoppingCart = {};
    },
    increaseAmount(state, productId){
      state.shoppingCart[productId].amount = state.shoppingCart[productId].amount + 1;
    },
    decreaseAmount(state, productId){
      state.shoppingCart[productId].amount = state.shoppingCart[productId].amount - 1;
      if(state.shoppingCart[productId].amount == 0){
        delete state.shoppingCart[productId];
      }
    },
  },
  actions: {
    pullProducts: async function({commit}){
      try {
        const snapshot = await db.collection('productsInfo').get();
        const products = [];

        snapshot.forEach(doc => {
          let productsData = doc.data();
          productsData.id = doc.id;
          products.push(productsData);
        });
        commit('setProducts', products);
      } catch (error) {
        console.log(error);
      }
    },
    pushProduct: async function({dispatch},product){
      try{
        if(product.name && product.price && product.imgURL){
          await db.collection('productsInfo').add({
            name: product.name,
            price: product.price,
            imgURL: product.imgURL
          })
          dispatch('pullProducts');
        }else{
          console.log('obligatorio');
        }
      }catch(error){
        console.log(error);
      }
    },
    deleteProduct: async function({dispatch},productId){
      try{
        await db.collection('productsInfo').doc(productId).delete();
        dispatch('pullProducts');
      }catch(error){
        console.log(error);
      }
    },
    addToShoppingCart({commit, state}, product){
      state.shoppingCart.hasOwnProperty(product.id)
      ? product.amount = state.shoppingCart[product.id].amount + 1
      : product.amount = 1
      commit('setShoppingCart',product);
    },
  },
  getters: {
  },
  modules: {
    totals,parkedCart,ticket
  }
})
