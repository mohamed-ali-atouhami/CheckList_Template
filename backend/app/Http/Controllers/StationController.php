<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Http\Requests\StoreStationRequest;
use App\Http\Requests\UpdateStationRequest;
use App\Http\Resources\StationResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        //
        return StationResource::collection(Station::with('line')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStationRequest $request): JsonResponse
    {
        //
        $validateForms = $request->validated();
        $station = Station::create($validateForms);
        $response = new StationResource($station);
        return response()->json([
            "station" =>$response,
            "message" => __("Station Created Successfuly .")
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Station $station)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStationRequest $request, Station $station): JsonResponse
    {
        //
        $validateForms = $request->validated();
        $station->update($validateForms);
         // Load the line relationship after updating
        $station->load('line');  // Eager load the 'line' relationship
        $response = new StationResource($station);
        return response()->json([
            "station" =>$response,
            "message" => __("station Updated Successfuly .")
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Station $station): JsonResponse
    {
        //
        $station->delete();
        $response = new StationResource($station);
        return response()->json([
            "station" =>$response,
            "message" => __("Station Deleted Successfuly .")
        ]);
    }
}
