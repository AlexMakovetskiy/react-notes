import { FC } from 'react';
import Title from 'antd/es/typography/Title';

import { IHeader } from '../../types/ComponentProps';

import './Header.scss';

const Header: FC<IHeader> = ({title}) => {
    return (
        <header className="header-notes">
            <Title level={1}>{title}</Title>
        </header>
    );
};

export default Header;
