<?php

namespace App\Http\Controllers;
use App\Models\employee_attendence_model;

use Illuminate\Http\Request;

class employee_attendence_controller extends Controller
{
    function onEmployeeAttendance(Request $request)
    {
        $name = $request->input('name');
        $employee_id = $request->input('employee_id');
        $employee_mobile = $request->input('employee_mobile');
        date_default_timezone_set('Asia/Dhaka');

        $a_date = date("d-m-Y");
        $a_time = date("h:i:sa");
        $status = "present";

        $result = employee_attendence_model::insert([
            "name"=>$name,
            "employee_id"=>$employee_id,
            "employee_mobile"=>$employee_mobile,
            "a_date"=>$a_date,
            "a_time"=>$a_time,
            "status"=>$status
        ]);

        return $result;
    }
}
