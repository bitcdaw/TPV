export default {
    namespaced: true,
    state: {
      totalAmount: 0,
      totalPrice: 0,
    },
    mutations: {
      increaseTotalAmount(state){
        state.totalAmount = state.totalAmount + 1;
      },
      decreaseTotalAmount(state){
        state.totalAmount = state.totalAmount - 1;
      },
      setTotalAmount(state,value){
        state.totalAmount = value;
      },
      cleanTotalAmount(state){
        state.totalAmount = 0;
      },
      increaseTotalPrice(state, value){
        state.totalPrice = state.totalPrice + (Math.round(value * 100)/100);
      },
      decreaseTotalPrice(state, value){
        state.totalPrice = state.totalPrice - (Math.round(value * 100)/100);
      },
      setTotalPrice(state,value){
        state.totalPrice = value;
      },
      cleanTotalPrice(state){
        state.totalPrice = 0;
      }
    },
    actions: {
      
    },
    getters: {
     
    }
  }