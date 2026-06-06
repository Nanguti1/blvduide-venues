import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import categories from './categories'
import locales from './locales'
import reviews from './reviews'
import favorite from './favorite'
/**
* @see \App\Http\Controllers\Public\VenueController::index
 * @see app/Http/Controllers/Public/VenueController.php:18
 * @route '/venues'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/venues',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\VenueController::index
 * @see app/Http/Controllers/Public/VenueController.php:18
 * @route '/venues'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\VenueController::index
 * @see app/Http/Controllers/Public/VenueController.php:18
 * @route '/venues'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\VenueController::index
 * @see app/Http/Controllers/Public/VenueController.php:18
 * @route '/venues'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\VenueController::index
 * @see app/Http/Controllers/Public/VenueController.php:18
 * @route '/venues'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\VenueController::index
 * @see app/Http/Controllers/Public/VenueController.php:18
 * @route '/venues'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\VenueController::index
 * @see app/Http/Controllers/Public/VenueController.php:18
 * @route '/venues'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:49
 * @route '/venues/{venue}'
 */
export const show = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/venues/{venue}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:49
 * @route '/venues/{venue}'
 */
show.url = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { venue: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { venue: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    venue: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        venue: typeof args.venue === 'object'
                ? args.venue.slug
                : args.venue,
                }

    return show.definition.url
            .replace('{venue}', parsedArgs.venue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:49
 * @route '/venues/{venue}'
 */
show.get = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:49
 * @route '/venues/{venue}'
 */
show.head = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:49
 * @route '/venues/{venue}'
 */
    const showForm = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:49
 * @route '/venues/{venue}'
 */
        showForm.get = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:49
 * @route '/venues/{venue}'
 */
        showForm.head = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const venues = {
    index: Object.assign(index, index),
categories: Object.assign(categories, categories),
locales: Object.assign(locales, locales),
show: Object.assign(show, show),
reviews: Object.assign(reviews, reviews),
favorite: Object.assign(favorite, favorite),
}

export default venues