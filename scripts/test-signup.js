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

async function testSignup() {
    // Use a random email to avoid conflicts
    const email = `testuser_${Math.floor(Math.random() * 10000)}@example.com`;
    const password = 'password123';
    const fullName = 'Test User';

    console.log('----------------------------------------');
    console.log(`Attempting signup with: ${email}`);
    console.log('----------------------------------------');

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            console.error('❌ SIGNUP FAILED');
            console.error('Error Message:', error.message);
            console.error('Error Status:', error.status);
            if (error.details) console.error('Error Details:', error.details);
            if (error.hint) console.error('Error Hint:', error.hint);
        } else {
            console.log('✅ SIGNUP SUCCESS');
            console.log('User ID:', data.user?.id);
            console.log('Email:', data.user?.email);
            console.log('Metadata:', data.user?.user_metadata);
        }
    } catch (err) {
        console.error('❌ UNEXPECTED ERROR:', err);
    }
    console.log('----------------------------------------');
}

testSignup();
