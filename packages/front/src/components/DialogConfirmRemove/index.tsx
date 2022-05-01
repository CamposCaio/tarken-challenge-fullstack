import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { Movie } from '../../utils/interfaceMovie'

interface Props {
  onAction: (eventType: 'cancel' | 'remove', targetMovie: Movie) => void
  targetMovie: Movie
}

export function DialogConfirmRemove({ onAction, targetMovie }: Props) {
  const [open, setOpen] = useState(true)

  function handleConfirm() {
    setOpen(false)
    onAction('remove', targetMovie)
  }

  function handleCancel() {
    setOpen(false)
    onAction('cancel', targetMovie)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="remove from library"
        aria-describedby="dialog to confirm the remove from library"
      >
        <DialogTitle>{'Remove from your library'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'Are you sure you want to remove'} <b>{targetMovie.title}</b>
            {
              ' from your library? It contains an audio review and you will lose it if you remove.'
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Remove</Button>
          <Button onClick={handleCancel} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
