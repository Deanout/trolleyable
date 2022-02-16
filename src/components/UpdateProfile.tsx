import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardActions, CardContent, Container, Divider, FormControl, FormGroup, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { AuthCredential, EmailAuthProvider, reauthenticateWithCredential, User } from 'firebase/auth';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectLoading, selectUser, signUpUser, updateUserEmail, updateUserPassword } from '../features/auth/authSlice';

function UpdateProfile() {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const passwordConfirmationRef = useRef<HTMLInputElement>();
    const oldPasswordRef = useRef<HTMLInputElement>();
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const currentUser = useSelector(selectUser)
    const loading = useSelector(selectLoading)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      setError("")
      event.preventDefault();              
      if (passwordRef?.current?.value !== passwordConfirmationRef?.current?.value) {
        return setError("Passwords do not match")
      }
              
      const promises: any[] = [];
      try {
        const credentials = EmailAuthProvider.credential(currentUser!.email!, oldPasswordRef!.current!.value);
        await reauthenticateWithCredential(currentUser as User, credentials)
        .then(async () => {
          if (emailRef?.current?.value !== currentUser?.email) {
            promises.push(dispatch(updateUserEmail({email: emailRef!.current!.value})));
          }
          if (passwordRef!.current!.value) {
            promises.push(dispatch(updateUserPassword({password: passwordRef!.current!.value})));
          }
          await Promise.all(promises).then(() => {
            return navigate("/");
          }).catch((e) => {
            return setError(e.message);
          });
        })
      } catch(e) {
        return setError("Failed to update profile. Is your old password correct?");
      }
    }
    const passwordInput = <OutlinedInput id="password" type={showPassword ? 'text' : 'password'} placeholder="Leave blank to keep the same." inputRef={passwordRef} endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}
          onMouseDown={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }/>;
  const passwordConfirmationInput = 
  <OutlinedInput id="password-confirmation" type={showPassword ? 'text' : 'password'} placeholder="Must match new password if provided." inputRef={passwordConfirmationRef} endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}
          onMouseDown={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }
  />;

  const oldPasswordInput = 
  <OutlinedInput  id="old-password" type={showPassword ? 'text' : 'password'} inputRef={oldPasswordRef} placeholder="Required to confirm changes." endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}
          onMouseDown={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }
  />;

  return (
    <div style={{marginTop:"2em"}}>
            <Container maxWidth="md">
                <Card sx={{boxShadow:1, maxWidth: 'md'}}>
                    <CardContent>
                        <Container maxWidth="sm">
                            <Typography variant="h2" color="text.primary" gutterBottom>
                            Update Profile
                            </Typography>
                            { error !== "" && <Alert severity="error">{error}</Alert> }
                            <form onSubmit={handleSubmit}>
                                <FormGroup row={true} id="email-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="email" id="email-label">Email Address</InputLabel>
                                        <Input id="email" 
                                        type="email" 
                                        inputRef={emailRef} 
                                        defaultValue={currentUser?.email}/>
                                        <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="password-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="filled" htmlFor="password" id="password-label">Password</InputLabel>
                                        {passwordInput}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="password-confirmation-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="filled" htmlFor="password-confirmation" id="password-confirmation-label">Password Confirmation</InputLabel>
                                        {passwordConfirmationInput}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="password-confirmation-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required variant="filled" htmlFor="old-password" id="old-password-label">Confirm Changes With Old Password</InputLabel>
                                        {oldPasswordInput}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="submit-group"sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <Button disabled={loading} variant="contained" color="primary" type="submit" id="submit-button">Update Account</Button>
                                    </FormControl>
                                </FormGroup>
                            </form>
                        </Container>
                    </CardContent>
                    <Divider light={false} />
                    <CardActions sx={{marginTop: "1em", justifyContent: 'center' }} disableSpacing >
                        <Box>
                            <Link to="/">Cancel!</Link>
                        </Box>
                    </CardActions>
                </Card>
            </Container>

    </div>
    );
}
export default UpdateProfile;