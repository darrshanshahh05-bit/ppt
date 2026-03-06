/**
 * PrabhuPremi Trust - Main JavaScript
 * Handles animations, interactions, and UI functionality
 */

// ===== SCROLL REVEAL ANIMATION =====
class ScrollReveal {
  constructor() {
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.revealElements = document.querySelectorAll('.reveal-on-scroll');
    this.progressBars = document.querySelectorAll('.progress-bar__fill');
    this.langManager = new LanguageManager();
    this.init();
  }

  init() {
    const allElements = [...this.animatedElements, ...this.revealElements, ...this.progressBars];
    if ('IntersectionObserver' in window && allElements.length > 0) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      allElements.forEach((el) => this.observer.observe(el));
    } else {
      // Fallback for older browsers
      this.animatedElements.forEach((el) => el.classList.add('is-visible'));
      this.revealElements.forEach((el) => el.classList.add('is-visible'));
      this.progressBars.forEach((el) => {
        el.style.width = el.dataset.progress || '75%';
      });
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Animate progress bar fill if applicable
        if (entry.target.classList.contains('progress-bar__fill')) {
          const targetWidth = entry.target.dataset.progress || '75%';
          entry.target.style.width = targetWidth;
        }

        this.observer.unobserve(entry.target);
      }
    });
  }
}

// ===== COUNTER ANIMATION =====
class CounterAnimation {
  constructor(element) {
    this.element = element;
    this.target = parseInt(element.dataset.target, 10);
    this.duration = parseInt(element.dataset.duration, 10) || 2000;
    this.suffix = element.dataset.suffix || '';
    this.prefix = element.dataset.prefix || '';
    this.hasAnimated = false;
  }

  animate() {
    if (this.hasAnimated) return;
    this.hasAnimated = true;

    const start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * (this.target - start) + start);

      this.element.textContent = this.prefix + current.toLocaleString() + this.suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        this.element.textContent = this.prefix + this.target.toLocaleString() + this.suffix;
      }
    };

    requestAnimationFrame(updateCounter);
  }
}

