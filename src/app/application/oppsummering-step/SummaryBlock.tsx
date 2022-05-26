import { Heading } from '@navikt/ds-react';
import React from 'react';
import Box, { BoxMargin } from '@navikt/sif-common-core/lib/components/box/Box';

interface Props {
    header: string;
    children: React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactNode;
    margin?: BoxMargin;
}

const SummaryBlock = ({ header, children, margin = 'l' }: Props) => (
    <Box margin={margin}>
        <Heading size="small" level="3" spacing={true}>
            {header}
        </Heading>
        {children}
    </Box>
);

export default SummaryBlock;
