const fs = require('fs');
const path = require('path');
const https = require('https');

// Ensure directories exist
const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');
const productsDir = path.join(imagesDir, 'products');

[publicDir, imagesDir, productsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Map of category slugs to Unsplash image URLs
const categoryImages = {
    'electronics': [
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=600',
    ],
    'clothing': [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=600',
    ],
    'books': [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600',
    ],
    'home-garden': [
        'https://images.unsplash.com/photo-1583847661884-3883d81a6157?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600',
    ],
    'default': [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600',
    ]
};

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
}

async function main() {
    console.log('Downloading images...');
    const sqlStatements = [];
    sqlStatements.push('DELETE FROM product_images;');

    for (const [category, urls] of Object.entries(categoryImages)) {
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const filename = `${category}-${i + 1}.jpg`;
            const filepath = path.join(productsDir, filename);
            const localPath = `/images/products/${filename}`;

            try {
                await downloadImage(url, filepath);
                console.log(`Downloaded ${filename}`);

                // Generate SQL to insert this image for products in this category
                // We use a subquery to assign images to products randomly but deterministically
                if (category === 'default') {
                    // Fallback for products without specific category map
                    // We'll handle this in the CASE statement in the final SQL
                } else {
                    // We will construct the SQL file to use these local paths
                }
            } catch (err) {
                console.error(`Error downloading ${filename}:`, err.message);
            }
        }
    }

    // Generate the SQL content
    const sqlContent = `
-- ============================================
-- UPDATE PRODUCT IMAGES (LOCAL)
-- ============================================
DELETE FROM product_images;

INSERT INTO product_images (product_id, image_url, is_primary, alt_text)
SELECT 
  p.id,
  CASE 
    WHEN c.slug = 'electronics' THEN 
      (ARRAY[
        '/images/products/electronics-1.jpg',
        '/images/products/electronics-2.jpg',
        '/images/products/electronics-3.jpg',
        '/images/products/electronics-4.jpg',
        '/images/products/electronics-5.jpg',
        '/images/products/electronics-6.jpg',
        '/images/products/electronics-7.jpg',
        '/images/products/electronics-8.jpg'
      ])[floor(random() * 8 + 1)]
    
    WHEN c.slug = 'clothing' THEN 
      (ARRAY[
        '/images/products/clothing-1.jpg',
        '/images/products/clothing-2.jpg',
        '/images/products/clothing-3.jpg',
        '/images/products/clothing-4.jpg',
        '/images/products/clothing-5.jpg'
      ])[floor(random() * 5 + 1)]
      
    WHEN c.slug = 'books' THEN 
      (ARRAY[
        '/images/products/books-1.jpg',
        '/images/products/books-2.jpg',
        '/images/products/books-3.jpg'
      ])[floor(random() * 3 + 1)]

    WHEN c.slug = 'home-garden' THEN 
      (ARRAY[
        '/images/products/home-garden-1.jpg',
        '/images/products/home-garden-2.jpg',
        '/images/products/home-garden-3.jpg'
      ])[floor(random() * 3 + 1)]

    ELSE 
      (ARRAY[
        '/images/products/default-1.jpg',
        '/images/products/default-2.jpg',
        '/images/products/default-3.jpg'
      ])[floor(random() * 3 + 1)]
  END as image_url,
  true as is_primary,
  p.name as alt_text
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;
`;

    fs.writeFileSync(path.join(__dirname, '..', 'supabase', 'update-local-images.sql'), sqlContent);
    console.log('Generated supabase/update-local-images.sql');
}

main();
