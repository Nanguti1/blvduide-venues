<?php

namespace App\Enums;

enum VenueOperationalStatus: string
{
    case Available = 'available';
    case FullyBooked = 'fully_booked';
    case Closed = 'closed';
    case UnderRenovation = 'under_renovation';
    case Draft = 'draft';
    case PendingApproval = 'pending_approval';
}