// ===== LANGUAGE MANAGER =====
class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('ppt_lang') || 'en';
    this.toggleBtns = document.querySelectorAll('.lang-toggle__btn');
    this.translations = {
      en: {
        nav_about: 'About Us',
        nav_activities: 'Activities',
        nav_jatra: 'Jatra',
        nav_events: 'Events',
        nav_gallery: 'Gallery',
        nav_contact: 'Contact Us',
        nav_donate: 'Donate Now',
        hero_title: 'Serving the Divine,<br>Uplifting <span class="text-accent">Humanity</span>',
        hero_subtitle: 'Bridging the gap between abundance and need through the path of selfless service.',
        hero_watch_story: 'Watch Our Story',
        hero_jatra_chip: 'Chovihar Chhath Saat Jatra',
        section_who_tag: 'Who We Are',
        about_preview_title: 'A Bridge Between <span class="text-gradient">Abundance & Need</span>',
        about_preview_text1: 'Prabhu Premi Trust (PPT) is a faith-inspired NGO rooted in Jain values. For us, PPT holds a far deeper, more profound meaning: <strong>Prabhu</strong> (The Divine), <strong>Premi</strong> (One who loves with devotion), and <strong>Trust</strong> (A solemn responsibility to serve).',
        about_preview_text2: '"Only a true Prabhu Premi — one who loves the Divine with a pure heart — feels the inner call to give, uplift, and serve without expectation."',
        about_feature_women: 'Women-Led',
        about_feature_spiritual: 'Spiritually Guided',
        about_feature_compassion: 'Compassion First',
        about_learn_more: 'Learn More About Us',
        section_help_tag: 'How We Help',
        pillars_title: 'Seven Avenues of <span class="text-gradient">Compassion</span>',
        pillars_subtitle: 'Transforming lives through spiritual and social impact programs.',
        pillar1_title: 'Vaiyavachh',
        pillar1_desc: 'Serving Jain Sadhus & Sadhvis with devotion and care, helping them on their spiritual journey.',
        pillar2_title: 'Jeevdaya',
        pillar2_desc: 'Protecting and feeding voiceless souls in Gaushalas, embodying compassion towards all living beings.',
        pillar3_title: 'Education',
        pillar3_desc: 'Empowering the future through knowledge and support for underprivileged students.',
        pillar4_title: 'Medical',
        pillar4_desc: 'Providing essential healthcare and free medical camps to the needy as a form of Seva.',
        pillar5_title: 'Sadharmik Bhakti',
        pillar5_desc: 'Supporting fellow community members with dignity in times of clinical or financial need.',
        pillar6_title: 'Anukampa',
        pillar6_desc: 'Compassionate aid for the general public and destitute, uplifting those in crisis.',
        pillar7_title: 'General Welfare',
        pillar7_desc: 'Holistic welfare activities for societal upliftment, ensuring aid reaches where it\'s needed most.',
        common_learn_more: 'Learn More',
        common_support_animals: 'Support Animals',
        common_edu_programs: 'Education Programs',
        common_healthcare_seva: 'Healthcare Seva',
        common_join_support: 'Join Support',
        common_lend_hand: 'Lend a Hand',
        common_support_all: 'Support All',
        section_impact_tag: 'Our Impact',
        stats_title: 'Together, We Make a <span class="text-gradient">Difference</span>',
        stat1_label: 'Lives Touched',
        stat2_label: 'Meals Served',
        stat3_label: 'Students Supported',
        stat4_label: 'Medical Camps',
        section_programs_tag: 'Our Programs',
        programs_title: 'Ways of <span class="text-gradient">Impact</span>',
        programs_subtitle: 'From spiritual growth to social welfare, discover how we\'re making a difference.',
        program_badge_spiritual: 'Spiritual',
        program1_title: 'Pravachans & Discourses',
        program1_desc: 'Soul-enriching spiritual talks by revered Acharyas, illuminating the path of Dharma.',
        program2_title: 'Meditation & Samayik',
        program2_desc: 'Guided sessions for inner peace, self-reflection, and spiritual advancement.',
        program3_title: 'Youth Spiritual Camps',
        program3_desc: 'Engaging programs for young minds to connect with Jain philosophy and values.',
        program_badge_seva: 'Seva',
        program4_title: 'Education Support',
        program4_desc: 'Scholarships and supplies for underprivileged students to build brighter futures.',
        program5_title: 'Medical Aid Camps',
        program5_desc: 'Free healthcare services, check-ups, and medicine distribution for those in need.',
        program6_title: 'Food Distribution',
        program6_desc: 'Regular meal drives to ensure no one goes hungry in our community.',
        common_learn_more_arrow: 'Learn More →',
        programs_view_all: 'View All Programs',
        section_coming_tag: 'What\'s Coming',
        events_title_section: 'Upcoming <span class="text-gradient">Events</span>',
        event_coming_soon: '🔴 Coming Soon',
        event1_title: 'Paryushan Mahaparva',
        event1_desc: 'Join us for the most auspicious time of self-reflection, forgiveness, and spiritual growth.',
        event1_loc: '📍 Main Temple Hall',
        event1_time: '⏰ 6:00 AM onwards',
        event2_title: 'Medical Camp Drive',
        event2_desc: 'Free health check-ups and medicine distribution for the underprivileged.',
        event2_loc: '📍 Community Center',
        event3_title: 'Youth Spiritual Retreat',
        event3_desc: 'A weekend of meditation, learning, and spiritual bonding for young devotees.',
        event3_loc: '📍 Ashram Premises',
        events_view_calendar: 'View Full Calendar',
        section_testimonials_tag: 'Blessings & Words',
        testimonials_title: 'Voices of <span class="text-gradient">Gratitude</span>',
        testi1_text: 'When women lead with spiritual strength, compassion, and clarity, they ignite change that transforms entire communities. PrabhuPremi Trust stands as a living example.',
        testi1_author: 'A Devoted Community Member',
        testi1_origin: 'Jain Sangh',
        testi2_text: 'True giving doesn\'t just change lives — it awakens souls. Through PPT, my donation became more than just help — it became a path of transformation for both giver and receiver.',
        testi2_author: 'A Grateful Donor',
        testi2_origin: 'Mumbai',
        testi3_text: 'The seva provided during the medical camp saved my father\'s life. The compassion and care shown by the volunteers was truly divine. I thank PrabhuPremi Trust from the bottom of my heart.',
        testi3_author: 'A Grateful Family',
        testi3_origin: 'Beneficiary',
        section_wall_tag: 'Wall of Fame',
        wall_title: 'Our Distinguished <span class="text-gradient">Donors</span>',
        wall_subtitle: 'Celebrating the generous souls whose contributions sustain our mission of service.',
        wall_diamond: 'Diamond Donor',
        wall_pearl: 'Pearl Donor',
        wall_golden: 'Golden Heart',
        wall_purpose_vihar: 'Vihar Dham Construction',
        wall_purpose_medical: 'Medical Aid & Camps',
        wall_purpose_edu: 'Educational Scholarships',
        wall_label_amount: 'Donated Amount',
        wall_label_count: 'Total Donations',
        wall_times: 'Times',
        cta_title: 'Ready to Make a <span class="text-gradient">Difference</span>?',
        cta_desc: 'Your generosity becomes a lifeline — uplifting those who have less, and creating a cycle of kindness, dignity, and spiritual fulfillment.',
        cta_volunteer: 'Become a Volunteer',
        section_story_tag: 'Our Story',
        story_title: 'What Does "PPT" Mean to Us?',
        story_text1: 'To the world, PPT might stand for PowerPoint Presentation... But for us, it holds a far deeper, more profound meaning:',
        story_p_label: '<strong>Prabhu</strong> — The Divine',
        story_p2_label: '<strong>Premi</strong> — One who loves with devotion',
        story_t_label: '<strong>Trust</strong> — A solemn responsibility to serve',
        story_text2: 'Prabhu Premi Trust is not just a name — it\'s our identity, our inspiration, and our pledge. It symbolizes a life led by faith, compassion, and purposeful action.',
        story_years: '15+',
        story_years_label: 'Years of Dedicated Seva',
        section_philosophy_tag: 'Philosophy',
        philosophy_title: 'Our <span class="text-gradient">Philosophy</span>',
        philosophy_subtitle_p: '"Only a true Prabhu Premi — one who loves the Divine with a pure heart — feels the inner call to give, uplift, and serve without expectation."',
        philosophy1_title: 'Spiritual Gateway',
        philosophy1_desc: 'At Prabhu Premi Trust (PPT), we are a spiritual gateway for good deeds — a one-stop destination for those who wish to turn gratitude into action.',
        philosophy2_title: 'Nurturing the Spirit',
        philosophy2_desc: 'Our goal is not only to serve those in need, but to nurture the spirit of a Prabhu Premi within them too. Because true giving doesn\'t just change lives — it awakens souls.',
        philosophy3_title: 'Divine Share',
        philosophy3_desc: 'We believe that when you are fortunate enough to receive God\'s grace, the greatest act of devotion is to share it, creating a cycle of kindness and dignity.',
        philosophy_quote: '"Give with love. Serve with purpose. Grow with faith."',
        section_jain_tag: 'Jain Principles',
        jain_title: 'Guiding <span class="text-gradient">Principles</span>',
        jain_subtitle_p: 'Our mission is rooted in the eternal wisdom of Jain philosophy, embodying ancient truths for a modern path of service.',
        jain_pillar1_title: 'Ahimsa',
        jain_pillar1_desc: 'Non-violence in thought, word, and deed — the foundation of all our actions and the highest form of spiritual practice.',
        jain_pillar2_title: 'Aparigraha',
        jain_pillar2_desc: 'Non-possessiveness and non-attachment — giving freely without clinging to material possessions or expectations.',
        jain_pillar3_title: 'Anekantavada',
        jain_pillar3_desc: 'Many-sided truth — respecting multiple perspectives and embracing the complexity of existence with humility.',
        jain_pillar4_title: 'Satya',
        jain_pillar4_desc: 'Truthfulness — committing to honesty and transparency in every interaction and transaction.',
        jain_pillar5_title: 'Brahmacharya',
        jain_pillar5_desc: 'Self-discipline — channeling our energy toward spiritual growth and selfless service to others.',
        section_leadership_tag: 'Spiritual Leadership',
        leadership_title: 'Women-Led & <span class="text-gradient">Jainism Inspired</span>',
        leadership_lead_text: 'In the path of Tirthankara Mahavira, leadership is not about power, but about the purity of the soul (Atma-Shakti). Our foundation is deeply rooted in the <strong>Chaturvidha Sangha</strong> — the four-fold order established to preserve and propagate the eternal truths of Jainism.',
        leadership_depth_text: 'Women have always held a position of profound spiritual authority in Jainism. From the extraordinary numbers of Sadhvis in the Sangha of Tirthankara Rishabhdev to the fearless leadership of women today, we embody <strong>Shakti</strong> as the bridge between devotion and action. Our guiding light is the principle of <strong>Anukampa</strong> (universal compassion), which dictates that true service must be rendered with equanimity toward all living beings.',
        leadership1_title: 'Sadhvi Leadership',
        leadership1_desc: 'Founded by a visionary Sadhvi, we carry the torch of <strong>Dharma</strong> with the discipline of <strong>Samyak Charitra</strong> (Right Conduct).',
        leadership2_title: 'Aparigraha in Governance',
        leadership2_desc: 'Our all-women board operates on the principle of non-attachment, ensuring resources are purely dedicated to <strong>Jiv Daya</strong> (Universal Welfare).',
        leadership3_title: 'Abhay Daan',
        leadership3_desc: 'We work toward the Jain ideal of providing \'Fearlessness\' to all creatures, protecting the vulnerable with conviction and grace.',
        leadership_quote: 'Samyak Darshana (Right Vision) is the eye of the soul; when guided by the compassion of women, it becomes the light of the world.',
        leadership_quote: 'Samyak Darshana (Right Vision) is the eye of the soul; when guided by the compassion of women, it becomes the light of the world.',
        section_team_tag: 'Our Team',
        team_title: 'Board of <span class="text-gradient">Trustees</span>',
        team_subtitle_p: 'Meet the dedicated women who guide our mission with wisdom and compassion.',
        trustee1_name: 'Mrs. Arpita Shah',
        trustee1_role: 'Trustee',
        trustee1_bio: '"Strength doesn\'t always roar — sometimes, it quietly carries a family forward." As a resilient force, Arpita embraced responsibility from a young age, stepping into the roles of both son and brother to support her family.',
        trustee2_name: 'Ms. Rhea Shah',
        trustee2_role: 'Trustee',
        trustee2_bio: '"To learn is to grow, but to serve is to truly live." Currently pursuing her Master\'s in Finance in the USA, Rhea remains firmly planted in the values of service and humility.',
        trustee3_name: 'Dr. Sakshi Desai',
        trustee3_role: 'Trustee',
        trustee3_bio: '"When passion meets purpose at a young age, it paves the way for greatness." A successful dental professional bringing fresh energy and a sharp intellect to our board.',
        trustee4_name: 'Mrs. Rajul Virvadiya',
        trustee4_role: 'Trustee | Homemaker & Fashion Designer',
        trustee4_bio: '"The role of a homemaker stands tall as the foundation of every thriving family." Embracing responsibility with grace, she nurtures the values we uphold.',
        section_transparency_tag: 'Digital Transparency',
        transparency_title: 'Transparent <span class="text-gradient">Accountability</span>',
        transparency_text1: 'At Prabhu Premi Trust, we are embracing digitalization to ensure complete transparency and accountability in every donation and transaction. All contributions are processed through secure digital platforms, allowing for clear tracking and documentation.',
        transparency_text2: 'Your support deserves clarity — and we\'re dedicated to earning your trust with every rupee donated.',
        transparency_btn1: 'Support Our Mission',
        transparency_btn2: 'Learn More',
        about_title: 'About Us',
        about_subtitle: 'Rooted in Faith, Dedicated to Humanity.',
        activities_title: 'Our Activities',
        activities_subtitle: 'Compassion in Motion, Service in Spirit.',
        jatra_title: 'Tirtha Yatra',
        jatra_subtitle: 'Sacred Journeys to the Heart of Jain Tirtha.',
        jatra_detail_title: 'Chovihar Chhath Saat Jatra',
        jatra_detail_subtitle: 'A Divine 7-Day Spiritual Pilgrimage to Palitana\'s Sacred Shatrunjay Hill',
        events_title: 'Events & Calendar',
        events_subtitle: 'Celebrate Devotion, Foster Community.',
        gallery_title: 'Gallery',
        gallery_subtitle: 'Capturing Moments of Divine Grace and Seva',
        contact_title: 'Contact Us',
        contact_subtitle: 'Connect with Us to Start Your Soulful Journey.',
        footer_desc: 'A faith-inspired NGO rooted in Jain values, dedicated to service, compassion, and spiritual growth. Give with love. Serve with purpose. Grow with faith.',
        footer_copyright: '© 2026 PrabhuPremi Trust. All rights reserved.',
        nav_quick_links: 'Quick Links',
        nav_get_involved: 'Get Involved',
        nav_volunteer: 'Volunteer',
        nav_member: 'Become a Member',
        nav_contact_header: 'Contact',
        section_activities_spiritual_tag: 'Spiritual Programs',
        activities_spiritual_title: 'Enriching the <span class="text-gradient">Spirit</span>',
        activities_spiritual_text: 'Our spiritual programs are pathways designed to guide you toward self-realization, equanimity, and a profound connection with the Divine.',
        activities_spiritual_badge1: 'Spiritual Wisdom',
        activities_meta_weekly: '<span>📅</span> Weekly sessions',
        activities_meta_all: '<span>👥</span> Open for all',
        activities_view_schedule: 'View Schedule →',
        activities_spiritual_badge2: 'Inner Peace',
        activities_meta_daily: '<span>📅</span> Daily sessions',
        activities_meta_48min: '<span>⌛</span> 48-minute practice',
        activities_join_session: 'Join Session →',
        activities_spiritual_badge3: 'Youth Power',
        activities_meta_youth_age: '<span>👦</span> Ages 12-25',
        activities_meta_residential: '<span>🏠</span> Residential',
        activities_register_now: 'Register Now →',
        activities_spiritual_badge4: 'Holy Parva',
        activities_parva_title: 'Parva Observances',
        activities_parva_desc: 'Special celebrations for Paryushan and Mahavir Jayanti with rituals.',
        activities_meta_festivals: '<span>✨</span> Major festivals',
        activities_meta_poojas: '<span>🙏</span> Special Poojas',
        activities_view_calendar: 'View Calendar →',
        activities_spiritual_badge5: 'Deep Study',
        activities_study_title: 'Scriptural Study',
        activities_study_desc: 'Deep dive into Jain scriptures with expert guidance for modern life.',
        activities_meta_agam: '<span>📜</span> Agam study',
        activities_meta_philosophy: '<span>💡</span> Philosophy',
        activities_enroll_now: 'Enroll Now →',
        activities_spiritual_badge6: 'Family Faith',
        activities_family_title: 'Family Guidance',
        activities_family_desc: 'Programs designed for families to grow together spiritually and morally.',
        activities_meta_workshops: '<span>🏠</span> Family workshops',
        activities_meta_education: '<span>🎓</span> Value education',
        section_activities_seva_tag: 'Social Seva',
        activities_impact_progress: 'Impact Progress',
        activities_offer_seva: 'Offer Seva →',
        activities_protect_souls: 'Protect Souls →',
        activities_empower_youth: 'Empower Youth →',
        activities_heal_souls: 'Heal Souls →',
        activities_offer_support: 'Offer Support →',
        activities_give_hope: 'Give Hope →',
        activities_general_badge: 'General',
        activities_general_welfare_title: 'General Welfare',
        activities_general_welfare_desc: 'Holistic welfare activities for societal upliftment, ensuring aid reaches where it\'s needed most.',
        activities_support_all: 'Support All →',
        activities_join_mission_title: 'Join Our <span class="text-gradient">Mission</span>',
        activities_join_mission_text: 'Whether through participation, volunteering, or donation — your involvement makes a difference.',
        event_badge_featured: '🔥 Featured Event',
        featured_event_title: 'Mahavir Janma Kalyanak 2026',
        featured_event_desc: 'Join us for the grandest celebration of Lord Mahavir\'s birth anniversary. Experience divine processions, spiritual discourses, and communal feasts with thousands of devotees from across the nation.',
        featured_event_date: 'April 14, 2026',
        featured_event_loc: 'Shantinath Temple, Mumbai',
        featured_event_time: '7:00 AM onwards',
        event_register_btn: 'Register Now',
        countdown_days: 'Days',
        countdown_hours: 'Hours',
        countdown_mins: 'Minutes',
        countdown_secs: 'Seconds',
        section_event_cat_tag: 'Explore',
        event_cat_title: 'Event <span class="text-gradient">Categories</span>',
        event_cat_subtitle: 'From spiritual gatherings to community seva, discover events that resonate with your soul.',
        cat_spiritual_title: 'Spiritual Gatherings',
        cat_spiritual_desc: 'Pravachans, meditation sessions, and spiritual retreats',
        cat_seva_title: 'Social Seva',
        cat_seva_desc: 'Medical camps, food drives, and community service',
        cat_festivals_title: 'Festivals',
        cat_festivals_desc: 'Paryushan, Mahavir Jayanti, and sacred celebrations',
        section_calendar_tag: 'Upcoming',
        calendar_title: 'Events <span class="text-gradient">Timeline</span>',
        calendar_subtitle: 'Mark your calendars for these upcoming spiritual and service events.',
        filter_all: 'All Events',
        event1_title_timeline: 'Paryushan Mahaparva',
        event1_desc_timeline: 'Join us for the most auspicious time of self-reflection, forgiveness, and spiritual growth with daily pravachans and samayik sessions.',
        event1_loc_timeline: '📍 Main Temple Hall',
        event1_time_timeline: '⏰ 6:00 AM - 9:00 PM',
        event1_all_timeline: '👥 Open to all',
        event1_date_timeline: '📅 Feb 15, 2026',
        btn_join_celebration: '🎊 Join Celebration',
        event2_title_timeline: 'Mega Medical Camp Drive',
        event2_desc_timeline: 'Free health check-ups, dental care, and medicine distribution for underprivileged families in tribal regions. Doctors and volunteers needed!',
        event2_loc_timeline: '📍 Community Center, Vadodara',
        event2_time_timeline: '⏰ 9:00 AM - 4:00 PM',
        event2_docs_timeline: '🩺 50+ Doctors Expected',
        event2_date_timeline: '📅 Feb 28, 2026',
        event3_title_timeline: 'Mahavir Janma Kalyanak',
        event3_desc_timeline: 'Celebrating the birth anniversary of Lord Mahavir with grand processions, pravachans, rath yatra, and communal bhojans.',
        event3_loc_timeline: '📍 Shantinath Temple',
        event3_time_timeline: '⏰ 7:00 AM onwards',
        event3_attendees_timeline: '🎉 5000+ Expected Attendees',
        event3_date_timeline: '📅 Apr 14, 2026',
        section_memories_tag: 'Memories',
        past_events_title: 'Past Event <span class="text-gradient">Highlights</span>',
        past_events_subtitle: 'Relive the beautiful moments from our recent gatherings and celebrations.',
        past_event1_title: 'Spiritual Retreat 2025',
        past_event1_date: 'December 15-17, 2025',
        past_event1_desc: 'A transformative 3-day retreat with guided meditation, satsang, and self-discovery in the serene hills of Lonavala.',
        past_event1_attendees: '150 Attendees',
        past_event1_loc: 'Lonavala',
        past_event2_title: 'Medical Camp Gujarat',
        past_event2_date: 'November 12, 2025',
        past_event2_desc: 'Free health screenings and medicine distribution for 500+ families across 5 tribal villages in Gujarat.',
        past_event2_patients: '500+ Patients',
        past_event2_loc: 'Vadodara',
        past_event3_title: 'Paryushan 2025',
        past_event3_date: 'August 25 - Sept 2, 2025',
        past_event3_desc: 'Eight sacred days of fasting, prayer, and forgiveness culminating in the beautiful Kshamavani celebration.',
        past_event3_devotees: '2000+ Devotees',
        past_event3_loc: 'Mumbai',
        btn_view_full_gallery: 'View Full Gallery →',
        newsletter_title: 'Never Miss an Event',
        newsletter_desc: 'Subscribe to our newsletter and get notified about upcoming events, spiritual gatherings, and seva opportunities.',
        newsletter_placeholder: 'Enter your email address',
        newsletter_subscribe_btn: 'Subscribe',
        modal_join_title: '🎊 Join Our Journey',
        modal_select_interest: 'Select an interest'
      },
      gu: {
        nav_about: 'અમારા વિશે',
        nav_activities: 'પ્રવૃત્તિઓ',
        nav_jatra: 'જાત્રા',
        nav_events: 'કાર્યક્રમો',
        nav_gallery: 'ગેલેરી',
        nav_contact: 'સંપર્ક કરો',
        nav_donate: 'દાન કરો',
        hero_title: 'દિવ્ય સેવા,<br>માનવતાનો <span class="text-accent">ઉદ્ધાર</span>',
        hero_subtitle: 'નિઃસ્વાર્થ સેવાના માર્ગ દ્વારા વિપુલતા અને જરૂરિયાત વચ્ચેના અંતરને દૂર કરવું.',
        hero_watch_story: 'અમારી વાર્તા જુઓ',
        hero_jatra_chip: 'ચોવીહાર છઠ સાત જાત્રા',
        section_who_tag: 'અમે કોણ છીએ',
        about_preview_title: 'વિપુલતા અને જરૂરિયાત વચ્ચેનો <span class="text-gradient">સેતુ</span>',
        about_preview_text1: 'પ્રભુ પ્રેમી ટ્રસ્ટ (PPT) એ જૈન મૂલ્યોમાં મૂળ ધરાવતી શ્રદ્ધા-પ્રેરિત NGO છે. અમારા માટે, PPT નો ઘણો ઊંડો અર્થ છે: <strong>પ્રભુ</strong> (પરમાત્મા), <strong>પ્રેમી</strong> (જે ભક્તિથી પ્રેમ કરે છે), અને <strong>ટ્રસ્ટ</strong> (સેવા કરવાની પવિત્ર જવાબદારી).',
        about_preview_text2: '"ફક્ત સાચો પ્રભુ પ્રેમી — જે શુદ્ધ હૃદયથી પરમાત્માને પ્રેમ કરે છે — તે જ અપેક્ષા વગર આપવા, ઉત્થાન કરવા અને સેવા કરવાનો આંતરિક સાદ અનુભવે છે."',
        about_feature_women: 'મહિલા સંચાલિત',
        about_feature_spiritual: 'આધ્યાત્મિક માર્ગદર્શન',
        about_feature_compassion: 'કરુણા પ્રથમ',
        about_learn_more: 'અમારા વિશે વધુ જાણો',
        section_help_tag: 'અમે કેવી રીતે મદદ કરીએ છીએ',
        pillars_title: 'કરુણાના સાત <span class="text-gradient">માર્ગો</span>',
        pillars_subtitle: 'આધ્યાત્મિક અને સામાજિક પ્રભાવના કાર્યક્રમો દ્વારા જીવન પરિવર્તન.',
        pillar1_title: 'વૈયાવચ્ચ',
        pillar1_desc: 'જૈન સાધુઓ અને સાધ્વીઓની ભક્તિ અને કાળજી સાથે સેવા કરવી, તેમને તેમની આધ્યાત્મિક યાત્રામાં મદદ કરવી.',
        pillar2_title: 'જીવદયા',
        pillar2_desc: 'ગૌશાળાઓમાં અબોલ જીવોનું રક્ષણ અને પોષણ કરવું, તમામ જીવંત પ્રાણીઓ પ્રત્યે કરુણા દાખવવી.',
        pillar3_title: 'શિક્ષણ',
        pillar3_desc: 'જરૂરિયાતમંદ વિદ્યાર્થીઓ માટે જ્ઞાન અને સહાય દ્વારા ભવિષ્યને સશક્ત બનાવવું.',
        pillar4_title: 'તબીબી સેવા',
        pillar4_desc: 'સેવાના ભાગ રૂપે જરૂરિયાતમંદોને આવશ્યક આરોગ્ય સેવા અને મફત તબીબી કેમ્પ પૂરા પાડવા.',
        pillar5_title: 'સાધર્મિક ભક્તિ',
        pillar5_desc: 'ક્લિનિકલ અથવા આર્થિક જરૂરિયાતના સમયે સમુદાયના સાથી સભ્યોને ગૌરવ સાથે ટેકો આપવો.',
        pillar6_title: 'અનુકંપા',
        pillar6_desc: 'સામાન્ય જનતા અને નિરાધાર લોકો માટે કરુણાપૂર્ણ સહાય, મુશ્કેલીમાં રહેલા લોકોનું ઉત્થાન કરવું.',
        pillar7_title: 'સામાન્ય કલ્યાણ',
        pillar7_desc: 'સામાજિક ઉત્થાન માટે સર્વગ્રાહી કલ્યાણ પ્રવૃત્તિઓ, જ્યાં સહાયની સૌથી વધુ જરૂર હોય ત્યાં પહોંચે તે સુનિશ્ચિત કરવું.',
        common_learn_more: 'વધુ જાણો',
        common_support_animals: 'પ્રાણીઓને સહાય કરો',
        common_edu_programs: 'શિક્ષણ કાર્યક્રમો',
        common_healthcare_seva: 'આરોગ્ય સેવા',
        common_join_support: 'સહાયમાં જોડાઓ',
        common_lend_hand: 'મદદનો હાથ લંબાવો',
        common_support_all: 'સહુને સહાય કરો',
        section_impact_tag: 'અમારો પ્રભાવ',
        stats_title: 'સાથે મળીને, અમે એક <span class="text-gradient">તફાવત</span> લાવીએ છીએ',
        stat1_label: 'સ્પર્શાયેલા જીવન',
        stat2_label: 'પીરસાયેલ ભોજન',
        stat3_label: 'સહાયિત વિદ્યાર્થીઓ',
        stat4_label: 'તબીબી કેમ્પ',
        section_programs_tag: 'અમારા કાર્યક્રમો',
        programs_title: 'અમારો <span class="text-gradient">પ્રભાવ</span>',
        programs_subtitle: 'આધ્યાત્મિક વિકાસથી લઈને સામાજિક કલ્યાણ સુધી, અમે કેવી રીતે તફાવત લાવીએ છીએ તે જાણો.',
        program_badge_spiritual: 'આધ્યાત્મિક',
        program1_title: 'પ્રવચનો અને સંવાદ',
        program1_desc: 'પૂજ્ય આચાર્યો દ્વારા આત્માને સમૃદ્ધ બનાવતા આધ્યાત્મિક પ્રવચનો, ધર્મના પથને પ્રકાશિત કરે છે.',
        program2_title: 'ધ્યાન અને સામાયિક',
        program2_desc: 'આંતરિક શાંતિ, આત્મ-ચિંતન અને આધ્યાત્મિક ઉન્નતિ માટે માર્ગદર્શિત સત્રો.',
        program3_title: 'યુવા આધ્યાત્મિક કેમ્પ',
        program3_desc: 'યુવા મન માટે જૈન ફિલસૂફી અને મૂલ્યો સાથે જોડાવવા માટે આકર્ષક કાર્યક્રમો.',
        program_badge_seva: 'સેવા',
        program4_title: 'શિક્ષણ સહાય',
        program4_desc: 'જરૂરિયાતમંદ વિદ્યાર્થીઓ માટે શિષ્યવૃત્તિ અને સામગ્રી જેથી ઉજ્જવળ ભવિષ્ય બની શકે.',
        program5_title: 'તબીબી સહાય કેમ્પ',
        program5_desc: 'જરૂરિયાતમંદો માટે મફત આરોગ્ય સેવાઓ, તપાસ અને દવા વિતરણ.',
        program6_title: 'ભોજન વિતરણ',
        program6_desc: 'અમારા સમુદાયમાં કોઈ ભૂખ્યું ન રહે તે સુનિશ્ચિત કરવા માટે નિયમિત ભોજન ઝુંબેશ.',
        common_learn_more_arrow: 'વધુ જાણો →',
        programs_view_all: 'તમામ કાર્યક્રમો જુઓ',
        section_coming_tag: 'શું આવી રહ્યું છે',
        events_title_section: 'આગામી <span class="text-gradient">કાર્યક્રમો</span>',
        event_coming_soon: '🔴 ટૂંક સમયમાં આવી રહ્યું છે',
        event1_title: 'પર્યુષણ મહાપર્વ',
        event1_desc: 'આત્મ-ચિંતન, ક્ષમા અને આધ્યાત્મિક વિકાસના સૌથી મંગલ સમય માટે અમારી સાથે જોડાઓ.',
        event1_loc: '📍 મુખ્ય મંદિર હોલ',
        event1_time: '⏰ સવારે 6:00 વાગ્યાથી',
        event2_title: 'તબીબી કેમ્પ ઝુંબેશ',
        event2_desc: 'જરૂરિયાતમંદ લોકો માટે મફત આરોગ્ય તપાસ અને દવા વિતરણ.',
        event2_loc: '📍 કોમ્યુનિટી સેન્ટર',
        event3_title: 'યુવા આધ્યાત્મિક શિબિર',
        event3_desc: 'યુવા ભક્તો માટે ધ્યાન, શિક્ષણ અને આધ્યાત્મિક જોડાણનો સપ્તાહાંત.',
        event3_loc: '📍 આશ્રમ પરિસર',
        events_view_calendar: 'સંપૂર્ણ કેલેન્ડર જુઓ',
        section_testimonials_tag: 'આશીર્વાદ અને શબ્દો',
        testimonials_title: 'કૃતજ્ઞતાના <span class="text-gradient">સૂરો</span>',
        testi1_text: 'જ્યારે મહિલાઓ આધ્યાત્મિક શક્તિ, કરુણા અને સ્પષ્ટતા સાથે નેતૃત્વ કરે છે, ત્યારે તેઓ એવું પરિવર્તન લાવે છે જે સમગ્ર સમુદાયને બદલી નાખે છે. પ્રભુપ્રેમી ટ્રસ્ટ તેનું જીવંત ઉદાહરણ છે.',
        testi1_author: 'એક સમર્પિત સમુદાય સભ્ય',
        testi1_origin: 'જૈન સંઘ',
        testi2_text: 'સાચું દાન માત્ર જીવન નથી બદલતું — તે આત્માને જગાડે છે. PPT દ્વારા, મારું દાન માત્ર મદદ જ નહીં — પણ આપનાર અને મેળવનાર બંને માટે પરિવર્તનનો માર્ગ બની ગયું.',
        testi2_author: 'એક કૃતજ્ઞ દાતા',
        testi2_origin: 'મુંબઈ',
        testi3_text: 'તબીબી કેમ્પ દરમિયાન મળેલી સેવાએ મારા પિતાનો જીવ બચાવ્યો. સ્વયંસેવકો દ્વારા બતાવવામાં આવેલી કરુણા અને કાળજી ખરેખર દૈવી હતી. હું હૃદયપૂર્વક પ્રભુપ્રેમી ટ્રસ્ટનો આભાર માનું છું.',
        testi3_author: 'એક કૃતજ્ઞ પરિવાર',
        testi3_origin: 'લાભાર્થી',
        section_wall_tag: 'વોલ ઓફ ફેમ',
        wall_title: 'અમારા પ્રતિષ્ઠિત <span class="text-gradient">દાતાઓ</span>',
        wall_subtitle: 'તે ઉદાર આત્માઓની ઉજવણી જેમનું યોગદાન અમારી સેવાની મિશનને ટકાવી રાખે છે.',
        wall_diamond: 'ડાયમંડ ડોનર',
        wall_pearl: 'પર્લ ડોનર',
        wall_golden: 'ગોલ્ડન હાર્ટ',
        wall_purpose_vihar: 'વિહાર ધામ નિર્માણ',
        wall_purpose_medical: 'તબીબી સહાય અને કેમ્પ',
        wall_purpose_edu: 'શૈક્ષણિક શિષ્યવૃત્તિ',
        wall_label_amount: 'દાન કરેલી રકમ',
        wall_label_count: 'કુલ દાન',
        wall_times: 'વખત',
        cta_title: 'શું તમે તફાવત લાવવા માટે <span class="text-gradient">તૈયાર</span> છો?',
        cta_desc: 'તમારી ઉદારતા જીવનરેખા બની જાય છે — જેઓ પાસે ઓછું છે તેમનું ઉત્થાન કરે છે, અને દયા, ગૌરવ અને આધ્યાત્મિક પરિપૂર્ણતાનું ચક્ર બનાવે છે.',
        cta_volunteer: 'સ્વયંસેવક બનો',
        section_story_tag: 'અમારી વાર્તા',
        story_title: 'અમારા માટે "PPT" નો અર્થ શું છે?',
        story_text1: 'દુનિયા માટે, PPT નો અર્થ પાવરપોઈન્ટ પ્રેઝન્ટેશન હોઈ શકે છે... પરંતુ અમારા માટે, તેનો ઘણો ઊંડો, વધુ ગહન અર્થ છે:',
        story_p_label: '<strong>પ્રભુ</strong> — પરમાત્મા',
        story_p2_label: '<strong>પ્રેમી</strong> — જે ભક્તિથી પ્રેમ કરે છે',
        story_t_label: '<strong>ટ્રસ્ટ</strong> — સેવા કરવાની પવિત્ર જવાબદારી',
        story_text2: 'પ્રભુ પ્રેમી ટ્રસ્ટ એ માત્ર નામ નથી — તે અમારી ઓળખ, અમારી પ્રેરણા અને અમારી પ્રતિજ્ઞા છે. તે શ્રદ્ધા, કરુણા અને હેતુપૂર્ણ ક્રિયા દ્વારા જીવતા જીવનનું પ્રતીક છે.',
        story_years: '15+',
        story_years_label: 'સમર્પિત સેવાના વર્ષો',
        section_philosophy_tag: 'તત્ત્વજ્ઞાન',
        philosophy_title: 'અમારું <span class="text-gradient">તત્ત્વજ્ઞાન</span>',
        philosophy_subtitle_p: '"ફક્ત સાચો પ્રભુ પ્રેમી — જે શુદ્ધ હૃદયથી પરમાત્માને પ્રેમ કરે છે — તે જ અપેક્ષા વગર આપવા, ઉત્થાન કરવા અને સેવા કરવાનો આંતરિક સાદ અનુભવે છે."',
        philosophy1_title: 'આધ્યાત્મિક પ્રવેશદ્વાર',
        philosophy1_desc: 'પ્રભુ પ્રેમી ટ્રસ્ટ (PPT) ખાતે, અમે સારા કાર્યો માટે આધ્યાત્મિક પ્રવેશદ્વાર છીએ — જેઓ કૃતજ્ઞતાને ક્રિયામાં ફેરવવા માંગે છે તેમના માટે એક વન-સ્ટોપ ડેસ્ટિનેશન.',
        philosophy2_title: 'આત્માનું પોષણ',
        philosophy2_desc: 'અમારો ધ્યેય માત્ર જરૂરિયાતમંદોની સેવા કરવાનો જ નથી, પણ તેમની અંદર પ્રભુ પ્રેમીની ભાવનાનું પોષણ કરવાનો પણ છે. કારણ કે સાચું દાન માત્ર જીવન નથી બદલતું — તે આત્માને જગાડે છે.',
        philosophy3_title: 'દૈવી હિસ્સો',
        philosophy3_desc: 'અમે માનીએ છીએ કે જ્યારે તમે ભગવાનની કૃપા પ્રાપ્ત કરવા માટે પૂરતા નસીબદાર હોવ, ત્યારે ભક્તિનું સૌથી મોટું કાર્ય તેને બીજા સાથે વહેંચવાનું છે, જે દયા અને ગૌરવનું ચક્ર બનાવે છે.',
        philosophy_quote: '"પ્રેમથી આપો. હેતુ સાથે સેવા કરો. શ્રદ્ધા સાથે વધો."',
        section_jain_tag: 'જૈન સિદ્ધાંતો',
        jain_title: 'માર્ગદર્શક <span class="text-gradient">સિદ્ધાંતો</span>',
        jain_subtitle_p: 'અમારું મિશન જૈન તત્ત્વજ્ઞાનના શાશ્વત જ્ઞાનમાં મૂળ ધરાવે છે, જે સેવાની આધુનિક રીત માટે પ્રાચીન સત્યોને મૂર્ત બનાવે છે.',
        jain_pillar1_title: 'અહિંસા',
        jain_pillar1_desc: 'વિચાર, વાણી અને કાર્યમાં અહિંસા — જે આપણા તમામ કાર્યોનો પાયો અને આધ્યાત્મિક અભ્યાસનું સર્વોચ્ચ સ્વરૂપ છે.',
        jain_pillar2_title: 'અપરિગ્રહ',
        jain_pillar2_desc: 'બિન-માલિકી અને અનાસક્તિ — ભૌતિક ચીજવસ્તુઓ અથવા અપેક્ષાઓ વગર મુક્તપણે આપવું.',
        jain_pillar3_title: 'અનેકાંતવાદ',
        jain_pillar3_desc: 'બહુમુખી સત્ય — વિવિધ પરિપ્રેક્ષ્યોનો આદર કરવો અને નમ્રતા સાથે અસ્તિત્વની જટિલતાને સ્વીકારવી.',
        jain_pillar4_title: 'સત્ય',
        jain_pillar4_desc: 'સત્યનિષ્ઠા — દરેક ક્રિયાપ્રતિક્રિયા અને વ્યવહારમાં પ્રામાણિકતા અને પારદર્શિતા માટે પ્રતિબદ્ધતા.',
        jain_pillar5_title: 'બ્રહ્મચર્ય',
        jain_pillar5_desc: 'આત્મ-શિસ્ત — આપણી શક્તિને આધ્યાત્મિક વિકાસ અને અન્યની નિઃસ્વાર્થ સેવા તરફ વાળવી.',
        section_leadership_tag: 'આધ્યાત્મિક નેતૃત્વ',
        leadership_title: 'મહિલા સંચાલિત અને <span class="text-gradient">જૈન ધર્મથી પ્રેરિત</span>',
        leadership_lead_text: 'તીર્થંકર મહાવીરના માર્ગમાં, નેતૃત્વ એ સત્તા વિશે નથી, પણ આત્માની શુદ્ધિ (આત્મ-શક્તિ) વિશે છે. અમારો પાયો <strong>ચતુર્વિધ સંઘ</strong> માં ઊંડો રીતે મૂળ છે — જૈન ધર્મના શાશ્વત સત્યોને સાચવવા અને પ્રસારિત કરવા માટે સ્થાપિત ચાર-ગણી વ્યવસ્થા.',
        leadership_depth_text: 'જૈન ધર્મમાં હંમેશા મહિલાઓએ ગહન આધ્યાત્મિક સત્તાનું પદ સંભાળ્યું છે. તીર્થંકર ઋષભદેવના સંઘમાં સાધ્વીઓની અસાધારણ સંખ્યાથી લઈને આજના મહિલાઓના નિર્ભય નેતૃત્વ સુધી, અમે ભક્તિ અને ક્રિયા વચ્ચેના સેતુ તરીકે <strong>શક્તિ</strong> ને મૂર્ત બનાવીએ છીએ. અમારો માર્ગદર્શક પ્રકાશ <strong>અનુકંપા</strong> (સાર્વત્રિક કરુણા) નો સિદ્ધાંત છે, જે સૂચવે છે કે સાચી સેવા તમામ જીવંત પ્રાણીઓ પ્રત્યે સમભાવ સાથે થવી જોઈએ.',
        leadership1_title: 'સાધ્વી નેતૃત્વ',
        leadership1_desc: 'એક સ્વપ્નદ્રષ્ટા સાધ્વી દ્વારા સ્થાપિત, અમે <strong>સમ્યક ચારિત્ર</strong> (શુદ્ધ આચરણ) ની શિસ્ત સાથે <strong>ધર્મ</strong> ની જ્યોત વહન કરીએ છીએ.',
        leadership2_title: 'શાસનમાં અપરિગ્રહ',
        leadership2_desc: 'અમારું ઓલ-વુમન બોર્ડ અનાસક્તિના સિદ્ધાંત પર કાર્ય કરે છે, જે સુનિશ્ચિત કરે છે કે સંસાધનો સંપૂર્ણપણે <strong>જીવ દયા</strong> (સાર્વત્રિક કલ્યાણ) માટે સમર્પિત છે.',
        leadership3_title: 'અભય દાન',
        leadership3_desc: 'અમે જૈન આદર્શ મુજબ તમામ જીવોને \'નિર્ભયતા\' પ્રદાન કરવા માટે કામ કરીએ છીએ, જેઓ અસુરક્ષિત છે તેમનું નિશ્ચય અને કૃપા સાથે રક્ષણ કરીએ છીએ.',
        leadership_quote: 'સમ્યક દર્શન (શુદ્ધ દ્રષ્ટિ) એ આત્માની આંખ છે; જ્યારે તે મહિલાઓની કરુણા દ્વારા માર્ગદર્શન મેળવે છે, ત્યારે તે વિશ્વનો પ્રકાશ બને છે.',
        section_team_tag: 'અમારી ટીમ',
        team_title: 'બોર્ડ ઓફ <span class="text-gradient">ટ્રસ્ટીઝ</span>',
        team_subtitle_p: 'તે સમર્પિત મહિલાઓને મળો જે જ્ઞાન અને કરુણા સાથે અમારા મિશનનું માર્ગદર્શન કરે છે.',
        trustee1_name: 'શ્રીમતી અર્પિતા શાહ',
        trustee1_role: 'ટ્રસ્ટી',
        trustee1_bio: '"શક્તિ હંમેશા ગર્જના નથી કરતી — ક્યારેક, તે શાંતિથી પરિવારને આગળ લઈ જાય છે." એક મજબૂત શક્તિ તરીકે, અર્પિતાએ નાની ઉંમરથી જ જવાબદારી સ્વીકારી હતી, પોતાના પરિવારને ટેકો આપવા માટે પુત્ર અને ભાઈ બંનેની ભૂમિકા નિભાવી હતી.',
        trustee2_name: 'કુમારી રિયા શાહ',
        trustee2_role: 'ટ્રસ્ટી',
        trustee2_bio: '"શીખવું એ વિકાસ છે, પરંતુ સેવા એ ખરેખર જીવવું છે." હાલમાં અમેરિકામાં ફાઇનાન્સમાં માસ્ટર્સ કરી રહ્યા હોવા છતાં, રિયા સેવા અને નમ્રતાના મૂલ્યોમાં મજબૂત રીતે જોડાયેલી છે.',
        trustee3_name: 'ડો. સાક્ષી દેસાઈ',
        trustee3_role: 'ટ્રસ્ટી',
        trustee3_bio: '"જ્યારે જુસ્સો નાની ઉંમરે હેતુ સાથે મળે છે, ત્યારે તે મહાનતા માટેનો માર્ગ મોકળો કરે છે." એક સફળ ડેન્ટલ પ્રોફેશનલ જે અમારા બોર્ડમાં નવી ઉર્જા અને તીક્ષ્ણ બુદ્ધિ લાવે છે.',
        trustee4_name: 'શ્રીમતી રાજુલ વિરવડિયા',
        trustee4_role: 'ટ્રસ્ટી | ગૃહિણી અને ફેશન ડિઝાઇનર',
        trustee4_bio: '"ગૃહિણીની ભૂમિકા દરેક સમૃદ્ધ પરિવારના પાયા તરીકે ઊભી છે." કૃપા સાથે જવાબદારી સ્વીકારીને, તેઓ આપણે જે મૂલ્યો જાળવીએ છીએ તેનું જતન કરે છે.',
        section_transparency_tag: 'ડિજિટલ પારદર્શિતા',
        transparency_title: 'પારદર્શક <span class="text-gradient">જવાબદારી</span>',
        transparency_text1: 'પ્રભુ પ્રેમી ટ્રસ્ટ ખાતે, અમે દરેક દાન અને વ્યવહારમાં સંપૂર્ણ પારદર્શિતા અને જવાબદારી સુનિશ્ચિત કરવા માટે ડિજિટલાઇઝેશન અપનાવી રહ્યા છીએ. તમામ યોગદાન સલામત ડિજિટલ પ્લેટફોર્મ દ્વારા પ્રક્રિયા કરવામાં આવે છે, જે સ્પષ્ટ ટ્રેકિંગ અને દસ્તાવેજીકરણની મંજૂરી આપે છે.',
        transparency_text2: 'તમારો સહયોગ સ્પષ્ટતાને પાત્ર છે — અને અમે દાન કરેલા દરેક રૂપિયા સાથે તમારો વિશ્વાસ જીતવા માટે સમર્પિત છીએ.',
        transparency_btn1: 'અમારા મિશનને ટેકો આપો',
        transparency_btn2: 'વધુ જાણો',
        about_title: 'અમારા વિશે',
        about_subtitle: 'શ્રદ્ધામાં મૂળ, માનવતા માટે સમર્પિત.',
        activities_title: 'અમારી પ્રવૃત્તિઓ',
        activities_subtitle: 'ગતિમાં કરુણા, ભાવનામાં સેવા.',
        jatra_title: 'તીર્થ જાત્રા',
        jatra_subtitle: 'જૈન તીર્થના હૃદયની પવિત્ર યાત્રાઓ.',
        jatra_detail_title: 'ચોવીહાર છઠ સાત જાત્રા',
        jatra_detail_subtitle: 'પાલીતાણાના પવિત્ર શત્રુંજય ડુંગરની દિવ્ય 7-દિવસીય આધ્યાત્મિક તીર્થયાત્રા',
        events_title: 'કાર્યક્રમો અને કેલેન્ડર',
        events_subtitle: 'ભક્તિની ઉજવણી કરો, સમુદાયને પ્રોત્સાહન આપો.',
        gallery_title: 'ગેલેરી',
        gallery_subtitle: 'દિવ્ય કૃપા અને સેવાના ક્ષણોને કેપ્ચર કરવું',
        contact_title: 'સંપર્ક કરો',
        contact_subtitle: 'તમારી આત્માપૂર્ણ સફર શરૂ કરવા માટે અમારી સાથે જોડાઓ.',
        footer_desc: 'જૈન મૂલ્યોમાં મૂળ ધરાવતી શ્રદ્ધા-પ્રેરિત NGO, સેવા, કરુણા અને આધ્યાત્મિક વિકાસ માટે સમર્પિત. પ્રેમથી આપો. હેતુ સાથે સેવા કરો. શ્રદ્ધા સાથે વધો.',
        footer_copyright: '© 2026 પ્રભુપ્રેમી ટ્રસ્ટ. સર્વાધિકાર સુરક્ષિત.',
        footer_address: '📍 મુંબઈ, ભારત',
        footer_privacy: 'ગોપનીયતા નીતિ',
        footer_terms: 'નિયમો અને શરતો',
        footer_donation_policy: 'દાન નીતિ',
        nav_quick_links: 'ઝડપી લિંક્સ',
        nav_get_involved: 'સાથે જોડાઓ',
        nav_volunteer: 'સ્વયંસેવક',
        nav_member: 'સભ્ય બનો',
        nav_contact_header: 'સંપર્ક',
        section_activities_spiritual_tag: 'આધ્યાત્મિક કાર્યક્રમો',
        activities_spiritual_title: 'આત્માની <span class="text-gradient">સમૃદ્ધિ</span>',
        activities_spiritual_text: 'અમારા આધ્યાત્મિક કાર્યક્રમો તમને આત્મ-સાક્ષાત્કાર, સમતા અને પરમાત્મા સાથેના ઊંડા જોડાણ તરફ માર્ગદર્શન આપવા માટે રચાયેલ છે.',
        activities_spiritual_badge1: 'આધ્યાત્મિક જ્ઞાન',
        activities_meta_weekly: '<span>📅</span> સાપ્તાહિક સત્રો',
        activities_meta_all: '<span>👥</span> સૌ માટે ખુલ્લું',
        activities_view_schedule: 'શેડ્યૂલ જુઓ →',
        activities_spiritual_badge2: 'આંતરિક શાંતિ',
        activities_meta_daily: '<span>📅</span> દૈનિક સત્રો',
        activities_meta_48min: '<span>⌛</span> ૪૮ મિનિટનો અભ્યાસ',
        activities_join_session: 'સત્રમાં જોડાઓ →',
        activities_spiritual_badge3: 'યુવા શક્તિ',
        activities_meta_youth_age: '<span>👦</span> ઉંમર ૧૨-૨૫',
        activities_meta_residential: '<span>🏠</span> નિવાસી',
        activities_register_now: 'રજીસ્ટ્રેશન કરો →',
        activities_spiritual_badge4: 'પવિત્ર પર્વ',
        activities_parva_title: 'પર્વની ઉજવણી',
        activities_parva_desc: 'પર્યુષણ અને મહાવીર જયંતિ જેવા પવિત્ર દિવસોની વિશેષ ધાર્મિક વિધિઓ સાથે ઉજવણી.',
        activities_meta_festivals: '<span>✨</span> મુખ્ય તહેવારો',
        activities_meta_poojas: '<span>🙏</span> વિશેષ પૂજાઓ',
        activities_view_calendar: 'કેલેન્ડર જુઓ →',
        activities_spiritual_badge5: 'ઊંડું અધ્યયન',
        activities_study_title: 'શાસ્ત્ર અધ્યયન',
        activities_study_desc: 'આધુનિક જીવન માટે નિષ્ણાતોના માર્ગદર્શન હેઠળ જૈન શાસ્ત્રોનું ઊંડું અધ્યયન.',
        activities_meta_agam: '<span>📜</span> આગમ અભ્યાસ',
        activities_meta_philosophy: '<span>💡</span> તત્વજ્ઞાન',
        activities_enroll_now: 'પ્રવેશ મેળવો →',
        activities_spiritual_badge6: 'કૌટુંબિક શ્રદ્ધા',
        activities_family_title: 'કૌટુંબિક માર્ગદર્શન',
        activities_family_desc: 'પરિવારો માટે આધ્યાત્મિક અને નૈતિક રીતે સાથે મળીને વિકાસ કરવા માટે તૈયાર કરાયેલા કાર્યક્રમો.',
        activities_meta_workshops: '<span>🏠</span> કૌટુંબિક વર્કશોપ',
        activities_meta_education: '<span>🎓</span> મૂલ્ય શિક્ષણ',
        section_activities_seva_tag: 'સામાજિક સેવા',
        activities_impact_progress: 'અસરની પ્રગતિ',
        activities_offer_seva: 'સેવા અર્પણ કરો →',
        activities_protect_souls: 'જીવોનું રક્ષણ કરો →',
        activities_empower_youth: 'યુવાનોને સશક્ત બનાવો →',
        activities_heal_souls: 'આરોગ્ય સેવા →',
        activities_offer_support: 'સહાય અર્પણ કરો →',
        activities_give_hope: 'આશાનું કિરણ →',
        activities_general_badge: 'સામાન્ય',
        activities_general_welfare_title: 'સામાન્ય કલ્યાણ',
        activities_general_welfare_desc: 'સામાજિક ઉત્થાન માટે સર્વગ્રાહી કલ્યાણ પ્રવૃત્તિઓ, જ્યાં સૌથી વધુ જરૂર હોય ત્યાં સહાય પહોંચાડવી.',
        activities_support_all: 'સૌને ટેકો આપો →',
        activities_join_mission_title: 'અમારા <span class="text-gradient">મિશન</span>માં જોડાઓ',
        activities_join_mission_text: 'ભલે તે સહભાગી તરીકે હોય, સ્વયંસેવક તરીકે કે દાતા તરીકે હોય - તમારી સંડોવણી મોટો તફાવત લાવે છે.',
        gallery_latest_badge: '📸 નવીનતમ સંગ્રહ',
        gallery_latest_title: 'ચોવીહાર છઠ સાત જાત્રા — તસવીરોમાં એક સફર',
        gallery_latest_desc: 'પાલીતાણાની અમારી તાજેતરમાં પૂર્ણ થયેલી યાત્રાની દૈવી ક્ષણોને ફરી જીવો. ૫૦૦ થી વધુ ભક્તોએ પવિત્ર શત્રુંજય હિલ પર ચઢાણ કર્યું, શ્રદ્ધા, એકતા અને આધ્યાત્મિક જાગૃતિની ક્ષણોને કેપ્ચર કરી.',
        gallery_stat_photos: 'ફોટા',
        gallery_stat_videos: 'વીડિયો',
        gallery_stat_days: 'ઝડપાયેલ દિવસો',
        btn_view_full_album: 'સંપૂર્ણ આલ્બમ જુઓ',
        gallery_albums_tag: 'તાજેતરના આલ્બમ્સ',
        gallery_albums_title: 'વિશેષ <span class="text-gradient">ફોટો આલ્બમ્સ</span>',
        gallery_albums_desc: 'અમારી તાજેતરની પ્રવૃત્તિઓમાંથી પસંદ કરેલા સંગ્રહો',
        album_photo_count: 'ફોટા',
        album_video_count: 'વીડિયો',
        date_january_2026: '૧૫-૨૧ જાન્યુઆરી, ૨૦૨૬',
        album1_title: 'ચોવીહાર છઠ સાત જાત્રા — પાલીતાણા',
        album1_desc: 'શત્રુંજય હિલની ૭ દિવસીય પરિવર્તનકારી યાત્રા. ૫૦૦+ ભક્તોએ ભક્તિ સાથે ૩,૫૦૦ પવિત્ર પગથિયાં ચઢ્યા.',
        date_december_2025: 'ડિસેમ્બર ૨૦૨૫',
        album2_title: 'મેગા મેડિકલ કેમ્પ — થાણે',
        album2_desc: '૧,૨૦૦+ લાભાર્થીઓ માટે મફત આરોગ્ય તપાસ, દવા વિતરણ અને નિષ્ણાત પરામર્શ.',
        date_aug_sep_2025: 'ઓગસ્ટ-સપ્ટેમ્બર ૨૦૨૫',
        album3_title: 'પર્યુષણ મહાપર્વ ૨૦૨૫',
        album3_desc: 'આધ્યાત્મિક જાગૃતિના આઠ દિવસ — પ્રતિક્રમણ, પ્રવચન, સામાયિક સત્રો અને મિચ્છામી દુક્કડમ સમારોહ.',
        date_november_2025: 'નવેમ્બર ૨૦૨૫',
        album4_title: 'વીકેન્ડ મેડિટેશન રિટ્રીટ',
        album4_desc: 'પંડિત શ્રી વિનયચંદ્રજી દ્વારા માર્ગદર્શિત સામાયિક, ધ્યાન અને આત્માને સમૃદ્ધ બનાવતા પ્રવચનો સાથેની ૨ દિવસીય રિટ્રીટ.',
        date_october_2025: 'ઓક્ટોબર ૨૦૨૫',
        album5_title: 'ગિરનાર જાત્રા — જૂનાગઢ',
        album5_desc: 'પ્રાચીન નેમિનાથ મંદિરે આશીર્વાદ મેળવવા પવિત્ર ગિરનાર પર્વત પર ચઢાણ. શારીરિક અને આધ્યાત્મિક ભક્તિની કસોટી.',
        date_february_2025: 'ફેબ્રુઆરી ૨૦૨૫',
        album6_title: 'ટ્રસ્ટ એન્યુઅલ ડે સેલિબ્રેશન',
        album6_desc: '૮૦૦+ સભ્યો માટે સાંસ્કૃતિક કાર્યક્રમો, સન્માન અને સામુદાયિક ભોજન સાથે સેવા અને આધ્યાત્મિક વિકાસના બીજા વર્ષની ઉજવણી.',
        gallery_watch_tag: 'જુઓ',
        gallery_videos_title: 'વિશેષ <span class="text-gradient">વીડિયો</span>',
        gallery_videos_desc: 'વીડિયો દ્વારા અમારી પ્રવૃત્તિઓનો અનુભવ કરો',
        video1_title: 'ચોવીહાર છઠ સાત જાત્રા — સંપૂર્ણ સફર',
        video1_desc: 'પાલીતાણાની અમારી ૭ દિવસીય યાત્રાનો એક દ્રશ્ય દસ્તાવેજ, જેમાં ઇન્ટરવ્યુ, દર્શન અને સુંદર ક્ષણો છે.',
        video2_title: 'પ્રવચન — મુક્તિનો માર્ગ',
        video2_desc: 'સમ્યક જ્ઞાન અને સમ્યક ચારિત્ર્યના સિદ્ધાંતો પર પંડિત શ્રી વિનયચંદ્રજી દ્વારા પ્રબોધક પ્રવચન.',
        video3_title: 'ઇમ્પેક્ટ સ્ટોરી — મેડિકલ કેમ્પ ૨૦૨૫',
        video3_desc: 'થાણેના અમારા મેગા મેડિકલ કેમ્પમાં લાભાર્થીઓ અને સ્વયંસેવકોના હૃદયસ્પર્શી અનુભવો.',
        video_modal_placeholder_text: 'વીડિયો ટૂંક સમયમાં આવશે',
        video_modal_placeholder_subtext: 'સંપૂર્ણ વીડિયો ટૂંક સમયમાં ઉપલબ્ધ થશે',
        jatra_sig_tag: 'મહત્વ',
        jatra_sig_title: 'જાત્રાનું <span class="text-gradient">મહત્વ</span>',
        jatra_sig_desc: 'જૈન પરંપરામાં, જાત્રા (તીર્થયાત્રા) એ પવિત્ર સ્થળો — તીર્થો — ની આધ્યાત્મિક યાત્રા છે જ્યાં મહાત્માઓએ મોક્ષ પ્રાપ્ત કર્યો હતો. આ પથ પર ચાલતા, આપણે આત્મકલ્યાણ માટે પુણ્યનું ભાથું બાંધીએ છીએ.',
        jatra_chovihar_title: '🙏 ચોવીહાર છઠ',
        jatra_chovihar_desc: 'ઘણા યાત્રીઓ જાત્રા દરમિયાન <strong>ચોવીહાર</strong> (સૂર્યાસ્ત પછી પાણી વગરનો સંપૂર્ણ ઉપવાસ) કરે છે. આ તપસ્યા આધ્યાત્મિક જાગૃતિ વધારે છે.',
        jatra_saat_kshetra_title: '🛕 સાત ક્ષેત્ર જાત્રા',
        jatra_saat_kshetra_desc: 'સૌથી પૂજનીય સાત પવિત્ર જૈન સ્થળોની જાત્રા છે: <em>પાલીતાણા, ગિરનાર, શત્રુંજય, તારંગા, આબુ, કેસરિયાજી,</em> અને <em>રાણકપુર</em>.',
        jatra_quote: '"જ્યારે પગ ભક્તિથી ચાલે છે, ત્યારે આત્મા મુક્તિ તરફ ઉડે છે."',
        jatra_visual_badge: 'તીર્થ ક્ષેત્ર',
        jatra_hero_caption: 'પાલીતાણાના પવિત્ર શત્રુંજય ડુંગર પર ચઢતા યાત્રીઓ',
        jatra_path_tag: 'આધ્યાત્મિક યાત્રા',
        jatra_path_title: 'એક યાત્રીનો <span class="text-gradient">પથ</span>',
        jatra_path_desc: 'દરેક જાત્રા એક પ્રગતિશીલ આધ્યાત્મિક સફર છે. તમારા પરિવર્તનના સીમાચિહ્નો અનુસરો.',
        jatra_node1_title: 'સંકલ્પ',
        jatra_node1_desc: 'યાત્રા શરૂ કરવાનો આધ્યાત્મિક ઈરાદો.',
        jatra_node2_title: 'પ્રસ્થાન',
        jatra_node2_desc: 'સભાનતા પૂર્વકનું પ્રસ્થાન.',
        jatra_node3_title: 'દર્શન',
        jatra_node3_desc: 'દૈવી દ્રષ્ટિ.',
        jatra_node4_title: 'સેવા',
        jatra_node4_desc: 'કરુણાનું કાર્ય.',
        jatra_node5_title: 'આનંદ',
        jatra_node5_desc: 'આધ્યાત્મિક પરમાનંદ.',
        jatra_stats_tag: 'અમારો પ્રભાવ',
        jatra_stats_title: 'સંચિત <span class="text-gradient">જાત્રા આંકડા</span>',
        jatra_stat1_label: 'યાત્રીઓએ ભાગ લીધો',
        jatra_stat2_label: 'પવિત્ર સ્થળોની મુલાકાત',
        jatra_stat3_label: 'પીરસાયેલ ભોજન',
        jatra_stat4_label: 'સેવા સ્વયંસેવકો',
        jatra_upcoming_tag: 'આગામી આધ્યાત્મિક યાત્રાઓ',
        jatra_upcoming_title: 'અમારી આગામી <span class="text-gradient">તીર્થ જાત્રા</span>માં જોડાઓ',
        jatra_upcoming_desc: 'અમારી આગામી આધ્યાત્મિક તીર્થયાત્રાઓમાં તમારું સ્થાન અનામત રાખો અને દૈવી પરિવર્તનનો અનુભવ કરો.',
        jatra_card1_badge: 'ટૂંક સમયમાં: શિયાળો ૨૦૨૬',
        jatra_card1_title: 'સમ્મેદ શિખરજી મહાતીર્ધ',
        jatra_card1_desc: 'જ્યાં ૨૦ તીર્થંકરોએ નિર્વાણ પ્રાપ્ત કર્યું તે પર્વતની પરમ યાત્રા શરૂ કરો. ઊંડી શાંતિ, પ્રાર્થના અને આધ્યાત્મિક શિખરનો અનુભવ.',
        jatra_card1_duration: '૧૦ દિવસ',
        jatra_card1_destination: 'ઝારખંડ, ભારત',
        jatra_card1_inclusions: 'સાત્વિક ભોજન, ડોલી, પરિવહન',
        jatra_card2_badge: 'આયોજિત: અંત ૨૦૨૬',
        jatra_card2_title: 'પાલીતાણા નવ્વાણું જાત્રા',
        jatra_card2_desc: 'શત્રુંજય હિલની પવિત્ર ૯૯-વખતની ચઢાઈ (નવ્વાણું) કરો. એકાગ્રતા, સહનશક્તિ અને અતુલનીય ભક્તિમય આનંદનું શિસ્ત.',
        jatra_card2_duration: '૧૫ દિવસ',
        jatra_card2_destination: 'ગુજરાત, ભારત',
        jatra_card2_focus: 'ભક્તિ અને અનુષ્ઠાન',
        label_duration: 'સમયગાળો:',
        label_destination: 'સ્થળ:',
        label_inclusions: 'સમાવેશ:',
        label_focus: 'કેન્દ્ર:',
        btn_rsvp_jatra: 'જાત્રા માટે RSVP',
        btn_donate_jatra: 'જાત્રા માટે દાન આપો',
        jatra_anubhav_tag: 'જાત્રા અનુભવ',
        jatra_anubhav_title: 'દરેક જાત્રામાં <span class="text-gradient">શું સમાવિષ્ટ છે</span>',
        jatra_anubhav_desc: 'જૈન પરંપરાઓમાં મૂળ ધરાવતો સંપૂર્ણ આધ્યાત્મિક અનુભવ',
        jatra_pillar1_title: 'પ્રવચન અને સત્સંગ',
        jatra_pillar1_desc: 'વિદ્વાન આચાર્યો અને સાધુઓ દ્વારા સંચાલિત દૈનિક આધ્યાત્મિક પ્રવચનો અને ભક્તિમય મેળાવડા.',
        jatra_pillar2_title: 'સામાયિક સત્રો',
        jatra_pillar2_desc: 'આંતરિક શાંતિ અને આધ્યાત્મિક ચિંતન માટે માર્ગદર્શિત ૪૮-મિનિટના ધ્યાન સત્રો.',
        jatra_pillar3_title: 'પ્રતિક્રમણ',
        jatra_pillar3_desc: 'આત્મ-ચિંતન અને ક્ષમા માંગવાની દૈનિક સાંજની વિધિ — જૈન ધર્મનું હૃદય.',
        jatra_pillar4_title: 'સાત્વિક ભોજન',
        jatra_pillar4_desc: 'કંદમૂળ વગરનું શુદ્ધ જૈન શાકાહારી ભોજન, દરરોજ ભક્તિ સાથે તાજું તૈયાર કરવામાં આવે છે.',
        jatra_pillar5_title: 'ડોલી અને તબીબી સંભાળ',
        jatra_pillar5_desc: 'વૃદ્ધ યાત્રીઓ માટે પાલખી/ડોલી સેવા, ૨૪/૭ તબીબી સહાય અને પ્રાથમિક સારવાર સાથે.',
        jatra_pillar6_title: 'સંઘ સમુદાય',
        jatra_pillar6_desc: 'જેવા વિચાર ધરાવતા ભક્તો સાથે જોડાઓ, કાયમી મિત્રતા બનાવો અને અપડેટ્સ માટે અમારા વોટ્સએપ સમુદાયમાં જોડાઓ.',
        jatra_cta_title: 'અમારી આગામી <span class="text-gradient">જાત્રા</span>માં જોડાઓ',
        jatra_cta_desc: 'શું તમે પવિત્ર તીર્થોનું ખેંચાણ અનુભવો છો? એવી સફર શરૂ કરો જે શારીરિકથી પર છે અને અનંતને સ્પર્શે છે.',
        btn_express_interest: 'રસ વ્યક્ત કરો',
        btn_offer_seva: 'સેવા અર્પણ કરો',
        footer_about_text: 'જૈન મૂલ્યોમાં મૂળ ધરાવતી શ્રદ્ધા-પ્રેરિત NGO, સેવા, કરુણા અને આધ્યાત્મિક વિકાસ માટે સમર્પિત. પ્રેમથી આપો. હેતુ સાથે સેવા કરો. શ્રદ્ધા સાથે વધો.',
        jatra_detail_badge: 'સફળતાપૂર્વક પૂર્ણ',
        jatra_detail_date: '૧૫ - ૨૧ જાન્યુઆરી, ૨૦૨૬',
        jatra_stat1_val: '૫૦૦+',
        jatra_stat1_lab: 'યાત્રીઓ',
        jatra_stat2_val: '૭',
        jatra_stat2_lab: 'પવિત્ર દિવસો',
        jatra_stat3_val: '૩૫૦૦+',
        jatra_stat3_lab: 'ચઢેલા પગથિયાં',
        jatra_stat4_val: '૧૦૮',
        jatra_stat4_lab: 'દૈવી મંદિરો',
        jatra_tradition_tag: 'પવિત્ર પરંપરા',
        jatra_tradition_title: 'ચોવીહાર છઠ <span class="text-gradient">સાત</span>ને સમજવું',
        jatra_tradition_lead: '<strong>ચોવીહાર છઠ સાત</strong> એ શ્વેતાંબર જૈન પરંપરામાં સૌથી પ્રતિષ્ઠિત યાત્રાઓમાંની એક છે, જે આધ્યાત્મિક તપસ્યા સાથે ભક્તિમય યાત્રાને જોડે છે.',
        jatra_tradition_desc1: '\'ચોવીહાર\' એટલે કે સૂર્યાસ્તથી બીજા દિવસે સૂર્યોદય સુધી અન્ન અને જળનો ત્યાગ કરીને સંપૂર્ણ ઉપવાસ. \'છઠ\' એટલે છઠ્ઠો દિવસ, જે આધ્યાત્મિક અભ્યાસ માટે અત્યંત શુભ માનવામાં આવે છે.',
        jatra_tradition_desc2: 'પ્રભુપ્રેમી ટ્રસ્ટ દ્વારા આયોજિત આ ૭મી આવૃત્તિમાં, પવિત્ર <strong>શત્રુંજય હિલ</strong> પર સ્થિત પાલીતાણાની ૭-દિવસીય યાત્રા માટે સમગ્ર ભારતમાંથી ૫૦૦ થી વધુ ભક્તો એકઠા થયા હતા.',
        jatra_tradition_h1: 'શત્રુંજય મહાતીર્થ',
        jatra_tradition_h2: 'ચોવીહાર વ્રત',
        jatra_tradition_h3: 'દૈનિક આધ્યાત્મિક પ્રવચનો',
        jatra_caption_summit: 'શત્રુંજય શિખર પર ભક્તોની ઉજવણી',
        jatra_quote_devotion: '"જ્યારે પગ ભક્તિથી ચાલે છે, ત્યારે આત્મા મુક્તિ તરફ ઉડે છે."',
        jatra_quote_source: '— જૈન કહેવત',
        jatra_itinerary_tag: '૭-દિવસીય પ્રવાસ',
        jatra_itinerary_title: '<span class="text-gradient">પરિવર્તન</span>ની યાત્રા',
        jatra_itinerary_desc: 'દરેક દિવસ નવા અનુભવો, ઊંડા જોડાણો અને આધ્યાત્મિક જાગૃતિ લાવ્યો',
        day1_date: '૧૫ જાન્યુઆરી, ૨૦૨૬',
        day1_title: 'પ્રસ્થાન અને સંકલ્પ',
        day1_desc: 'AC લક્ઝરી બસોમાં મુંબઈથી વહેલી સવારે રવાના. રસ્તામાં પંડિત શ્રી વિનયચંદ્રજી દ્વારા જાત્રાનું મહત્વ સમજાવતા પ્રવચન. સાંજે પાલીતાણા આગમન અને સ્વાગત આરતી.',
        day1_highlight: '૫૦૦+ યાત્રીઓ સાથે સામૂહિક સંકલ્પ',
        day2_date: '૧૬ જાન્યુઆરી, ૨૦૨૬',
        day2_title: 'પ્રથમ ચઢાઈ — શત્રુંજય દર્શન',
        day2_desc: 'વહેલી સવારે ૪:૦૦ વાગ્યે શરૂઆત. સવારના ધુમ્મસમાં ભક્તિમય ભજનો સાથે ૩,૫૦૦ પવિત્ર પગથિયાં ચઢ્યા. આદિનાથ દાદાના પ્રથમ દર્શન. ૮૬૩ મંદિરો પર સૂર્યોદયના સાક્ષી બન્યા.',
        day2_highlight: 'આદિનાથ મંદિરે સૂર્યોદય દર્શન',
        day3_date: '૧૭ જાન્યુઆરી, ૨૦૨૬',
        day3_title: 'ચોવીહાર અને ઊંડું ધ્યાન',
        day3_desc: 'પવિત્ર ચોવીહાર દિવસ. ૪૦૦+ ભક્તો દ્વારા ઉપવાસ. મંદિરમાં પ્રતિક્રમણ અને ધ્યાન. સાંજે ૧૦૮ દીવાઓ સાથે ભક્તિ સંધ્યા.',
        day3_highlight: 'સામૂહિક ચોવીહાર વ્રત',
        day4_date: '૧૮ જાન્યુઆરી, ૨૦૨૬',
        day4_title: 'પ્રવચન અને સત્સંગ',
        day4_desc: 'વૃદ્ધ યાત્રીઓ માટે આરામનો દિવસ. ઉત્તરાધ્યયન સૂત્ર પર પ્રવચન. યુવાનો માટે જૈન તત્વજ્ઞાન પર વિશેષ સત્ર. સાંજે સાંસ્કૃતિક કાર્યક્રમ.',
        day4_highlight: 'યુવા ધર્મ સત્ર',
        day5_date: '૧૯ જાન્યુઆરી, ૨૦૨૬',
        day5_title: 'દ્વિતીય ચઢાઈ અને નવ્વાણું',
        day5_desc: 'વધારે પુણ્ય અર્જિત કરવા ઈચ્છતા લોકો માટે બીજી ચઢાઈ. રામપોળ મંદિરે વિશેષ પૂજા. ભગવાન ઋષભદેવના સમવસરણની મુલાકાત. બપોરે મંદિર પરિસરની સફાઈ સેવા.',
        day5_highlight: '૨૦૦+ યાત્રીઓએ બીજી ચઢાઈ પૂર્ણ કરી',
        day6_date: '૨૦ જાન્યુઆરી, ૨૦૨૬',
        day6_title: 'સેવા દિવસ અને સામૂહિક જોડાણ',
        day6_desc: 'સામૂહિક રસોડું — ૫,૦૦૦+ સ્થાનિક ભક્તો માટે ભોજન પીરસ્યું. સ્વયંસેવકો દ્વારા રક્તદાન કેમ્પ. સાંજે નવકાર મહામંત્રના જાપ સાથે મહાપૂજા.',
        day6_highlight: 'સેવામાં ૫,૦૦૦+ ભોજન પીરસ્યા',
        day7_date: '૨૧ જાન્યુઆરી, ૨૦૨૬',
        day7_title: 'અંતિમ દર્શન અને પરત',
        day7_desc: 'છેલ્લી સવારની ચઢાઈ. વિદાય આરતી. ભાવુક વિદાય અને હૃદયમાં આશીર્વાદ સાથે મુંબઈ પરત.',
        day7_highlight: 'ચોવીહાર છઠ સાત જાત્રા પૂર્ણ કરી',
        jatra_h_tag: 'જાત્રાના મુખ્ય અંશો',
        jatra_h_title: '<span class="text-gradient">દૈવી કૃપા</span>ની ક્ષણો',
        jatra_h_desc: 'આ યાત્રાને ખરેખર અવિસ્મરણીય જેણે બનાવી',
        h1_title: 'શત્રુંજય દર્શન',
        h1_desc: 'પરોઢિયે ૩,૫૦૦ પગથિયાં ચઢ્યા, સુંદર કોતરણીવાળા દરવાજાઓમાંથી પસાર થયા. શિખર પર ૮૬૩ ભવ્ય મંદિરો ભક્તિના સાક્ષી તરીકે ઊભા છે.',
        h1_stat_val: '૩,૫૦૦',
        h1_stat_lab: 'ભક્તિના પગથિયાં',
        h2_title: 'દૈનિક પ્રવચન',
        h2_desc: 'દરરોજ સાંજે, વિદ્વાન વિદ્વાનોએ પ્રાચીન ગ્રંથો — ઉત્તરાધ્યયન સૂત્ર, તત્ત્વાર્થ સૂત્ર અને કલ્પ સૂત્રમાંથી જ્ઞાન વહેંચ્યું.',
        h2_stat_val: '૧૪',
        h2_stat_lab: 'આધ્યાત્મિક પ્રવચનો',
        h3_title: 'સામુદાયિક ભોજન',
        h3_desc: 'પ્રેમ અને ભક્તિ સાથે તૈયાર કરેલ શુદ્ધ જૈન ભોજન. સામાજિક દરજ્જાના ભેદભાવ વગર સમુદાય અને સાત્વિક જીવનની ઉજવણી.',
        h3_stat_val: '૧૫,૦૦૦+',
        h3_stat_lab: 'પીરસાયેલ ભોજન',
        h4_title: 'ભક્તિ સંધ્યા',
        h4_desc: 'દરેક સાંજ ભક્તિની ઉજવણીમાં ફેરવાઈ ગઈ. પરંપરાગત સ્તવનો અને ભજનોએ પવિત્ર વાતાવરણ બનાવ્યું.',
        h4_stat_val: '૭',
        h4_stat_lab: 'ભક્તિની રાતો',
        h5_title: 'સંઘ એકતા',
        h5_desc: 'મુંબઈ, અમદાવાદ, જયપુર અને અન્ય શહેરોમાંથી પરિવારો સાથે આવ્યા. નવા મિત્રો બન્યા અને સમુદાયની ભાવના મજબૂત થઈ.',
        h5_stat_val: '૫૦+',
        h5_stat_lab: 'શહેરોનું પ્રતિનિધિત્વ',
        h6_title: 'સૂર્યોદય વિધિ',
        h6_desc: 'શત્રુંજયના શિખરો પર સૂર્યોદય જોવો એ શબ્દોથી પરનો અનુભવ છે. સોનેરી કળશને પ્રકાશિત કરતી પ્રથમ કિરણો મન મોહી લે છે.',
        h6_stat_val: 'સવારે ૪:૦૦',
        h6_stat_lab: 'દૈનિક શરૂઆતનો સમય',
        jatra_v_tag: 'યાત્રીઓના અનુભવો',
        jatra_v_title: '<span class="text-gradient">ભક્તિ</span>ના સૂરો',
        jatra_v_subtitle: 'અમારા યાત્રીઓ તેમની પરિવર્તનકારી સફર વિશે શું કહે છે',
        v1_text: '"૭૨ વર્ષની ઉંમરે, મેં ક્યારેય વિચાર્યું નહોતું કે હું ફરીથી શત્રુંજય ચઢી શકીશ. પરંતુ સ્વયંસેવકો અને ટ્રસ્ટ દ્વારા ગોઠવાયેલી ડોલી સેવાને કારણે હું ન માત્ર ચઢી શકી પણ ઉત્સાહ પણ છે."',
        v1_author: 'શ્રીમતી કમલાબેન શાહ',
        testi_mumbai: 'મુંબઈ',
        v2_text: '"મારા ૧૨ વર્ષના પુત્રની આ પહેલી જાત્રા હતી. તેને સવારે ૪ વાગ્યે ફરિયાદ વગર જાગતો જોવો, ઉત્સાહપૂર્વક દરેક પગથિયું ચઢવો — એક માતા-પિતા માટે અમૂલ્ય છે."',
        v2_author: 'શ્રી રાજેશ મહેતા',
        testi_ahmedabad: 'અમદાવાદ',
        v3_text: '"આયોજન ઉત્કૃષ્ટ હતું. લક્ઝરી બસોથી લઈને સાત્વિક ભોજન અને તબીબી સહાય સુધી — બધું જ વિચારપૂર્વકનું હતું. અમે સંપૂર્ણ ધ્યાન આધ્યાત્મિક અભ્યાસ પર આપી શક્યા."',
        v3_author: 'ડો. પ્રિયા જૈન',
        testi_jaipur: 'જયપુર',
        jatra_g_tag: 'કેપ્ચર કરેલી ક્ષણો',
        jatra_g_title: '<span class="text-gradient">દૈવી આનંદ</span>ની ઝલક',
        jatra_g_desc: 'ચોવીહાર છઠ સાત જાત્રાની સુંદર ક્ષણોને ફરી જીવો',
        g1_cap: 'પરોઢિયે ચઢાઈ — ૫૦૦+ યાત્રીઓ પવિત્ર ચઢાઈ શરૂ કરે છે',
        g2_cap: 'મંદિર પરિસરમાં સાંજનું પ્રવચન',
        g3_cap: 'ચોવીહાર વ્રતની પૂર્ણાહુતિની ઉજવણી',
        g4_cap: 'શત્રુંજય શિખર પર યુનાઈટેડ સંઘ',
        btn_full_gallery: 'સંપૂર્ણ ગેલેરી જુઓ',
        jatra_inc_tag: 'જાત્રા પેકેજ',
        jatra_inc_title: 'દરેક <span class="text-gradient">યાત્રીને શું મળ્યું</span>',
        jatra_inc_desc: 'વિચારપૂર્વક આયોજિત સંપૂર્ણ આધ્યાત્મિક અનુભવ',
        inc1_title: 'AC લક્ઝરી પરિવહન',
        inc1_desc: 'અનુભવી ડ્રાઈવરો સાથે આરામદાયક AC બસોમાં રાઉન્ડ-ટ્રીપ પ્રવાસ',
        inc2_title: 'ધર્મશાળામાં રોકાણ',
        inc2_desc: 'સ્વચ્છ અને વ્યવસ્થિત ધર્મશાળામાં ૬ રાતોનું રોકાણ',
        inc3_title: 'સાત્વિક ભોજન',
        inc3_desc: 'તમામ શાકાહારી ભોજન — સવારનો નાસ્તો, બપોરનું ભોજન, રાત્રિભોજન અને નાસ્તો',
        inc4_title: 'આધ્યાત્મિક કાર્યક્રમો',
        inc4_desc: 'દૈનિક પ્રવચનો, સામાયિક સત્રો અને ભક્તિ સંધ્યા',
        inc5_title: 'તબીબી સહાય',
        inc5_desc: 'પ્રાથમિક સારવાર અને કટોકટી સેવાઓ સાથે ર૪/૭ તબીબી ટીમ',
        inc6_title: 'ડોલી સેવા',
        inc6_desc: 'વૃદ્ધ અને દિવ્યાંગ યાત્રીઓ માટે પાલખી/ડોલીની વ્યવસ્થા',
        cta_label_winter: 'શિયાળો ૨૦૨૬',
        cta_title_join_next: 'અમારી આગામી <span class="text-gradient">પવિત્ર યાત્રા</span>માં જોડાઓ',
        cta_desc_join_next: 'પાલીતાણાના આધ્યાત્મિક પરિવર્તનનો અનુભવ કરો. અમારી આગામી ચોવીહાર છઠ સાત જાત્રા ૨૦૨૬ ના અંતમાં આયોજિત છે.',
        btn_explore_jatras: 'યાત્રાઓ જુઓ',
        btn_register_interest: 'રસ નોંધાવો',
        event_badge_featured: '🔥 મુખ્ય કાર્યક્રમ',
        featured_event_title: 'મહાવીર જન્મ કલ્યાણક 2026',
        featured_event_desc: 'ભગવાન મહાવીરના જન્મ કલ્યાણકની ભવ્ય ઉજવણીમાં અમારી સાથે જોડાઓ. દેશભરના હજારો ભક્તો સાથે દૈવી સરઘસો, આધ્યાત્મિક પ્રવચનો અને સામુદાયિક ભોજનનો અનુભવ કરો.',
        featured_event_date: '14 એપ્રિલ, 2026',
        featured_event_loc: 'શાંતિનાથ મંદિર, મુંબઈ',
        featured_event_time: 'સવારે 7:00 વાગ્યાથી',
        event_register_btn: 'રજીસ્ટ્રેશન કરો',
        countdown_days: 'દિવસ',
        countdown_hours: 'કલાક',
        countdown_mins: 'મિનિટ',
        countdown_secs: 'સેકન્ડ',
        section_event_cat_tag: 'શોધો',
        event_cat_title: 'કાર્યક્રમની <span class="text-gradient">શ્રેણીઓ</span>',
        event_cat_subtitle: 'આધ્યાત્મિક મેળાવડાથી લઈને સામુદાયિક સેવા સુધી, તમારા આત્મા સાથે સુસંગત કાર્યક્રમો શોધો.',
        cat_spiritual_title: 'આધ્યાત્મિક મેળાવડા',
        cat_spiritual_desc: 'પ્રવચનો, ધ્યાન સત્રો અને આધ્યાત્મિક શિબિરો',
        cat_seva_title: 'સામાજિક સેવા',
        cat_seva_desc: 'તબીબી કેમ્પ, ભોજન અભિયાન અને સામુદાયિક સેવા',
        cat_festivals_title: 'તહેવારો',
        cat_festivals_desc: 'પર્યુષણ, મહાવીર જયંતિ અને પવિત્ર ઉજવણીઓ',
        section_calendar_tag: 'આગામી',
        calendar_title: 'કાર્યક્રમની <span class="text-gradient">સમયરેખા</span>',
        calendar_subtitle: 'આ આગામી આધ્યાત્મિક અને સેવા કાર્યક્રમો માટે તમારા કેલેન્ડરમાં નોંધ કરો.',
        filter_all: 'તમામ કાર્યક્રમો',
        event1_title_timeline: 'પર્યુષણ મહાપર્વ',
        event1_desc_timeline: 'દૈનિક પ્રવચનો અને સામાયિક સત્રો સાથે આત્મ-ચિંતન, ક્ષમા અને આધ્યાત્મિક વિકાસના સૌથી મંગલ સમય માટે અમારી સાથે જોડાઓ.',
        event1_loc_timeline: '📍 મુખ્ય મંદિર હોલ',
        event1_time_timeline: '⏰ સવારે 6:00 - રાત્રે 9:00',
        event1_all_timeline: '👥 સૌ માટે ખુલ્લું',
        event1_date_timeline: '📅 15 ફેબ્રુઆરી, 2026',
        btn_join_celebration: '🎊 ઉજવણીમાં જોડાઓ',
        event2_title_timeline: 'મેગા મેડિકલ કેમ્પ ડ્રાઇવ',
        event2_desc_timeline: 'આદિવાસી વિસ્તારોમાં જરૂરિયાતમંદ પરિવારો માટે મફત આરોગ્ય તપાસ, ડેન્ટલ કેર અને દવા વિતરણ. ડોક્ટરો અને સ્વયંસેવકોની જરૂર છે!',
        event2_loc_timeline: '📍 કોમ્યુનિટી સેન્ટર, વડોદરા',
        event2_time_timeline: '⏰ સવારે 9:00 - સાંજે 4:00',
        event2_docs_timeline: '🩺 50+ ડોક્ટરો અપેક્ષિત',
        event2_date_timeline: '📅 28 ફેબ્રુઆરી, 2026',
        event3_title_timeline: 'મહાવીર જન્મ કલ્યાણક',
        event3_desc_timeline: 'ભવ્ય સરઘસો, પ્રવચનો, રથયાત્રા અને સામુદાયિક ભોજન સાથે ભગવાન મહાવીરના જન્મ કલ્યાણકની ઉજવણી.',
        event3_loc_timeline: '📍 શાંતિનાથ મંદિર',
        event3_time_timeline: '⏰ સવારે 7:00 વાગ્યાથી',
        event3_attendees_timeline: '🎉 5000+ અપેક્ષિત સહભાગીઓ',
        event3_date_timeline: '📅 14 એપ્રિલ, 2026',
        section_memories_tag: 'યાદો',
        past_events_title: 'ભૂતકાળના કાર્યક્રમ <span class="text-gradient">હાઈલાઈટ્સ</span>',
        past_events_subtitle: 'અમારા તાજેતરના મેળાવડા અને ઉજવણીઓની સુંદર ક્ષણોને ફરીથી જીવો.',
        past_event1_title: 'આધ્યાત્મિક શિબિર 2025',
        past_event1_date: '15-17 ડિસેમ્બર, 2025',
        past_event1_desc: 'લોનાવલાની શાંત ટેકરીઓમાં માર્ગદર્શિત ધ્યાન, સત્સંગ અને આત્મ-શોધ સાથેના પરિવર્તનશીલ 3-દિવસીય શિબિર.',
        past_event1_attendees: '150 સહભાગીઓ',
        past_event1_loc: 'લોનાવલા',
        past_event2_title: 'તબીબી કેમ્પ ગુજરાત',
        past_event2_date: '12 નવેમ્બર, 2025',
        past_event2_desc: 'ગુજરાતના 5 આદિવાસી ગામોમાં 500+ પરિવારો માટે મફત આરોગ્ય તપાસ અને દવા વિતરણ.',
        past_event2_patients: '500+ દર્દીઓ',
        past_event2_loc: 'વડોદરા',
        past_event3_title: 'પર્યુષણ 2025',
        past_event3_date: '25 ઓગસ્ટ - 2 સપ્ટેમ્બર, 2025',
        past_event3_desc: 'ઉપવાસ, પ્રાર્થના અને ક્ષમાના આઠ પવિત્ર દિવસો જે સુંદર ક્ષમાપનાની ઉજવણીમાં પરિણમે છે.',
        past_event3_devotees: '2000+ ભક્તો',
        past_event3_loc: 'મુંબઈ',
        btn_view_full_gallery: 'સંપૂર્ણ ગેલેરી જુઓ →',
        newsletter_title: 'કોઈપણ કાર્યક્રમ ચૂકશો નહીં',
        newsletter_desc: 'અમારા ન્યૂઝલેટર પર સબ્સ્ક્રાઇબ કરો અને આગામી કાર્યક્રમો, આધ્યાત્મિક મેળાવડા અને સેવા તકો વિશે સૂચના મેળવો.',
        newsletter_placeholder: 'તમારું ઇમેઇલ સરનામું દાખલ કરો',
        newsletter_subscribe_btn: 'સબ્સ્ક્રાઇબ કરો',
        modal_join_title: '🎊 અમારી સફરમાં જોડાઓ',
        modal_select_interest: 'તમારો રસ પસંદ કરો'
      }
    };
    this.init();
  }

  init() {
    if (this.toggleBtns.length === 0) return;

    this.toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.switchLanguage(lang);
      });
    });

    // Initial state
    this.switchLanguage(this.currentLang);
  }

  switchLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('ppt_lang', lang);

    // Update buttons
    this.toggleBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update text content
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.dataset.i18n;
      if (this.translations[lang] && this.translations[lang][key]) {
        el.innerHTML = this.translations[lang][key];
      }
    });

    // Optional: Update HTML lang attribute
    document.documentElement.lang = lang;
  }
}

