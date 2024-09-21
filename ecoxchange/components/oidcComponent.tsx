"use client"
import React from "react";

export function OidcComponent() {
    React.useEffect(()=> {
        console.log("useeffect")
    }, [])
    return (<p>You have signed in. You may close the tab</p>)
}
