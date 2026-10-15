import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

export const DeleteConfirm = ({
  open,
  onClose,
  onConfirm,
  title = 'Delete Member',
  memberName = '',
  description = 'Are you sure you want to delete this member? All associated records, payment tracking, and attendance logs will be removed.',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 1,
          boxShadow: '0 20px 45px rgba(23, 26, 31, 0.15)',
        },
      }}
    >
      <DialogContent sx={{ textAlign: 'center', pt: 3.5, pb: 2 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '16px',
            backgroundColor: '#FEE2E2',
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2.5,
          }}
        >
          <DeleteForeverRoundedIcon sx={{ fontSize: 32 }} />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F', mb: 1, letterSpacing: '-0.01em' }}>
          {title}
        </Typography>

        {memberName && (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: '#171A1F',
              backgroundColor: '#F1F5F9',
              py: 0.6,
              px: 1.5,
              borderRadius: '8px',
              display: 'inline-block',
              mb: 1.5,
            }}
          >
            {memberName}
          </Typography>
        )}

        <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.5 }}>
          {description}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2, display: 'flex', gap: 1.5, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            flex: 1,
            borderColor: '#CBD5E1',
            color: '#475569',
            borderRadius: '10px',
            py: 1,
            '&:hover': { borderColor: '#94A3B8', backgroundColor: '#F8FAFC' },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            flex: 1,
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            fontWeight: 700,
            borderRadius: '10px',
            py: 1,
            boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)',
            '&:hover': {
              backgroundColor: '#B91C1C',
              boxShadow: '0 6px 18px rgba(220, 38, 38, 0.4)',
            },
          }}
        >
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteConfirm;
