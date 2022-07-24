/**
 * App Entry File
 * Vuely: A Powerfull Material Design Admin Template
 * Copyright 2018. All Rights Reserved
 * Created By: The Iron Network, LLC
 * Made with Love
 */
import 'babel-polyfill';
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue';


import VueHtml2Canvas from 'vue-html2canvas';
import Multiselect from 'vue-multiselect';
import VueQrcode from '@chenfengyuan/vue-qrcode';
// import excel from 'vue-excel-export'
import Vuetify from 'vuetify'
// import * as VueGoogleMaps from 'vue2-google-maps'
// import { Vue2Dragula } from 'vue2-dragula'
// import VueQuillEditor from 'vue-quill-editor'
// import wysiwyg from 'vue-wysiwyg'
import VueBreadcrumbs from 'vue2-breadcrumbs'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
// import AmCharts from 'amcharts3'
// import AmSerial from 'amcharts3/amcharts/serial'
// import AmAngularGauge from 'amcharts3/amcharts/gauge'
import Nprogress from 'nprogress'
import VueI18n from 'vue-i18n'
// import VueTour from 'vue-tour'
import fullscreen from 'vue-fullscreen'
// import InstantSearch from 'vue-instantsearch'
// import VueVideoPlayer from 'vue-video-player';
// import Croppa from 'vue-croppa';

// global components
import GlobalComponents from './globalComponents'

// app.vue
import App from './App'

// router
import router from './router'

// themes
// import primaryTheme from './themes/primaryTheme';

// store
import { store } from './store/store';

// firebase
import './firebase'

// include script file
import './lib/VuelyScript'

// include all css files
import './lib/VuelyCss'

// messages
import messages from './lang';

import 'html5-device-mockups';

import axios from 'axios';

// request interceptor
axios.interceptors.request.use(function (config) {
	Nprogress.start();
    // Do something before request is sent
    return config;
  }, function (error) {
	Nprogress.done();
    // Do something with request error
    return Promise.reject(error);
  });

// response interceptors.
axios.interceptors.response.use(function (response) {
	// in order to know how many ajax request is made.
	if(process.env.NODE_ENV === 'development'){
		Vue.notify({
			group: 'loggedIn',
			type: 'success',
			text: 'Success'
		});
	}
	
	Nprogress.done();

    // Do something with response data
    return response;
}, function (error) {
	try {
		if(error.response.data.message == 'Invalid Parameter!' || error.response.data.msg == 'Invalid Parameter!')
		var errMsg = "Please fill required '*' field!";
		else 
		var errMsg = error.response.data.message || error.response.data.msg;
	} catch (err) {
		errMsg = error.message;
	}

    if(error.response.status === 401){
		store.dispatch('logOutUser');
		Vue.notify({
			group: 'loggedIn',
			type: 'error',
			text: 'Session expired. Please login again'
		});
    } else {
		Vue.notify({
			group: 'loggedIn',
			type: 'error',
			text: errMsg || 'Sorry! something went wrong!'
		});
	}

	Nprogress.done();

    return Promise.reject(error);
});

// navigation guards before each
router.beforeEach((to, from, next) => {
	Nprogress.start()
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (store.getters.getUser === null) {
			next({
				path: '/session/login',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	} else {
		next() // make sure to always call next()!
	}
	// Check at least a connected facebook page is required.
	if (to.matched.some(record => record.meta.requiresAConnectedPage)) {
		if(!store.getters.getConnectedFbPages.length){
			next({ path: '/connect-pages' });
		} else {
			next();
		}
	} else {
		next(); // make sure to always call next()!
	}

	// already login user go to login route.
	if(to.name === 'login' && store.getters.getUser){
		next({ path: '/dashboard' });
	} else {
		next();
	}
})

// navigation guard after each
router.afterEach((to, from) => {
	Nprogress.done()
	setTimeout(() => {
		const contentWrapper = document.querySelector(".v-content__wrap");
		if(contentWrapper !== null){
			contentWrapper.scrollTop = 0;
		}
		const boxedLayout = document.querySelector('.app-boxed-layout .app-content');
		if(boxedLayout !==  null){
			boxedLayout.scrollTop = 0;
		}
		const miniLayout = document.querySelector('.app-mini-layout .app-content');
		if(miniLayout !== null){
			miniLayout.scrollTop = 0;
		}
	}, 200);
})

// plugins
Vue.use(Vuetify, {
	theme: store.getters.selectedTheme.theme
});
// Vue.use(InstantSearch);
Vue.use(VueI18n)
// Vue.use(AmCharts)
// Vue.use(AmSerial)
// Vue.use(VueTour)
// Vue.use(AmAngularGauge)
// Vue.use(Vue2Dragula)
// Vue.use(VueQuillEditor)
Vue.use(VueResource)
Vue.use(Vuetify, {
	iconfont: 'fa'
   })
// Vue.use(wysiwyg, {})
Vue.use(VueBreadcrumbs)
Vue.use(Notifications, { velocity })
Vue.use(fullscreen);
Vue.use(GlobalComponents);
Vue.use(require('vue-cookie'));
Vue.use(require('vue-cookies'));
Vue.use(VueHtml2Canvas);
Vue.component(VueQrcode.name, VueQrcode);
Vue.component('multiselect', Multiselect);


// Vue.use(VueVideoPlayer);
// Vue.use(Croppa);

// Vue.use(VueGoogleMaps, {
// 	load: {
// 		key: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk' // Add your here your google map api key
// 	}
// })

// Create VueI18n instance with options
export const i18n = new VueI18n({
	locale: store.getters.selectedLocale.locale, // set locale
	messages, // set locale messages
});

/* eslint-disable no-new */
new Vue({
	store,
	i18n,
	router,
	render: h => h(App),
	components: { App }
}).$mount('#app')
