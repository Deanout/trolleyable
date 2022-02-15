import { Alert, Box, Button, Card, CardActions, CardContent, Container, Divider, FormControl, FormGroup, FormHelperText, Grid, Input, InputLabel, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../features/auth/authSlice';

function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (emailRef?.current === undefined
            || emailRef.current.value === "") {
            return setError("Please enter an email.")
        }
    
        try {
            setMessage("")
            setError("")
            setLoading(true)
            const payload = {
                email: emailRef.current.value
            }
            dispatch(resetPassword(payload))
            setMessage("Sending password reset request if email exists.")
        } catch {
            setError("Failed to request password reset.")
        }
        setLoading(false)
    }

  return (
    <div style={{marginTop:"2em"}}>
            <Container maxWidth="md">
                <Card sx={{boxShadow:1, maxWidth: 'md'}}>
                    <CardContent>
                        <Container maxWidth="sm">
                            <Typography variant="h2" color="text.primary" gutterBottom>
                            Password Reset
                            </Typography>
                            { error && <Alert severity="error">{error}</Alert> }
                            { message && <Alert severity="success">{message}</Alert> }
                            <form onSubmit={handleSubmit}>
                                <FormGroup row={true} id="email-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="email" id="email-label">Email Address</InputLabel>
                                        <Input id="email" type="email" inputRef={emailRef}/>
                                    </FormControl>
                                </FormGroup>
                                
                                <FormGroup row={true} id="submit-group"sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <Button disabled={loading} variant="contained" color="primary" type="submit" id="submit-button">Reset Password</Button>
                                    </FormControl>
                                </FormGroup>
                            </form>
                        </Container>
                    </CardContent>
                    <Divider light={false} />
                    <CardActions sx={{marginTop: "1em", justifyContent: 'center' }} disableSpacing >
                        <Box>
                            <Typography variant="body2" color="text.secondary" align="center">
                                <Link to="/Login">Login</Link>
                            </Typography>
                            <Link to="/signup">Create an Account!</Link>
                        </Box>
                    </CardActions>
                </Card>
            </Container>

    </div>
    );
}
export default ForgotPassword;