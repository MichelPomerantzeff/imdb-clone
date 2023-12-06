import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import '../css/ErrorAlert.css';

export default function ErrorAlert() {
    return (
        <div className="error_container">
            <Stack spacing={2}>
                <Alert variant="outlined" severity="error">
                    An error occured!
                </Alert>
            </Stack>
        </div>
    );
}