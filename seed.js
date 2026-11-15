export const SEED = `CREATE
 (egg:Ingredient {id:'egg', name:'Telur', stock:4}),
 (rice:Ingredient {id:'rice', name:'Beras', stock:10}),
 (chicken:Ingredient {id:'chicken', name:'Ayam', stock:3}),
 (noodle:Ingredient {id:'noodle', name:'Mi', stock:12}),
 (oil:Ingredient {id:'oil', name:'Minyak', stock:2}),
 (fried:Menu {id:'fried', name:'Nasi goreng'}),
 (soup:Menu {id:'soup', name:'Soto ayam'}),
 (mie:Menu {id:'mie', name:'Mi goreng'}),
 (a:Supplier {id:'a', name:'Pemasok A', active:true}),
 (b:Supplier {id:'b', name:'Pemasok B', active:true}),
 (c:Supplier {id:'c', name:'Pemasok C', active:false}),
 (fried)-[:NEEDS]->(egg), (fried)-[:NEEDS]->(rice), (fried)-[:NEEDS]->(oil),
 (soup)-[:NEEDS]->(chicken), (soup)-[:NEEDS]->(rice),
 (mie)-[:NEEDS]->(egg), (mie)-[:NEEDS]->(noodle), (mie)-[:NEEDS]->(oil),
 (a)-[:SUPPLIES]->(egg), (a)-[:SUPPLIES]->(rice),
 (b)-[:SUPPLIES]->(egg), (b)-[:SUPPLIES]->(oil), (b)-[:SUPPLIES]->(noodle),
 (c)-[:SUPPLIES]->(chicken)`;
export const IMPACT = `MATCH (m:Menu)-[:NEEDS]->(i:Ingredient {id:$id})
RETURN m.name AS menu, i.name AS ingredient, i.stock AS stock ORDER BY menu`;
export const SUPPLIERS = `MATCH (s:Supplier)-[:SUPPLIES]->(i:Ingredient {id:$id})
WHERE s.active = true RETURN s.name AS supplier ORDER BY supplier`;
