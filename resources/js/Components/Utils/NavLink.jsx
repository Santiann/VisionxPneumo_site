import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group' +
                (active
                    ? 'border-[#51B6FF] text-gray-900 focus:border-[#51B6FF] '
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
