export default {
  namespaced: true,
  state: {
    ticketData: "",
  },
  mutations: {
    setTicketData(state,Cart){
      let str = "";
      for(let items in Cart){
          str = Cart[items].name + ": " + Cart[items].amount + " x " + Cart[items].price + " = " + (Math.round(((Cart[items].amount)*(Cart[items].price))*100)/100)+ "€" + "\n";
          state.ticketData = state.ticketData.concat(str);
      }
      console.log(state.ticketData);

    },
    cleanTicketData(state){
      state.ticketData = "";
    }
  },
  actions: {
    
  },
  getters: {
   
  }
}