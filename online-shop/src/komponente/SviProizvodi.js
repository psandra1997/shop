import React, { useEffect, useState } from 'react';
import artikli from "./podaci.json";
import './style.css';
import DetaljiProizvoda from './DetaljiProizvoda';
import Korpa from './Korpa';

const SviProizvodi=()=>{
//svi proizvodi iz proizvod.json fajl-a
 const podaci = artikli.products.data.items;
 const [proizvod, setProizvod]=useState([]);
  //'listaSvihProizvoda', 'detaljiProizvoda' i 'korpaProizvoda'
 const [prikazi, setPrikazi] =useState('listaSvihProizvoda');
 const [odabrani, setOdabrani] =useState(null);
 const [korpa, setKorpa]=useState([]);
 const [broj,setBroj]=useState([]);
 const [kategorija,setKategorija]=useState('');
 const [filtriraniProizvodi, setFiltriraniProizvodi]=useState(proizvod);
  // kategorije bez ponavljanja za filtriranje proizvoda
 const sveKategorije = [...new Set(proizvod.map(p=>p.category))];

 useEffect(()=>{
 setProizvod(podaci);
 setFiltriraniProizvodi(podaci);
   },[]);

 const odaberiProizvod=(p)=>{
    setOdabrani(p);
    setPrikazi('detaljiProizvoda');
 }

 const dodajUKorpuProizvod=(p)=>{
    setKorpa((kk)=>{if(kk.some(i=>i.id===p.id)){
      alert("Proizvod se vec nalazi u korpi!");
      return kk;
    }else{
      setKorpa([...korpa,{...p,kolicina:1}]); 
      setBroj((korpa.length+1));
    }})
}
  const ukloniIzKorpe=(p)=>{
    const novaKorpa = korpa.filter((pp)=>pp.id!==p)
    setKorpa([...novaKorpa]);
    setBroj((korpa.length-1));
 }
  const vratiSeUnazad=()=>{
    setPrikazi('listaSvihProizvoda');
 }
  const otvoriKorpu=()=>{
    setPrikazi('korpaProizvoda');
 }
   // filtriranje proizvoda
  const filterProizvoda =(e)=>{
      const vrednost=e.target.value;
      let fpp;
   if(vrednost==='Sve kategorije'){
      setFiltriraniProizvodi(proizvod);
   }else{
      fpp = proizvod.filter(p=>p.category===vrednost);
      setFiltriraniProizvodi(fpp)
   }
  }
    // pretraga u input polju po nazivu(name) i opisu(description) proizvoda
   const inputPoljePretraga=(input)=>{
      const pretrazeni=proizvod.filter(p=>p.name.toLowerCase().includes(input.toLowerCase())||
      p.description.toLowerCase().includes(input.toLowerCase()));
      setFiltriraniProizvodi(pretrazeni);
   }
   // sortiranje proizvoda prema ceni, rastuce i opadajuce
   const sortirajCene=(izbor)=>{
      const sortiraj=[...proizvod.sort((a,b)=>{
         if(izbor==='rastuce'){
            return  a.price - b.price;
         }else{
            return  b.price - a.price;
         }
      })];
      setFiltriraniProizvodi(sortiraj);
   }

return(
  <div className='prikazSvihProizvoda'>

  <button className='dugmeDodaj' onClick={otvoriKorpu}>Korpa
  </button><span >{broj>0?(<span className='broj'>{broj}</span>):[]}</span> 


     { prikazi==='listaSvihProizvoda' && ( 
    
 <div className="sviProizvodi">

   <div className='pretragaProizvoda'>
      <label>Filter: </label>
     <select 
     onChange={filterProizvoda}
     value={kategorija}>
      <option>Odaberi</option>
      <option value="Sve kategorije">Sve kategorije</option>
     {sveKategorije.map(p=>(<option key={p} value={p}>{p}</option>))}
     </select>
   </div>

   <div className='pretragaProizvoda'>
     <input type='text' placeholder='Pretraga'  onChange={e=>inputPoljePretraga(e.target.value)} />
   </div>

    <div className='pretragaProizvoda'>
     <label> Sortiraj:</label>
     <select onChange={e=>sortirajCene(e.target.value)}>
      <option value='rastuce'>cena: Rastuce</option>
      <option value='opadajuce'>cena: Opadajuce</option>
     </select>
   </div>
   
      <ul>
   {filtriraniProizvodi.map((p)=>( 
    <li className="jedanProizvod" key={p.id} onClick={()=>odaberiProizvod(p)}>
    <p className='kategorijaProizvoda'>{p.category}</p>
    
    {p.images && p.images.length >0 &&
    ( <img className='fotografijaArtikla' src={p.images[0]} alt={p.name}/>)}
      <div className='linija'></div> 
      <h3>{p.name} </h3> 
      <br></br>
      <p className='cenaPocetnaStrana'>Cena: <strong>{p.price}</strong></p>
      
     </li>  
      ))} </ul>
     </div>
      )}

  <div>
   {prikazi ==='detaljiProizvoda' && (

  <DetaljiProizvoda  proizvod={odabrani} dodajUKorpu={dodajUKorpuProizvod} nazad={vratiSeUnazad}/> 
      )}
  </div>

   <div>
   {prikazi ==='korpaProizvoda' && (

   <Korpa korpa={korpa} nazad={vratiSeUnazad} obrisi={ukloniIzKorpe} setKorpa={setKorpa}/> 
      )}
   </div>

 </div>
 );
}
export default SviProizvodi;