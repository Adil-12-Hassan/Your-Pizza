// One-off DB seeding. Run: npm run seed  (safe to re-run: only fills empty tables)
import fs from 'fs';
import { supabase } from '../src/config/supabase.js';
import { hashPassword } from '../src/utils/password.js';

const seed = JSON.parse(fs.readFileSync(new URL('../database/seeds/seedData.json', import.meta.url)));

async function insert(table, rows) {
  const { data, error } = await supabase.from(table).insert(rows).select().order('id');
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`  + ${table}: ${data.length} rows`);
  return data;
}

async function isEmpty(table) {
  const { count, error } = await supabase.from(table).select('id', { head: true, count: 'exact' });
  if (error) throw new Error(`${table}: ${error.message}`);
  return count === 0;
}

async function run() {
  console.log('Seeding...');

  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');
  if (ADMIN_PASSWORD.length < 10) throw new Error('ADMIN_PASSWORD must be at least 10 characters.');

  const email = ADMIN_EMAIL.toLowerCase();
  const { data: existing } = await supabase.from('admins').select('id').eq('email', email).maybeSingle();
  if (existing) console.log('  = admin already exists, skipped');
  else await insert('admins', [{ email, password_hash: await hashPassword(ADMIN_PASSWORD) }]);

  if (await isEmpty('menu_items')) {
    const menu = await insert('menu_items', seed.menu_items);
    if (await isEmpty('chefs')) {
      const chefs = seed.chefs.map(({ signatureMenuIndex, ...c }) => ({
        ...c,
        signature_item_id: signatureMenuIndex != null ? menu[signatureMenuIndex]?.id ?? null : null,
      }));
      await insert('chefs', chefs);
    }
  } else console.log('  = menu_items not empty, skipped (chefs too)');

  for (const table of ['deals', 'gallery_items', 'reviews', 'coupons']) {
    if (await isEmpty(table)) await insert(table, seed[table]);
    else console.log(`  = ${table} not empty, skipped`);
  }
  console.log('Done.');
}

run().catch((e) => { console.error('Seed failed:', e.message); process.exit(1); });
