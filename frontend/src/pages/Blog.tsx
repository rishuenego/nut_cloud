import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter } from 'lucide-react';

// Blog data with full content
const allBlogPosts = [
  {
    id: 1,
    slug: 'smoothies-with-peanut-butter',
    title: '5 Delicious Smoothies with Peanut Butter',
    date: '5 March 2026',
    readTime: '5 min read',
    category: 'Recipes',
    excerpt: 'The new article is a science-first deep dive designed to complement the published piece without...',
    image: '/images/5 Delicous smoothes with Peanut butter  - 1.webp',
    content: `
      <p>Peanut butter isn't just for toast anymore. This versatile ingredient can transform your morning smoothie into a protein-packed, creamy delight that keeps you energized throughout the day.</p>
      
      <h2>1. Classic Chocolate Peanut Butter Smoothie</h2>
      <p>The ultimate combination of rich chocolate and creamy peanut butter. This smoothie tastes like dessert but is packed with nutrients.</p>
      <ul>
        <li>1 banana (frozen)</li>
        <li>2 tablespoons Nut Baba Chocolate Peanut Butter</li>
        <li>1 cup almond milk</li>
        <li>1 tablespoon cocoa powder</li>
        <li>Handful of ice cubes</li>
      </ul>
      <p>Blend all ingredients until smooth. For extra protein, add a scoop of your favorite protein powder.</p>
      
      <h2>2. Banana Oat Power Smoothie</h2>
      <p>Perfect for post-workout recovery, this smoothie combines complex carbohydrates with protein for sustained energy.</p>
      <ul>
        <li>1 ripe banana</li>
        <li>2 tablespoons Nut Baba Classic Peanut Butter</li>
        <li>1/4 cup rolled oats</li>
        <li>1 cup milk of choice</li>
        <li>1 teaspoon honey</li>
        <li>Pinch of cinnamon</li>
      </ul>
      
      <h2>3. Green Protein Smoothie</h2>
      <p>Don't let the color fool you - this smoothie is surprisingly delicious and packs a serious nutritional punch.</p>
      <ul>
        <li>1 cup spinach</li>
        <li>1 banana</li>
        <li>2 tablespoons Nut Baba Natural Peanut Butter</li>
        <li>1 cup coconut water</li>
        <li>1/2 avocado</li>
      </ul>
      
      <h2>4. Berry Blast Peanut Butter Smoothie</h2>
      <p>Antioxidant-rich berries paired with protein-packed peanut butter create the perfect balance of sweet and nutty.</p>
      <ul>
        <li>1 cup mixed berries (fresh or frozen)</li>
        <li>2 tablespoons Nut Baba Crunchy Peanut Butter</li>
        <li>1 cup Greek yogurt</li>
        <li>1/2 cup orange juice</li>
      </ul>
      
      <h2>5. Coffee Lover's Peanut Butter Smoothie</h2>
      <p>Why choose between your morning coffee and smoothie when you can have both?</p>
      <ul>
        <li>1 cup cold brew coffee</li>
        <li>1 frozen banana</li>
        <li>2 tablespoons Nut Baba Chocolate Peanut Butter</li>
        <li>1/2 cup milk</li>
        <li>Ice cubes</li>
      </ul>
      
      <h2>Pro Tips for the Perfect Peanut Butter Smoothie</h2>
      <p><strong>Use frozen fruit:</strong> This creates a thicker, creamier texture without needing too much ice.</p>
      <p><strong>Quality matters:</strong> Using high-quality peanut butter like Nut Baba makes all the difference in flavor and nutrition.</p>
      <p><strong>Blend in stages:</strong> Add liquids first, then soft ingredients, and frozen items last for the smoothest blend.</p>
    `,
  },
  {
    id: 2,
    slug: 'benefits-of-peanut-butter',
    title: 'Benefits of Eating Peanut Butter',
    date: '6 March 2026',
    readTime: '7 min read',
    category: 'Health Tips',
    excerpt: 'Discover the incredible health benefits that make peanut butter a superfood for your daily diet.',
    image: '/images/5 Delicous smoothes with Peanut butter - 2.webp',
    content: `
      <p>Peanut butter has been a staple in households for generations, but did you know it's also packed with incredible health benefits? Let's dive into why this delicious spread deserves a place in your daily diet.</p>
      
      <h2>Rich in Heart-Healthy Fats</h2>
      <p>Peanut butter is loaded with monounsaturated and polyunsaturated fats, the same healthy fats found in olive oil. These fats help lower bad cholesterol (LDL) while maintaining good cholesterol (HDL), reducing your risk of heart disease.</p>
      
      <h2>Excellent Source of Plant Protein</h2>
      <p>With about 8 grams of protein per two-tablespoon serving, peanut butter is an excellent protein source for vegetarians and vegans. Protein is essential for muscle repair, immune function, and keeping you feeling full longer.</p>
      
      <h2>Packed with Essential Vitamins and Minerals</h2>
      <p>Peanut butter contains:</p>
      <ul>
        <li><strong>Vitamin E:</strong> A powerful antioxidant that protects cells from damage</li>
        <li><strong>Magnesium:</strong> Essential for muscle and nerve function</li>
        <li><strong>Potassium:</strong> Helps regulate blood pressure</li>
        <li><strong>Zinc:</strong> Supports immune system health</li>
        <li><strong>Vitamin B6:</strong> Important for brain development and function</li>
      </ul>
      
      <h2>Supports Weight Management</h2>
      <p>Despite being calorie-dense, studies show that regular peanut butter consumption is associated with lower rates of obesity. The combination of protein, fiber, and healthy fats keeps you satisfied, reducing overall calorie intake.</p>
      
      <h2>May Help Reduce Diabetes Risk</h2>
      <p>Research suggests that consuming peanut butter may help reduce the risk of type 2 diabetes. The healthy fats and fiber help regulate blood sugar levels and improve insulin sensitivity.</p>
      
      <h2>Boosts Brain Function</h2>
      <p>The vitamin E, niacin, and healthy fats in peanut butter support brain health. Some studies link regular nut consumption with better cognitive function and reduced risk of neurodegenerative diseases.</p>
      
      <h2>Great for Athletes</h2>
      <p>The combination of protein and carbohydrates in peanut butter makes it an ideal pre or post-workout snack. It provides sustained energy and helps with muscle recovery.</p>
      
      <h2>Choosing the Right Peanut Butter</h2>
      <p>To maximize health benefits, choose peanut butter with minimal ingredients - ideally just peanuts and maybe a pinch of salt. Avoid varieties with added sugars, hydrogenated oils, or artificial preservatives. Nut Baba peanut butter is made with 100% natural ingredients, ensuring you get all the benefits without any harmful additives.</p>
    `,
  },
  {
    id: 3,
    slug: 'choose-right-peanut-butter',
    title: 'How to Choose the Right Peanut Butter',
    date: '7 March 2026',
    readTime: '6 min read',
    category: 'Health Tips',
    excerpt: 'Not all peanut butters are created equal. Learn how to pick the healthiest option for you and your family.',
    image: '/images/5 Delicous smoothes with Peanut butter - 3.webp',
    content: `
      <p>Walking down the peanut butter aisle can be overwhelming with so many options available. From natural to conventional, crunchy to smooth, how do you know which one is right for you? This guide will help you make an informed choice.</p>
      
      <h2>Understanding the Labels</h2>
      
      <h3>Natural vs. Conventional</h3>
      <p><strong>Natural peanut butter</strong> contains just peanuts (and sometimes salt). You'll notice oil separation at the top, which is completely normal - just stir it before use.</p>
      <p><strong>Conventional peanut butter</strong> often contains added oils (like palm or hydrogenated oils), sugars, and stabilizers to prevent separation. While more convenient, these additives reduce the health benefits.</p>
      
      <h2>What to Look For</h2>
      <ul>
        <li><strong>Short ingredient list:</strong> The best peanut butters have just 1-2 ingredients: peanuts and maybe salt</li>
        <li><strong>No added sugars:</strong> Check for hidden sugars like corn syrup, cane sugar, or honey</li>
        <li><strong>No hydrogenated oils:</strong> These trans fats are harmful to heart health</li>
        <li><strong>High protein content:</strong> Look for at least 7-8 grams per serving</li>
      </ul>
      
      <h2>Crunchy vs. Smooth</h2>
      <p>This is purely a matter of preference! Nutritionally, they're virtually identical. Crunchy peanut butter contains small peanut pieces, adding texture and a slightly more satisfying eating experience. Smooth peanut butter is easier to spread and better for recipes that require a uniform consistency.</p>
      
      <h2>Organic vs. Non-Organic</h2>
      <p>Organic peanut butter is made from peanuts grown without synthetic pesticides or fertilizers. While slightly more expensive, it's a good choice for those concerned about pesticide residues. However, conventional peanut butter can still be healthy if you choose a natural variety with minimal ingredients.</p>
      
      <h2>Red Flags to Avoid</h2>
      <ul>
        <li>Palm oil or partially hydrogenated oils (trans fats)</li>
        <li>Added sugars in the first few ingredients</li>
        <li>Artificial flavors or preservatives</li>
        <li>Extremely long ingredient lists</li>
      </ul>
      
      <h2>Storage Tips</h2>
      <p><strong>Natural peanut butter:</strong> Store upside down to help distribute oils. Once opened, refrigerate to prevent oil separation and extend shelf life.</p>
      <p><strong>Conventional peanut butter:</strong> Can be stored at room temperature since stabilizers prevent separation.</p>
      
      <h2>Why Nut Baba is the Right Choice</h2>
      <p>At Nut Baba, we believe in keeping things simple. Our peanut butter is made from carefully selected, slow-roasted peanuts with no added sugars, preservatives, or hydrogenated oils. Every jar is packed with natural goodness, just the way nature intended.</p>
    `,
  },
  {
    id: 4,
    slug: 'gut-health-roasted-nuts',
    title: 'Gut Health and the Power of Roasted Nuts',
    date: '8 March 2026',
    readTime: '8 min read',
    category: 'Health Tips',
    excerpt: 'Understanding how enzyme-rich, slow-roasted nuts can transform your digestive wellness journey.',
    image: '/images/BG-1_1.webp',
    featured: true,
    content: `
      <p>Your gut health affects everything from your mood to your immune system. Recent research has revealed fascinating connections between nut consumption and digestive wellness. Let's explore how slow-roasted nuts can support your gut health journey.</p>
      
      <h2>The Gut Microbiome Connection</h2>
      <p>Your gut is home to trillions of bacteria that play crucial roles in digestion, immunity, and even mental health. The foods you eat directly influence which bacteria thrive in your gut. Nuts, particularly when prepared correctly, can be powerful allies in maintaining a healthy microbiome.</p>
      
      <h2>Why Slow-Roasting Matters</h2>
      <p>The way nuts are processed significantly impacts their nutritional value and digestibility:</p>
      <ul>
        <li><strong>Preserves nutrients:</strong> Slow roasting at lower temperatures helps retain more vitamins and antioxidants compared to high-heat processing</li>
        <li><strong>Reduces anti-nutrients:</strong> Gentle roasting breaks down phytic acid, which can interfere with mineral absorption</li>
        <li><strong>Improves digestibility:</strong> The slow roasting process makes nuts easier for your body to break down and absorb</li>
        <li><strong>Enhances flavor:</strong> Slow roasting develops deeper, more complex flavors without burning or oxidizing the healthy oils</li>
      </ul>
      
      <h2>Peanuts and Prebiotic Fiber</h2>
      <p>Peanuts contain prebiotic fiber that feeds beneficial gut bacteria. When these good bacteria feast on prebiotic fiber, they produce short-chain fatty acids (SCFAs) that:</p>
      <ul>
        <li>Strengthen the gut lining</li>
        <li>Reduce inflammation</li>
        <li>Support immune function</li>
        <li>Help regulate appetite</li>
      </ul>
      
      <h2>The Anti-Inflammatory Effect</h2>
      <p>Chronic gut inflammation is at the root of many digestive issues. The monounsaturated fats and antioxidants in peanuts have natural anti-inflammatory properties that can help soothe an irritated digestive system.</p>
      
      <h2>Practical Tips for Gut Health</h2>
      <ul>
        <li>Start with small portions if you're new to eating nuts regularly</li>
        <li>Choose natural peanut butter without added sugars or oils</li>
        <li>Pair peanut butter with fiber-rich foods like whole grain bread or apple slices</li>
        <li>Stay hydrated to help fiber do its job</li>
        <li>Be consistent - regular consumption shows better results than occasional large amounts</li>
      </ul>
      
      <h2>The Nut Baba Difference</h2>
      <p>Our slow-roasting process is designed with your gut health in mind. By taking the time to roast our peanuts at optimal temperatures, we ensure maximum nutrient retention and digestibility. Every jar of Nut Baba peanut butter is crafted to support your wellness journey from the inside out.</p>
    `,
  },
  {
    id: 5,
    slug: 'sourcing-from-highlands',
    title: 'Sourcing from the Highlands',
    date: '10 March 2026',
    readTime: '5 min read',
    category: 'Nut Baba News',
    excerpt: 'Take a look at the small-batch farms where our 2024 harvest begins.',
    image: '/images/Sourcing from the Highlands.webp',
    content: `
      <p>At Nut Baba, quality starts at the source. Join us on a journey to the highland farms where our premium peanuts are grown with care and harvested at peak ripeness.</p>
      
      <h2>The Perfect Growing Conditions</h2>
      <p>Our partner farms are located in regions with ideal conditions for growing exceptional peanuts:</p>
      <ul>
        <li>Rich, well-drained soil</li>
        <li>Consistent rainfall during the growing season</li>
        <li>Warm days and cool nights that develop complex flavors</li>
        <li>Traditional farming practices passed down through generations</li>
      </ul>
      
      <h2>Small-Batch Farming Philosophy</h2>
      <p>We work exclusively with small-batch farmers who share our commitment to quality over quantity. These family-run farms take pride in:</p>
      <ul>
        <li>Hand-selecting the best seeds for each planting</li>
        <li>Using sustainable farming practices</li>
        <li>Harvesting at the optimal time for flavor and nutrition</li>
        <li>Careful post-harvest handling to preserve quality</li>
      </ul>
      
      <h2>From Farm to Jar</h2>
      <p>Once harvested, our peanuts undergo a careful journey:</p>
      <ol>
        <li><strong>Sorting:</strong> Each batch is hand-sorted to remove any imperfect nuts</li>
        <li><strong>Drying:</strong> Natural sun-drying preserves the authentic flavor</li>
        <li><strong>Roasting:</strong> Our signature slow-roasting process brings out the best flavors</li>
        <li><strong>Grinding:</strong> Fresh grinding ensures maximum freshness in every jar</li>
      </ol>
      
      <h2>Supporting Local Communities</h2>
      <p>By partnering with small farms, we're able to:</p>
      <ul>
        <li>Pay fair prices directly to farmers</li>
        <li>Support rural communities and their traditions</li>
        <li>Encourage sustainable agricultural practices</li>
        <li>Maintain traceability from farm to your table</li>
      </ul>
      
      <h2>The 2024 Harvest</h2>
      <p>This year's harvest has been exceptional. Perfect weather conditions throughout the growing season have resulted in peanuts with incredible flavor profiles - slightly sweeter with deeper roasted notes. We can't wait for you to taste the difference in our upcoming batches.</p>
    `,
  },
  {
    id: 6,
    slug: 'nut-butter-energy-balls',
    title: '5-Minute Nut Butter Energy Balls',
    date: '12 March 2026',
    readTime: '4 min read',
    category: 'Recipes',
    excerpt: 'The ultimate grab-and-go snack for busy professionals.',
    image: '/images/blog -1.webp',
    content: `
      <p>Need a quick, healthy snack that you can prep in minutes? These no-bake energy balls are perfect for meal prep, pre-workout fuel, or satisfying afternoon cravings.</p>
      
      <h2>Classic Peanut Butter Energy Balls</h2>
      <p>Makes about 12 balls | Prep time: 5 minutes</p>
      
      <h3>Ingredients:</h3>
      <ul>
        <li>1 cup rolled oats</li>
        <li>1/2 cup Nut Baba Peanut Butter</li>
        <li>1/3 cup honey or maple syrup</li>
        <li>1/2 cup chocolate chips (optional)</li>
        <li>2 tablespoons chia seeds</li>
        <li>1 teaspoon vanilla extract</li>
      </ul>
      
      <h3>Instructions:</h3>
      <ol>
        <li>Mix all ingredients in a large bowl until well combined</li>
        <li>Refrigerate for 15-30 minutes if mixture is too sticky</li>
        <li>Roll into 1-inch balls</li>
        <li>Store in an airtight container in the refrigerator for up to one week</li>
      </ol>
      
      <h2>Variations to Try</h2>
      
      <h3>Chocolate Lover's Balls</h3>
      <p>Use Nut Baba Chocolate Peanut Butter and add extra cocoa powder for an intense chocolate experience.</p>
      
      <h3>Tropical Energy Balls</h3>
      <p>Add shredded coconut and dried pineapple bits for a taste of the tropics.</p>
      
      <h3>Protein Power Balls</h3>
      <p>Add a scoop of your favorite protein powder and reduce the oats slightly to compensate.</p>
      
      <h2>Why They Work</h2>
      <ul>
        <li><strong>Quick energy:</strong> Natural sugars from honey provide immediate fuel</li>
        <li><strong>Sustained release:</strong> Oats and peanut butter provide slow-burning energy</li>
        <li><strong>Protein-packed:</strong> Great for muscle recovery and satiety</li>
        <li><strong>Portable:</strong> Perfect for gym bags, office drawers, or kids' lunchboxes</li>
      </ul>
      
      <h2>Pro Tips</h2>
      <ul>
        <li>Use natural peanut butter for the healthiest version</li>
        <li>If the mixture is too dry, add a splash of milk</li>
        <li>If too wet, add more oats</li>
        <li>Roll in coconut, cocoa powder, or crushed nuts for variety</li>
      </ul>
    `,
  },
  {
    id: 7,
    slug: 'zero-waste-packaging',
    title: 'Moving Towards Zero-Waste Packaging',
    date: '15 March 2026',
    readTime: '6 min read',
    category: 'Sustainability',
    excerpt: 'Our commitment to the planet is just as strong as our butter.',
    image: '/images/blog -2.webp',
    content: `
      <p>At Nut Baba, we believe that great products shouldn't come at the cost of our planet. That's why we're on a journey to make our packaging as sustainable as our ingredients.</p>
      
      <h2>Our Sustainability Journey</h2>
      <p>When we started Nut Baba, we knew we wanted to do things differently. While our primary focus was creating the best peanut butter possible, we also committed to minimizing our environmental footprint.</p>
      
      <h2>Current Initiatives</h2>
      
      <h3>Recyclable Glass Jars</h3>
      <p>All our peanut butter comes in 100% recyclable glass jars. Glass is infinitely recyclable and doesn't degrade in quality when recycled. Plus, our jars are perfect for reuse - use them for storage, as drinking glasses, or get creative with DIY projects!</p>
      
      <h3>Reduced Plastic Labels</h3>
      <p>We've switched to paper-based labels with plant-based inks. While it was a more expensive choice, it significantly reduces the plastic in our packaging.</p>
      
      <h3>Minimal Packaging</h3>
      <p>We've eliminated unnecessary packaging elements. No plastic wraps, no excess cardboard, no single-use plastic inserts.</p>
      
      <h2>What's Coming Next</h2>
      <ul>
        <li><strong>Refill stations:</strong> Partner retail locations where you can refill your jars</li>
        <li><strong>Jar return program:</strong> Send back your empty jars for sanitization and reuse</li>
        <li><strong>Compostable shipping materials:</strong> Moving away from plastic bubble wrap and tape</li>
        <li><strong>Carbon-neutral shipping:</strong> Offsetting our delivery emissions</li>
      </ul>
      
      <h2>How You Can Help</h2>
      <ul>
        <li><strong>Recycle:</strong> Make sure to recycle your empty jars through your local recycling program</li>
        <li><strong>Reuse:</strong> Get creative with empty jars - they make great storage containers!</li>
        <li><strong>Return:</strong> When available, participate in our jar return program</li>
        <li><strong>Share:</strong> Spread the word about sustainable choices</li>
      </ul>
      
      <h2>Our Commitment</h2>
      <p>We're not perfect, but we're committed to continuous improvement. Every decision we make considers its environmental impact, from sourcing ingredients to delivering products to your door. Together, we can enjoy delicious peanut butter while protecting the planet for future generations.</p>
    `,
  },
];

