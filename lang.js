/* ─── Al Jazira Store — Language System ─────────────────────────
   Bilingual EN / AR with RTL handling, Tajawal font loading,
   and a translation dictionary. Every string you want translated
   gets a `data-t="key"` attribute; placeholders use `data-t-ph`.
   Arrows in CTAs get `data-t-arrow` so they flip direction in RTL.
   Persists choice in localStorage under `ajc-lang`.
────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  const STORAGE_KEY = 'ajc-lang';

  const T = {
    // ── GLOBAL ──
    'brand.full':          { en: 'Al Jazira Club',               ar: 'نادي الجزيرة' },
    'brand.tag':           { en: 'Official Store',               ar: 'المتجر الرسمي' },
    'nav.search':          { en: 'Search',                       ar: 'بحث' },
    'nav.account':         { en: 'Account',                      ar: 'الحساب' },
    'nav.bag':             { en: 'Bag',                          ar: 'الحقيبة' },
    'nav.new':             { en: 'New Arrivals',                 ar: 'الأحدث' },
    'nav.matchkit':        { en: 'Match Kit',                    ar: 'طقم المباراة' },
    'nav.training':        { en: 'Training',                     ar: 'التدريب' },
    'nav.lifestyle':       { en: 'Lifestyle',                    ar: 'أسلوب الحياة' },
    'nav.kids':            { en: 'Kids',                         ar: 'الأطفال' },
    'nav.gifts':           { en: 'Accessories & Gifts',          ar: 'الإكسسوارات والهدايا' },
    'nav.all':             { en: 'All Products',                 ar: 'جميع المنتجات' },
    'nav.continue':        { en: 'Continue Shopping',            ar: 'مواصلة التسوّق' },
    'nav.fixtures':        { en: 'Fixtures',                     ar: 'المباريات' },

    // ── FIXTURES PAGE ──
    'fx.kicker':           { en: 'Season 25 / 26',              ar: 'موسم 25 / 26' },
    'fx.title.1':          { en: 'Fixtures',                     ar: 'المباريات' },
    'fx.title.2':          { en: '& Results',                    ar: 'والنتائج' },
    'fx.sub':              { en: 'Every Jazira matchday this season — ADNOC Pro League, AFC Champions League Elite, and domestic cup. Kick-offs in UAE time.',
                             ar: 'كل مباريات الجزيرة هذا الموسم — دوري أدنوك للمحترفين، دوري أبطال آسيا النخبة، وكأس المحلي. مواعيد الانطلاق بتوقيت الإمارات.' },
    'fx.tab.upcoming':     { en: 'Upcoming',                     ar: 'القادمة' },
    'fx.tab.results':      { en: 'Results',                      ar: 'النتائج' },
    'fx.tab.table':        { en: 'League Table',                 ar: 'جدول الترتيب' },
    'fx.next':             { en: 'Next Match',                   ar: 'المباراة القادمة' },
    'fx.tickets':          { en: 'Buy Tickets',                  ar: 'احجز التذاكر' },
    'fx.home':             { en: 'Home',                         ar: 'أرض النادي' },
    'fx.away':             { en: 'Away',                         ar: 'خارج الديار' },
    'fx.vs':               { en: 'VS',                           ar: 'ضد' },
    'fx.ft':               { en: 'Full Time',                    ar: 'نهاية المباراة' },
    'fx.win':              { en: 'W',                            ar: 'ف' },
    'fx.loss':             { en: 'L',                            ar: 'خ' },
    'fx.draw':             { en: 'D',                            ar: 'ت' },
    'fx.tbl.team':         { en: 'Team',                         ar: 'الفريق' },
    'fx.tbl.p':            { en: 'P',                            ar: 'لعب' },
    'fx.tbl.w':            { en: 'W',                            ar: 'فاز' },
    'fx.tbl.d':            { en: 'D',                            ar: 'تعادل' },
    'fx.tbl.l':            { en: 'L',                            ar: 'خسر' },
    'fx.tbl.gf':           { en: 'GF',                           ar: 'له' },
    'fx.tbl.ga':           { en: 'GA',                           ar: 'عليه' },
    'fx.tbl.gd':           { en: 'GD',                           ar: 'الفرق' },
    'fx.tbl.pts':          { en: 'PTS',                          ar: 'نقاط' },
    'fx.tbl.form':         { en: 'Form',                         ar: 'الأداء' },
    'announcement.line':   { en: 'Free Shipping Across the UAE',           ar: 'توصيل مجاني في الإمارات' },
    'announcement.line2':  { en: 'Official Al Jazira Club Store',          ar: 'المتجر الرسمي لنادي الجزيرة' },
    'announcement.line3':  { en: '25/26 Season Kit Out Now',               ar: 'طقم موسم 25/26 متوفر الآن' },
    'announcement.check':  { en: 'Secure Checkout Prototype',              ar: 'صفحة دفع نموذجية آمنة' },
    'announcement.ship':   { en: 'Free Shipping Over AED 150',             ar: 'توصيل مجاني فوق 150 درهم' },

    // ── HERO ──
    'hero.kicker':         { en: 'Season 25 / 26 · Away Kit',    ar: 'موسم 25 / 26 · الطقم الاحتياطي' },
    'hero.title.1':        { en: 'Worn by',                      ar: 'يرتديه' },
    'hero.title.2':        { en: 'the First Team',               ar: 'الفريق الأول' },
    'hero.desc':           { en: 'The new 25/26 Away Jersey. Built in Abu Dhabi red & black, tested under stadium lights, made for the faithful.',
                             ar: 'القميص الجديد للطقم الاحتياطي لموسم 25/26. مصنوع بلونَي أبوظبي الأحمر والأسود، مختبر تحت أضواء الملعب، من أجل الجماهير المخلصة.' },
    'hero.cta.shop':       { en: 'Shop Away Kit',                ar: 'تسوّق الطقم الاحتياطي' },
    'hero.cta.explore':    { en: 'Explore 25/26',                ar: 'استكشف 25/26' },
    'hero.stat.heritage':  { en: 'Years of Heritage',            ar: 'عاماً من العراقة' },
    'hero.stat.stadium':   { en: 'Mohamed bin Zayed Stadium',    ar: 'استاد محمد بن زايد' },

    // ── MARQUEE ──
    'marquee.matchkit':    { en: 'Match Kit 25/26',              ar: 'طقم المباراة 25/26' },
    'marquee.limited':     { en: 'Limited Edition Drops',        ar: 'إصدارات محدودة' },
    'marquee.training':    { en: 'Training Collection',          ar: 'مجموعة التدريب' },
    'marquee.lifestyle':   { en: 'Lifestyle Range',              ar: 'مجموعة أسلوب الحياة' },
    'marquee.kids':        { en: 'Kids Edition',                 ar: 'إصدار الأطفال' },
    'marquee.shipping':    { en: 'Free Shipping AED 200+',       ar: 'توصيل مجاني فوق 200 درهم' },
    'marquee.official':    { en: 'Official Fan Gear',            ar: 'ملابس الجماهير الرسمية' },

    // ── FEATURES ──
    'feat.delivery':       { en: 'Free Delivery',                ar: 'توصيل مجاني' },
    'feat.delivery.sub':   { en: 'On all orders above AED 200',  ar: 'لجميع الطلبات فوق 200 درهم' },
    'feat.returns':        { en: 'Easy Returns',                 ar: 'إرجاع سهل' },
    'feat.returns.sub':    { en: '30-day hassle-free returns',   ar: 'إرجاع خلال 30 يوماً بدون متاعب' },
    'feat.official':       { en: '100% Official',                ar: 'رسمي 100%' },
    'feat.official.sub':   { en: 'Authentic club merchandise only', ar: 'منتجات نادي أصلية فقط' },
    'feat.secure':         { en: 'Secure Checkout',              ar: 'دفع آمن' },
    'feat.secure.sub':     { en: 'Encrypted payments, always safe', ar: 'مدفوعات مشفّرة، آمنة دائماً' },

    // ── SECTION KICKERS + TITLES ──
    'sec.featured':        { en: '01 — Featured',                ar: '01 — مميّز' },
    'sec.featured.title':  { en: 'New Season Drops',             ar: 'إصدارات الموسم الجديد' },
    'sec.featured.sub':    { en: '25/26 collection — just landed', ar: 'مجموعة 25/26 — وصلت للتو' },
    'sec.edit':            { en: '02 — The Edit',                ar: '02 — المختارات' },
    'sec.edit.title':      { en: 'Collections',                  ar: 'المجموعات' },
    'sec.edit.sub':        { en: 'Curated drops for every fan',  ar: 'إصدارات مختارة لكل مشجّع' },
    'sec.pitch':           { en: '03 — On the Pitch',            ar: '03 — على أرض الملعب' },
    'sec.pitch.title':     { en: 'Match Kit',                    ar: 'طقم المباراة' },
    'sec.pitch.sub':       { en: 'Official jerseys, shorts & more', ar: 'قمصان وشورتات رسمية والمزيد' },
    'sec.squad':           { en: '04 — The Squad',               ar: '04 — الفريق' },
    'sec.squad.title':     { en: 'Shop By Player',               ar: 'تسوّق حسب اللاعب' },
    'sec.squad.sub':       { en: 'Pick your name. Pick your number. Wear the squad.',
                             ar: 'اختر اسمك. اختر رقمك. ارتدِ الفريق.' },
    'sec.perf':            { en: '05 — Performance',             ar: '05 — الأداء' },
    'sec.perf.title':      { en: 'Training',                     ar: 'التدريب' },
    'sec.perf.sub':        { en: 'Performance gear for the pitch', ar: 'ملابس الأداء للملعب' },
    'sec.next':            { en: '06 — Next Generation',         ar: '06 — الجيل القادم' },
    'sec.next.title':      { en: 'Kids',                         ar: 'الأطفال' },
    'sec.next.sub':        { en: 'Little champions, big pride',  ar: 'أبطال صغار، فخر كبير' },
    'sec.ess':             { en: '07 — Essentials',              ar: '07 — الأساسيات' },
    'sec.ess.title':       { en: 'Gifts & Accessories',          ar: 'الهدايا والإكسسوارات' },
    'sec.ess.sub':         { en: 'Fan essentials for every occasion', ar: 'أساسيات المشجّع لكل مناسبة' },
    'sec.off':             { en: '08 — Off the Pitch',           ar: '08 — خارج الملعب' },
    'sec.off.title':       { en: 'Lifestyle',                    ar: 'أسلوب الحياة' },
    'sec.off.sub':         { en: 'Club style beyond the pitch',  ar: 'أسلوب النادي خارج الملعب' },
    'sec.store':           { en: '09 — The Store',               ar: '09 — المتجر' },
    'sec.store.title':     { en: 'Shop by Category',             ar: 'تسوّق حسب الفئة' },
    'sec.viewall':         { en: 'View All',                     ar: 'عرض الكل' },
    'sec.allplayers':      { en: 'View All Players',             ar: 'جميع اللاعبين' },
    'sec.allcats':         { en: 'All Products',                 ar: 'جميع المنتجات' },

    // ── EDITORIAL BANNER ──
    'ed.kicker':           { en: 'The 25/26 Story',              ar: 'قصة 25/26' },
    'ed.title.1':          { en: 'A Club Icon,',                 ar: 'أيقونة النادي،' },
    'ed.title.2':          { en: 'Rewritten.',                   ar: 'بصياغة جديدة.' },
    'ed.desc':             { en: 'Darker. Sharper. Built around the crest. The 25/26 Away Jersey takes half a century of Jazira heritage and renders it for a new era — engineered by adidas, stitched in Abu Dhabi red and black.',
                             ar: 'أعمق. أحدّ. مصمّم حول الشعار. قميص 25/26 الاحتياطي يأخذ نصف قرن من عراقة الجزيرة ويعيد تقديمه لعصر جديد — هندسة أديداس، بلونَي أبوظبي الأحمر والأسود.' },
    'ed.cta':              { en: 'Shop the Story',               ar: 'تسوّق القصة' },

    // ── CUSTOMISER ──
    'cust.kicker':         { en: 'Made for You',                 ar: 'صُنع لك' },
    'cust.title.1':        { en: 'Your Name.',                   ar: 'اسمك.' },
    'cust.title.2':        { en: 'The Crest.',                   ar: 'الشعار.' },
    'cust.desc':           { en: 'Build your own 25/26 jersey. Official adidas construction, club-issued typeface, stitched name and number — ready in 5–7 days across the UAE.',
                             ar: 'صمّم قميص 25/26 الخاص بك. تصنيع أديداس الرسمي، خط النادي المعتمد، اسمك ورقمك مطبوعان — جاهز خلال 5–7 أيام في الإمارات.' },
    'cust.kit':            { en: 'Kit',                          ar: 'الطقم' },
    'cust.kit.home':       { en: 'Home',                         ar: 'الأساسي' },
    'cust.kit.away':       { en: 'Away',                         ar: 'الاحتياطي' },
    'cust.kit.third':      { en: 'Third',                        ar: 'الثالث' },
    'cust.fit':            { en: 'Fit',                          ar: 'القصّة' },
    'cust.fit.replica':    { en: 'Replica',                      ar: 'ريبليكا' },
    'cust.fit.authentic':  { en: 'Authentic',                    ar: 'أصلي' },
    'cust.size':           { en: 'Size',                         ar: 'المقاس' },
    'cust.perso':          { en: 'Personalise',                  ar: 'الطباعة الخاصة' },
    'cust.name':           { en: 'Name',                         ar: 'الاسم' },
    'cust.number':         { en: 'Number',                       ar: 'الرقم' },
    'cust.name.ph':        { en: 'YOUR NAME',                    ar: 'الاسم' },
    'cust.style':          { en: 'Name Style',                   ar: 'نمط الاسم' },
    'cust.style.stadium':  { en: 'Stadium',                      ar: 'Stadium' },
    'cust.style.block':    { en: 'Block',                        ar: 'Block' },
    'cust.total':          { en: 'Total',                        ar: 'الإجمالي' },
    'cust.cta':            { en: 'Add to Bag',                   ar: 'أضف إلى الحقيبة' },
    'cust.trust.build':    { en: 'Official Adidas Build',        ar: 'تصنيع أديداس الرسمي' },
    'cust.trust.ships':    { en: 'Ships in 5–7 days',            ar: 'الشحن خلال 5–7 أيام' },
    'cust.trust.free':     { en: 'Free UAE Delivery',            ar: 'توصيل مجاني في الإمارات' },
    'cust.view.back':      { en: 'Back',                         ar: 'خلفي' },
    'cust.view.front':     { en: 'Front',                        ar: 'أمامي' },
    'cust.nameset.label':  { en: 'Printed Nameset',               ar: 'الطباعة الخاصة' },

    // ── PLAYERS ──
    'pos.gk':              { en: 'Goalkeeper',                   ar: 'حارس مرمى' },
    'pos.def':             { en: 'Defender',                     ar: 'مدافع' },
    'pos.mid':             { en: 'Midfielder',                   ar: 'لاعب وسط' },
    'pos.am':              { en: 'Attacking Mid',                ar: 'لاعب وسط مهاجم' },
    'pos.wing':            { en: 'Winger',                       ar: 'جناح' },
    'pos.st':              { en: 'Striker',                      ar: 'مهاجم' },
    'player.shop':         { en: 'Shop Kit',                     ar: 'تسوّق الطقم' },

    // ── PRODUCT CARDS ──
    'prod.quickadd':       { en: 'Quick Add',                    ar: 'إضافة سريعة' },
    'prod.badge.new':      { en: 'New',                          ar: 'جديد' },
    'prod.badge.limited':  { en: 'Limited',                      ar: 'محدود' },
    'prod.badge.sale':     { en: 'Sale',                         ar: 'تخفيض' },
    'prod.save':           { en: 'Save',                         ar: 'وفّر' },

    // ── CATEGORY TILES ──
    'cat.lifestyle':       { en: 'Lifestyle',                    ar: 'أسلوب الحياة' },
    'cat.lifestyle.sub':   { en: 'Street-ready looks',           ar: 'إطلالات يومية' },
    'cat.gifts':           { en: 'Gifts',                        ar: 'هدايا' },
    'cat.gifts.sub':       { en: 'For every fan',                ar: 'لكل مشجّع' },
    'cat.kids':            { en: 'Kids',                         ar: 'الأطفال' },
    'cat.kids.sub':        { en: 'Little champions',             ar: 'أبطال صغار' },
    'cat.matchkit':        { en: 'Match Kit',                    ar: 'طقم المباراة' },
    'cat.matchkit.sub':    { en: 'On-pitch essentials',          ar: 'أساسيات أرض الملعب' },

    // ── NEWSLETTER ──
    'nl.kicker':           { en: 'Join the Faithful',            ar: 'انضم إلى الجماهير' },
    'nl.title':            { en: 'Stay Close to the Club',       ar: 'ابقَ قريباً من النادي' },
    'nl.sub':              { en: 'Get first access to new drops, matchday exclusives, and members-only offers.',
                             ar: 'احصل على الوصول الأول للإصدارات الجديدة، ومقتنيات أيام المباريات، والعروض الحصرية.' },
    'nl.email.ph':         { en: 'Your email address',           ar: 'عنوان بريدك الإلكتروني' },
    'nl.submit':           { en: 'Subscribe',                    ar: 'اشترك' },

    // ── FOOTER ──
    'ft.shop':             { en: 'Shop',                         ar: 'تسوّق' },
    'ft.support':          { en: 'Support',                      ar: 'الدعم' },
    'ft.club':             { en: 'Club',                         ar: 'النادي' },
    'ft.copy':             { en: '© 2026 Al Jazira Club · Pride of Abu Dhabi', ar: '© 2026 نادي الجزيرة · فخر أبوظبي' },
    'ft.tag':              { en: 'The official store of Al Jazira Club. Built for the faithful.',
                             ar: 'المتجر الرسمي لنادي الجزيرة. صُمّم للجماهير المخلصة.' },

    // ── ALL PRODUCTS PAGE ──
    'all.kicker':          { en: 'The Complete Store',           ar: 'المتجر الكامل' },
    'all.title.1':         { en: 'All',                          ar: 'جميع' },
    'all.title.2':         { en: 'Products',                     ar: 'المنتجات' },
    'all.sub':             { en: 'Every official Al Jazira Club product — match kits, training wear, lifestyle, kids, and accessories. Filter, sort, and find your next matchday fit.',
                             ar: 'كل منتج رسمي لنادي الجزيرة — أطقم المباراة، ملابس التدريب، أسلوب الحياة، الأطفال، والإكسسوارات. فلتر، رتّب، واعثر على إطلالة يوم المباراة.' },
    'all.showing':         { en: 'Showing',                      ar: 'تعرض' },
    'all.of':              { en: 'of',                           ar: 'من أصل' },
    'all.products':        { en: 'products',                     ar: 'منتج' },
    'all.trust':           { en: 'Official Adidas · Authentic Club Merchandise', ar: 'أديداس الرسمي · منتجات نادي أصلية' },
    'all.sort':            { en: 'Sort',                         ar: 'ترتيب' },
    'all.sort.featured':   { en: 'Featured',                     ar: 'مميّز' },
    'all.sort.newest':     { en: 'Newest',                       ar: 'الأحدث' },
    'all.sort.priceasc':   { en: 'Price · Low to High',          ar: 'السعر · من الأقل للأعلى' },
    'all.sort.pricedesc':  { en: 'Price · High to Low',          ar: 'السعر · من الأعلى للأقل' },
    'all.sort.name':       { en: 'Name · A–Z',                   ar: 'الاسم · أ–ي' },
    'all.filter.all':      { en: 'All',                          ar: 'الكل' },
    'all.filter.matchkit': { en: 'Match Kit',                    ar: 'طقم المباراة' },
    'all.filter.training': { en: 'Training',                     ar: 'التدريب' },
    'all.filter.kids':     { en: 'Kids',                         ar: 'الأطفال' },
    'all.filter.acc':      { en: 'Accessories',                  ar: 'إكسسوارات' },
    'all.filter.gifts':    { en: 'Gifts',                        ar: 'هدايا' },
    'all.filter.lifestyle':{ en: 'Lifestyle',                    ar: 'أسلوب الحياة' },
    'all.empty.title':     { en: 'No products found',            ar: 'لا توجد منتجات' },
    'all.empty.sub':       { en: 'Try clearing the filter.',     ar: 'جرّب إزالة الفلتر.' },

    // ── PRODUCT DETAIL ──
    'pd.size':             { en: 'Size',                         ar: 'المقاس' },
    'pd.selectsize':       { en: 'Select Size',                  ar: 'اختر المقاس' },
    'pd.qty':              { en: 'Quantity',                     ar: 'الكمية' },
    'pd.addtobag':         { en: 'Add to Bag',                   ar: 'أضف إلى الحقيبة' },
    'pd.related':          { en: 'You might also like',          ar: 'قد يعجبك أيضاً' },
    'pd.related.sub':      { en: 'More from this collection',    ar: 'المزيد من هذه المجموعة' },
    'pd.back':             { en: 'Back',                         ar: 'عودة' },
    'pd.free':             { en: 'Free delivery on orders above AED 200', ar: 'توصيل مجاني للطلبات فوق 200 درهم' },
    'pd.authentic':        { en: '100% authentic club merchandise',       ar: 'منتج رسمي 100% من النادي' },
    'pd.returns':          { en: '30-day hassle-free returns',            ar: 'إرجاع خلال 30 يوماً بدون متاعب' },

    // ── CART DRAWER ──
    'cart.title':          { en: 'Your Bag',                     ar: 'حقيبتك' },
    'cart.empty':          { en: 'Your bag is empty',            ar: 'حقيبتك فارغة' },
    'cart.subtotal':       { en: 'Subtotal',                     ar: 'المجموع الفرعي' },
    'cart.checkout':       { en: 'Checkout',                     ar: 'الدفع' },
    'cart.continue':       { en: 'Continue Shopping',            ar: 'مواصلة التسوّق' },

    // ── CHECKOUT ──
    'co.kicker':           { en: 'Matchday Delivery',            ar: 'توصيل يوم المباراة' },
    'co.title.1':          { en: 'Secure Your',                  ar: 'أكّد' },
    'co.title.2':          { en: 'Order.',                       ar: 'طلبك.' },
    'co.sub':              { en: 'This is a high-fidelity checkout prototype. It keeps the same editorial storefront feel, but gives the bag a real final step: order summary, delivery details, payment choice, and an order confirmation that clears the cart.',
                             ar: 'هذه صفحة دفع نموذجية عالية الدقّة. تحافظ على نفس الإحساس التحريري للمتجر، لكنها تمنح الحقيبة خطوة نهائية حقيقية: ملخص الطلب، تفاصيل التوصيل، اختيار الدفع، وتأكيد يفرّغ السلة.' },
    'co.contact':          { en: 'Contact',                      ar: 'التواصل' },
    'co.email':            { en: 'Email',                        ar: 'البريد الإلكتروني' },
    'co.phone':            { en: 'Phone',                        ar: 'الهاتف' },
    'co.delivery':         { en: 'Delivery',                     ar: 'التوصيل' },
    'co.firstname':        { en: 'First Name',                   ar: 'الاسم الأول' },
    'co.lastname':         { en: 'Last Name',                    ar: 'اسم العائلة' },
    'co.address':          { en: 'Street Address',               ar: 'العنوان' },
    'co.city':             { en: 'City',                         ar: 'المدينة' },
    'co.area':             { en: 'Area',                         ar: 'المنطقة' },
    'co.window':           { en: 'Delivery Window',              ar: 'موعد التوصيل' },
    'co.window.nextday':   { en: 'Next day',                     ar: 'اليوم التالي' },
    'co.window.2-3':       { en: '2–3 days',                     ar: '2–3 أيام' },
    'co.window.evening':   { en: 'Evening delivery',             ar: 'توصيل مسائي' },
    'co.window.matchday':  { en: 'Matchday pickup',              ar: 'استلام يوم المباراة' },
    'co.note':             { en: 'Delivery Note',                ar: 'ملاحظة التوصيل' },
    'co.payment':          { en: 'Payment',                      ar: 'الدفع' },
    'co.method':           { en: 'Method',                       ar: 'الطريقة' },
    'co.promo':            { en: 'Promo Code',                   ar: 'كود الخصم' },
    'co.ordernote':        { en: 'Order Note',                   ar: 'ملاحظة على الطلب' },
    'co.submit':           { en: 'Place Prototype Order',        ar: 'تأكيد الطلب' },
    'co.sum':              { en: 'Order Summary',                ar: 'ملخص الطلب' },
    'co.sub.total':        { en: 'Subtotal',                     ar: 'المجموع الفرعي' },
    'co.shipping':         { en: 'Shipping',                     ar: 'الشحن' },
    'co.custom':           { en: 'Personalised items',           ar: 'منتجات مخصّصة' },
    'co.total':            { en: 'Total',                        ar: 'الإجمالي' },
    'co.inbag':            { en: 'items in bag',                 ar: 'في الحقيبة' },
    'co.placed.title':     { en: 'Order Placed.',                ar: 'تم تأكيد الطلب.' },
    'co.placed.body':      { en: 'Your prototype order has been submitted and the bag has been cleared. In a live build, this is where we\'d hand off to payment confirmation, email receipt, and fulfilment tracking.',
                             ar: 'تم تقديم طلبك النموذجي وتفريغ الحقيبة. في النسخة الحقيقية، ننتقل من هنا إلى تأكيد الدفع، وإيصال بالبريد الإلكتروني، وتتبّع التنفيذ.' },
    'co.empty.title':      { en: 'Your Bag Is Empty.',           ar: 'حقيبتك فارغة.' },
    'co.empty.body':       { en: 'Add a few kits, accessories, or a personalised shirt before heading to checkout. The cart now persists across the storefront, so you can build an order from the homepage, product page, and full catalogue.',
                             ar: 'أضف بعض الأطقم أو الإكسسوارات أو قميصاً مخصّصاً قبل التوجّه إلى الدفع. تبقى الحقيبة محفوظة عبر المتجر بالكامل، ويمكنك بناء طلبك من الصفحة الرئيسية أو صفحة المنتج أو الكتالوج.' },
    'co.back':             { en: 'Back to Home',                 ar: 'العودة للرئيسية' },
    'co.home':             { en: 'Go to Homepage',               ar: 'اذهب للرئيسية' },
    'co.keep':             { en: 'Keep Shopping',                ar: 'تابع التسوّق' },
    'co.browse':           { en: 'Browse All Products',          ar: 'تصفّح جميع المنتجات' },
    'co.help.faq':         { en: 'FAQ',                          ar: 'الأسئلة الشائعة' },
    'co.help.faq.body':    { en: 'This prototype focuses on end-to-end storefront flow: persistent bag, product detail, catalogue filtering, and checkout confirmation. It is intentionally static and local-first.',
                             ar: 'يركّز هذا النموذج على تدفّق المتجر الكامل: حقيبة دائمة، تفاصيل المنتج، فلترة الكتالوج، وتأكيد الدفع. ثابت ومحلّي عن قصد.' },
    'co.help.ship':        { en: 'Shipping',                     ar: 'الشحن' },
    'co.help.ship.body':   { en: 'Free delivery across the UAE on orders above AED 150. Orders below that threshold use a flat AED 20 shipping fee in this prototype.',
                             ar: 'توصيل مجاني في الإمارات للطلبات فوق 150 درهم. الطلبات الأقل من ذلك تستخدم رسوم شحن ثابتة 20 درهم في هذا النموذج.' },
    'co.help.ret':         { en: 'Returns',                      ar: 'الإرجاع' },
    'co.help.ret.body':    { en: 'Standard items can be returned within 14 days. Personalised shirts are treated as final sale unless there is a production fault.',
                             ar: 'يمكن إرجاع المنتجات الاعتيادية خلال 14 يوماً. القمصان المخصّصة نهائية ما لم يوجد عيب تصنيع.' },
    'co.help.size':        { en: 'Size Guide',                   ar: 'دليل المقاسات' },
    'co.help.size.body':   { en: 'Replica tops fit true to size. Trainingwear is slightly more athletic. If you are between sizes, choose the larger size for a relaxed matchday fit.',
                             ar: 'قمصان الريبليكا بمقاس مطابق. ملابس التدريب أضيق قليلاً. إن كنت بين مقاسَين، اختر الأكبر للإطلالة المريحة.' },
    'co.help.contact':     { en: 'Contact',                      ar: 'التواصل' },
    'co.help.contact.body':{ en: 'Need help before placing the order? Use the product page to confirm sizing, then come back here when the bag is ready.',
                             ar: 'تحتاج مساعدة قبل تقديم الطلب؟ استخدم صفحة المنتج لتأكيد المقاس، ثم عُد إلى هنا عندما تجهز الحقيبة.' },

    // ── LANGUAGE TOGGLE LABELS ──
    'lang.en':             { en: 'EN',                           ar: 'EN' },
    'lang.ar':             { en: 'ع',                            ar: 'ع' },
  };

  function t(key, lang) {
    const row = T[key];
    if (!row) return null;
    return row[lang] || row.en;
  }

  function apply(lang) {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('data-lang', lang);

    // Swap text content for [data-t]
    document.querySelectorAll('[data-t]').forEach(el => {
      const val = t(el.getAttribute('data-t'), lang);
      if (val !== null) el.textContent = val;
    });

    // Swap placeholder for [data-t-ph]
    document.querySelectorAll('[data-t-ph]').forEach(el => {
      const val = t(el.getAttribute('data-t-ph'), lang);
      if (val !== null) el.setAttribute('placeholder', val);
    });

    // Flip directional arrows for [data-t-arrow]
    document.querySelectorAll('[data-t-arrow]').forEach(el => {
      el.textContent = lang === 'ar' ? '←' : '→';
    });

    // Update lang-toggle pill UI
    document.querySelectorAll('.lang-toggle-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* noop */ }

    window.dispatchEvent(new CustomEvent('ajc-lang-change', { detail: { lang } }));
  }

  function initToggle() {
    const btns = document.querySelectorAll('.lang-toggle-btn');
    btns.forEach(btn => btn.addEventListener('click', () => apply(btn.dataset.lang)));
  }

  function current() {
    try { return localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) { return 'en'; }
  }

  window.AJCLang = { apply, t, current };

  document.addEventListener('DOMContentLoaded', () => {
    initToggle();
    apply(current());
  });
})();
