import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
export const show = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/venues/categories/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
show.url = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { category: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.slug
                : args.category,
                }

    return show.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
show.get = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
show.head = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
    const showForm = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
        showForm.get = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\VenueController::show
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
        showForm.head = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const categories = {
    show: Object.assign(show, show),
}

export default categories