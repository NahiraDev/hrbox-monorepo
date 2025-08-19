import React from 'react';
export declare function lazyLoad(importFunc: () => Promise<{
    default: React.ComponentType<any>;
}>): {
    (props: any): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=lazyLoad.d.ts.map