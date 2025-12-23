import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function PasswordResetDialog({ open, onClose }) {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        setError('');
        
        if (!email || !newPassword || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/reset-password', {
                email,
                newPassword
            });
            
            if (response.status === 200) {
                setSuccess(true);
                setTimeout(() => {
                    handleClose();
                }, 2000);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Error resetting password.');
            } else {
                setError('Error resetting password. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setSuccess(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
                {success ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'green' }}>
                        Password reset successfully! You can now log in with your new password.
                    </div>
                ) : (
                    <>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField
                            margin="dense"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Confirm New Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sx={{ mt: 2 }}
                        />
                        {error && (
                            <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
                                {error}
                            </div>
                        )}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {!success && (
                    <Button onClick={handleReset} variant="contained" disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

