import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Public\VenueController::category
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
export const category = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: category.url(args, options),
    method: 'get',
})

category.definition = {
    methods: ["get","head"],
    url: '/venues/categories/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\VenueController::category
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
category.url = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return category.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\VenueController::category
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
category.get = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: category.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\VenueController::category
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
category.head = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: category.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\VenueController::category
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
    const categoryForm = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: category.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\VenueController::category
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
        categoryForm.get = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: category.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\VenueController::category
 * @see app/Http/Controllers/Public/VenueController.php:69
 * @route '/venues/categories/{category}'
 */
        categoryForm.head = (args: { category: string | { slug: string } } | [category: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: category.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    category.form = categoryForm
/**
* @see \App\Http\Controllers\Public\VenueController::locale
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
export const locale = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locale.url(args, options),
    method: 'get',
})

locale.definition = {
    methods: ["get","head"],
    url: '/venues/locations/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\VenueController::locale
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
locale.url = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return locale.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\VenueController::locale
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
locale.get = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locale.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\VenueController::locale
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
locale.head = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: locale.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\VenueController::locale
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
    const localeForm = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: locale.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\VenueController::locale
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
        localeForm.get = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: locale.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\VenueController::locale
 * @see app/Http/Controllers/Public/VenueController.php:88
 * @route '/venues/locations/{locale}'
 */
        localeForm.head = (args: { locale: string | { slug: string } } | [locale: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: locale.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    locale.form = localeForm
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
const VenueController = { index, category, locale, show }

export default VenueController