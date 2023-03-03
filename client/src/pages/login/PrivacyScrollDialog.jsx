import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const terms =
  ["Introduction",
    "These Terms of Use & Privacy Policy (\"Terms\") govern your use of our sublease website (\"Site\"). By using our Site, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Site.",

    "Use of the Site",
    "You may use the Site to browse and post subleases. You may not use the Site for any other purpose. You may not use the Site in a way that violates any law or regulation.",

    "Posting Subleases",
    "When posting subleases, you must provide accurate and complete information. You may not post any sublease that violates any law or regulation. You are solely responsible for any sublease you post on our Site.",

    "Sublease Agreements",
    "We do not have any involvement in sublease agreements made between users of our Site. We are not a party to any sublease agreement made between users of our Site. We do not endorse, warrant, or guarantee any sublease posted on our Site.",

    "Intellectual Property",
    "Our Site contains content owned or licensed by us. This content is protected by copyright, trademark, and other intellectual property laws. You may not use our content without our express written permission.",

    "Limitation of Liability",
    "We are not liable for any damages arising from your use of our Site. This includes, but is not limited to, direct, indirect, incidental, punitive, and consequential damages.",

    "Indemnification",
    "You agree to indemnify us for any damages or costs arising from your use of our Site. This includes, but is not limited to, any claims, damages, or costs arising from your violation of these Terms.",

    "Changes to these Terms",
    "We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the modified Terms on our Site. Your continued use of our Site after the modified Terms have been posted constitutes your agreement to the modified Terms.",

    "Contact Us",
    "If you have any questions about these Terms, please contact us at dublease@gmail.com."
  ]
export default function PrivacyScrollDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Terms of Use & Privacy Policy for DubLease </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {terms.map((line, index) => (
              (index %2 == 1)?
              <Typography variant="body1" key={index} gutterBottom>
                {line}
              </Typography>:
              <Typography variant="h6"key={index}  gutterBottom>
                {(index/2+1) + ". " + line}
              </Typography>
            ))}

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

PrivacyScrollDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};