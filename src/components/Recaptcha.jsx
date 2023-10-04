import React, { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import '../index.css'

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
    <div id='g.recaptcha' className="mt-12 mb-4 text-center sm:mt-0 md:mt-0 lg:mt-0">
      <ReCAPTCHA
        hl="tr"
        sitekey={siteKey}
        onChange={(value) => onRecaptchaChange(value)}
        ref={recaptchaRef}
        size='invisible'
      />
      
    </div>
  );
};

export default Recaptcha;
