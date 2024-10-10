<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        //
        return UserResource::collection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        //
        $validateForms = $request->validated();
        $validateForms['password'] = Hash::make($validateForms['password']);
        $user = User::create($validateForms);
        $response = new UserResource($user);
        return response()->json([
            "user" =>$response,
            "message" => __("User Created Successfuly .")
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        //
        $validateForms = $request->validated();
        $validateForms['password'] = Hash::make($validateForms['password']);
        $user->update($validateForms);
        $response = new UserResource($user);
        return response()->json([
            "user" =>$response,
            "message" => __("User Updated Successfuly .")
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        //
        $user->delete();
        $response = new UserResource($user);
        return response()->json([
            "user" =>$response,
            "message" => __("User Deleted Successfuly .")
        ]);
    }
}
