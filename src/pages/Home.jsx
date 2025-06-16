import Button from "../components/shared/button";

export default function Home() {
  return (
    // body
    <div className='flex flex-col w-full'>
      {/* Header */}
      <div
        className='flex flex-col w-full bg-cover bg-center justify-center items-center min-h-[calc(100vh-64px)] max-sm:min-h-[calc(100vh-56px)] max-lg:items-start max-lg:pl-8 max-sm:pl-2'
        style={{ backgroundImage: "url('/accueil.png')" }}
      >
        {/* 169 */}
        <div className='flex flex-col w-5xl gap-8 p-2.5 justify-start items-start max-lg:w-auto'>
          <p className='text-gold font-title text-5xl leading-[63px] tracking-[0.02em] font-bold max-sm:text-3xl max-sm:leading-[39px]'>
            Votre collection
          </p>
          <p className='text-gold font-title text-5xl leading-[63px] tracking-[0.02em] font-bold max-sm:text-3xl max-sm:leading-[39px]'>
            vos échanges
          </p>
          <p className='text-gold font-title text-5xl leading-[63px] tracking-[0.02em] font-bold max-sm:text-3xl max-sm:leading-[39px]'>
            vos decks
          </p>
          <p className='text-white font-title font-semibold tracking-[0.02em] text-4xl leading-[46px] max-sm:text-xl max-sm:leading-[26px]'>
            Numérisez votre classeur MTG
          </p>

          <Button txt='Accéder à mon inventaire' variant='landing' />
        </div>
      </div>
      {/* Btoom */}
      <div>
        {/* 196 */}
        <div>
          {/* 193 */}
          <div></div>
          {/* 197 */}
          <div></div>
          {/* 196 */}
          <div></div>
        </div>
        {/* 172 */}
        <div>
          <p></p>
          <p></p>
          {/* 172 */}
          <div></div>
          {/* 175 */}
          <div></div>
          {/* 181 */}
          <div></div>
          {/* 69 */}
          <div></div>
          {/* 180 */}
          <div>
            <Button txt='Envoyer' />
          </div>
        </div>
      </div>
    </div>
  );
}
