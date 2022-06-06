import { Suspense, useState } from 'react';
import { signIn as nextSignIn, useSession } from 'next-auth/react';

import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { HalfMalf } from 'react-spinner-animated';
import Link from '@mui/material/Link';
import LoaderSpinner from '../../src/components/LoaderSpinner';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

export default function SignIn() {
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //
  const router = useRouter();
  const {data: session} = useSession()
  //
  // redirect to user panel if already loged in -->
  if (session) {
    router.push("/users/dashboard")
  }
  return (
    <Box
      component={'main'}
      sx={{
        inlineSize: '100%',
        blockSize: '100vh',
        backgroundImage: 'url(/images/login-bg.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth='xs'
        sx={{
          backgroundColor: 'whitesmoke',
          p: 3,
          boxShadow: 6,
          borderRadius: '10px',
          minBlockSize: 381,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <LoaderSpinner center={false} />
        ) : (
          <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              ورود
            </Typography>
            <Typography
              component={'h2'}
              variant='h6'
              sx={{ color: 'error.main' }}
            >
              {errorMessage}
            </Typography>
            <Alert severity='info' dir='ltr' variant='filled'>
              <Typography sx={{mx: 2, fontWeight: "bold"}} variant="body2">
                Email: m.abdi.public@gmail.com
                <br />
                Password: 123456
              </Typography>
            </Alert>
            <Box component='form' sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label='ایمیل'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label='رمز عبور'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              {/* <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            /> */}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  nextSignIn('credentials', {
                    email: email,
                    password: password,
                    redirect: false,
                  }).then((resp) => {
                    console.log(resp);
                    if (resp && resp.error) {
                      setErrorMessage(resp.error);
                      setLoading(false);
                    } else if (resp.ok) {
                      router.push('/users/dashboard');
                    }
                  });
                }}
              >
                ارسال
              </Button>
              {/* <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
