import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\ReviewController::store
 * @see app/Http/Controllers/Dashboard/ReviewController.php:26
 * @route '/venues/{venue}/reviews'
 */
export const store = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/venues/{venue}/reviews',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\ReviewController::store
 * @see app/Http/Controllers/Dashboard/ReviewController.php:26
 * @route '/venues/{venue}/reviews'
 */
store.url = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{venue}', parsedArgs.venue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\ReviewController::store
 * @see app/Http/Controllers/Dashboard/ReviewController.php:26
 * @route '/venues/{venue}/reviews'
 */
store.post = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Dashboard\ReviewController::store
 * @see app/Http/Controllers/Dashboard/ReviewController.php:26
 * @route '/venues/{venue}/reviews'
 */
    const storeForm = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\ReviewController::store
 * @see app/Http/Controllers/Dashboard/ReviewController.php:26
 * @route '/venues/{venue}/reviews'
 */
        storeForm.post = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Dashboard\ReviewController::index
 * @see app/Http/Controllers/Dashboard/ReviewController.php:13
 * @route '/dashboard/reviews'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/reviews',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\ReviewController::index
 * @see app/Http/Controllers/Dashboard/ReviewController.php:13
 * @route '/dashboard/reviews'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\ReviewController::index
 * @see app/Http/Controllers/Dashboard/ReviewController.php:13
 * @route '/dashboard/reviews'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Dashboard\ReviewController::index
 * @see app/Http/Controllers/Dashboard/ReviewController.php:13
 * @route '/dashboard/reviews'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Dashboard\ReviewController::index
 * @see app/Http/Controllers/Dashboard/ReviewController.php:13
 * @route '/dashboard/reviews'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Dashboard\ReviewController::index
 * @see app/Http/Controllers/Dashboard/ReviewController.php:13
 * @route '/dashboard/reviews'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Dashboard\ReviewController::index
 * @see app/Http/Controllers/Dashboard/ReviewController.php:13
 * @route '/dashboard/reviews'
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
const ReviewController = { store, index }

export default ReviewController