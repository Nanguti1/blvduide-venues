import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::index
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:13
 * @route '/dashboard/approvals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/approvals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::index
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:13
 * @route '/dashboard/approvals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::index
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:13
 * @route '/dashboard/approvals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::index
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:13
 * @route '/dashboard/approvals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::index
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:13
 * @route '/dashboard/approvals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::index
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:13
 * @route '/dashboard/approvals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::index
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:13
 * @route '/dashboard/approvals'
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
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::approve
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:31
 * @route '/dashboard/approvals/{venue}/approve'
 */
export const approve = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

approve.definition = {
    methods: ["patch"],
    url: '/dashboard/approvals/{venue}/approve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::approve
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:31
 * @route '/dashboard/approvals/{venue}/approve'
 */
approve.url = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return approve.definition.url
            .replace('{venue}', parsedArgs.venue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::approve
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:31
 * @route '/dashboard/approvals/{venue}/approve'
 */
approve.patch = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::approve
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:31
 * @route '/dashboard/approvals/{venue}/approve'
 */
    const approveForm = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::approve
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:31
 * @route '/dashboard/approvals/{venue}/approve'
 */
        approveForm.patch = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::reject
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:43
 * @route '/dashboard/approvals/{venue}/reject'
 */
export const reject = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

reject.definition = {
    methods: ["patch"],
    url: '/dashboard/approvals/{venue}/reject',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::reject
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:43
 * @route '/dashboard/approvals/{venue}/reject'
 */
reject.url = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return reject.definition.url
            .replace('{venue}', parsedArgs.venue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::reject
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:43
 * @route '/dashboard/approvals/{venue}/reject'
 */
reject.patch = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::reject
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:43
 * @route '/dashboard/approvals/{venue}/reject'
 */
    const rejectForm = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\VenueApprovalController::reject
 * @see app/Http/Controllers/Dashboard/VenueApprovalController.php:43
 * @route '/dashboard/approvals/{venue}/reject'
 */
        rejectForm.patch = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    reject.form = rejectForm
const approvals = {
    index: Object.assign(index, index),
approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
}

export default approvals