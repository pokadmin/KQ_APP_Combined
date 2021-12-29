<?php
//https://dev.to/seankerwin/laravel-8-rest-api-with-resource-controllers-5bok

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionAnswer as ResourcesQuestionAnswer;
use App\Models\QuestionAnswer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class QuestionAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   return ResourcesQuestionAnswer::collection(QuestionAnswer::Where('language','English')->inRandomOrder()->paginate(5))->additional(['status'=>true]);

    }


     /**
     * Provide a random set of paginated resources with limit of 5 based on language .
     *
     * @return \Illuminate\Http\Response
     */
    public function questionAnswerSet(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'language'=>['required',Rule::in(['Hindi','English'])]
        ]);

        if($validator->fails()){
            return response([
                'status'=>false,
                'message'=> $validator->errors()
            ],401);
        }

        $validated = $validator->validated();

        return ResourcesQuestionAnswer::collection(QuestionAnswer::Where('language',$validated['language'])->inRandomOrder()->paginate(5))->additional(['status'=>true]);

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
        $validator=Validator::make($request->all(),[
            'question'=>'required|string',
            'question_level'=>'required|numeric',
            'language'=>'required|string',
            'correct_answer'=>'required|string',
        ]);

        if($validator->fails()){
            return response([
                'status'=>false,
                'message'=> $validator->errors()
            ],401);
        }
        // Retrieve the validated input...
        $validated = $validator->validated();

        $newQuestionAnswer=new QuestionAnswer([
            'question'=>$validated['question'],
            'question_level'=>$validated['question_level'],
            'correct_answer'=>$validated['correct_answer'],
            'wrong_answer1'=>$request->input('wrong_answer1'),
            'wrong_answer2'=>$request->input('wrong_answer2'),
            'wrong_answer3'=>$request->input('wrong_answer3'),
            'wrong_answer4'=>$request->input('wrong_answer4'),
            'wrong_answer5'=>$request->input('wrong_answer5'),
            'explanation'=>$request->input('explanation'),
            'language'=>$validated['language'],
            'pokp_link'=>$request->input('pokp_link'),
            'bodhitube_podbean_link'=>$request->input('bodhitube_podbean_link'),
            'created_by'=>auth()->user()->name,
            'verification_status'=>false, // not verified
            'reviewed_by'=>null, // null when question is first created. it will be reviwed by someone else
            'last_modified_by'=>auth()->user()->name,   // need to get the user from session or token
            'reviewed_by'=>$request->input('reviewed_by'),
        ]);

        $newQuestionAnswer->save();
        return response()->json([
            'status'=>true,
            "message"=>"Question and Answers added.",
            "data"=> new ResourcesQuestionAnswer($newQuestionAnswer)
        ],201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuestionAnswer  $question
     * @return \Illuminate\Http\Response
     */
    public function show(QuestionAnswer $questionAnswer)
    {
        return response()->json([
            'status'=>true,
            "data"=> new ResourcesQuestionAnswer($questionAnswer)
        ],200);
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
     * @param  \App\Models\QuestionAnswer  $questionAnswer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,QuestionAnswer $questionAnswer)
    {

        if($request->input('verification_status')=='true'){
            $verification_status=true;
            $validator=Validator::make($request->all(),[
                'question'=>'required|string',
                'question_level'=>'required|numeric',
                'language'=>'required|string',
                'correct_answer'=>'required|string',
                'wrong_answer1'=>'required|string',
                'wrong_answer2'=>'required|string',
                'wrong_answer3'=>'required|string',
                'wrong_answer4'=>'required|string',
                'wrong_answer5'=>'required|string',
                'explanation'=>'required|string',
                'language'=>'required|string',
                'pokp_link'=>'required|url',
                'bodhitube_podbean_link'=>'required|url',
                'verification_status'=>'required', // not verified
            ]);


        }else{
            $verification_status=false;
            $validator=Validator::make($request->all(),[
                'question'=>'required|string',
                'question_level'=>'required|numeric',
                'language'=>'required|string',
                'correct_answer'=>'required|string',
            ]);
        }

        if($validator->fails()){
            return response([
                'status'=>false,
                'message'=> $validator->errors()
            ],401);
        }

        // Retrieve the validated input...
        $validated = $validator->validated();

        $questionAnswer->question=$validated['question'];
        $questionAnswer->correct_answer=$validated['question'];
        $questionAnswer->wrong_answer1=$request->input('wrong_answer1');
        $questionAnswer->wrong_answer2=$request->input('wrong_answer2');
        $questionAnswer->wrong_answer3=$request->input('wrong_answer3');
        $questionAnswer->wrong_answer4=$request->input('wrong_answer4');
        $questionAnswer->wrong_answer5=$request->input('wrong_answer5');
        $questionAnswer->explanation=$request->input('explanation');
        $questionAnswer->language=$validated['language'];
        $questionAnswer->pokp_link=$request->input('pokp_link');
        $questionAnswer->bodhitube_podbean_link=$request->input('bodhitube_podbean_link');
        $questionAnswer->verification_status=$verification_status;
        $questionAnswer->reviewed_by=$request->input('reviewed_by');
        $questionAnswer->last_modified_by=auth()->user()->name;
        $questionAnswer->reviewed_by=$verification_status?auth()->user()->name:null;

        $questionAnswer->save();

        return response()->json([
            'status'=>true,
            'message'=>"Question Answer updated successfully!",
            'data'=>new ResourcesQuestionAnswer($questionAnswer)
        ],201);
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
        return response()->json([
            'status'=>true,
            'message'=>"Deleted Successfully!"
        ],200);
    }


}