// ===== NAVBAR SCROLL EFFECT =====
class Navbar {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.toggle = document.querySelector('.navbar__toggle');
    this.menu = document.querySelector('.navbar__menu');
    this.links = document.querySelectorAll('.navbar__link');
    this.init();
  }

  init() {
    // Scroll effect
    window.addEventListener('scroll', () => this.handleScroll());

    // Mobile menu toggle
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleMenu());
    }

    // Close menu on link click
    this.links.forEach((link) => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (this.menu && this.menu.classList.contains('active') &&
        !this.menu.contains(e.target) && !this.toggle.contains(e.target)) {
        this.closeMenu();
      }
    });
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  toggleMenu() {
    this.menu.classList.toggle('active');
    this.toggle.classList.toggle('active');
    document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
  }

  closeMenu() {
    this.menu.classList.remove('active');
    this.toggle.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ===== SMOOTH SCROLL =====
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// ===== TESTIMONIAL CAROUSEL =====
class Carousel {
  constructor(element) {
    this.carousel = element;
    this.track = element.querySelector('.carousel__track');
    this.slides = element.querySelectorAll('.carousel__slide');
    this.prevBtn = element.querySelector('.carousel__prev');
    this.nextBtn = element.querySelector('.carousel__next');
    this.dots = element.querySelector('.carousel__dots');
    this.currentIndex = 0;
    this.autoPlayInterval = null;

    if (this.slides.length > 0) {
      this.init();
    }
  }

  init() {
    this.createDots();
    this.updateCarousel();
    this.bindEvents();
    this.startAutoPlay();
  }

  createDots() {
    if (!this.dots) return;
    this.slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel__dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dots.appendChild(dot);
    });
  }

  updateCarousel() {
    if (!this.track) return;
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    // Update dots
    if (this.dots) {
      const allDots = this.dots.querySelectorAll('.carousel__dot');
      allDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateCarousel();
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    this.carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.nextSlide();
        else this.prevSlide();
        this.resetAutoPlay();
      }
    }, { passive: true });
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
}

