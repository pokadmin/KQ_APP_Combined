<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionAnswer extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        // here we can format,remove, edit the response fields as we need
        return [
            'id'=>(string)$this->id, // converted to string to adhere with json standards
            'question_level'=>$this->question_level,
            'question'=>$this->question,
            'answers'=>[
                'correct_answer'=>$this->correct_answer,
                'wrong_answer1'=>$this->wrong_answer1,
                'wrong_answer2'=>$this->wrong_answer2,
                'wrong_answer3'=>$this->wrong_answer3,
                'wrong_answer4'=>$this->wrong_answer4,
                'wrong_answer5'=>$this->wrong_answer5,
            ],
            'explanation'=>$this->explanation,

            'attributes'=>[
                'language'=>$this->language,
                'pokp_link'=>$this->pokp_link,
                'bodhitube_podbean_link'=>$this->bodhitube_podbean_link,
                'created_by'=>$this->created_by,
                'reviewed_by'=>$this->reviewed_by,
                'verification_status'=>$this->verification_status,
                'last_modified_by'=>$this->last_modified_by,
                'created_at'=>(string)$this->created_at,
                'updated_at'=>(string)$this->updated_at
            ],

        ];
    }
}
