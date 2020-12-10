export default {
    namespaced: true,
    state: {
      totalParkedAmount: 0,
      totalParkedPrice: 0,
    	parkedShoppingCart: {},
    },
    mutations: {
      setTotalParkedAmount(state,value){
        state.totalParkedAmount = value;
      },
      cleanTotalParkedAmount(state){
        state.totalParkedAmount = 0;
      },
      setTotalParkedPrice(state,value){
        state.totalParkedPrice = value;
      },
      cleanTotalParkedPrice(state){
        state.totalParkedPrice = 0;
      },
      setparkedShoppingCart(state,Obj){
        state.parkedShoppingCart = Obj;
      },
      cleanParkedShoppingCart(state){
        state.parkedShoppingCart = {};
      }
    },
    actions: {
      
    },
    getters: {
     
    }
  }