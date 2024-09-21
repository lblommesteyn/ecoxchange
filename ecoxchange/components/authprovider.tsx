import { AuthProvider } from "@propelauth/react";
import { createRoot } from 'react-dom/client';
import { EnergyCertificateMarketplaceComponent } from './energy-certificate-marketplace'; // Add this import

// const root = ReactDOM.createRoot(document.getElementById("root"));
const root = createRoot(document.getElementById("root")!);
root.render(
    <AuthProvider authUrl={process.env.REACT_APP_AUTH_URL!}>
        <EnergyCertificateMarketplaceComponent />
    </AuthProvider>
    // document.getElementById("root")
);

