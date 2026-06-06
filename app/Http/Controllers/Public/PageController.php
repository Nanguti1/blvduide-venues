<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
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
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'zip_code' => ['nullable', 'string', 'max:20'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        Log::info('Homepage inquiry received.', $validated);

        try {
            Mail::raw(implode("\n", [
                'New homepage inquiry received.',
                'Name: '.$validated['first_name'].' '.$validated['last_name'],
                'Email: '.$validated['email'],
                'Zip Code: '.($validated['zip_code'] ?? 'N/A'),
                'Message:',
                $validated['message'],
            ]), function ($message) use ($validated) {
                $message
                    ->to(config('mail.from.address', 'support@blvdguide.test'))
                    ->subject('BLVD GUIDE inquiry: '.$validated['first_name'].' '.$validated['last_name'])
                    ->replyTo($validated['email'], $validated['first_name'].' '.$validated['last_name']);
            });
        } catch (\Throwable $exception) {
            Log::error('Failed to send homepage inquiry email.', [
                'error' => $exception->getMessage(),
                'inquiry' => $validated,
            ]);
        }

        return redirect()->route('home')->with('toast', [
            'type' => 'success',
            'message' => 'Thanks! Your inquiry has been sent. We will get back to you shortly.',
        ]);
    }
}