// ===== LIGHTBOX =====
class Lightbox {
  constructor() {
    this.lightbox = document.querySelector('.lightbox');
    this.lightboxImg = document.querySelector('.lightbox__image');
    this.closeBtn = document.querySelector('.lightbox__close');
    this.init();
  }

  init() {
    document.querySelectorAll('[data-lightbox]').forEach((img) => {
      img.addEventListener('click', () => this.open(img.src));
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.lightbox) {
      this.lightbox.querySelector('.lightbox__backdrop').addEventListener('click', () => this.close());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open(src) {
    if (!this.lightbox || !this.lightboxImg) return;
    this.lightboxImg.src = src;
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ===== FORM VALIDATION =====
class FormValidation {
  constructor(form) {
    this.form = form;
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation
    this.form.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (field.required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
      // Stricter email regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email (e.g., name@example.com)';
      }
    } else if (field.id === 'donate-amount') {
      const amountValue = parseFloat(value);
      if (isNaN(amountValue)) {
        isValid = false;
        errorMessage = 'Please enter a valid number';
      } else if (!Number.isInteger(amountValue)) {
        isValid = false;
        errorMessage = 'Amount must be a whole number (no decimals)';
      } else if (amountValue < 100) {
        isValid = false;
        errorMessage = 'Minimum donation is ₹100';
      }
    } else if (field.type === 'tel' && value) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value.replace(/\D/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid 10-digit phone number';
      }
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  showError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('has-error');

    let errorEl = formGroup.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.classList.add('form-error');
      formGroup.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  clearError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('has-error');
    const errorEl = formGroup.querySelector('.form-error');
    if (errorEl) errorEl.remove();
  }

  handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    this.form.querySelectorAll('input, textarea').forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Show success message
      const successEl = document.createElement('div');
      successEl.classList.add('form-success');
      successEl.textContent = 'Thank you! Your message has been sent successfully.';
      this.form.appendChild(successEl);
      this.form.reset();

      setTimeout(() => successEl.remove(), 5000);
    }
  }
}

// ===== PARALLAX EFFECT =====
class Parallax {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const scrolled = window.pageYOffset;
    this.elements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
}

// ===== PILLARS CAROUSEL =====
class PillarsCarousel {
  constructor() {
    this.track = document.getElementById('pillars-track');
    if (!this.track) return;

    this.cards = this.track.querySelectorAll('.pillar-card');
    this.prevBtn = document.getElementById('pillars-prev');
    this.nextBtn = document.getElementById('pillars-next');
    this.dotsContainer = document.getElementById('pillars-dots');

    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.totalPages = Math.ceil(this.cards.length / this.cardsPerView);

    this.init();
  }

  getCardsPerView() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  }

  init() {
    // Create dots
    this.createDots();

    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.navigate(-1));
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.navigate(1));
    }

    // Handle resize
    window.addEventListener('resize', () => {
      const newCardsPerView = this.getCardsPerView();
      if (newCardsPerView !== this.cardsPerView) {
        this.cardsPerView = newCardsPerView;
        this.totalPages = Math.ceil(this.cards.length / this.cardsPerView);
        this.currentIndex = Math.min(this.currentIndex, this.totalPages - 1);
        this.createDots();
        this.scrollToIndex(this.currentIndex);
      }
    });

    // Touch/swipe support
    let startX = 0;
    let scrollLeft = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - this.track.offsetLeft;
      scrollLeft = this.track.scrollLeft;
    });

    this.track.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - this.track.offsetLeft;
      const walk = (x - startX) * 2;
      this.track.scrollLeft = scrollLeft - walk;
    });

    // Update dots on scroll
    this.track.addEventListener('scroll', () => {
      this.updateDotsFromScroll();
    });
  }

  createDots() {
    if (!this.dotsContainer) return;

    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = `pillars-carousel__dot${i === 0 ? ' pillars-carousel__dot--active' : ''}`;
      dot.setAttribute('aria-label', `Go to page ${i + 1}`);
      dot.addEventListener('click', () => this.goToPage(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  navigate(direction) {
    const newIndex = this.currentIndex + direction;
    if (newIndex >= 0 && newIndex < this.totalPages) {
      this.goToPage(newIndex);
    }
  }

  goToPage(index) {
    this.currentIndex = index;
    this.scrollToIndex(index);
    this.updateDots();
    this.updateButtons();
  }

  scrollToIndex(index) {
    const cardWidth = this.cards[0].offsetWidth;
    const gap = 24; // var(--space-6) = 24px
    const scrollPosition = index * this.cardsPerView * (cardWidth + gap);

    this.track.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  updateDots() {
    if (!this.dotsContainer) return;

    const dots = this.dotsContainer.querySelectorAll('.pillars-carousel__dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('pillars-carousel__dot--active', i === this.currentIndex);
    });
  }

  updateDotsFromScroll() {
    if (!this.dotsContainer) return;

    const cardWidth = this.cards[0].offsetWidth;
    const gap = 24;
    const scrollPosition = this.track.scrollLeft;
    const pageWidth = this.cardsPerView * (cardWidth + gap);
    const newIndex = Math.round(scrollPosition / pageWidth);

    if (newIndex !== this.currentIndex && newIndex >= 0 && newIndex < this.totalPages) {
      this.currentIndex = newIndex;
      this.updateDots();
      this.updateButtons();
    }
  }

  updateButtons() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex >= this.totalPages - 1;
    }
  }
}

