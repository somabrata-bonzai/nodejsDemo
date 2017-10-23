function addUser() {
    $.ajax({
        url:'/user',
        type:'post',
        data:$('#myForm').serialize(),
        success:function(data){
            $("#userDetails")[0].append(JSON.stringify(data.result));
        }
    });
}

function getAllUsers() {
    $.ajax({
        url:'/user',
        type:'get',
        success:function(data){
            $("#userDetails")[0].append(JSON.stringify(data.result));
        }
    });
}

function uploadFile() {
    $.ajax({
        url:'/map/uplaodFile',
        type: 'post',
        enctype: 'multipart/form-data',
        processData: false,  // Important!
        contentType: false,
        cache: false,
        data: new FormData($('#geoLocation')[0]),
        success: function(data) {
            alert("sucess");
            $("#userDetails")[0].append(JSON.stringify(data.result));
        },
        error: function (error) {
            alert("error");
        }
    });
}