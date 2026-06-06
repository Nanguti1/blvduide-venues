import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/venues/{venue}/favorite'
 */
export const toggle = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/venues/{venue}/favorite',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/venues/{venue}/favorite'
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
 * @route '/venues/{venue}/favorite'
 */
toggle.post = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/venues/{venue}/favorite'
 */
    const toggleForm = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\FavoriteController::toggle
 * @see app/Http/Controllers/Dashboard/FavoriteController.php:24
 * @route '/venues/{venue}/favorite'
 */
        toggleForm.post = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
const favorite = {
    toggle: Object.assign(toggle, toggle),
}

export default favorite