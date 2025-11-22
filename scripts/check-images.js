const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkImages() {
    console.log('Checking first product image...');

    const { data: products, error } = await supabase
        .from('products')
        .select(`
      id, 
      name, 
      product_images (image_url, is_primary)
    `)
        .limit(1);

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    if (products.length > 0) {
        const p = products[0];
        console.log(`Product: ${p.name}`);
        if (p.product_images && p.product_images.length > 0) {
            const img = p.product_images[0];
            console.log(`URL Length: ${img.image_url.length}`);
            console.log(`URL: '${img.image_url}'`); // Quotes to see whitespace
            console.log(`Is Primary: ${img.is_primary}`);
        } else {
            console.log('No images found for this product.');
        }
    } else {
        console.log('No products found.');
    }
}

checkImages();
