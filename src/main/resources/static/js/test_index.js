$(function() {

$(document).ready(function(){
    console.log("Sanity Check !");

    $.ajax({
        url:"/cms-storage/all-job-listings",
        success: function(data){
            console.log(data);
            alert("Done !");
        }
    })
});
})