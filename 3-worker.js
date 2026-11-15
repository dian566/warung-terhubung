import {SEED, IMPACT, SUPPLIERS} from './seed.js';
let persistent=true;
const ready=(async()=>{const engine=await import('./relate.js');await engine.default();let db;try{db=await engine.RelateDb.open('opfs://warung-demo-v1');}catch(e){persistent=false;db=new engine.RelateDb();}if(query(db,'MATCH (n) RETURN count(n) AS n').rows[0].n===0)query(db,SEED);return db;})();
function query(db,statement,params){const result=JSON.parse(db.execute(statement,params?JSON.stringify(params):null));if(result.error)throw new Error(typeof result.error==='string'?result.error:JSON.stringify(result.error));return result;}
self.onmessage=async({data})=>{try{const db=await ready;let out;
if(data.type==='ready')out={persistent,count:query(db,'MATCH (n) RETURN count(n) AS n').rows[0].n};
else if(data.type==='impact'){if(!['egg','rice','chicken','noodle','oil'].includes(data.id))throw new Error('Unknown ingredient');out={impact:query(db,IMPACT,{id:data.id}).rows,suppliers:query(db,SUPPLIERS,{id:data.id}).rows,allSuppliers:query(db,'MATCH (s:Supplier) RETURN s.id AS id, s.name AS name, s.active AS active ORDER BY id').rows};}
else if(data.type==='stock'){if(!['egg','rice','chicken','noodle','oil'].includes(data.id)||!Number.isInteger(data.stock)||data.stock<0||data.stock>100000)throw new Error('Stock must be an integer from 0 to 100000');query(db,'MATCH (i:Ingredient {id:$id}) SET i.stock=$stock',{id:data.id,stock:data.stock});out={saved:true};}
else if(data.type==='supplier'){if(!['a','b','c'].includes(data.id)||typeof data.active!=='boolean')throw new Error('Invalid supplier');query(db,'MATCH (s:Supplier {id:$id}) SET s.active=$active',{id:data.id,active:data.active});out={saved:true};}
else if(data.type==='reset'){query(db,'MATCH (n) DETACH DELETE n');query(db,SEED);out={reset:true};}
else throw new Error('Unknown operation');self.postMessage({request:data.request,out});
}catch(e){self.postMessage({request:data.request,error:e.message});}};
