import React, { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const siteKey = import.meta.env.VITE_APP_SITE;

const Recaptcha = ({ onRecaptchaChange }) => {
  const recaptchaRef = useRef(null);

  useEffect(() => {
    if (recaptchaRef.current) {
      window.grecaptcha.ready(() => {

      });
    }
  }, [onRecaptchaChange]);

  return (
    <div className="mt-12 mb-4 sm:mt-0 md:mt-0 lg:mt-0">
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
