declare module '*.svg' {
    import React, {SVGProps} from 'react';
    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGProps<SVGSVGElement>>
    >;
    export default ReactComponent;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.jpeg' {
    const value: string;
    export default value;
}

declare module '*.gif' {
    const value: string;
    export default value;
}
