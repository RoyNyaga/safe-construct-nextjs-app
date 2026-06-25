-- Seed Blog Tags
INSERT INTO public.blog_tags (id, name, name_fr, slug) VALUES
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Architecture', 'Architecture', 'architecture'),
  ('b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'Construction Tips', 'Conseils de Construction', 'construction-tips'),
  ('c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'Project Stories', 'Histoires de Projets', 'project-stories')
ON CONFLICT (name) DO NOTHING;

-- Seed Blogs
INSERT INTO public.blogs (
  id,
  title,
  title_fr,
  slug,
  excerpt,
  excerpt_fr,
  body,
  body_fr,
  header_photo_url,
  status,
  is_pinned,
  read_time_minutes,
  view_count,
  like_count,
  published_at
) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Inside Safe-Construct''s Latest Eco-Bungalow Project in Kribi',
    'Au cœur du dernier projet d''éco-bungalow de Safe-Construct à Kribi',
    'eco-bungalow-project-kribi',
    'A case study of our latest seaside energy-efficient bungalow built using sustainable compressed earth blocks and passive cross-ventilation.',
    'Étude de cas de notre dernier bungalow écoénergétique en bord de mer, construit à l''aide de blocs de terre comprimée et de ventilation croisée passive.',
    '<h2>The Vision: Seaside Sustainability</h2><p>Located on the white sands of Kribi, Cameroon, this eco-bungalow project was designed to push the boundaries of energy efficiency in a tropical climate. Our client wanted a vacation home that exists in harmony with nature, minimizes electricity usage, and withstands the high humidity of the Atlantic coast.</p><h3>Innovative Materials: Compressed Earth Blocks (CEBs)</h3><p>Rather than relying on imported cement or standard concrete blocks, Safe-Construct utilized locally sourced compressed earth blocks. Produced on-site using a mechanical press, these blocks have excellent thermal mass properties, keeping the interior cool during hot tropical afternoons and warm during cooler seaside nights. They also have a carbon footprint that is up to 70% lower than traditional building blocks.</p><h3>Passive Architecture Techniques</h3><p>To completely avoid the need for high-energy air conditioning systems, we engineered a passive ventilation system: High ceilings, carefully placed louvers, and open corridors promote the natural flow of sea breezes throughout the main living areas. Deep roof overhangs shade the windows from direct midday sunlight, drastically reducing solar heat gain while letting in plenty of natural daylight.</p><h3>Rainwater Harvesting and Solar Energy</h3><p>The bungalow is fully equipped with a rooftop solar array providing 5kW of clean energy, paired with high-capacity lithium storage. A rainwater collection system channels rainwater into a subterranean filtration tank, supplying water for gardening and domestic cleaning needs.</p><h2>Conclusion</h2><p>The Kribi Eco-Bungalow stands as a testament that premium living does not need to compromise the environment. Through smart design and local materials, we built a modern sanctuary that is self-sustaining and beautiful.</p>',
    '<h2>La Vision : Durabilité en bord de mer</h2><p>Situé sur les plages de Kribi, au Cameroun, ce projet de bungalow écologique a été conçu pour repousser les limites de l''efficacité énergétique en climat tropical. Notre client souhaitait une maison de vacances en harmonie avec la nature, minimisant la consommation d''électricité et résistant à la forte humidité de la côte atlantique.</p><h3>Matériaux innovants : Blocs de terre comprimée (BTC)</h3><p>Plutôt que d''importer du ciment ou des parpaings standards, Safe-Construct a utilisé des blocs de terre comprimée locaux. Produits sur place grâce à une presse mécanique, ces blocs possèdent une excellente inertie thermique, maintenant l''intérieur frais pendant les après-midis chauds et chaud pendant les nuits plus fraîches en bord de mer. Leur empreinte carbone est jusqu''à 70% inférieure à celle des blocs de construction traditionnels.</p><h3>Techniques d''architecture passive</h3><p>Pour éviter l''utilisation de systèmes de climatisation énergivores, nous avons conçu un système de ventilation passive : des plafonds hauts, des persiennes judicieusement placées et des couloirs ouverts favorisent la circulation naturelle de la brise marine dans les pièces principales. Les larges débords de toiture protègent les fenêtres du soleil direct de midi, réduisant considérablement la chaleur solaire tout en laissant entrer la lumière naturelle.</p><h3>Collecte des eaux de pluie et énergie solaire</h3><p>Le bungalow est équipé d''un système solaire de 5kW avec batteries de stockage. Un collecteur canalise l''eau de pluie vers un réservoir de filtration souterrain, fournissant de l''eau pour l''arrosage et les besoins domestiques.</p><h2>Conclusion</h2><p>Le bungalow de Kribi prouve qu''un habitat haut de gamme n''exige pas de compromis environnemental. Grâce à une conception intelligente et des matériaux locaux, nous avons créé un sanctuaire moderne, autonome et magnifique.</p>',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
    'published',
    true,
    5,
    142,
    34,
    now()
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Top 5 Architectural Trends in Cameroon for 2026',
    'Top 5 des tendances architecturales au Cameroun pour 2026',
    'architectural-trends-cameroon-2026',
    'Discover how sustainable local materials, smart solar design, and modern duplex configurations are shaping the fast-growing urban landscapes of Douala and Yaoundé.',
    'Découvrez comment les matériaux locaux durables, la conception solaire intelligente et les duplex modernes façonnent les paysages urbains en pleine croissance de Douala et Yaoundé.',
    '<h2>Modern Architecture Meets Local Heritage</h2><p>Cameroon''s residential and commercial architecture is undergoing a quiet revolution. As builders and clients look for ways to cut costs, improve durability, and make aesthetic statements, several clear design trends have emerged for 2026.</p><h3>1. Biophilic Designs and Indoor Greenery</h3><p>Architects are increasingly merging internal spaces with nature. Courtyards, interior green walls, and large floor-to-ceiling glass sliding doors are being used to let natural light flood into living areas while maintaining natural airflow.</p><h3>2. High-Efficiency Solar Roofs</h3><p>With load-shedding being a challenge, new duplex designs are integrating aesthetic solar tiles directly into modern roof styles, making backup power look sleek and seamless rather than an afterthought.</p><h3>3. Natural Brick Facades</h3><p>Exposed baked brick and compressed earth brick walls are back in style. Combining industrial concrete structure with warm-toned natural brick facades creates a striking, premium appearance that is low-maintenance and highly durable in heavy rainfall zones.</p><h3>4. Optimized Duplex Layouts</h3><p>With urban land prices rising in Yaoundé and Douala, maximizing square meters is essential. Open-concept duplex floor plans that place bedrooms upstairs and merge living, dining, and kitchen spaces downstairs are highly popular.</p><h3>5. Smart Home Security Integration</h3><p>Modern homes now feature built-in smart systems, including biometric locks, automated security shutters, and remote-controlled lighting, ensuring comfort and peace of mind.</p>',
    '<h2>L''architecture moderne rencontre le patrimoine local</h2><p>L''architecture résidentielle et commerciale au Cameroun connaît une révolution tranquille. Alors que les constructeurs cherchent à réduire les coûts tout en préservant l''esthétique, plusieurs tendances claires se dessinent pour 2026.</p><h3>1. Design biophilique et verdure intérieure</h3><p>Les architectes intègrent de plus en plus la nature aux intérieurs. Puits de lumière, murs végétaux et baies vitrées permettent de baigner les pièces de lumière tout en favorisant la fraîcheur naturelle.</p><h3>2. Toitures solaires intégrées</h3><p>Face aux défis énergétiques, les nouvelles villas intègrent des panneaux solaires directement dans la structure de toiture pour allier utilité et esthétique moderne.</p><h3>3. Façades en briques apparentes</h3><p>La brique de terre cuite apparente fait son grand retour. Associer le béton brut et la brique crée un contraste premium chaleureux, nécessitant très peu d''entretien face aux fortes pluies.</p><h3>4. Duplex optimisés</h3><p>Le prix du foncier augmentant à Yaoundé et Douala, l''optimisation de l''espace est cruciale. Les plans ouverts avec séjour au rez-de-chaussée et chambres à l''étage sont les plus demandés.</p><h3>5. Domotique et sécurité intégrée</h3><p>Les maisons neuves s''équipent de systèmes intelligents : serrures biométriques, volets roulants motorisés et éclairage connecté pour un maximum de confort et de sécurité.</p>',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    'published',
    false,
    4,
    98,
    18,
    now()
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'How to Estimate Your Construction Budget in Central Africa',
    'Comment estimer votre budget de construction en Afrique Centrale',
    'estimate-construction-budget-central-africa',
    'A complete guide to navigating material costs, labor rates, and hidden municipal permits when planning your building project in Central Africa.',
    'Un guide complet pour maîtriser les coûts de matériaux, les tarifs de main-d''œuvre et les taxes municipales lors de votre projet de construction en Afrique Centrale.',
    '<h2>The Construction Budget Challenge</h2><p>One of the most common pitfalls of building in Central Africa is running out of funds mid-way. Incomplete structures line our cities because developers fail to estimate total budgets before breaking ground. Here is our step-by-step breakdown of how to structure your budget.</p><h3>1. Land and Geotechnical Surveying</h3><p>Never skip the soil test. Different terrains (sandy, clayey, rocky) require vastly different foundation structures. A proper geotechnical survey prevents structural failure and saves money on over-engineered foundations.</p><h3>2. Permits and Regulatory Compliance</h3><p>Getting your building permit (Permis de Construire) entails architectural fees, municipal fees, and tax clearances. Set aside 3% to 5% of your total budget for legal fees and inspections.</p><h3>3. Core Structural Materials (Gros Œuvre)</h3><p>Typically, cement, sand, gravel, and steel rebar (fer à béton) comprise 45% of your building cost. Track the local price per ton and bag, and secure reliable supply chains to avoid inflation shocks during construction.</p><h3>4. Finishings and Interior Fit-Out (Second Œuvre)</h3><p>Tiles, plumbing, electrical installations, painting, and woodwork are where expenses can easily spiral. Decide on your finish grade (standard, premium, luxury) early and procure items in bulk where possible.</p><h3>5. Labor and Project Management</h3><p>Always hire qualified, insured professionals. Experienced supervisors save money by minimizing material wastage and preventing structural errors that cost thousands to fix later.</p>',
    '<h2>Le défi du budget de construction</h2><p>L''un des plus grands pièges de la construction en Afrique Centrale est le manque de financement en cours de route. Les chantiers abandonnés témoignent d''une mauvaise estimation de départ. Voici notre guide étape par étape pour structurer votre budget.</p><h3>1. Etude de sol et topographie</h3><p>Ne négligez jamais l''étude géotechnique. La nature du sol détermine le type de fondation nécessaire. Une étude préalable évite des fondations surdimensionnées ou des fissures futures.</p><h3>2. Permis et conformité administrative</h3><p>L''obtention du permis de construire requiert des frais d''architecte et des taxes municipales. Prévoyez 3% à 5% de votre budget global pour ces démarches administratives.</p><h3>3. Matériaux de gros œuvre</h3><p>Le ciment, le sable, le gravier et le fer à béton représentent environ 45% du coût total. Suivez les prix du marché local et négociez des approvisionnements réguliers.</p><h3>4. Second œuvre et finitions</h3><p>Carrelage, plomberie, électricité et peinture sont les postes où les dérapages financiers sont fréquents. Fixez votre niveau de finition (standard, premium, luxe) dès le départ.</p><h3>5. Main d''œuvre et supervision</h3><p>Faire appel à des professionnels qualifiés vous fait économiser sur le gaspillage de matériaux et garantit le respect des normes de sécurité.</p>',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200',
    'published',
    false,
    6,
    75,
    12,
    now()
  )
ON CONFLICT (slug) DO NOTHING;

-- Seed Blog Tag Assignments
INSERT INTO public.blog_tag_assignments (blog_id, tag_id) VALUES
  ('11111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d'), -- Kribi: Architecture
  ('11111111-1111-1111-1111-111111111111', 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f'), -- Kribi: Project Stories
  ('22222222-2222-2222-2222-222222222222', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d'), -- Trends: Architecture
  ('22222222-2222-2222-2222-222222222222', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e'), -- Trends: Construction Tips
  ('33333333-3333-3333-3333-333333333333', 'b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e')  -- Budget: Construction Tips
ON CONFLICT DO NOTHING;

-- Seed Comments (Approved and Pending)
INSERT INTO public.blog_comments (id, blog_id, author_name, author_email, body, is_approved, created_at) VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'Samuel Eto''o',
    'samuel.etoo@fecafoot.cm',
    'This is a wonderful project! Compressed earth blocks are definitely the future for Cameroon housing. Kept cool naturally.',
    true,
    now() - interval '2 days'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'Marie Claire',
    'marie.claire@yahoo.fr',
    'Quel magnifique bungalow ! J''aimerais savoir quel a été le coût total de construction de cette merveille.',
    true,
    now() - interval '1 day'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    'Jean-Pierre',
    'jp.ndongo@gmail.com',
    'Are these blocks fire resistant? I would like to build a similar one in Yaoundé.',
    false, -- Pending approval
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    '22222222-2222-2222-2222-222222222222',
    'Marc Alane',
    'marc.alane@gmail.com',
    'Interesting trends! Solar roofs are a necessity now. Thanks for sharing.',
    true,
    now() - interval '3 hours'
  )
ON CONFLICT DO NOTHING;
