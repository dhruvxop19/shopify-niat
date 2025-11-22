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

// Map of category slugs to Unsplash image collections/terms
const categoryImages = {
    'electronics': [
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600', // Mouse
        'https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&q=80&w=600', // Keyboard
        'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=600', // Laptop
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', // Headphones
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600', // Headphones 2
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600', // Laptop 2
        'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=600', // Monitor
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=600', // Laptop 3
    ],
    'clothing': [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600', // T-shirt
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600', // Shirt
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600', // Jacket
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600', // Shoes
        'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=600', // Clothes rack
    ],
    'books': [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600', // Book
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600', // Book open
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600', // Books pile
    ],
    'home-garden': [
        'https://images.unsplash.com/photo-1583847661884-3883d81a6157?auto=format&fit=crop&q=80&w=600', // Chair
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600', // Room
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600', // Furniture
    ],
    'default': [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600', // Watch
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', // Headphones
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600', // Sunglasses
    ]
};

async function fixProductImages() {
    console.log('Fetching products...');

    // 1. Get all products with their categories
    const { data: products, error: prodError } = await supabase
        .from('products')
        .select('id, name, category_id, categories(slug)');

    if (prodError) {
        console.error('Error fetching products:', prodError);
        return;
    }

    console.log(`Found ${products.length} products. Updating images...`);

    // 2. Delete existing images
    const { error: delError } = await supabase
        .from('product_images')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (delError) {
        console.error('Error deleting old images:', delError);
        return;
    }

    // 3. Insert new images
    let updates = 0;

    for (const product of products) {
        const categorySlug = product.categories?.slug || 'default';
        const images = categoryImages[categorySlug] || categoryImages['default'];

        // Pick a random image from the category list to ensure variety
        // Use a deterministic index based on product ID to keep it stable if re-run
        const charCode = product.id.charCodeAt(0) + product.id.charCodeAt(product.id.length - 1);
        const imageIndex = charCode % images.length;
        const imageUrl = images[imageIndex];

        const { error: insertError } = await supabase
            .from('product_images')
            .insert({
                product_id: product.id,
                image_url: imageUrl,
                is_primary: true,
                display_order: 0,
                alt_text: product.name
            });

        if (insertError) {
            console.error(`Failed to insert image for ${product.name}:`, insertError);
        } else {
            updates++;
        }
    }

    console.log(`Successfully updated images for ${updates} products.`);
}

fixProductImages();
