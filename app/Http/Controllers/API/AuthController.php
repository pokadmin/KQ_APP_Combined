<?php

//https://dev.to/shaileshjadav/laravel-8-rest-api-authentication-using-sanctum-3eb8
//https://devdocs-fr.github.io/laravel/7.x/sanctum#spa-authentication
//https://www.section.io/engineering-education/laravel-sanctum-api-auth/
//https://www.codecheef.org/article/laravel-sanctum-authentication-example-with-product-api
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\User;
use Google_Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;


class AuthController extends Controller
{

    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name'=>'required|string',
            'email'=>'required|string|email|unique:users,email',
            'password'=>'required|confirmed',
            'language'=>'required|string'
        ]);


        if($validator->fails()){
            return response([
                'status'=>false,
                'message'=> $validator->errors()
            ],401);
        }


        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'language'=>$request->language
        ]);

        // create token

        //$token=$user->createToken('myappToken')->plainTextToken;

        $response=[
            'status'=>true,
            'message'=>'Registered Successfully!',
            'data'=>[
                'user'=>$user,
                //'token'=>$token
            ]
        ];
        return response($response,201);


    } //register ends


    /**
     * Login
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request){

        $validator = Validator::make($request->all(), [
            'email'=>'required|string|email',
            'password'=>'required'
        ]);

        if($validator->fails()){
            return response([
                'status'=>false,
                'message'=> $validator->errors()
            ],401);
        }

        $creds=$validator->validated();



        // now send these creds to gyanmarg api and authenticate the user
        $postData=array(
            'pokpemail' => $creds['email'],
            'ver' => '2',
            'pass' => $creds['password'],
            'authcode' => env('GYANMARG_API_AUTHCODE')
        );

        $apiURL=env('GYANMARG_API_AUTH_URL');

        $response = Http::asForm()->post($apiURL, $postData);

        $result=$response->body();
        $userDetails=explode(",",$result);

        // check if error
        if($userDetails[0]=='Error'){
            return response([
                'status'=>false,
                'message'=>'invalid email or password'
            ],401);
        }

        /**
         * Assign user type
         * if user is on or beyond step7 then he is given admin rights
         */
        $userType='user';
        if($userDetails[2]>=7){
            $userType='admin';
        }
        $userData=array(
            'language'=>$userDetails[0],
            'name'=>$userDetails[1],
            'type'=>$userType
        );

       /*  $arrayResult=$response->json();  */// 0=>Question, 1=>correct answer,2=>wrong answer,3=>wrong answer... 7=>explanantion


      /*   if(!Auth::attempt($creds)){
            return response([
                'status'=>false,
                'message'=>'invalid email or password'
            ],401);
        } */

        //check email
      /*  $user=User::where('email',$request->email)->first();

        //check password
        if(!$user ||!Hash::check($request->password,$user->password)){

        }

        //create token
       // $token=$user->createToken('myappToken')->plainTextToken;
        */
        $response=[
            'status'=>true,
            'message'=>'Login successful!',
            'user'=>$userData,
        ];

        return response($response,201);

    }//Login ends


    /**
     * Redirect To Auth URL
     *
     * generates Google redirect url and returns it
     * @return \Illuminate\Http\JsonResponse
     */
    public function redirectToAuth():JsonResponse
    {

        //https://xdoo.hr/google-login-with-react-and-laravel-api/
        return response()->json([
            /* 'url'=>Socialite::driver('google')
                ->stateless()
                ->redirect()
                ->getTargetUrl(), */
            'clientId'=>env('GOOGLE_CLIENT_ID')
        ]);

    }//redirectToAuth ends



    /**
     * Handle Auth Callback
     *
     * handleAuthCallback contains the logic to handle the callback
     * @return \Illuminate\Http\JsonResponse $user,$access_token
     */
    public function handleAuthCallback(Request $request)
    {
        $id_token=$request->credential;
        // Get $id_token via HTTPS POST.

        // now verify that id with google and get user information
        $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);  // Specify the CLIENT_ID of the app that accesses the backend
        $payload = $client->verifyIdToken($id_token);
        if ($payload) {

            /** @var User $user */
            $user=User::query()
            ->firstOrCreate(
                [
                    'email'=>$payload['email'],
                ],
                [
                    'email_verified_at'=>now(),
                    'name'=>$payload['name'],
                    'google_id'=>$payload['sub'],
                    'avatar'=>$payload['picture'],
                ]
            );

        } else {
            return response(['error'=>'Invalid credentials provided'],422);
        }


        return response([
            'user'=>$user,
            'access_token'=>$user->createToken('google-token')->plainTextToken,
            'token_type'=>'Bearer',
        ]);
    }

}
