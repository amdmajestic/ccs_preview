import { createRoot } from "react-dom/client";
import { default as _M_ } from "/src/modals/__modals_traits";

const createAndShowAlert = (type, message, onlyNew, timeout=5000) => {
    const prevAlertsContainer = document.getElementById('alerts-container');
    
    if(prevAlertsContainer) {
        document.removeChild(prevAlertsContainer);
    }

    const alertsContainer = document.createElement('div');
    alertsContainer.id = 'alerts-container';
    alertsContainer.classList.add('flex', 'flex-col', 'justify-center');
    document.body.appendChild(alertsContainer);
    
    const alert = document.createElement('div');  // create a new container
    alert.id = 'alertNode';  // set an ID if needed
    alert.classList.add('z-30');

    // Append the new div to the body (or another container element)
    alertsContainer.append(alert);

    // Render the React component inside the new div
    const alertsRoot = createRoot(alert);
    const ALERT_OBJECT = _M_.ALERTS;

    // Select the right alert component based on the type
    switch (type) {
        case "success":
            alertsRoot.render(<ALERT_OBJECT.SuccessAlert message={message} onlyNew={onlyNew} />);
            break;
        case "warn":
            alertsRoot.render(<ALERT_OBJECT.WarnAlert message={message} onlyNew={onlyNew} />);
            break;
        case "info":
            alertsRoot.render(<ALERT_OBJECT.InfoAlert message={message} onlyNew={onlyNew} />);
            break;
        case "error":
            alertsRoot.render(<ALERT_OBJECT.ErrorAlert message={message} onlyNew={onlyNew} />);
            break;
        default:
            break;
    }

    const alertLife = setTimeout(() => {
        document.body.removeChild(alertsContainer);
        clearTimeout(alertLife);
    }, timeout);
};

export { createAndShowAlert };