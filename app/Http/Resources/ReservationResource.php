<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'reservation';
    public function toArray($request)
    {
        return [
            'id'=>$this->resource->id,
            'user'=> new UserResource($this->resource->user),
            'makeup_artist' => new UserResource($this->resource->user->where('id', $this->resource->makeup_artist_id)->first()),
            'service'=>new ServiceResource($this->resource->service),
            'date'=>$this->resource->date,
            'time'=>$this->resource->time,
            'status'=>$this->resource->status
        ];
    }
}
