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
        // redirect_uri: `https://230496154.propelauthtest.com`,
        client_id: `230496154`,
        code: code!,
        grant_type: `authorization_code`,
        state: `state`,
    });
    
    const url = `https://auth.ecoxchange.live/propelauth/oauth/token?${params.toString()}`;

    fetch(url, {
        method: 'POST',
        mode: `no-cors`,
        
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        //   redirect_uri: `http://localhost:3000`,
        //   client_id: `230496154`,

        //   response_type: `code`,
        //   state: `state`,
            // 'Access-Control-Allow-Origin': `*`,
        },
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
