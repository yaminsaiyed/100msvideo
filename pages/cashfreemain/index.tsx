import React, { useState, useRef, useEffect } from "react";
import { cashfree } from "./util";
import { redirect } from "next/dist/server/api-utils";



export default function CashFreeMain() {
  
    const getSessionId=(e:any)=>{
        e.preventDefault();
        
        (async () => {
            const rawResponse = await fetch('http://localhost/heapdo_admin/api/v1/cashfree-api', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({a: 1, b: 'Textual content'})
            });
            const content = await rawResponse.json();
            // setsessionId(content.data.payment_session_id);
            console.log(content);
            
            
            let checkoutOptions = {
                paymentSessionId: content.data.payment_session_id,
                returnUrl: "https://test.cashfree.com/pgappsdemos/v3success.php?myorder="+content.data.order_id,
                // redirectTarget: "react-iframe",
            }
            
            cashfree.checkout(checkoutOptions).then(function(result:any){
                if(result.error){
                    alert(result.error.message)
                }
                if(result.redirect){
                    console.log("Redirection")
                }
            });
            
            
          })();

    }
    
  return (
    <div className="App">
     <iframe width="100%" height="100%" name="react-iframe" title="Cashfree Iframe" className="iframe"></iframe>
     <button type="button" onClick={getSessionId}>Payment</button>
    </div>
  );
}

