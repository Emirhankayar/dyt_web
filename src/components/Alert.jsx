import React from "react";
import { Alert } from "@material-tailwind/react";
 
export default function AlertCustomAnimation() {
  const [open, setOpen] = React.useState(true);
 
  return (
    <>
      <Alert
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        Randevunuz basariyla olusturuldu
      </Alert>
    </>
  );
}
