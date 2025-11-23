export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    ORGANAIZER: 'ORGANAIZER',
} as const;

export const ROLE_ACCESS = {
    [ROLES.USER]: [
        '/profile',
        '/events/all',
        '/events/my',
        '/certificates',
        '/events/dashboard', // del
        '/events/create' // del
    ],
    [ROLES.ADMIN]: [
        '/profile',
        '/events/all',
        '/events/my',
        '/certificates',
        '/dashboard',
        '/events/create',
        '/events/dashboard',
        '/admin'
    ],
    [ROLES.ORGANAIZER]: [
        '/profile',
        '/dashboard',
        '/events/create'
    ]
} as const; 