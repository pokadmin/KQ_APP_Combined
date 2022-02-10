<?php

namespace App\Exceptions;

use Error;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\PostTooLargeException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Throwable;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var string[]
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var string[]
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (NotFoundHttpException $exception, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'status'=>false,
                    'message' => 'Record not found.'
                ], 404);
            }
        });


        // 403 Forbidden
        $this->renderable(function (AccessDeniedHttpException $exception, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'status'=>false,
                    'message' => 'This action is unauthorized!'
                ], 403);
            }
        });


         // 400 File too large
         $this->renderable(function (PostTooLargeException $exception, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'status'=>false,
                    'message' => "Size of attached file should be less " . ini_get("upload_max_filesize") . "B"
                ], 400);
            }
        });

         // 401 Unauthenticated
         $this->renderable(function (AuthenticationException $exception, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'status'=>false,
                    'message' => 'Unauthenticated or Token Expired'
                ], 401);
            }
        });

         // 429 Throttle
         $this->renderable(function (ThrottleRequestsException $exception, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'status'=>false,
                    'message' => 'Too Many Requests,Please Slow Down'
                ], 429);
            }
        });


         // 422 Validation
         $this->renderable(function (ValidationException $exception, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'status'=>false,
                    'message' => $exception->getMessage(),
                    'errors'=>$exception->errors()
                ], 422);
            }
        });


         // 500 Error
         $this->renderable(function (Error $exception, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'status'=>false,
                    'message' => 'There was some internal error'
                ], 500);
            }
        });
    }
}
