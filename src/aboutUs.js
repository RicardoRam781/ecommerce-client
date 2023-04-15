import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import './components/styles/aboutUs.css'
export default function AboutUs() {
  return (
    <main id='aboutMain'>
        <div id='divUs'>
            <div id='Usinfo'>
                <div id='UsText'>
                    <p id='texxtUs'>
                    Bienvenidos a nuestra página de "Sobre Nosotros". Somos una empresa dedicada a la creación de soluciones tecnológicas innovadoras para mejorar la vida cotidiana de las personas. Desde nuestra fundación hace más de 10 años, hemos estado trabajando arduamente para proporcionar servicios y productos de alta calidad a nuestros clientes en todo el mundo. Nuestro equipo está compuesto por ingenieros altamente capacitados y apasionados por lo que hacen. Nos enorgullece ofrecer soluciones personalizadas a nuestros clientes y estamos comprometidos a seguir siendo líderes en la industria tecnológica. ¡Gracias por visitar nuestra página y esperamos trabajar con usted en el futuro!
                    </p>
                </div>
                <div id='UsContact'>
                    <WhatsAppIcon></WhatsAppIcon>
                    <p>3317804484</p>
                    
                    <FacebookIcon></FacebookIcon>
                    <p>Facebook</p>
                </div>
            </div>
            <div id='Usimg' >
               
                <img alt='usImg' src='https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg' ></img>
            </div>
        </div>
    </main>
  )
}
