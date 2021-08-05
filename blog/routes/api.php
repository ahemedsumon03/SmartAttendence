<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\employee_list_controller;
use App\Http\Controllers\employee_attendence_controller;

Route::get('/onlist',[employee_list_controller::class,'onList']);
Route::post('/employeereg',[employee_list_controller::class,'onEmployeeRegistration']);
Route::post('/employeeattendence',[employee_attendence_controller::class,'onEmployeeAttendance']);
