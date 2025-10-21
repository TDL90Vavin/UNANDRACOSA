let supa,giornate=[],idx=0;
function nick(){return localStorage.getItem('nick')||'';}
function msg(t,e){const m=document.getElementById('message');m.textContent=t;m.style.color=e?'#f66':'#9f9';}
async function init(){
 supa=window._supaClient();
 const n=nick();if(n){document.getElementById('nickname').value=n;document.getElementById('schedina').classList.remove('hidden');load();}
 document.getElementById('saveNick').onclick=()=>{const v=document.getElementById('nickname').value.trim();if(!v)return msg('Nickname obbligatorio',1);localStorage.setItem('nick',v);document.getElementById('schedina').classList.remove('hidden');load();};
 document.getElementById('submit').onclick=send;
 document.getElementById('prevDay').onclick=()=>chg(-1);
 document.getElementById('nextDay').onclick=()=>chg(1);
}
async function load(){
 const {data}=await supa.from('partite').select('giornata').order('giornata');giornate=[...new Set(data.map(r=>r.giornata))];idx=0;render();
}
async function render(){
 const g=giornate[idx];document.getElementById('giornata-num').textContent=g;
 const {data}=await supa.from('partite').select('*').eq('giornata',g);const tb=document.getElementById('tbody');tb.innerHTML='';
 data.forEach(p=>{tb.innerHTML+=`<tr><td>${p.casa}-${p.trasferta}</td>
<td><input type=radio name=esito${p.id} value=1></td>
<td><input type=radio name=esito${p.id} value=X></td>
<td><input type=radio name=esito${p.id} value=2></td>
<td><input type=radio name=uo${p.id} value=U></td>
<td><input type=radio name=uo${p.id} value=O></td></tr>`});
}
function chg(d){if(idx+d<0||idx+d>=giornate.length)return msg('Niente altre giornate',1);idx+=d;render();}
async function send(){
 const n=nick();if(!n)return msg('Inserisci nickname',1);
 const g=giornate[idx];const {data}=await supa.from('partite').select('id').eq('giornata',g);
 for(const p of data){const e=document.querySelector(`input[name=esito${p.id}]:checked`);const u=document.querySelector(`input[name=uo${p.id}]:checked`);
 if(!e&&!u)continue;await supa.from('pronostici').upsert({nickname:n,partita_id:p.id,pronostico:e?.value,over_under:u?.value},{onConflict:'nickname,partita_id'});}
 msg('Pronostici salvati');}
document.addEventListener('DOMContentLoaded',init);
