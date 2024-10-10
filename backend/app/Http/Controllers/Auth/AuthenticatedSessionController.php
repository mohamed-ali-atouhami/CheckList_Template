<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();
        $guards = ['web','admin'];//array_keys(config('auth.guards'));
        $user = null;
        foreach($guards as $guard){
            $Currentguard = Auth::guard($guard);
            if($Currentguard->check()){
                $user = $Currentguard->user();
                break;
            }
        }
        // If no user was found, return a custom error message
        // if ($user === null) {
        //     return response()->json([
        //         'message' => "These credentials don't match our records"
        //     ], 401);  // Use 401 Unauthorized status code
        // }
        $request->session()->regenerate();

        return response()->json([
            'user'=>$user,
            'token'=> $user->createToken('api',[$user->getRoleAttribute()])->plainTextToken
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        $guards = ['web','admin'];//array_keys(config('auth.guards'));
        $user = null;
        foreach($guards as $guard){
            $Currentguard = Auth::guard($guard);
            if($Currentguard->check()){
                $user = $Currentguard->user();
                break;
            }
        }
        $user->tokens()->delete();
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