// ===== GALLERY FILTER =====
class GalleryFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.gallery-filter__btn');
    this.galleryItems = document.querySelectorAll('.gallery__item');

    if (this.filterButtons.length > 0) {
      this.init();
    }
  }

  init() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        this.galleryItems.forEach(item => {
          const category = item.dataset.category;
          if (filter === 'all' || filter === category) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }
}

// ===== INITIALIZE ALL MODULES =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll reveal
  new ScrollReveal();

  // Initialize navbar
  new Navbar();

  // Initialize smooth scroll
  new SmoothScroll();

  // Initialize lightbox
  new Lightbox();

  // Initialize parallax
  new Parallax();

  // Initialize carousels
  document.querySelectorAll('.carousel').forEach((el) => new Carousel(el));

  // Initialize pillars carousel
  new GalleryFilter();
  new PillarsCarousel();

  // Initialize form validation
  document.querySelectorAll('form').forEach((form) => new FormValidation(form));

  // Initialize counter animations with Intersection Observer
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = new CounterAnimation(entry.target);
            counter.animate();
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // Add active class to current page nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ===== DONATION PAGE LOGIC - RAZORPAY INTEGRATION =====
  if (currentPage === 'donate.html') {
    const donateForm = document.getElementById('donation-form');

    // Razorpay Configuration
    // TODO: Replace with your actual Razorpay Key ID
    const RAZORPAY_KEY_ID = 'rzp_test_YOUR_KEY_ID_HERE';

    if (donateForm) {
      donateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const amount = parseInt(document.getElementById('donate-amount').value, 10);
        const name = document.getElementById('donate-name').value.trim();
        const email = document.getElementById('donate-email').value.trim();
        const phone = document.getElementById('donate-phone').value.trim() || '';
        const category = document.getElementById('donate-category').value;

        // Validate amount
        if (!amount || amount < 500) {
          alert('Minimum donation is ₹500');
          return;
        }

        if (!name || !email) {
          alert('Please fill in all required fields');
          return;
        }

        // Determine certificate tier
        let tierText = '🥉 Bronze Donor';
        if (amount >= 25001) tierText = '🥇 Gold Donor';
        else if (amount >= 10001) tierText = '🥈 Silver Donor';

        // Razorpay options
        const options = {
          key: RAZORPAY_KEY_ID,
          amount: amount * 100, // Razorpay expects amount in paise
          currency: 'INR',
          name: 'PrabhuPremi Trust',
          description: `Donation for ${category.replace('-', ' ')} - ${tierText}`,
          image: 'assets/images/logo.png',
          prefill: {
            name: name,
            email: email,
            contact: phone
          },
          notes: {
            category: category,
            donor_name: name
          },
          theme: {
            color: '#F15B26'
          },
          handler: function (response) {
            // Payment successful
            console.log('Payment successful:', response);

            // Generate and download certificate
            if (window.CertificateGenerator) {
              const donorData = {
                name: name,
                amount: amount,
                category: category,
                paymentId: response.razorpay_payment_id
              };

              // Generate certificate PDF
              const filename = window.CertificateGenerator.generate(donorData);
              console.log('Certificate generated:', filename);
            }

            // Show success message
            showSuccessMessage(name, amount, tierText);

            // Reset form
            donateForm.reset();
          },
          modal: {
            ondismiss: function () {
              console.log('Payment modal closed');
            }
          }
        };

        // Open Razorpay checkout
        try {
          const rzp = new Razorpay(options);
          rzp.on('payment.failed', function (response) {
            console.error('Payment failed:', response.error);
            alert('Payment failed. Please try again.\n' + response.error.description);
          });
          rzp.open();
        } catch (error) {
          console.error('Razorpay error:', error);
          alert('Unable to initialize payment. Please try again later.');
        }
      });
    }

    // Success message display function
    function showSuccessMessage(name, amount, tier) {
      const successOverlay = document.createElement('div');
      successOverlay.className = 'donation-success-overlay';
      successOverlay.innerHTML = `
        <div class="donation-success-modal">
          <div class="success-icon">🙏</div>
          <h2>Thank You, ${name}!</h2>
          <p class="success-tier">${tier}</p>
          <p class="success-amount">₹${amount.toLocaleString('en-IN')}</p>
          <p class="success-message">Your generosity creates ripples of hope. Your certificate has been downloaded.</p>
          <button class="btn btn--primary" onclick="this.closest('.donation-success-overlay').remove()">Close</button>
        </div>
      `;

      // Add styles
      successOverlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 24, 44, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      `;

      const modal = successOverlay.querySelector('.donation-success-modal');
      modal.style.cssText = `
        background: white;
        padding: 48px;
        border-radius: 24px;
        text-align: center;
        max-width: 450px;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
      `;

      document.body.appendChild(successOverlay);
    }
  }
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.classList.add('scroll-top-btn');
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

// Add styles for scroll to top button
const style = document.createElement('style');
style.textContent = `
  .scroll-top-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-gold);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: var(--shadow-lg);
  }
  .scroll-top-btn.visible {
    opacity: 1;
    visibility: visible;
  }
  .scroll-top-btn:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-glow);
  }
