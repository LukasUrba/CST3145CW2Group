var shop = new Vue({
    el: '#app',
    data:{
        lessons:{},
    },
    created:
    function(){
        fetch('lessons.json').then(
            function (response) {
                response.json().then(
                    function (json) {
                        this.lessons = json;
                        console.log(this.lessons)
                    }
                )
            }); 
    }
})
