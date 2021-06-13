// Node modules.
import React from 'react';
import { Spin } from 'antd';
import Icon from '@ant-design/icons';
import styled from 'styled-components';
// Local modules.
import { ReactComponent as LoadingSvg } from '../../icons/loading.svg';

interface FullLoadingProps {
    className?: string;
}

const FullLoading: React.FC<FullLoadingProps> = (props) => {
    const { className } = props;

    return (
        <div className={className}>
            <Spin
                indicator={
                    <Icon className='icon' spin
                        component={LoadingSvg}
                    />
                }
            />
        </div>
    );
};

const styledFullLoading = styled(FullLoading)`
@keyframes fadeOut {
    from {
        font-size: 0em;
        opacity: 1;
    }

    to {
        font-size: 50em;
        opacity: 0;
    }
}

& {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;

    .icon {
        animation-duration: 1.2s;
        animation-name: fadeOut;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
}
`;

export default styledFullLoading;
