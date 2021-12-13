<?php


namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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
        $questionAnswers=QuestionAnswer::all();
        return response()->json($questionAnswers);
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
            'modified_by'=>'Admin User'   // need to get the user from session or token
        ]);

        $newQuestionAnswer->save();
        return response()->json($newQuestionAnswer);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuestionAnswer  $question
     * @return \Illuminate\Http\Response
     */
    public function show(QuestionAnswer $questionAnswer)
    {
        return response()->json($questionAnswer);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\QuestionAnswer  $question
     * @return \Illuminate\Http\Response
     */
    public function edit(QuestionAnswer $question)
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
        $questionAnswer->modified_by='Admin User';   // need to get the user from session or token

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
