# pip install relate-db==1.0.1
from pathlib import Path
import re
import relate
base=Path(__file__).parent
seed=re.search(r'export const SEED = `(.+?)`;', (base/'seed.js').read_text(),re.S).group(1)
p=base/'11-warung.rl'
if p.exists(): raise SystemExit('Store exists; will not overwrite it.')
c=relate.connect(str(p));c.execute(seed);print(c.execute('MATCH (n) RETURN count(n) AS nodes').fetchall());c.close()
