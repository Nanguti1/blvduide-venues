<?php

namespace App\Enums;

enum VenueApprovalStatus: string
{
    case Draft = 'draft';
    case Pending = 'pending';
    case Published = 'published';
    case Rejected = 'rejected';
}
