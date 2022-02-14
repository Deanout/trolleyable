import { Box, Button, Card, CardActions, CardContent, Container, Divider, FormControl, FormGroup, FormHelperText, Grid, Input, InputLabel, Typography } from '@mui/material';
import { useRef } from 'react';

function Signup() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    


  return (
    <div style={{marginTop:"2em"}}>

            <Container maxWidth="md">
                <Card sx={{boxShadow:1, maxWidth: 'md'}}>
                    <CardContent>
                        <Container maxWidth="sm">
                            <Typography variant="h2" color="text.primary" gutterBottom>
                            Sign Up
                            </Typography>
                            <form >
                                <FormGroup row={true} id="email-group">
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="email" id="email-label">Email Address</InputLabel>
                                        <Input id="email" type="email" ref={emailRef}/>
                                        <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="password-group">
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="password" id="password-label">Password</InputLabel>
                                        <Input id="password" type="password" ref={passwordRef}/>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="password-confirmation-group">
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="password-confirmation" id="password-confirmation-label">Password Confirmation</InputLabel>
                                        <Input id="password-confirmation" type="password" ref={passwordConfirmationRef} />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="submit-group"sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <Button  variant="contained" color="primary" type="submit" id="submit-button">Create Account</Button>
                                    </FormControl>
                                </FormGroup>
                            </form>
                        </Container>
                    </CardContent>
                    <Divider light={false} />
                    <CardActions sx={{marginTop: "1em", justifyContent: 'center' }} disableSpacing >
                        <Box>
                            Already have an account? <a href="#">Login!</a>
                        </Box>
                    </CardActions>
                </Card>
            </Container>

    </div>
  )
}

export default Signup