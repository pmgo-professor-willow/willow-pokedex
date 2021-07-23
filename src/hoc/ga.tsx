// Ref: https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker

// Node modules.
import React, { useEffect } from 'react';
import ReactGA, { FieldsObject } from 'react-ga';
// Local modules.
import { gaTrackingId } from '../configs/index';

ReactGA.initialize(gaTrackingId);

const withTracker = (
    WrappedComponent: React.ComponentType<any>,
    options: FieldsObject = {},
) => {
    const trackPage = (page: string) => {
        ReactGA.set({ page, ...options });
        ReactGA.pageview(page);
    };

    return (props: any) => {
        useEffect(() => {
            trackPage(props.location.pathname);
        }, [props.location.pathname]);

        return <WrappedComponent {...props} />;
    };
}

export {
    withTracker,
};
