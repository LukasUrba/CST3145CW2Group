

/**
 * Ajax technique to communicate with the server
 * @param  {Any}      data data to be sent to server
 * @param  {Function} operation a variable containing a function
 * @param  {String}   method communication method, like: "POST", "GET", "PUT", "DELETE"
 * @param  {String}   url to specify the php page to communicate with
*/
async function ajax(data, operation, method, url){

    data     = data     ? data     : true;
    operation= operation? operation: x => console.log("No operation: "+x);
    method   = method   ? method   : "POST";
    url      = url      ? url      : location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    method = method.toUpperCase();
    data = typeof data === 'string'? data: JSON.stringify(data);

    //converting the data in "post" data
    function getFormData(object) {
        let formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }

    //handling server response
    function res(response){
        if (response.ok) return response.text().then(resp => resp);
        else throw new Error(response.statusText, {cause: response});
    }

    // server error handler
    function exception(error){
        console.error(error.cause? 'Exception ➤' + error.cause.url + "\r\n" + error.cause.status + " ("+error.message+")": error);
        return error.cause? error.cause.status: false;
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
        default: console.error("Wrong ajax method!");
            return; //this return avoids "operation" to be executed
    }

    //running the asycronous operation
    operation(output);
}