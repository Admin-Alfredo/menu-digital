exports.Respt = function Respt(initialResponse={}) {
    this.response = {
        status: initialResponse.status ? initialResponse.status : 200,
        message:initialResponse.message ? initialResponse.message : "",
        data: initialResponse.data ? initialResponse.data : {}
    }
    this.getStatus = function(){
        return this.response.status
    }
    this.getMessage = function(){
        return this.response.message
    }
    this.getData = function(){
        return this.response.data
    }
    this.setStatus = function(status=200){
        this.response.status = status;
        return {...this, response: this.response};
    } 
    this.setMessage = function(msg=""){
        this.response.message = msg;
        return {...this, response: this.response};
    }
    this.setData = function (data={}){
        this.response.data = data;
        return {...this, response: this.response};
    }  
}