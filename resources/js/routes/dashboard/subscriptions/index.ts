import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::index
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:15
 * @route '/dashboard/subscriptions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/subscriptions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::index
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:15
 * @route '/dashboard/subscriptions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::index
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:15
 * @route '/dashboard/subscriptions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::index
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:15
 * @route '/dashboard/subscriptions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::index
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:15
 * @route '/dashboard/subscriptions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::index
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:15
 * @route '/dashboard/subscriptions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::index
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:15
 * @route '/dashboard/subscriptions'
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
* @see \App\Http\Controllers\Dashboard\SubscriptionController::store
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:33
 * @route '/dashboard/subscriptions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/subscriptions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::store
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:33
 * @route '/dashboard/subscriptions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::store
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:33
 * @route '/dashboard/subscriptions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::store
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:33
 * @route '/dashboard/subscriptions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::store
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:33
 * @route '/dashboard/subscriptions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::show
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:24
 * @route '/dashboard/subscriptions/{subscription}'
 */
export const show = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/subscriptions/{subscription}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::show
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:24
 * @route '/dashboard/subscriptions/{subscription}'
 */
show.url = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subscription: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subscription: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subscription: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subscription: typeof args.subscription === 'object'
                ? args.subscription.id
                : args.subscription,
                }

    return show.definition.url
            .replace('{subscription}', parsedArgs.subscription.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::show
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:24
 * @route '/dashboard/subscriptions/{subscription}'
 */
show.get = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::show
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:24
 * @route '/dashboard/subscriptions/{subscription}'
 */
show.head = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::show
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:24
 * @route '/dashboard/subscriptions/{subscription}'
 */
    const showForm = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::show
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:24
 * @route '/dashboard/subscriptions/{subscription}'
 */
        showForm.get = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::show
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:24
 * @route '/dashboard/subscriptions/{subscription}'
 */
        showForm.head = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::activate
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:44
 * @route '/dashboard/subscriptions/{subscription}/activate'
 */
export const activate = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

activate.definition = {
    methods: ["post"],
    url: '/dashboard/subscriptions/{subscription}/activate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::activate
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:44
 * @route '/dashboard/subscriptions/{subscription}/activate'
 */
activate.url = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subscription: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subscription: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subscription: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subscription: typeof args.subscription === 'object'
                ? args.subscription.id
                : args.subscription,
                }

    return activate.definition.url
            .replace('{subscription}', parsedArgs.subscription.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::activate
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:44
 * @route '/dashboard/subscriptions/{subscription}/activate'
 */
activate.post = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::activate
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:44
 * @route '/dashboard/subscriptions/{subscription}/activate'
 */
    const activateForm = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: activate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\SubscriptionController::activate
 * @see app/Http/Controllers/Dashboard/SubscriptionController.php:44
 * @route '/dashboard/subscriptions/{subscription}/activate'
 */
        activateForm.post = (args: { subscription: number | { id: number } } | [subscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: activate.url(args, options),
            method: 'post',
        })
    
    activate.form = activateForm
const subscriptions = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
activate: Object.assign(activate, activate),
}

export default subscriptions