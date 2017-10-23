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