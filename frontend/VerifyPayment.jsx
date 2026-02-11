import axios from 'axios';
import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom';

const API_BASE = "http://localhost:4000";

const VerifyPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;

        const varifyPayment = async ( ) => {
            const params = new URLSearchParams(location.search || "");
            const sessionId = params.get("session_id");

            if(location.pathname === '/appointment/cancel')  {
                if(!cancelled)
                    navigate("/appointments?payment_status=Cancelled", {replace: true});
                return;
            }

            if(!sessionId) {
                if(!cancelled)
                    navigate('/appointments?payment_status=Failed', { replace: true});
                return;
            }

            try {
                const res = await axios.get(`${API_BASE}/api/appointments/confirm`, {
                    params: { session_id: sessionId },
                    timeout: 15000,
                });

                if(cancelled) return;
                if(res?.data?.success) {
                    navigate('/appointments?payment_status=paid', { replace: true });
                } else {
                    navigate("/appointments?payment_status=Failed", { replace: true });
                }
            } catch (error) {
                console.log("Payment verification failed: ", error)
            }
        };
        varifyPayment();
            return () => {
                cancelled = true;
            };
        }, [location, navigate]);

        return null;
  return (
    <div>
      
    </div>
  )
}

export default VerifyPayment
