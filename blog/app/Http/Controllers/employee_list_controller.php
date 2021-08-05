<?php

namespace App\Http\Controllers;
use App\Models\employee_list_model;

use Illuminate\Http\Request;

class employee_list_controller extends Controller
{
    function onEmployeeRegistration(Request $request)
    {
        $name = $request->input('name');
        $employee_id = $request->input('employee_id');
        $employee_mobile = $request->input('employee_mobile');
        $photo_des = $request->input('photo_des');

        $result = employee_list_model::insert([
            "name"=>$name,
            "employee_id"=>$employee_id,
            "employee_mobile"=>$employee_mobile,
            "photo_des"=>$photo_des
        ]);

        return $result;
    }

    function onList()
    {
        $result = employee_list_model::all();
        return $result;
    }

}
