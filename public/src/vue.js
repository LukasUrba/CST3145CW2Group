
var vueApp = new Vue({
	el: '#app',
	data: {
		user: "",
        password: "",
		sitename: "Second Coursework",
        // array of JSON objects
        lessons: [],
	},


	// selfrunning method which starts before the page has loaded
	created(){
		console.log("Loading page...")
		
	},

	// selfrunning method which starts after the page has successfully loaded
	async mounted(){

		//setting html title
		document.getElementsByTagName("head")[0].getElementsByTagName("title")[0].innerHTML = this.sitename;

		console.log("Page loaded!");

        
        function fillUser(response){
            vueApp.user = JSON.parse(response).user[0].email;
            vueApp.password = JSON.parse(response).user[0].password;
        }
        function fillLessons(response){
            vueApp.lessons = JSON.parse(response).lessons;
        }

        await ajax("user", fillUser, "get", "user");
        await ajax("lessons", fillLessons, "get", "lessons");

       
	},

	computed:{
		
	},

	methods:{
		
        
        

	},
});