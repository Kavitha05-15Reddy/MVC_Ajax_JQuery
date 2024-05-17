$(document).ready(function () {
    ShowEmployeeData();
});

function ShowEmployeeData() {
    $.ajax({
        url: '/Ajax/EmployeeList',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.city + '</td>';
                object += '<td>' + item.state + '</td>';
                object += '<td>' + item.salary + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.id + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.id + ')">Delete</a> </td>';
                object += '<tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't Retrieved..");
        }
    });
};

$('#btnAddEmployee').click(function () {
    ClearTextBox();
    $('#EmployeeModal').modal('show');
    $('#empId').hide();
    $('#btnSave').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#employeeHeading').text('Add Employee');
});

$('#btnClose1').click(function () {
    $('#EmployeeModal').modal('hide');
})

$('#btnClose2').click(function () {
    $('#EmployeeModal').modal('hide');
})

function HideModalPopUp() {
    $('#EmployeeModal').modal('hide');
}

function ClearTextBox() {
    $('#Name').val(''),
    $('#City').val(''),
    $('#State').val(''),
    $('#Salary').val('')
}

function AddEmployee() {
    var objdata = {
        Name: $('#Name').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Salary: $('#Salary').val()
    };
    $.ajax({
        url: '/Ajax/AddEmployee',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Saved');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Saved");
        }
    });
}

function Delete(id) {
    if (confirm('Are you sure, You want to delete this record?')) {
        $.ajax({
            url: '/Ajax/Delete?id=' + id,
            success: function () {
                alert('Data Deleted!');
                ShowEmployeeData();
            },
            error: function () {
                alert("Data can't be Deleted");
            }
        })
    } 
}

function Edit(id) {
    $.ajax({
        url: '/Ajax/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#EmployeeModal').modal('show');

            $('#Id').val(response.id)
            $('#Name').val(response.name),
            $('#City').val(response.city),
            $('#State').val(response.state),
            $('#Salary').val(response.salary);

            $('#btnSave').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#employeeHeading').text('Update Employee');

            //$('#btnSave').hide();
            //$('#btnUpdate').show();
        },
        error: function () {
            alert('Data not found');
        }
    })
}

function UpdateEmployee() {
    var objdata = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Salary: $('#Salary').val()
    };
    $.ajax({
        url: '/Ajax/Update',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Updated');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Updated");
        }
    })
}