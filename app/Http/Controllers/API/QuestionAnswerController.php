<?php
//https://dev.to/seankerwin/laravel-8-rest-api-with-resource-controllers-5bok

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionAnswer as ResourcesQuestionAnswer;
use App\Models\QuestionAnswer;
use Illuminate\Http\Request;

class QuestionAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      return ResourcesQuestionAnswer::collection(QuestionAnswer::paginate(5));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'question'=>'required',
            'correct_answer'=>'required',
            'wrong_answer1'=>'required',
            'wrong_answer2'=>'required',
            'wrong_answer3'=>'required',
            'wrong_answer4'=>'required',
            'wrong_answer5'=>'required',
        ]);

        $newQuestionAnswer=new QuestionAnswer([
            'question'=>$request->input('question'),
            'correct_answer'=>$request->input('correct_answer'),
            'wrong_answer1'=>$request->input('wrong_answer1'),
            'wrong_answer2'=>$request->input('wrong_answer2'),
            'wrong_answer3'=>$request->input('wrong_answer3'),
            'wrong_answer4'=>$request->input('wrong_answer4'),
            'wrong_answer5'=>$request->input('wrong_answer5'),
            'last_modified_by'=>'Admin User',   // need to get the user from session or token
            'reviewed_by'=>$request->input('reviewed_by'),
        ]);

        $newQuestionAnswer->save();
        return response()->json([
            "message"=>"Question and Answers added.",
            "data"=>$newQuestionAnswer],201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuestionAnswer  $question
     * @return \Illuminate\Http\Response
     */
    public function show(QuestionAnswer $questionAnswer)
    {
        return new ResourcesQuestionAnswer($questionAnswer);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\QuestionAnswer  $question
     * @return \Illuminate\Http\Response
     */
    public function edit(QuestionAnswer $questionAnswer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\QuestionAnswer  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, QuestionAnswer $questionAnswer)
    {
        $request->validate([
            'question'=>'required',
            'correct_answer'=>'required',
            'wrong_answer1'=>'required',
            'wrong_answer2'=>'required',
            'wrong_answer3'=>'required',
            'wrong_answer4'=>'required',
            'wrong_answer5'=>'required',
        ]);

        $questionAnswer->question=$request->input('question');
        $questionAnswer->correct_answer=$request->input('correct_answer');
        $questionAnswer->wrong_answer1=$request->input('wrong_answer1');
        $questionAnswer->wrong_answer2=$request->input('wrong_answer2');
        $questionAnswer->wrong_answer3=$request->input('wrong_answer3');
        $questionAnswer->wrong_answer4=$request->input('wrong_answer4');
        $questionAnswer->wrong_answer5=$request->input('wrong_answer5');
        $questionAnswer->last_modified_by='Admin User';   // need to get the user from session or token
        $questionAnswer->reviewed_by=$request->input('reviewed_by');

        $questionAnswer->save();

        return response()->json($questionAnswer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\QuestionAnswer  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(QuestionAnswer $questionAnswer)
    {
        $questionAnswer->delete();
        return response()->json($questionAnswer::all());
    }
}
