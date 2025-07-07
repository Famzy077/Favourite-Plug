'use client';

import CookieConsent from "react-cookie-consent";

const CookieConsentWrapper = () => {
    return (
        <CookieConsent
          location="bottom"
          buttonText="I Understand"
          cookieName="favoritePlugCookieConsent"
          style={{
            background: "linear-gradient(to right, #1e293b, #0f172a)",
            color: "#e2e8f0",
            fontSize: "14px",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.1)"
          }}
          buttonStyle={{
            background: "#3b82f6",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            borderRadius: "8px",
            padding: "10px 20px"
          }}
          expires={150}
        >
          This website uses cookies to enhance the user experience. By continuing to browse, you agree to our use of cookies.
        </CookieConsent>
    );
};

export default CookieConsentWrapper;