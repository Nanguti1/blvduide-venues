<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['full_name', 'email', 'phone', 'subject', 'message'])]
class ContactInquiry extends Model
{
    use HasFactory;
}
