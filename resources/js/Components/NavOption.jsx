import React from 'react';
import NavLink from '@/Components/Utils/NavLink';

const NavOption = ({ nome, icon: Icon, size, link }) => {
    const active = route().current(link);

    return (
        <li>
            <NavLink href={route(link)} className={active ? ' bg-[#427297] border-spacing-1' : ''}>
                {typeof Icon === 'function' ? (
                    <Icon className="w-6 h-6 space-x-2 transition duration-75 text-gray-100" />
                ) : (
                    <img src={Icon} alt={'Icone ' + nome} className='w-8 h-8 transition duration-75' />
                )}
                <span className={"ms-2 pt-1 text-gray-100 " + size}>{nome}</span>
            </NavLink>
        </li>
    );
}

export default NavOption;
