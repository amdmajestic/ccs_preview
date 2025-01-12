import { createRoot } from "react-dom/client";
import { default as _M_ } from "/src/modules/__modules_traits";

const createAndShowAlert = (type, message, onlyNew, interval=5000) => {
    const alertsContainer = document.getElementById('alerts-container');
    const prevAlert = document.getElementById('alertNode');

    if(!prevAlert) {
        const alert = document.createElement('div');  // create a new container
        alert.id = 'alertNode';  // set an ID if needed

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

        const alertLife = setInterval(() => {
            alertsContainer.removeChild(alert);
            clearInterval(alertLife);
        }, interval);
    }
};

export { createAndShowAlert };