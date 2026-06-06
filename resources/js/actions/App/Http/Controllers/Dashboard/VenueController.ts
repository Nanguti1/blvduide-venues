import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\VenueController::index
 * @see app/Http/Controllers/Dashboard/VenueController.php:19
 * @route '/dashboard/venues'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/venues',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\VenueController::index
 * @see app/Http/Controllers/Dashboard/VenueController.php:19
 * @route '/dashboard/venues'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\VenueController::index
 * @see app/Http/Controllers/Dashboard/VenueController.php:19
 * @route '/dashboard/venues'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Dashboard\VenueController::index
 * @see app/Http/Controllers/Dashboard/VenueController.php:19
 * @route '/dashboard/venues'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Dashboard\VenueController::index
 * @see app/Http/Controllers/Dashboard/VenueController.php:19
 * @route '/dashboard/venues'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Dashboard\VenueController::index
 * @see app/Http/Controllers/Dashboard/VenueController.php:19
 * @route '/dashboard/venues'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Dashboard\VenueController::index
 * @see app/Http/Controllers/Dashboard/VenueController.php:19
 * @route '/dashboard/venues'
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
* @see \App\Http\Controllers\Dashboard\VenueController::create
 * @see app/Http/Controllers/Dashboard/VenueController.php:32
 * @route '/dashboard/venues/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/venues/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\VenueController::create
 * @see app/Http/Controllers/Dashboard/VenueController.php:32
 * @route '/dashboard/venues/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\VenueController::create
 * @see app/Http/Controllers/Dashboard/VenueController.php:32
 * @route '/dashboard/venues/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Dashboard\VenueController::create
 * @see app/Http/Controllers/Dashboard/VenueController.php:32
 * @route '/dashboard/venues/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Dashboard\VenueController::create
 * @see app/Http/Controllers/Dashboard/VenueController.php:32
 * @route '/dashboard/venues/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Dashboard\VenueController::create
 * @see app/Http/Controllers/Dashboard/VenueController.php:32
 * @route '/dashboard/venues/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Dashboard\VenueController::create
 * @see app/Http/Controllers/Dashboard/VenueController.php:32
 * @route '/dashboard/venues/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Dashboard\VenueController::store
 * @see app/Http/Controllers/Dashboard/VenueController.php:42
 * @route '/dashboard/venues'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/venues',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\VenueController::store
 * @see app/Http/Controllers/Dashboard/VenueController.php:42
 * @route '/dashboard/venues'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\VenueController::store
 * @see app/Http/Controllers/Dashboard/VenueController.php:42
 * @route '/dashboard/venues'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Dashboard\VenueController::store
 * @see app/Http/Controllers/Dashboard/VenueController.php:42
 * @route '/dashboard/venues'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\VenueController::store
 * @see app/Http/Controllers/Dashboard/VenueController.php:42
 * @route '/dashboard/venues'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Dashboard\VenueController::edit
 * @see app/Http/Controllers/Dashboard/VenueController.php:68
 * @route '/dashboard/venues/{venue}/edit'
 */
export const edit = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/venues/{venue}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\VenueController::edit
 * @see app/Http/Controllers/Dashboard/VenueController.php:68
 * @route '/dashboard/venues/{venue}/edit'
 */
edit.url = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{venue}', parsedArgs.venue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\VenueController::edit
 * @see app/Http/Controllers/Dashboard/VenueController.php:68
 * @route '/dashboard/venues/{venue}/edit'
 */
edit.get = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Dashboard\VenueController::edit
 * @see app/Http/Controllers/Dashboard/VenueController.php:68
 * @route '/dashboard/venues/{venue}/edit'
 */
edit.head = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Dashboard\VenueController::edit
 * @see app/Http/Controllers/Dashboard/VenueController.php:68
 * @route '/dashboard/venues/{venue}/edit'
 */
    const editForm = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Dashboard\VenueController::edit
 * @see app/Http/Controllers/Dashboard/VenueController.php:68
 * @route '/dashboard/venues/{venue}/edit'
 */
        editForm.get = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Dashboard\VenueController::edit
 * @see app/Http/Controllers/Dashboard/VenueController.php:68
 * @route '/dashboard/venues/{venue}/edit'
 */
        editForm.head = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Dashboard\VenueController::update
 * @see app/Http/Controllers/Dashboard/VenueController.php:80
 * @route '/dashboard/venues/{venue}'
 */
