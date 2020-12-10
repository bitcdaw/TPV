<template>
  <v-app >
    <v-app-bar dense dark app>
      <v-toolbar-title>TPV</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined class="mr-4" @click="() => {dialogAdd = true; this.dataProduct.name = null; this.dataProduct.price = null; this.dataProduct.imgURL = null; }">Añadir Producto</v-btn>
      <v-btn outlined class="mr-4" @click="() => {dialogDelete = true}">Eliminar Producto</v-btn>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      right
      temporary
      width="400px"
    >
    <v-card width="400px" height="850px"  flat outlined shaped tile>
        <v-card-title class="text-center">Cesta</v-card-title>
        <v-card-text>
          <v-simple-table >
            <thead>
              <tr>
                <th class="text-center">Producto</th>
                <th class="text-center">Cantidad</th>
                <th class="text-center"></th>
                <th class="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <Item v-for="cartItem in shoppingCart" :key="cartItem.id" :cartItem="cartItem" @update-row="updateRow"/>
            </tbody>
            <tfoot class="text-center">
              <tr>
                <th class="text-center">Total Productos</th>
                <td>{{totalAmount}}</td>
                <td>
                  <v-btn icon color="red lighten-1" @click="cleanCart">X</v-btn>
                </td>
                <td>
                  <span>{{Math.round(totalPrice*100)/100}}€</span>
                </td>
              </tr>
            </tfoot>
          </v-simple-table>
        </v-card-text>
        <v-container class="text-center">
          <v-btn class="text-center" color="secondary" elevation="2" @click="() => {dialogTicket = true;cleanTicketData(); setTicketData(shoppingCart);}">Cobrar</v-btn>
          <v-btn class="text-center" color="secondary" elevation="2" @click="parkCart">Aparcar</v-btn>
          <v-btn class="text-center" color="secondary" elevation="2" @click="unparkCart">Recuperar</v-btn><br><br>
          <v-btn class="text-center" color="secondary" elevation="2" @click="cleanParkedCart">Vaciar Aparcado</v-btn>
          <v-btn class="text-center" color="secondary" elevation="2" @click="cleanAll">Vaciar Todo</v-btn>
        </v-container>
    </v-card>
    </v-navigation-drawer>

    <v-main allow-overflow="false">
      <v-row>
        <v-col cols="12" sm="4" md="3" lg="2" v-for="product of products" :key="product.id" >
          <Product :product="product"/>      
        </v-col>
      </v-row>
      <!-- DIALOG DELETE -->
      <v-dialog v-model="dialogDelete" height="400px" width="400px">
        <v-card height="200px" width="400px">
          <v-container class="text-center">
            <v-form @submit.prevent="deleteProduct(selected)">
              <select
                v-model="selected" 
                name="select" 
                style="
                background-color: #BF7A54;
                color: white;
                padding: 12px;
                width: 250px;
                border: none;
                margin-bottom: 25px;
                margin-top: 25px;
                font-size: 20px;
                box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
                -webkit-appearance: button;
                appearance: button;
                outline: none;"
              >
                 <option style="padding: 30px;" v-for="product of products" :key="product.id" :value="product.id">{{product.name}}</option> 
              </select>
              <v-btn type="submit" color="primary" block class="mr-4" @click.stop="dialogDelete = false">Delete</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- DIALOG ADD -->
      <v-dialog v-model="dialogAdd" max-height="400px" max-width="400px">
        <v-card max-height="400px" max-width="400px">
          <v-container class="text-center">
            <v-form @submit.prevent="pushProduct(dataProduct)">
              <v-text-field type="text" label="Add Name" v-model="dataProduct.name" />
              <v-text-field type="text" label="Add Price" v-model="dataProduct.price" />
              <input type="file" @change="uploadImg"><br><br>
              <v-btn type="submit" color="primary" block class="mr-4" @click.stop="dialogAdd = false">Upload</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- DIALOG TICKET -->
      <v-dialog v-model="dialogTicket" max-height="400px" max-width="400px">
        <v-card max-height="400px" max-width="400px">
          <v-container class="text-center">
            <v-form class="contact-form" @submit.prevent="sendEmail">
              <v-text-field type="text" label="Name" name="user_name"/>
              <v-text-field type="email" label="Email" name="user_email"/>
              <v-textarea label="Message" name="message" :value="ticketData"/>
              <v-btn type="submit" color="primary" value="Send" block class="mr-4" @click.stop="() => {dialogTicket = false;cleanCart();}">Enviar</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
