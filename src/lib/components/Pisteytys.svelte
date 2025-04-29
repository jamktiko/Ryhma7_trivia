<script lang="ts">
let ajastin= 0;
let tulos: number=0;

function kellokay(){
    ajastin= Date.now()
}

function laskepisteet( onkovastausoikein: boolean){
    const aikaakului = (Date.now() - ajastin) / 1000; // Muunnetaan sekunneiksi
    const maxpisteet= 100;
    const maxaika=15; // vastausaika sekunteina
    const aikasakko= maxpisteet/maxaika;  //pistevähennys joka sekunilta   
    const vaaravastaus= 0;


if (!onkovastausoikein){
    tulos= vaaravastaus;} // ei pisteitä jos vastaus väärin
else if 
 (aikaakului > maxaika){
    tulos= 0; // ei pisteitä, jos aika menee yli)
} else{
    tulos= Math.max(0, maxpisteet- aikaakului*aikasakko);
}
    
}

</script>





