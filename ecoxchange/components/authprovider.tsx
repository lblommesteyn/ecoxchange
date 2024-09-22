import { AuthProvider } from "@propelauth/react";
import { createRoot } from 'react-dom/client';
import { EnergyCertificateMarketplaceComponent } from './energy-certificate-marketplace'; // Add this import

// const root = ReactDOM.createRoot(document.getElementById("root"));
const root = createRoot(document.getElementById("root")!);
root.render(
    <EnergyCertificateMarketplaceComponent />
    // document.getElementById("root")
);

