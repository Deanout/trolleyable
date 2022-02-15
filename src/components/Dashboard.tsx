import { Alert, Button, ButtonGroup, Card, CardActions, CardContent, Typography } from '@mui/material'

import  {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, selectUser, selectLoading } from '../features/auth/authSlice';

function Dashboard() {
    const [error, setError] = useState("")
    const currentUser = useSelector(selectUser)
    const loading = useSelector(selectLoading)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        setError("")
        try {
            dispatch(logoutUser());
            navigate("/login");
        } catch {
            setError("Failed to logout")
        }
    }
  return (
    <div>
        <Card>
            <CardContent>
                <Typography variant="h2" color="text.primary" gutterBottom>
                    Profile
                </Typography>
                {loading ? <p>Loading...</p> : <strong>{currentUser?.email}</strong>}
                { error && <Alert severity="error">{error}</Alert> }
            </CardContent>
            <CardActions>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={handleLogout} >
                Logout
                </Button>
                <Button  >
                    <Link to="/update-profile" style={{textDecoration:"none", color: "#fff"}}>
                        Edit Profile
                    </Link>
                </Button>
            </ButtonGroup>
            </CardActions>
        </Card>
    </div>
  )
}

export default Dashboard