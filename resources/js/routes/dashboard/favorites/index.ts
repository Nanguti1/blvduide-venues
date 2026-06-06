import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/dashboard/favorites/{venue}'
 */
export const toggle = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/dashboard/favorites/{venue}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/dashboard/favorites/{venue}'
 */
toggle.url = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return toggle.definition.url
            .replace('{venue}', parsedArgs.venue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/dashboard/favorites/{venue}'
 */
toggle.post = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/dashboard/favorites/{venue}'
 */
    const toggleForm = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/dashboard/favorites/{venue}'
 */
        toggleForm.post = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
const favorites = {
    index: Object.assign(index, index),
toggle: Object.assign(toggle, toggle),
}

export default favorites