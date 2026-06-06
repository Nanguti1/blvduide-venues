import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
export const show = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/venues/locations/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
show.url = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { locale: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: typeof args.locale === 'object'
                ? args.locale.slug
                : args.locale,
                }

    return show.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
show.get = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
show.head = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
    const showForm = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
        showForm.get = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
        showForm.head = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const locales = {
    show: Object.assign(show, show),
}

export default locales