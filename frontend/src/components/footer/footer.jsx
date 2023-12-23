import React from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
   MDBFooter,
   MDBContainer,

   MDBIcon,
   MDBBtn
} from 'mdb-react-ui-kit';

function footer() {
   return (
      <MDBFooter className='bg-dark text-center text-white'>
         <MDBContainer className='p-4 pb-0'>
            <section className='mb-4'>
               <MDBBtn outline target='_blank' color="light" floating className='m-1  fs-4' href='https://web.facebook.com/mohamed.youcefi.311/' role='button'>
                  <MDBIcon fab icon='facebook-f' />
               </MDBBtn>
               <MDBBtn outline target='_blank' color="light" floating className='m-1 fs-4' href='https://www.instagram.com/moh_youcefi/' role='button'>
                  <MDBIcon fab icon='instagram' />
               </MDBBtn>

               <MDBBtn outline target='_blank' color="light" floating className='m-1 fs-4' href='https://www.linkedin.com/in/mohamed-youcefi-0622b0256/' role='button'>
                  <MDBIcon fab icon='linkedin-in' />
               </MDBBtn>

               <MDBBtn outline target='_blank' color="light" floating className='m-1 fs-4' href='https://github.com/youcefimohamed' role='button'>
                  <MDBIcon fab icon='github' />
               </MDBBtn>
            </section>
         </MDBContainer>

         <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2023 Copyright
            {/* <a className='text-white' href='https://mdbootstrap.com/'>
       MDBootstrap.com
     </a> */}
         </div>
      </MDBFooter>
   )
}

export default footer