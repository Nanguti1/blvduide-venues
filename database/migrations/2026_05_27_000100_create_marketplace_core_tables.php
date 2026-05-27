<?php

use App\Enums\VenueApprovalStatus;
use App\Enums\VenueOperationalStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('venue_categories', function (Blueprint $table): void {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('icon')->nullable();
            $table->timestamps();
        });

        Schema::create('venue_features', function (Blueprint $table): void {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('countries', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('iso2', 2)->index();
            $table->string('slug')->index();
            $table->timestamps();
        });

        Schema::create('counties', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('country_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->index();
            $table->timestamps();
            $table->unique(['country_id', 'slug']);
        });

        Schema::create('cities', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('county_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->index();
            $table->timestamps();
            $table->unique(['county_id', 'slug']);
        });

        Schema::create('locales', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('city_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->index();
            $table->timestamps();
            $table->unique(['city_id', 'slug']);
        });

        Schema::create('venues', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('venue_category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('country_id')->constrained()->restrictOnDelete();
            $table->foreignId('county_id')->constrained()->restrictOnDelete();
            $table->foreignId('city_id')->constrained()->restrictOnDelete();
            $table->foreignId('locale_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('short_description')->nullable();
            $table->string('operational_status')->default(VenueOperationalStatus::Draft->value)->index();
            $table->string('approval_status')->default(VenueApprovalStatus::Draft->value)->index();
            $table->boolean('featured')->default(false)->index();
            $table->decimal('price', 12, 2)->nullable()->index();
            $table->string('address')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('website')->nullable();
            $table->unsignedInteger('capacity')->nullable()->index();
            $table->timestamp('published_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->fullText(['title', 'description']);
        });

        Schema::create('venue_feature', function (Blueprint $table): void {
            $table->foreignId('venue_id')->constrained()->cascadeOnDelete();
            $table->foreignId('venue_feature_id')->constrained()->cascadeOnDelete();
            $table->primary(['venue_id', 'venue_feature_id']);
        });

        Schema::create('packages', function (Blueprint $table): void {
            $table->id();
            $table->string('name')->unique();
            $table->decimal('price', 12, 2)->default(0);
            $table->unsignedInteger('duration_days');
            $table->unsignedInteger('max_listings');
            $table->unsignedInteger('max_images_per_listing');
            $table->unsignedInteger('featured_listing_allowance')->default(0);
            $table->string('badge_color')->default('#64748b');
            $table->json('support_features')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('subscriptions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('package_id')->constrained()->restrictOnDelete();
            $table->timestamp('starts_at');
            $table->timestamp('expires_at');
            $table->string('payment_status')->default('pending')->index();
            $table->string('transaction_reference')->nullable()->index();
            $table->string('status')->default('active')->index();
            $table->timestamps();
        });

        Schema::create('reviews', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('venue_id')->constrained()->cascadeOnDelete();
            $table->tinyInteger('rating');
            $table->text('comment');
            $table->string('status')->default('pending')->index();
            $table->timestamps();
        });

        Schema::create('favorites', function (Blueprint $table): void {
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('venue_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->primary(['user_id', 'venue_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('favorites');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('subscriptions');
        Schema::dropIfExists('packages');
        Schema::dropIfExists('venue_feature');
        Schema::dropIfExists('venues');
        Schema::dropIfExists('locales');
        Schema::dropIfExists('cities');
        Schema::dropIfExists('counties');
        Schema::dropIfExists('countries');
        Schema::dropIfExists('venue_features');
        Schema::dropIfExists('venue_categories');
    }
};
