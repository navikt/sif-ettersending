import React from 'react';
import Box, { BoxMargin } from '@navikt/sif-common-core/lib/components/box/Box';
import { Element } from 'nav-frontend-typografi';

interface Props {
    header: string;
    children: React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactNode;
    margin?: BoxMargin;
}

const SummaryBlock = ({ header, children, margin = 'l' }: Props) => (
    <Box margin={margin}>
        <Element tag="h3">{header}</Element>
        {children}
    </Box>
);

export default SummaryBlock;