import {fb, db} from './main';
import emailjs from 'emailjs-com';
import Product from './components/Product.vue';
import Item from './components/Item.vue';

export default {
  name: 'App',
  components: {
    Product,Item
  },
  data: function(){
    return{
      selected: "",
      dialogAdd: false,
      dialogDelete: false,
      dialogTicket: false,
      drawer: false,
      dataProduct: {
          name: null,
          price: null,
          imgURL: null,
      },
    }
  },
  computed:{
    //Global
    ...mapState(['products','shoppingCart']),
    ...mapGetters([]),
    //Totals Module
    ...mapState('totals',['totalAmount','totalPrice']),
    //Parked Cart Module
    ...mapState('parkedCart',['totalParkedAmount','totalParkedPrice','parkedShoppingCart']),
    //Ticket Module
    ...mapState('ticket',['ticketData']),
  },
  methods:{
    //Global
    ...mapMutations(['setShoppingCart','cleanShoppingCart','fullShoppingCart']),
    ...mapActions(['pullProducts','pushProduct','deleteProduct']),
    //Totals Module
    ...mapMutations('totals',['setTotalAmount','cleanTotalAmount','setTotalPrice','cleanTotalPrice']),
    //Parked Cart Module
    ...mapMutations('parkedCart',['setTotalParkedAmount','cleanTotalParkedAmount','setTotalParkedPrice','cleanTotalParkedPrice','setparkedShoppingCart','cleanParkedShoppingCart']),
    //Tiket Module
    ...mapMutations('ticket',['setTicketData','cleanTicketData']),
    //Methods
    cleanCart(){
      this.cleanShoppingCart();
      this.cleanTotalAmount();
      this.cleanTotalPrice();
    },
    cleanParkedCart(){
      this.cleanTotalParkedAmount();
      this.cleanTotalParkedPrice();
      this.cleanParkedShoppingCart();
    },
    cleanAll(){
      this.cleanCart();
      this.cleanParkedCart();
    },
    parkCart(){
      if((Object.keys(this.shoppingCart).length !== 0) && (Object.keys(this.parkedShoppingCart).length === 0)){
        this.setTotalParkedAmount(this.totalAmount);
        this.setTotalParkedPrice(this.totalPrice);
        this.setparkedShoppingCart(this.shoppingCart);
        this.cleanCart();
      }
    },
    unparkCart(){
      if(Object.keys(this.shoppingCart).length === 0){
        this.setTotalAmount(this.totalParkedAmount);
        this.setTotalPrice(this.totalParkedPrice);
        this.fullShoppingCart(this.parkedShoppingCart);
        this.cleanParkedShoppingCart();
        this.cleanTotalParkedAmount();
        this.cleanTotalParkedPrice();
      }
    },
    uploadImg(e){
      let file = e.target.files[0];
      var storageRef = fb.storage().ref('products/'+file.name);
      let uploadTask = storageRef.put(file);
      console.log(uploadTask.snapshot)
      uploadTask.on('state_changed', (snapshot) => {
      }, (error) => {
        console.log(error);
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.dataProduct.imgURL = downloadURL;
          // console.log('File at:',downloadURL )
        })
      })
      // console.log(e.target.files[0]);
    },
    sendEmail: (e) => {
      emailjs.sendForm('contactTPV','tpv_form', e.target, 'user_vnUktzSmiey8sei0qsmVQ')
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
    },
    updateRow(){
      this.$forceUpdate();
    }

  },
  created(){
    this.pullProducts();
  },
}
</script>

<style>
  .v-application--wrap{
    background: url("../public/Fondo.jpg");
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  html::-webkit-scrollbar {
    display: none;
  }
  html {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
