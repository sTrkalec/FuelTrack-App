import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type ConfirmDeleteModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void>;
    message: string;
    buttonText: (string);
  }


export function ConfirmDeleteModal({open, onClose, onSubmit, message, buttonText }: ConfirmDeleteModalProps) {

    return (
        <>
            <Dialog open={open} onClose={onClose}classes={{ paper: 'custom-dialog-delete ' }}>
                <DialogTitle>Apagar veículo</DialogTitle>
                <DialogContent className="custom-dialog-content-delete">
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>{buttonText}</Button>
                    <Button onClick={onSubmit} variant="contained" color="error">
                        Apagar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}