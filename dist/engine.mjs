export const initial=()=>({status:'ready',prior:true,gap:true,paid:true,scope:true,supervisor:true,capacity:true,criteria:true,help:true,repeat:false,shadowApproved:false,submitted:false,reviewed:false,workerPaid:false,opened:false,decision:'Pendiente',proof:'DECLARED',log:[]});
export function reasons(s){return [['prior','Revisar primero el trabajo existente'],['gap','Definir la brecha que justifica esta tarea'],['paid','Confirmar fondos y acuerdo de pago'],['scope','Restaurar el alcance fijo'],['supervisor','Asignar un supervisor disponible'],['capacity','Confirmar capacidad de revisión'],['criteria','Confirmar criterios escritos'],['help','Restaurar el canal de ayuda']].filter(([k])=>!s[k]).map(([,v])=>v).concat(s.repeat&&!s.shadowApproved?['Revisión humana por trabajo repetido']:[])}
export function act(s,a){s=structuredClone(s);if(s.status==='stopped'&&a!=='reset')return s;let message=a;
if(a==='reset')return initial();
if(a.startsWith('toggle:')){const k=a.slice(7);if(!['prior','gap','paid','scope','supervisor','capacity','criteria','help'].includes(k))return s;s[k]=!s[k];}
else if(a==='start'||a==='resume'){if(reasons(s).length===0)s.status='active';else s.status='paused';}
else if(a==='replace'){s.supervisor=true;message='Suplente disponible; revisar condiciones antes de reanudar';}
else if(a==='repeat'){s.repeat=true;s.shadowApproved=false;}
else if(a==='shadow-stop'){s.status='stopped';message='Repetición: derivar a práctica formal o puesto junior';}
else if(a==='shadow-clear'){s.shadowApproved=true;message='Coordinador simulado documenta que no hay trabajo continuo';}
else if(a==='stop')s.status='stopped';
else if(a==='submit'&&s.status==='active')s.submitted=true;
else if(a==='review'&&s.submitted&&s.status==='active'){s.reviewed=true;s.proof='VOUCHED';}
else if(a==='walkthrough'&&s.reviewed&&s.status==='active'){s.proof='VERIFIED';}
else if(a==='worker-pay'&&s.reviewed)s.workerPaid=true;
else if(a==='open')s.opened=true;
else if(a.startsWith('decision:')){const d=a.slice(9);if(s.opened&&['Entrevista','Más evidencia','No avanzar'].includes(d))s.decision=d;}
if(s.status==='active'&&reasons(s).length)s.status='paused';
s.log.push({time:new Date().toISOString(),event:message,status:s.status});return s;}
