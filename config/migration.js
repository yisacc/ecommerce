const permissions = [
    'create user',
    'view any user',
    'view user',
    'update user',
    'remove user',

    'create role',
    'view any role',
    'view role',
    'update role',
    'remove role',

    'create cart',
    'view any cart',
    'view cart',
    'update cart',
    'remove cart',

    'create product',
    'view any product',
    'view product',
    'update product',
    'remove product',

    'create product review',
    'view any product review',
    'view product review',
    'update product review',
    'remove product review',

    'create product variety',
    'view any product variety',
    'view product variety',
    'update product variety',
    'remove product variety',

    'create category',
    'view any category',
    'view category',
    'update category',
    'remove category',

    'create subCategory',
    'view any subCategory',
    'view subCategory',
    'update subCategory',
    'remove subCategory',

    'create productTag',
    'view any productTag',
    'view productTag',
    'update productTag',
    'remove productTag',

    'create variation',
    'view any variation',
    'view variation',
    'update variation',
    'remove variation',

    'create variation option',
    'view any variation option',
    'view variation option',
    'update variation option',
    'remove variation option',
]

const roles = {
    admin: [...permissions],
    user: [    'create cart',
    'view cart',
    'update cart',
    'remove cart',
    'view category',
    'view subCategory',
    'view any product variety',
    'view product variety',
],
}

const users = [
    {
        username: 'admin',
        email: 'super@admin.com',
        password: 'superuser',
        roles: ['admin']
    }
]

module.exports = { permissions, roles, users }
