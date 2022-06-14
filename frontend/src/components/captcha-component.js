import ReCAPTCHA from "react-google-recaptcha";

const CaptchaComponent = ({ setCaptcha }) => {
  const onChange = (value) => {
    setCaptcha(value);
  };

  return <ReCAPTCHA sitekey={process.env.REACT_APP_CAPTCHA_KEY} onChange={onChange} />;
};

export default CaptchaComponent;
