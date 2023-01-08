const bc = new BroadcastChannel("test_channel");
bc.onmessage = (event) => {
    alert(event.data)
    if(event.data.type==="routeChange" ){
        window.location.href=event.data.route
    }
};
function login() {
    const route=window.location.origin+"/login.html"
    window.location.href=route
    bc.postMessage({type:"routeChange",route});
}
function logout(){
    const route=window.location.origin+"/logout.html"
    window.location.href=route
    bc.postMessage({type:"routeChange",route});
}
if(navigator.contacts){
    navigator.contacts.getProperties()
    .then(()=>{
        document.getElementById("c").innerHTML=JSON.stringify(supportedProperties)
    })
}else{
    alert("no contacts supported")
}