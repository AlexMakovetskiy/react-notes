import { FC, useState } from 'react';
import { Button } from 'antd';

import { ITagFilter } from '../../types/ComponentProps';

const TagFilter: FC<ITagFilter> = ({text, clickAction}) => {
    const [togg, setTogg] = useState<boolean>(false);

    function handleClick () {
        setTogg((prevState) => !prevState);
        return clickAction();
    }

    return (
        <>
            <Button type={togg ? 'primary' : 'default'} onClick={handleClick}>{text}</Button>
        </>
    );
};

export default TagFilter;
