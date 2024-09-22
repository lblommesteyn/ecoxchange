"use client"
import React from "react";

export function OidcComponent() {
    let code;
    React.useEffect(()=> {
        console.log("useeffect")
        const urlParams = new URLSearchParams(window.location.search);
    code = urlParams.get('code');
    }, [])

    // const link = window.location.href
    

    const params = new URLSearchParams({
        redirect_uri: 'https://ecoxchange.live/oidc',
        client_id: `e51618d73ab9c59f5bd04cda1f667e17`,
        code: code!,
        grant_type: `authorization_code`,
    });
    
    const url = `https://auth.ecoxchange.live/propelauth/oauth/token`;

    fetch(url, {
        method: 'POST',        
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'e51618d73ab9c59f5bd04cda1f667e17:a795ac52652d190ab8a0162809d9cbec4e69cae133668831b8db76fccba10f1ec0b641260e2cba9efcf654d463b6dc39'
        },
        body: params
    }).then(async (res) => {
        const data = await res.json();
        const refreshToken = data["refresh_token"]
        const accessToken = data["access_token"]
        const expiresIn = parseInt(data["expires_in"]) + Date.now()

        localStorage.setItem("refreshToken", refreshToken)
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("expiresIn", expiresIn.toString())
    })

    return (<p>You have signed in. You may close the tab</p>)
}
