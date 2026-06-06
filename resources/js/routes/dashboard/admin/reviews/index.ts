import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::index
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:12
 * @route '/dashboard/admin/reviews'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/admin/reviews',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::index
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:12
 * @route '/dashboard/admin/reviews'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::index
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:12
 * @route '/dashboard/admin/reviews'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::index
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:12
 * @route '/dashboard/admin/reviews'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::index
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:12
 * @route '/dashboard/admin/reviews'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::index
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:12
 * @route '/dashboard/admin/reviews'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::index
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:12
 * @route '/dashboard/admin/reviews'
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
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::approve
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:26
 * @route '/dashboard/admin/reviews/{review}/approve'
 */
export const approve = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

approve.definition = {
    methods: ["patch"],
    url: '/dashboard/admin/reviews/{review}/approve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::approve
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:26
 * @route '/dashboard/admin/reviews/{review}/approve'
 */
approve.url = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { review: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    review: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        review: typeof args.review === 'object'
                ? args.review.id
                : args.review,
                }

    return approve.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::approve
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:26
 * @route '/dashboard/admin/reviews/{review}/approve'
 */
approve.patch = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::approve
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:26
 * @route '/dashboard/admin/reviews/{review}/approve'
 */
    const approveForm = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::approve
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:26
 * @route '/dashboard/admin/reviews/{review}/approve'
 */
        approveForm.patch = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::reject
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:35
 * @route '/dashboard/admin/reviews/{review}/reject'
 */
export const reject = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

reject.definition = {
    methods: ["patch"],
    url: '/dashboard/admin/reviews/{review}/reject',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::reject
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:35
 * @route '/dashboard/admin/reviews/{review}/reject'
 */
reject.url = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { review: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    review: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        review: typeof args.review === 'object'
                ? args.review.id
                : args.review,
                }

    return reject.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::reject
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:35
 * @route '/dashboard/admin/reviews/{review}/reject'
 */
reject.patch = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reject.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::reject
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:35
 * @route '/dashboard/admin/reviews/{review}/reject'
 */
    const rejectForm = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\ReviewModerationController::reject
 * @see app/Http/Controllers/Dashboard/ReviewModerationController.php:35
 * @route '/dashboard/admin/reviews/{review}/reject'
 */
        rejectForm.patch = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    reject.form = rejectForm
const reviews = {
    index: Object.assign(index, index),
approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
}

export default reviews