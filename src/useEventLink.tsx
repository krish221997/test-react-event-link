import { EventLinkComponent } from "./EventLink";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import CustomIframe from "./CustomIframe";

declare global {
  interface Window {
    EventLink: {
      openLink: () => void;
      initialize: () => void;
    };
  }
}

window.EventLink = {
  initialize: () => {
    const container = document.createElement("div");
    container.id = "event-link-container";
    document.body.appendChild(container);
    ReactDOM.render(
      <CustomIframe id="event-link-iframe" title="Event Link">
        <EventLinkComponent />
      </CustomIframe>,
      container
    );
  },
  openLink: () => {
    console.log("openLink called");
    const iframe = document.getElementById(
      "event-link-iframe"
    ) as HTMLIFrameElement;
    iframe.style.display = "block";
  },
};

export const useEventLink = () => {
  useEffect(() => {
    if (window.EventLink) {
      window.EventLink.initialize();
    }
  }, []);

  const open = () => {
    if (window.EventLink) {
      window.EventLink.openLink();
    }
  };

  return { open };
};
