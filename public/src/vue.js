
var vueApp = new Vue({
	el: '#app',
	data: {
		user: "",
        password: "",
		// array of JSON objects
		sitename: "Second Coursework",
        lessons: [],
	},


	// selfrunning method which starts before the page has loaded
	created(){
		console.log("Loading page...")
		
		/* this.products = products.slice();
		this.showcase = this.products.slice(); */

		/* this.includeCarousel(); */
	},

	// selfrunning method which starts after the page has successfully loaded
	async mounted(){

		//setting html title
		document.getElementsByTagName("head")[0].getElementsByTagName("title")[0].innerHTML = this.sitename;

		console.log("Page loaded!");

        
        function fillUser(response){
            vueApp.user = response;
        }
        function fillLessons(response){
            vueApp.lessons = JSON.parse(response).lessons;
        }

        await ajax("lessons", fillUser, "get", "");
        await ajax("lessons", fillLessons, "get", "");

       
	},

	computed:{
		
	},

	methods:{
		
        
        

	},
});