export const update = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/venues/{venue}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Dashboard\VenueController::update
 * @see app/Http/Controllers/Dashboard/VenueController.php:80
 * @route '/dashboard/venues/{venue}'
 */
update.url = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{venue}', parsedArgs.venue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\VenueController::update
 * @see app/Http/Controllers/Dashboard/VenueController.php:80
 * @route '/dashboard/venues/{venue}'
 */
update.put = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Dashboard\VenueController::update
 * @see app/Http/Controllers/Dashboard/VenueController.php:80
 * @route '/dashboard/venues/{venue}'
 */
update.patch = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Dashboard\VenueController::update
 * @see app/Http/Controllers/Dashboard/VenueController.php:80
 * @route '/dashboard/venues/{venue}'
 */
    const updateForm = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\VenueController::update
 * @see app/Http/Controllers/Dashboard/VenueController.php:80
 * @route '/dashboard/venues/{venue}'
 */
        updateForm.put = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Dashboard\VenueController::update
 * @see app/Http/Controllers/Dashboard/VenueController.php:80
 * @route '/dashboard/venues/{venue}'
 */
        updateForm.patch = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Dashboard\VenueController::destroy
 * @see app/Http/Controllers/Dashboard/VenueController.php:94
 * @route '/dashboard/venues/{venue}'
 */
export const destroy = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/venues/{venue}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Dashboard\VenueController::destroy
 * @see app/Http/Controllers/Dashboard/VenueController.php:94
 * @route '/dashboard/venues/{venue}'
 */
destroy.url = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{venue}', parsedArgs.venue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\VenueController::destroy
 * @see app/Http/Controllers/Dashboard/VenueController.php:94
 * @route '/dashboard/venues/{venue}'
 */
destroy.delete = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Dashboard\VenueController::destroy
 * @see app/Http/Controllers/Dashboard/VenueController.php:94
 * @route '/dashboard/venues/{venue}'
 */
    const destroyForm = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\VenueController::destroy
 * @see app/Http/Controllers/Dashboard/VenueController.php:94
 * @route '/dashboard/venues/{venue}'
 */
        destroyForm.delete = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Dashboard\VenueController::submitForApproval
 * @see app/Http/Controllers/Dashboard/VenueController.php:103
 * @route '/dashboard/venues/{venue}/submit'
 */
export const submitForApproval = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: submitForApproval.url(args, options),
    method: 'patch',
})

submitForApproval.definition = {
    methods: ["patch"],
    url: '/dashboard/venues/{venue}/submit',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Dashboard\VenueController::submitForApproval
 * @see app/Http/Controllers/Dashboard/VenueController.php:103
 * @route '/dashboard/venues/{venue}/submit'
 */
submitForApproval.url = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return submitForApproval.definition.url
            .replace('{venue}', parsedArgs.venue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\VenueController::submitForApproval
 * @see app/Http/Controllers/Dashboard/VenueController.php:103
 * @route '/dashboard/venues/{venue}/submit'
 */
submitForApproval.patch = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: submitForApproval.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Dashboard\VenueController::submitForApproval
 * @see app/Http/Controllers/Dashboard/VenueController.php:103
 * @route '/dashboard/venues/{venue}/submit'
 */
    const submitForApprovalForm = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submitForApproval.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Dashboard\VenueController::submitForApproval
 * @see app/Http/Controllers/Dashboard/VenueController.php:103
 * @route '/dashboard/venues/{venue}/submit'
 */
        submitForApprovalForm.patch = (args: { venue: string | { slug: string } } | [venue: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submitForApproval.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    submitForApproval.form = submitForApprovalForm
const VenueController = { index, create, store, edit, update, destroy, submitForApproval }

export default VenueController