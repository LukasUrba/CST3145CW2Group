
var vueApp = new Vue({
	el: '#app',
	data: {
		
		// array of JSON objects
		products: [],
		showcase: [],
		cart:[],
		sitename: "Second Coursework",
		cartOn: false,
		searchOn: false,
		carouselCards: 0,
	},


	// selfrunning method which starts before the page has loaded
	created(){
		console.log("Loading page...")
		
		/* this.products = products.slice();
		this.showcase = this.products.slice(); */

		/* this.includeCarousel(); */
	},

	// selfrunning method which starts after the page has successfully loaded
	mounted(){

		//setting html title
		document.getElementsByTagName("head")[0].getElementsByTagName("title")[0].innerHTML = this.sitename;

		console.log("Page loaded!");
	},

	computed:{
		
	},

	methods:{
		
        /**
         * Ajax technique to communicate with the server
         * @param  {Any}      data data to be sent to server
         * @param  {Function} operation a variable containing a function
         * @param  {String}   method communication method, like: "POST", "GET", "PUT", "DELETE"
         * @param  {String}   url to specify the php page to communicate with
        */
        async ajax(data, operation, method, url){

            data     = data     ? data     : true;
            operation= operation? operation: x => console.log("No operation "+x);
            method   = method   ? method   : "POST";
            url      = url      ? url      : location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

            method = method.toUpperCase();
            data = JSON.stringify(data);

            //converting the data in "post" data
            function getFormData(object) {
                let formData = new FormData();
                Object.keys(object).forEach(key => formData.append(key, object[key]));
                return formData;
            }

            //handling server response
            function res(response){
                if (response.ok) return response.text().then(resp => resp);
                else throw new Error(response);
            }

            // server error handelr
            function exception(error){
                console.error('Error:', error);
            }


            //performing the HOLLY ajax technique
            switch(method){
                case "POST":
                    output = await  fetch( url, {
                                        method: method,
                                        body:   getFormData({ajax: data}),
                                    }).then(response => res(response))
                                    .catch(error => exception(error));
                    break;
                case "GET":
                    output = await  fetch(url+"?"
                                        +"ajax"+"="
                                        + data
                                    ).then(response => res(response))
                                    .catch(error => exception(error));
                    break;
                case "DELETE":
                    data = JSON.parse(data);
                    output = await  fetch(url + '/' + JSON.stringify({ajax: data}), {
                                        method: method
                                    }).then(response => res(response))
                                    .catch(error => exception(error));
                    break;
                case "PUT": case "PATCH":
                    output = await  fetch(url + "/" + "ajax", {
                                        method: method,
                                        body:   data
                                    }).then(response => res(response))
                                    .catch(error => exception(error));
                    break;
                default: console.log("Wrong ajax method!");
                    return; //this return avoids "operation" to be executed
            }

            //running the asycronous operation
            operation(output);
        }

	},
});
