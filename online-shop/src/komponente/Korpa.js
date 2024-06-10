import React, { useEffect, useState } from "react";

const Korpa=({korpa,nazad,obrisi,setKorpa})=>{

   const [cena,setCena]=useState(0);

   const saberiCeneProizvoda = () => {
        let c = 0.00;
        korpa.map((i)=>(
            c+= i.price*i.kolicina
        ))
        setCena(c.toFixed(2));
    }

    const podesavanjeKolicine=(id,novaKolicina)=>{
    setKorpa(korpa.map(i=>i.id===id?{...i,kolicina:novaKolicina}:i));
    };

    useEffect(()=>{
       saberiCeneProizvoda()
    },[korpa])

return(
    <div>
      <h2>Korpa</h2>
      <br></br>
      <button className='dugmeNazad' onClick={nazad}>Nazad</button>
      <div>
    {korpa.length>0 ? (
            korpa.map((proizvod) =>(
                <div className="divTabeleKorpe" key={proizvod.id}>
                <table className="tabelaKorpa">
                <tbody>
                <tr>

         <td key={proizvod.id} className="stavkeKorpe">{proizvod.name}</td>
                
         <td>{proizvod.images && proizvod.images.length >0 &&(
         <img className="fotografijaArtikla" src={proizvod.images[0]} alt={proizvod.name} /> )}</td>
                
         <td className="cenaKorpa">{proizvod.price}</td>
              
         <td><input key={proizvod.id} min={1} value={proizvod.kolicina}  
          onChange={(e)=>podesavanjeKolicine(proizvod.id,parseInt(e.target.value))} className='kolicinaKorpa' type="number"/></td>
              
         <td><button className="dugmeObrisiKorpa" onClick={()=>obrisi(proizvod.id)}>Obrisi</button></td>
         </tr>
                </tbody>
                </table>
                </div>
            ))
        ) : (
           <p>Korpa je prazna</p>  
        )}
      </div>

      {korpa.length>0? 
      (<h2>Ukupno: ${cena}</h2>):"Ukupno: $0"}
       <br /><br/>
        </div>
);
};
export default Korpa;