<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShiftResource;
use App\Models\Shift;
use App\Http\Requests\StoreShiftRequest;
use App\Http\Requests\UpdateShiftRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        //
        return ShiftResource::collection(Shift::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShiftRequest $request): JsonResponse
    {
        //
        $validateForms = $request->validated();
        $shift = Shift::create($validateForms);
        $response = new ShiftResource($shift);
        return response()->json([
            "shift" =>$response,
            "message" => __("Shift Created Successfuly .")
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Shift $shift)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShiftRequest $request, Shift $shift): JsonResponse
    {
        //
        $validateForms = $request->validated();
        $shift->update($validateForms);
        $response = new ShiftResource($shift);
        return response()->json([
            "shift" =>$response,
            "message" => __("Shift Updated Successfuly .")
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shift $shift): JsonResponse
    {
        //
        $shift->delete();
        $response = new ShiftResource($shift);
        return response()->json([
            "shift" =>$response,
            "message" => __("Shift Deleted Successfuly .")
        ]);
    }
}
