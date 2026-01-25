import React, { useState } from "react";
import "./DiscordSupportModal.css";

const SupportModal = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`support-modal-container ${open ? "open" : "closed"}`}>
      
      {/* Toggle Arrow (always visible) */}
      <div className="support-toggle" onClick={() => setOpen(!open)}>
        <span className={`arrow ${open ? "arrow-open" : "arrow-closed"}`}>
          ❯
        </span>
      </div>

      {/* Modal Content */}
      <div className="support-modal">
        <div className="support-logo-wrapper">
          <img src="/logo.png" alt="Discord Logo" className="support-logo-fade" />
        </div>

        <div className="support-text">
          Join the Discord for support or to give feedback.
        </div>

        <a
          href="https://discord.gg/FvFYWTTRPe"
          target="_blank"
          rel="noopener noreferrer"
          className="support-button"
        >
          Join the Discord
        </a>
      </div>
    </div>
  );
};

export default SupportModal;
