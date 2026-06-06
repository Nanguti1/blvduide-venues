import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/venues/{venue}/favorite'
 */
const toggle258e4194483ce34707c95da59bfe4ae1 = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle258e4194483ce34707c95da59bfe4ae1.url(args, options),
    method: 'post',
})

toggle258e4194483ce34707c95da59bfe4ae1.definition = {
    methods: ["post"],
    url: '/venues/{venue}/favorite',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/venues/{venue}/favorite'
 */
toggle258e4194483ce34707c95da59bfe4ae1.url = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return toggle258e4194483ce34707c95da59bfe4ae1.definition.url
            .replace('{venue}', parsedArgs.venue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/venues/{venue}/favorite'
 */
toggle258e4194483ce34707c95da59bfe4ae1.post = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle258e4194483ce34707c95da59bfe4ae1.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/venues/{venue}/favorite'
 */
    const toggle258e4194483ce34707c95da59bfe4ae1Form = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle258e4194483ce34707c95da59bfe4ae1.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/venues/{venue}/favorite'
 */
        toggle258e4194483ce34707c95da59bfe4ae1Form.post = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle258e4194483ce34707c95da59bfe4ae1.url(args, options),
            method: 'post',
        })
    
    toggle258e4194483ce34707c95da59bfe4ae1.form = toggle258e4194483ce34707c95da59bfe4ae1Form
    /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/dashboard/favorites/{venue}'
 */
const toggleb36257d0223619a0e18d491a1fe250e2 = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleb36257d0223619a0e18d491a1fe250e2.url(args, options),
    method: 'post',
})

toggleb36257d0223619a0e18d491a1fe250e2.definition = {
    methods: ["post"],
    url: '/dashboard/favorites/{venue}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/dashboard/favorites/{venue}'
 */
toggleb36257d0223619a0e18d491a1fe250e2.url = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return toggleb36257d0223619a0e18d491a1fe250e2.definition.url
            .replace('{venue}', parsedArgs.venue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/dashboard/favorites/{venue}'
 */
toggleb36257d0223619a0e18d491a1fe250e2.post = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleb36257d0223619a0e18d491a1fe250e2.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/dashboard/favorites/{venue}'
 */
    const toggleb36257d0223619a0e18d491a1fe250e2Form = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleb36257d0223619a0e18d491a1fe250e2.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/dashboard/favorites/{venue}'
 */
        toggleb36257d0223619a0e18d491a1fe250e2Form.post = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleb36257d0223619a0e18d491a1fe250e2.url(args, options),
            method: 'post',
        })
    
    toggleb36257d0223619a0e18d491a1fe250e2.form = toggleb36257d0223619a0e18d491a1fe250e2Form

/**
* Multiple routes resolve to \App\Http\Controllers\Dashboard\FavoriteController::toggle, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `toggle['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const toggle = {
    '/venues/{venue}/favorite': toggle258e4194483ce34707c95da59bfe4ae1,
    '/dashboard/favorites/{venue}': toggleb36257d0223619a0e18d491a1fe250e2,
}

/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::index
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:12
 * @route '/dashboard/favorites'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/favorites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::index
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:12
 * @route '/dashboard/favorites'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::index
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:12
 * @route '/dashboard/favorites'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::index
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:12
 * @route '/dashboard/favorites'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::index
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:12
 * @route '/dashboard/favorites'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::index
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:12
 * @route '/dashboard/favorites'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::index
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:12
 * @route '/dashboard/favorites'
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
const FavoriteController = { toggle, index }

export default FavoriteController