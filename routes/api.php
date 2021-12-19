<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\QuestionAnswerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::get('/questions','')

Route::middleware('auth:sanctum')->group( function () {
   Route::post("/questionAnswer",[QuestionAnswerController::class,'store']);
   Route::put("/questionAnswer/{questionAnswer}",[QuestionAnswerController::class,'update']);
   Route::delete("/questionAnswer/{questionAnswer}",[QuestionAnswerController::class,'destroy']);
});

Route::get("/questionAnswer",[QuestionAnswerController::class,'index']);
Route::get("/questionAnswer/{questionAnswer}",[QuestionAnswerController::class,'show']);
Route::post("/register",[AuthController::class,'register']);
Route::post("/login",[AuthController::class,'login']);
