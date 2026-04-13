<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';
    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'project_id',
        'assignee_id',
        'creator_id',
        'due_date',
    ];
    
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
}
