import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueTextareaAutosize from 'vue-textarea-autosize';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAOoPIVznAurCrV0KWfxIz8lthlnyE3mQM",
  authDomain: "tpvproject-95970.firebaseapp.com",
  databaseURL: "https://tpvproject-95970.firebaseio.com",
  projectId: "tpvproject-95970",
  storageBucket: "tpvproject-95970.appspot.com",
  messagingSenderId: "177292387811",
  appId: "1:177292387811:web:bef5b770eafdc1d0136cd6",
  measurementId: "G-7SL8Y93333"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VueTextareaAutosize,
  render: h => h(App)
}).$mount('#app')