// Filter journal articles
const journalArticles = allBlogPosts.filter(post => 
  ['Health Tips', 'Nut Baba News', 'Sustainability'].includes(post.category)
);

// Filter recipe posts
const recipePosts = allBlogPosts.filter(post => post.category === 'Recipes').slice(0, 3);

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Health Tips', 'Nut Baba News'];

  // If we have an ID, show the blog detail page
  if (id) {
    // Find the blog post by id or slug
    const post = allBlogPosts.find(p => 
      p.id.toString() === id || p.slug === id
    );

    if (!post) {
      return (
        <div className="bg-[#fcf0e3] min-h-screen pt-12 pb-24">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-heading text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      );
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = allBlogPosts
      .filter(p => p.category === post.category && p.id !== post.id)
      .slice(0, 3);

    return (
      <div className="bg-[#fcf0e3] min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </button>
              
              <span className="inline-block bg-orange-500 text-white text-sm px-4 py-1 rounded-full mb-4">
                {post.category}
              </span>
              
              <h1 className="font-heading text-3xl md:text-5xl text-white mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-white/80">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Share buttons */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <span className="text-gray-600 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share:
            </span>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          {/* Article Content */}
          <article 
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[#3D1B00] prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-orange-500 hover:prose-a:text-orange-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#3D1B00] to-[#5a2d0a] rounded-2xl p-8 mt-12 text-center">
            <h3 className="font-heading text-2xl text-white mb-4">
              Ready to Try Nut Baba?
            </h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Experience the difference that quality peanut butter makes. Shop our range of natural, slow-roasted nut butters.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-cream py-16">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="font-heading text-2xl md:text-3xl text-[#3D1B00] mb-8">
                Related Articles
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id} 
                    to={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="h-56 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-orange-500 font-medium">{relatedPost.category}</span>
                      <h3 className="font-heading text-xl text-[#3D1B00] mt-2 mb-2 group-hover:text-orange-500 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Blog listing page
  return (
    <div className="bg-[#fcf0e3] min-h-screen pt-12 pb-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="grid md:grid-cols-2 gap-20 lg:gap-32 items-center">
          <div className="order-2 md:order-1">
            <h1 className="font-heading text-5xl lg:text-7xl leading-tight mb-8">
              <span className="text-gray-900 block">10 Ways to Eat</span>
              <span className="text-[#B1561E] block">Peanut Butter</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-[440px] leading-relaxed">
              From savory satays to midnight spoon-dives, discover the versatile nature
              of our slow-roasted batches and why it&apos;s more than just a spread.
            </p>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[480px] aspect-square">
              {/* Decorative Offset Background (Top-Right) */}
              <div className="absolute -top-5 -right-5 w-full h-full bg-[#fde5c6] rounded-[4rem]"></div>

              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white/30">
                <img
                  src="/images/BG blogs-1.webp"
                  alt="Peanut Butter Drip"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Most Popular Recipes */}
      <div className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-orange-500 mb-2">
                Most Popular Recipes
              </h2>
              <p className="text-gray-600">Crafted by our community of wellness enthusiasts</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recipePosts.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="h-72 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-orange-500 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{recipe.date}</p>
                  <p className="text-gray-600 mb-4">{recipe.excerpt}</p>
                  <Link
                    to={`/blog/${recipe.slug}`}
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium text-center transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest from the Journal */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl md:text-3xl text-brown-800">
            Latest from the Journal
          </h2>
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Featured Article */}
          {journalArticles
            .filter((a) => a.featured && (activeFilter === 'All' || a.category === activeFilter))
            .map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="relative h-[500px] rounded-2xl overflow-hidden group"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full mb-4 inline-block">
                    {article.category}
                  </span>
                  <h3 className="font-heading text-2xl mb-3">{article.title}</h3>
                  <p className="text-white/80 mb-4">{article.excerpt}</p>
                  <span className="text-orange-400 group-hover:text-orange-300 font-medium inline-flex items-center gap-2">
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}

          {/* Other Articles */}
          <div className="space-y-6">
            {journalArticles
              .filter((a) => !a.featured && (activeFilter === 'All' || a.category === activeFilter))
              .map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow block group"
                >
                  <div className="flex gap-6">
                    {article.image && (
                      <div className="w-32 h-28 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <span className="text-gray-500 text-sm">{article.category}</span>
                      <h3 className="font-heading text-orange-500 text-lg mb-2 group-hover:text-orange-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{article.excerpt}</p>
                      <span className="text-orange-500 group-hover:text-orange-600 font-medium text-sm mt-2 inline-block">
                        Read More
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
