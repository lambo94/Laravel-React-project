<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('d/m/Y'),
            'status' => $this->status,
            'due_date' => (new Carbon($this->due_date))->format('d/m/Y'),
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->upadtedBy),
            'image_path' => $this->image_path,
            'priority' => $this->priority,
            'assigned_user' => new UserResource($this->assignedUser),
            'project' => new ProjectResource($this->project)
        ];
    }
}
