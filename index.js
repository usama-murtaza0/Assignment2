$(function(){
    $("#add").click(handleAdd);
    $("#reset").click(reset);
});

function handleAdd(){
    if(!validateData()){
        return
    };
    $("#table").append('<tr><td>'+$("#name").val()+'</td><td>'+$('input[name="gender"]:checked').val()+'</td><td>'+$("#age").val()+'</td><td>'+$('#city').find(":selected").text()+'</td><td><button class="update"  id="update">Update</button>  /  <button class="delete" onclick="remove(event)")>Remove</button></td></tr>');
    $('#form').trigger("reset");
}

function validateData(){
    var chkRegex = new RegExp('^[a-zA-Z]+$');

    if(!chkRegex.test($('#name').val())){
        alert("Invalid Name - Allowed Alphabets - Max 10");
    }
    else if($('#age').val()<10 || $('#age').val()>50)
        alert("Invalid Age - Allowed Numbers - min: 10, max 50");
    else    return true;

    return false;
}

function remove(e){
    e.target.parentNode.parentNode.remove();
}

$(function(){
    $("#table").on('click', '#update', function(){
        $('#add').prop('disabled', true);
        $('.delete').prop('disabled', true);
        $('#updateform').prop('disabled', false)
        var thisRow = null;
        thisRow=$(this).closest("tr"); 
       
         $('#name').val(thisRow.find("td:eq(0)").text());
         $("input[name='gender'][value='"+thisRow.find("td:eq(1)").text()+"']").prop('checked', true);         
         $('#age').val(thisRow.find("td:eq(2)").text());
         $('#city option').filter(function() {
            return this.textContent == thisRow.find("td:eq(3)").text();
        }).prop('selected', true);
        
        $(function(){
            $('#updateform').unbind().click(function(){
                $('#error').empty();
                console.log("updates");
                if(!validateData()){
                    return
                }
                thisRow.find("td:eq(0)").html($('#name').val());
                thisRow.find("td:eq(1)").html($('input[name="gender"]:checked').val());
                thisRow.find("td:eq(2)").html($('#age').val());
                thisRow.find("td:eq(3)").html($('#city').find(":selected").val()); 
            });
        });
    });    
});       

function reset(){
        $('#add').prop('disabled', false);
        $('#updateform').prop('disabled', true);
        $('.delete').prop('disabled', false);
        $('#form').trigger("reset");
    }