`;
document.head.appendChild(style);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== RSVP MODAL GLOBAL LOGIC =====
let currentEventName = '';
let currentEventDate = '';

window.openRsvpModal = function (eventName, eventDate, category = '') {
  currentEventName = eventName || 'General Inquiry';
  currentEventDate = eventDate || '';

  document.getElementById('rsvpEventNameDisplay').textContent = eventName ? `${eventName} (${eventDate})` : 'Join Our Soulful Journey';

  const rsvpModal = document.getElementById('rsvpModal');
  const rsvpFormContainer = document.getElementById('rsvpFormContainer');

  // Reset form to initial state
  rsvpFormContainer.innerHTML = `
        <form id="rsvpForm" onsubmit="submitRsvpForm(event)">
            <div class="rsvp-form__group">
                <label class="rsvp-form__label" for="rsvpCategory">I am interested in *</label>
                <select class="rsvp-form__select" id="rsvpCategory" name="category" required>
                    <option value="" disabled ${!category ? 'selected' : ''}>Select an interest</option>
                    <option value="events" ${category === 'events' ? 'selected' : ''}>Joining Upcoming Events</option>
                    <option value="jatra" ${category === 'jatra' ? 'selected' : ''}>Upcoming Tirtha Yatra (Pilgrimage)</option>
                    <option value="volunteering" ${category === 'volunteering' ? 'selected' : ''}>Volunteering for Seva</option>
                    <option value="membership" ${category === 'membership' ? 'selected' : ''}>Community Membership</option>
                </select>
            </div>
            <div class="rsvp-form__group">
                <label class="rsvp-form__label" for="rsvpName">Full Name *</label>
                <input type="text" class="rsvp-form__input" id="rsvpName" name="name" placeholder="Enter your full name" required>
            </div>
            <div class="rsvp-form__group">
                <label class="rsvp-form__label" for="rsvpEmail">Email Address *</label>
                <input type="email" class="rsvp-form__input" id="rsvpEmail" name="email" placeholder="Enter your email" required>
            </div>
            <div class="rsvp-form__group">
                <label class="rsvp-form__label" for="rsvpPhone">Phone Number *</label>
                <input type="tel" class="rsvp-form__input" id="rsvpPhone" name="phone" placeholder="+91 98765 43210" required>
            </div>
            <button type="submit" class="rsvp-form__submit">Confirm My Interest</button>
        </form>
    `;

  rsvpModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeRsvpModal = function () {
  document.getElementById('rsvpModal').classList.remove('active');
  document.body.style.overflow = '';
};

window.submitRsvpForm = function (e) {
  e.preventDefault();
  const name = document.getElementById('rsvpName').value;
  const email = document.getElementById('rsvpEmail').value;
  const categorySelect = document.getElementById('rsvpCategory');
  const categoryText = categorySelect.options[categorySelect.selectedIndex].text;

  // Show success message
  document.getElementById('rsvpFormContainer').innerHTML = `
        <div class="rsvp-success">
            <div class="rsvp-success__icon">✨</div>
            <h4 class="rsvp-success__title">Submission Received!</h4>
            <p class="rsvp-success__text">
                Thank you, ${name}! We have received your interest in <strong>${categoryText}</strong>. 
                Our team will reach out to you at ${email} with more details soon.
            </p>
            <button class="btn btn--primary" onclick="closeRsvpModal()">Close</button>
        </div>
    `;

  console.log('RSVP Submitted:', {
    name,
    email,
    phone: document.getElementById('rsvpPhone').value,
    category: categoryText,
    event: currentEventName,
    date: currentEventDate
  });
};

// Close modal when clicking on backdrop
document.addEventListener('DOMContentLoaded', () => {
  const rsvpModal = document.getElementById('rsvpModal');
  if (rsvpModal) {
    rsvpModal.addEventListener('click', (e) => {
      if (e.target === rsvpModal) closeRsvpModal();
    });
  }
});

// ===== DAILY QUOTE LOGIC =====
class DailyQuote {
  constructor() {
    this.quoteText = document.getElementById('daily-quote-text');
    this.quoteSource = document.getElementById('daily-quote-source');
    this.shareBtn = document.getElementById('share-quote-btn');
    this.quotes = window.jainQuotes || [];

    if (this.quoteText && this.quotes.length > 0) {
      this.init();
    }
  }

  init() {
    this.displayDailyQuote();
    if (this.shareBtn) {
      this.shareBtn.addEventListener('click', () => this.shareQuote());
    }
  }

  getQuoteIndex() {
    // Create a seeded random index based on the current date
    // This ensures the quote is the same for everyone on the same day
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Use a large prime number to jump around the list and make it feel random
    // while ensuring we cover all quotes eventually (if 997 is coprime to length)
    // 997 is a prime number.
    const seed = (today.getFullYear() * 366) + dayOfYear;
    // Simple pseudo-random permutation series
    return (seed * 997) % this.quotes.length;
  }

  displayDailyQuote() {
    const index = this.getQuoteIndex();
    const quote = this.quotes[index];

    // Fade out
    this.quoteText.style.opacity = 0;
    this.quoteSource.style.opacity = 0;

    setTimeout(() => {
      this.quoteText.textContent = `"${quote.text}"`;
      this.quoteSource.textContent = `— ${quote.source}`;

      // Fade in
      this.quoteText.style.transition = 'opacity 1s ease';
      this.quoteSource.style.transition = 'opacity 1s ease';
      this.quoteText.style.opacity = 1;
      this.quoteSource.style.opacity = 1;
    }, 500);
  }

  shareQuote() {
    const text = this.quoteText.textContent;
    const source = this.quoteSource.textContent;
    const shareData = {
      title: 'Daily Jain Wisdom',
      text: `${text} ${source}\n\nRead more at PrabhuPremi Trust:`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
        .then(() => alert('Quote copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  }
}

// Initialize all features on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Scroll Reveal
  const scrollReveal = new ScrollReveal();

  // Initialize Daily Quote (if on homepage)
  const dailyQuote = new DailyQuote();

  // Initialize Language Manager
  // (Already initialized in ScrollReveal, but ensuring standalone usage if needed)
  // const langManager = new LanguageManager(); // ScrollReveal does it.

  // Navbar Toggle Logic
  const navToggle = document.querySelector('.navbar__toggle');
  const navMenu = document.querySelector('.navbar__menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Modal Logic (Gallery)
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox__image');
    const lightboxClose = lightbox.querySelector('.lightbox__close');

    // Open lightbox
    document.querySelectorAll('.gallery-item img, .gallery-grid img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
      });
    });

    // Close lightbox
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.classList.remove('no-scroll');
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // Impact Counters (if visible on load)
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(counter => {
    new CounterAnimation(counter).animate(); // Should rely on scroll reveal but this initializes if already visible logic is added
    // Actually ScrollReveal handles interaction, but we can hook into it.
    // For now, let's leave it as ScrollReveal triggers via class change?
    // Wait, ScrollReveal in this file observes 'progress-bar__fill', but not counters individually for animation trigger?
    // Let's modify ScrollReveal to trigger counters if needed, or just rely on 'is-visible' CSS.
    // The CounterAnimation class is defined but not auto-instantiated by ScrollReveal in the existing code.
    // Let's attach it to ScrollReveal logic.

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          new CounterAnimation(entry.target).animate();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  });
});
