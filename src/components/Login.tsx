import { Alert, Box, Button, Card, CardActions, CardContent, Container, Divider, FormControl, FormGroup, FormHelperText, Grid, Input, InputLabel, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth  } from '../contexts/AuthContext';
import { loginUser } from '../features/auth/authSlice';

function Login() {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (emailRef?.current === undefined
            || emailRef.current.value === ""
        || passwordRef?.current === undefined
        || passwordRef.current.value === "") {
            return setError("Please fill out all fields")
        }
    
        try {
            setError("")
            setLoading(true)
            const payload = { 
                email: emailRef.current.value, 
                password: passwordRef.current.value 
            }
            dispatch(loginUser(payload))
            setLoading(false)
            navigate("/");
        } catch {
            setError("Failed to create an account")
        }

    }

  return (
    <div style={{marginTop:"2em"}}>
            <Container maxWidth="md">
                <Card sx={{boxShadow:1, maxWidth: 'md'}}>
                    <CardContent>
                        <Container maxWidth="sm">
                            <Typography variant="h2" color="text.primary" gutterBottom>
                            Login
                            </Typography>
                            { error && <Alert severity="error">{error}</Alert> }
                            <form onSubmit={handleSubmit}>
                                <FormGroup row={true} id="email-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="email" id="email-label">Email Address</InputLabel>
                                        <Input id="email" type="email" inputRef={emailRef}/>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="password-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="password" id="password-label">Password</InputLabel>
                                        <Input id="password" type="password" inputRef={passwordRef}/>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="submit-group"sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <Button disabled={loading} variant="contained" color="primary" type="submit" id="submit-button">Login</Button>
                                    </FormControl>
                                </FormGroup>
                            </form>
                        </Container>
                    </CardContent>
                    <Divider light={false} />
                    <CardActions sx={{marginTop: "1em", justifyContent: 'center' }} disableSpacing >
                        <Box>
                            <Typography variant="body2" color="text.secondary" align="center">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </Typography>
                            <Link to="/signup">Create an Account!</Link>
                        </Box>
                    </CardActions>
                </Card>
            </Container>

    </div>
    );
}
export default Login;