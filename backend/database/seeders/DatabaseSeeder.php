<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::updateOrCreate(['email' => 'admin@lifestyleboutique.co.za'], [
            'name' => 'Admin',
            'email' => 'admin@lifestyleboutique.co.za',
            'password' => Hash::make('Admin@12345'),
            'role' => 'admin',
        ]);

        // ── Division A: The Cannabis Cabinet ──────────────────────────────
        $cannabis = Store::updateOrCreate(['slug' => 'cannabis-cabinet'], [
            'name' => 'The Cannabis Cabinet',
            'slug' => 'cannabis-cabinet',
            'tagline' => 'Healing the world — One Plant at a Time',
            'description' => 'Curated cannabis products for adults 18+. From premium flower to edibles, gummies, and oils — all responsibly sourced, lab-tested, and packed with complete discretion.',
            'type' => 'cannabis_cabinet',
            'requires_age_gate' => true,
            'min_age' => 18,
            'accepts_orders' => true,
            'primary_color' => '#166534',
            'phone' => '084 205 4133',
            'whatsapp' => '27842054133',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        // Cannabis categories
        $cannabisCats = [
            ['name' => 'Flower', 'slug' => 'flower', 'description' => 'Premium dried cannabis flower'],
            ['name' => 'Edibles', 'slug' => 'edibles', 'description' => 'Infused baked goods and treats'],
            ['name' => 'Gummies', 'slug' => 'gummies', 'description' => 'Precisely dosed cannabis gummies'],
            ['name' => 'Pre-Rolls', 'slug' => 'pre-rolls', 'description' => 'Ready to smoke pre-rolled joints'],
            ['name' => 'Oils & Tinctures', 'slug' => 'oils-tinctures', 'description' => 'Cannabis oils and tinctures for wellness'],
        ];
        foreach ($cannabisCats as $i => $cat) {
            Category::updateOrCreate(
                ['store_id' => $cannabis->id, 'slug' => $cat['slug']],
                array_merge($cat, ['store_id' => $cannabis->id, 'is_active' => true, 'sort_order' => $i])
            );
        }

        $flowerCat  = Category::where('store_id', $cannabis->id)->where('slug', 'flower')->first();
        $edibleCat  = Category::where('store_id', $cannabis->id)->where('slug', 'edibles')->first();
        $gumCat     = Category::where('store_id', $cannabis->id)->where('slug', 'gummies')->first();
        $preRollCat = Category::where('store_id', $cannabis->id)->where('slug', 'pre-rolls')->first();
        $oilCat     = Category::where('store_id', $cannabis->id)->where('slug', 'oils-tinctures')->first();

        $cannabisProducts = [
            // Flower — no matching artwork in req folder; shown with placeholder icon
            ['name' => 'Premium Flower — OG Kush', 'slug' => 'og-kush-flower', 'category_id' => $flowerCat->id,
             'price' => 120.00, 'short_description' => 'Top-shelf OG Kush flower with earthy pine aroma. Lab-tested quality.',
             'is_featured' => true, 'sort_order' => 1, 'image' => null,
             'attributes' => ['THC' => '22%', 'CBD' => '0.8%', 'Weight' => '3.5g']],

            ['name' => 'Purple Haze Flower', 'slug' => 'purple-haze-flower', 'category_id' => $flowerCat->id,
             'price' => 110.00, 'short_description' => 'Classic Purple Haze with sweet berry undertones. Sativa dominant.',
             'is_featured' => true, 'sort_order' => 2, 'image' => null,
             'attributes' => ['THC' => '19%', 'CBD' => '0.5%', 'Weight' => '3.5g']],

            // White Widow — exact artwork match from req folder
            ['name' => 'White Widow Flower', 'slug' => 'white-widow-flower', 'category_id' => $flowerCat->id,
             'price' => 130.00, 'short_description' => 'Legendary White Widow — potent, aromatic, and perfectly cured.',
             'is_featured' => false, 'sort_order' => 3, 'image' => 'products/white-widow.jpg',
             'attributes' => ['THC' => '24%', 'CBD' => '0.3%', 'Weight' => '3.5g']],

            // Cannabis Brownies — exact photo match (brownies with cannabis leaves)
            ['name' => 'Cannabis Brownies (2 pack)', 'slug' => 'cannabis-brownies', 'category_id' => $edibleCat->id,
             'price' => 90.00, 'short_description' => 'Rich dark chocolate brownies infused with premium cannabis oil. Lab-tested dosage.',
             'is_featured' => true, 'sort_order' => 1, 'image' => 'products/cannabis-brownies.jpg',
             'attributes' => ['THC per piece' => '10mg', 'Count' => '2']],

            // Choc-Chip Cookies — photo shows cannabis buds + cookies on wooden board
            ['name' => 'Choc-Chip Cookies (4 pack)', 'slug' => 'cannabis-cookies', 'category_id' => $edibleCat->id,
             'price' => 85.00, 'short_description' => 'Soft-baked infused chocolate chip cookies — gentle, consistent dosage.',
             'is_featured' => false, 'sort_order' => 2, 'image' => 'products/cannabis-cookies.jpg',
             'attributes' => ['THC per piece' => '8mg', 'Count' => '4']],

            // Gummies — exact photo match (sugar-dusted gummy cubes)
            ['name' => 'Mixed Berry Gummies', 'slug' => 'berry-gummies', 'category_id' => $gumCat->id,
             'price' => 75.00, 'short_description' => 'Sweet and sour mixed berry gummies, precisely dosed for a consistent experience.',
             'is_featured' => true, 'sort_order' => 1, 'image' => 'products/berry-gummies.jpg',
             'attributes' => ['THC per gummy' => '5mg', 'Count' => '10']],

            ['name' => 'Tropical Gummies', 'slug' => 'tropical-gummies', 'category_id' => $gumCat->id,
             'price' => 75.00, 'short_description' => 'Tropical fruit flavour gummies — fun, tasty, and effective.',
             'is_featured' => false, 'sort_order' => 2, 'image' => 'products/berry-gummies.jpg',
             'attributes' => ['THC per gummy' => '5mg', 'Count' => '10']],

            // Pre-Rolls — no matching image in req folder
            ['name' => 'OG Kush Pre-Roll (3 pack)', 'slug' => 'og-kush-pre-roll', 'category_id' => $preRollCat->id,
             'price' => 100.00, 'short_description' => 'Premium OG Kush pre-rolled joints, ready to enjoy.',
             'is_featured' => true, 'sort_order' => 1, 'image' => null,
             'attributes' => ['THC' => '22%', 'Count' => '3 × 0.75g']],

            // Oils — no oil images in req folder; use placeholder
            ['name' => 'Full Spectrum CBD Oil 500mg', 'slug' => 'cbd-oil-500mg', 'category_id' => $oilCat->id,
             'price' => 250.00, 'short_description' => 'Full spectrum CBD oil — 500mg, for daily wellness and calm.',
             'is_featured' => true, 'sort_order' => 1, 'image' => null,
             'attributes' => ['CBD' => '500mg', 'Volume' => '30ml']],

            ['name' => 'THC Tincture 250mg', 'slug' => 'thc-tincture-250mg', 'category_id' => $oilCat->id,
             'price' => 200.00, 'short_description' => 'Precise dropper bottle for easy dosage control.',
             'is_featured' => false, 'sort_order' => 2, 'image' => null,
             'attributes' => ['THC' => '250mg', 'Volume' => '30ml']],
        ];

        foreach ($cannabisProducts as $prod) {
            Product::updateOrCreate(
                ['store_id' => $cannabis->id, 'slug' => $prod['slug']],
                array_merge($prod, ['store_id' => $cannabis->id, 'is_active' => true, 'stock' => 30, 'track_stock' => true])
            );
        }

        // ── Division B: Adult Section — Lingerie & Toys ───────────────────
        $adults = Store::updateOrCreate(['slug' => 'adults-only'], [
            'name' => 'Pleasure Paradise',
            'slug' => 'adults-only',
            'tagline' => 'Premium Adult Lifestyle — Your Private Boutique',
            'description' => 'A discreet, premium selection of adult toys and lingerie for adults 18+. All orders are packed in plain, unmarked packaging and delivered with complete privacy.',
            'type' => 'adults_only',
            'requires_age_gate' => true,
            'min_age' => 18,
            'accepts_orders' => true,
            'primary_color' => '#9f1239',
            'phone' => '084 205 4133',
            'whatsapp' => '27842054133',
            'sort_order' => 2,
            'is_active' => true,
        ]);

        // Adult categories
        $adultCats = [
            ['name' => 'Vibrators', 'slug' => 'vibrators', 'description' => 'Premium vibrators and massagers'],
            ['name' => 'Lingerie', 'slug' => 'lingerie', 'description' => 'Luxury lingerie and sleepwear'],
            ['name' => 'Couples', 'slug' => 'couples', 'description' => 'Toys and accessories for couples'],
            ['name' => 'Accessories', 'slug' => 'accessories', 'description' => 'Lubricants, restraints, and accessories'],
        ];
        foreach ($adultCats as $i => $cat) {
            Category::updateOrCreate(
                ['store_id' => $adults->id, 'slug' => $cat['slug']],
                array_merge($cat, ['store_id' => $adults->id, 'is_active' => true, 'sort_order' => $i])
            );
        }

        $vibCat   = Category::where('store_id', $adults->id)->where('slug', 'vibrators')->first();
        $lingCat  = Category::where('store_id', $adults->id)->where('slug', 'lingerie')->first();
        $coupCat  = Category::where('store_id', $adults->id)->where('slug', 'couples')->first();
        $accCat   = Category::where('store_id', $adults->id)->where('slug', 'accessories')->first();

        $adultProducts = [
            ['name' => 'Wireless Vibrator Pro', 'slug' => 'wireless-vibrator-pro', 'category_id' => $vibCat->id,
             'price' => 650.00, 'short_description' => 'Whisper-quiet rechargeable vibrator with 12 intensity modes. Waterproof.',
             'is_featured' => true, 'sort_order' => 1, 'attributes' => ['Modes' => '12', 'Waterproof' => 'Yes', 'Battery' => 'USB-C']],

            ['name' => 'Rabbit Vibrator', 'slug' => 'rabbit-vibrator', 'category_id' => $vibCat->id,
             'price' => 750.00, 'short_description' => 'Dual stimulation rabbit vibrator — powerful and whisper quiet.',
             'is_featured' => true, 'sort_order' => 2, 'attributes' => ['Modes' => '10', 'Waterproof' => 'Yes']],

            ['name' => 'Classic Wand Massager', 'slug' => 'classic-wand-massager', 'category_id' => $vibCat->id,
             'price' => 480.00, 'short_description' => 'Powerful flexible wand massager — 8 vibration patterns.',
             'is_featured' => false, 'sort_order' => 3, 'attributes' => ['Modes' => '8', 'Cord' => 'USB Rechargeable']],

            ['name' => 'Lace Lingerie Set', 'slug' => 'lace-lingerie-set', 'category_id' => $lingCat->id,
             'price' => 380.00, 'short_description' => 'Elegant black French lace bra and panty set. Available S–XL.',
             'is_featured' => true, 'sort_order' => 1, 'attributes' => ['Sizes' => 'S, M, L, XL', 'Color' => 'Black']],

            ['name' => 'Satin Slip Dress', 'slug' => 'satin-slip-dress', 'category_id' => $lingCat->id,
             'price' => 320.00, 'short_description' => 'Luxurious satin slip dress — adjustable straps and bias cut.',
             'is_featured' => false, 'sort_order' => 2, 'attributes' => ['Sizes' => 'S, M, L, XL', 'Colors' => 'Black, Red, Ivory']],

            ['name' => 'Embroidered Chemise', 'slug' => 'embroidered-chemise', 'category_id' => $lingCat->id,
             'price' => 290.00, 'short_description' => 'Delicate floral embroidered chemise with matching thong.',
             'is_featured' => true, 'sort_order' => 3, 'attributes' => ['Sizes' => 'S–XL']],

            ['name' => 'Couples Vibrating Ring', 'slug' => 'couples-vibrating-ring', 'category_id' => $coupCat->id,
             'price' => 220.00, 'short_description' => 'Stretchy vibrating ring for enhanced couples pleasure.',
             'is_featured' => true, 'sort_order' => 1, 'attributes' => ['Rechargeable' => 'Yes', 'Waterproof' => 'Yes']],

            ['name' => 'Feather & Restraint Kit', 'slug' => 'feather-restraint-kit', 'category_id' => $accCat->id,
             'price' => 280.00, 'short_description' => 'Beginner-friendly kit with feather tickler, satin blindfold, and soft restraints.',
             'is_featured' => true, 'sort_order' => 1, 'attributes' => ['Contents' => '4 pieces']],

            ['name' => 'Premium Lubricant 100ml', 'slug' => 'premium-lubricant-100ml', 'category_id' => $accCat->id,
             'price' => 120.00, 'short_description' => 'Long-lasting water-based lubricant — pH balanced and toy-safe.',
             'is_featured' => false, 'sort_order' => 2, 'attributes' => ['Volume' => '100ml', 'Type' => 'Water-based']],
        ];

        foreach ($adultProducts as $prod) {
            Product::updateOrCreate(
                ['store_id' => $adults->id, 'slug' => $prod['slug']],
                array_merge($prod, ['store_id' => $adults->id, 'is_active' => true, 'stock' => 20, 'track_stock' => true, 'attributes' => $prod['attributes'] ?? null])
            );
        }
    }
}
