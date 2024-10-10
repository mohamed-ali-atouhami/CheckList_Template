<?php

namespace App\Http\Controllers;

use App\Models\Line;
use App\Http\Requests\StoreLineRequest;
use App\Http\Requests\UpdateLineRequest;
use App\Http\Resources\LineResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        //
        return LineResource::collection(Line::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLineRequest $request): JsonResponse
    {
        //
        $validateForms = $request->validated();
        $line = Line::create($validateForms);
        $response = new LineResource($line);
        return response()->json([
            "line" =>$response,
            "message" => __("Line Created Successfuly .")
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Line $line)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLineRequest $request, Line $line): JsonResponse
    {
        //
        $validateForms = $request->validated();
        $line->update($validateForms);
        $response = new LineResource($line);
        return response()->json([
            "line" =>$response,
            "message" => __("Line Updated Successfuly .")
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Line $line): JsonResponse
    {
        //
        $line->delete();
        $response = new LineResource($line);
        return response()->json([
            "line" =>$response,
            "message" => __("Line Deleted Successfuly .")
        ]);
    }
}
