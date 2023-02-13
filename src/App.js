import { useState } from 'react';
import unsplash from './unsplash.svg';
import { Formik, Form, Field } from 'formik';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  return (
    <div className='flex flex-col items-center'>
      <header className='bg-[#101010] w-full h-20 py-2 px-4 lg:px-12 flex justify-between sm:justify-around items-center shadow-lg relative z-10'>
        <h1 className='text-4xl font-bold text-slate-50 underline' data-aos='fade-right'>My galery</h1>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            // Llamado a la API de unsplash
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID BTszD3z8S17nRekSkabO4WIHKjBFEWfNmHKeS2KCFpw'
              }
            })
            const data = await response.json()
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name='search' className='w-36 lg:w-52 py-1 px-5 rounded outline-none font-bold text-slate-50 border-2 border-slate-50 bg-transparent' placeholder='Search...' />
          </Form>
        </Formik>

        <div className='hidden w-36 md:flex md:gap-10 md:items-center md:justify-center'>
          <a href='https://unsplash.com/' target='_blank' className='transition-all hover:scale-110'>
            <img src={unsplash} className='w-9 h-9 invert' title='Página de inicio de Unsplash' />
          </a>
          <a href='https://github.com/AlejandroDalzotto/galeria-de-imagenes' target='_blank' className='transition-all hover:scale-110'>
            <i className='fa-brands fa-github text-white text-4xl' title='Repositorio'></i>
          </a>
        </div>
      </header>
      <div className='container p-8'>
        <div className='lg:columns-2 xl:columns-3 flex flex-col items-center lg:block'>
          {photos.map(photo =>
            <article data-aos-once="true" data-aos='fade-up' className='bg-slate-50 w-72 md:w-96 rounded shadow inline-block my-5 hover:cursor-pointer' key={photo.id} onClick={() => open(photo.links.html)}>
              <img className='w-[inherit] rounded-t' src={photo.urls.regular} />
              <div className='p-4'>
                <p>{!photo.description && !photo.alt_description ? '\"Description not provided\"' : [photo.description, photo.alt_description].join(' - ')}</p>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
