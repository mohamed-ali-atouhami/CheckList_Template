<?php

namespace App\Http\Resources;
use App\Http\Resources\LineResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'line_id' => $this->line_id,
            'line' => new LineResource($this->whenLoaded('line')), // Include the line data
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
