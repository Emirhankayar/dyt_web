import React, { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const siteKey = import.meta.env.VITE_APP_SITE;

const Recaptcha = ({ onRecaptchaChange }) => {
  const recaptchaRef = useRef(null);

  useEffect(() => {
    if (recaptchaRef.current) {
      window.grecaptcha.ready(() => {
        // You can set the reCAPTCHA parameters here
        // For example:
        // window.grecaptcha.execute("YOUR_RECAPTCHA_SITE_KEY", { action: "submit" }).then((token) => {
        //   onRecaptchaChange(token);
        // });
      });
    }
  }, [onRecaptchaChange]);

  return (
    <div className="mb-4">
      <ReCAPTCHA
        hl="tr"
        sitekey={siteKey}
        onChange={(value) => onRecaptchaChange(value)}
        ref={recaptchaRef}
      />
    </div>
  );
};

export default Recaptcha;
