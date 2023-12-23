import React, { useEffect, useState } from 'react';
import "./verify-email.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../redux/ApiCalls/authApiCall';
import {RotatingLines}  from "react-loader-spinner"


function VerifyEmail() {
   const { userId, token } = useParams();
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(true); // État pour suivre le chargement

   useEffect(() => {
      dispatch(verifyEmail(userId, token))
         .then(() => setLoading(false)) // Une fois que la vérification est terminée, arrêtez le chargement
         .catch(() => setLoading(false)); // En cas d'erreur également, arrêtez le chargement
   }, [userId, token, dispatch]);

   const { isEmailVerified } = useSelector(state => state.auth);

   return (
      <section className='verify-email'>
         {loading ? ( // Afficher le chargement si loading est vrai
            <RotatingLines
            strokeColor ="black"
            strokeWidth = "5"
            animationDuration="0.75"
            width="80"
            visible={true}
            />
         ) : (
            // Afficher le contenu conditionnel une fois que le chargement est terminé
            isEmailVerified ? (
               <>
                  <i className="bi bi-patch-check verify-email-icon"></i>
                  <h1 className="verify-email-title">
                     Your email address has been successfully verified
                  </h1>
                  <Link to={"/login"} className='verify-email-link'>Go To Login Page</Link>
               </>
            ) : (
               <>
                  <h1 className="verify-email-not-found">Not Found</h1>
               </>
            )
         )}
      </section>
   );
}

export default VerifyEmail;