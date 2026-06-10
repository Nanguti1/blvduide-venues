<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        return Inertia::render('about');
    }

    public function contact()
    {
        return Inertia::render('contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        ContactInquiry::create($validated);
        Log::info('Contact inquiry received.', $validated);

        try {
            Mail::raw(implode("\n", [
                'New contact inquiry received.',
                'Name: '.$validated['full_name'],
                'Email: '.$validated['email'],
                'Phone: '.($validated['phone'] ?? 'N/A'),
                'Subject: '.$validated['subject'],
                'Message:',
                $validated['message'],
            ]), function ($message) use ($validated) {
                $message
                    ->to(config('mail.from.address', 'support@blvdguide.com'))
                    ->subject('BLVD GUIDE inquiry: '.$validated['subject'])
                    ->replyTo($validated['email'], $validated['full_name']);
            });
        } catch (\Throwable $exception) {
            Log::error('Failed to send contact inquiry email.', [
                'error' => $exception->getMessage(),
                'inquiry' => $validated,
            ]);
        }

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Thanks! Your message has been sent. We will get back to you shortly.',
        ]);
    }
}
