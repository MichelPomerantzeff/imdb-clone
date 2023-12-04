import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CircularProgress } from '@mui/material';

export default function LoadingWheel() {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </ThemeProvider>
    );
}
