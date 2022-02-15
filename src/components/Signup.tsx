import { Alert, Box, Button, Card, CardActions, CardContent, Container, Divider, FormControl, FormGroup, FormHelperText, Grid, Input, InputLabel, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signUpUser } from '../features/auth/authSlice';

function Signup() {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const passwordConfirmationRef = useRef<HTMLInputElement>();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (emailRef?.current === undefined
            || emailRef.current.value === ""
            || passwordRef?.current === undefined
            || passwordRef.current.value === ""
            || passwordConfirmationRef?.current === undefined
            || passwordConfirmationRef.current.value === "") {
            return setError("Please fill out all fields")
        }

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError("Passwords do not match")
        }
    
        try {
            setError("")
            setLoading(true)
            const payload = { 
                email: emailRef.current.value, 
                password: passwordRef.current.value 
            }
            dispatch(signUpUser(payload));
            navigate("/");

        } catch {
            setError("Failed to sign in.")
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
                            Sign Up
                            </Typography>
                            { error && <Alert severity="error">{error}</Alert> }
                            <form onSubmit={handleSubmit}>
                                <FormGroup row={true} id="email-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="email" id="email-label">Email Address</InputLabel>
                                        <Input id="email" type="email" inputRef={emailRef}/>
                                        <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="password-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="password" id="password-label">Password</InputLabel>
                                        <Input id="password" type="password" inputRef={passwordRef}/>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="password-confirmation-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="password-confirmation" id="password-confirmation-label">Password Confirmation</InputLabel>
                                        <Input id="password-confirmation" type="password" inputRef={passwordConfirmationRef} />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="submit-group"sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <Button disabled={loading} variant="contained" color="primary" type="submit" id="submit-button">Create Account</Button>
                                    </FormControl>
                                </FormGroup>
                            </form>
                        </Container>
                    </CardContent>
                    <Divider light={false} />
                    <CardActions sx={{marginTop: "1em", justifyContent: 'center' }} disableSpacing >
                        <Box>
                            Already have an account? <Link to="/login">Login!</Link>
                        </Box>
                    </CardActions>
                </Card>
            </Container>

    </div>
    );
}
export default Signup;