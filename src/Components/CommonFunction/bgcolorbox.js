import { Box } from '@mui/material';
import BgColorForAppStatus from './bgcolor';

const CustomBgColorBox = ({ appStatus }) => {
    return (<Box
        className='box-style'
        component="span"
        sx={(theme) => ({
            backgroundColor: BgColorForAppStatus(appStatus),
            borderRadius: '0.25rem',
            display: 'inline-block',
            color: '#fff',
            minWidth: '16ch !important',
            textAlign: 'center !important',
            p: '0.5rem',
        })}
    >
        {appStatus}
    </Box>);
}

export default CustomBgColorBox;