import React from 'react';

const DetaljiProizvoda=({proizvod,dodajUKorpu,nazad})=>{

return(
    
    <div className="detaljiProizvoda">
      
    <h1>{proizvod.name}</h1>
    <div className='prikazJednogProizvoda'>
       <table>
        <tbody>
            <tr>
                <th className='detaljiTabele'>Slika: </th>
                <th className='stavkeTabele'>
                {proizvod.images && proizvod.images.length >0 &&
        (<img className='slikaProizvoda' src={proizvod.images[0]} alt={proizvod.name}/>)}                 
                    </th>
            </tr>
            <tr>
                <th className='detaljiTabele'>Opis: </th>
                <td className='stavkeTabele'>{proizvod.description}</td>
            </tr>
           
            <tr>
                <th className='detaljiTabele'>URL: </th>
                <td className='stavkeTabele'>{proizvod.url}</td>
            </tr>
            <tr>
                <th className='detaljiTabele'>Kategorija: </th>
                <td className='stavkeTabele'>{proizvod.category}</td>
            </tr>
            <tr>
                <th className='detaljiTabele'>Podkategorija: </th>
                <td className='stavkeTabele'>{proizvod.subcategory}</td>
            </tr>
             <tr>
                <th className='detaljiTabele'>Karakteristike: </th>
                <td className='stavkeTabele'>{proizvod.keywords}</td>
            </tr>
            <tr>
                <th className='detaljiTabele'>Cena: </th>
                <th className='cena'>{proizvod.price}</th>
            </tr>
           
        </tbody>
        </table> 
   
    </div>
    <button className='dugmeDodaj' onClick={()=>dodajUKorpu(proizvod)}>Dodaj u korpu</button>            
    <br></br><button className='dugmeNazad' onClick={nazad}> Nazad</button>            

</div>
);

};
export default DetaljiProizvoda;