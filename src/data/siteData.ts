import { PageData } from '../types';

export const STUDIO_INFO = {
  name: "Falguni's Photography",
  tagline: "Unhurried newborn, maternity, family and cake smash photography in Lightsview, Adelaide",
  address: "26 South Pkwy, Northfield SA 5085, Australia",
  phone: "+61 469 753 238",
  phoneDisplay: "+61 469 753 238",
  hours: "Open daily, 9 AM to 6 PM",
  serviceArea: "Northfield, Lightsview, and the surrounding north-eastern suburbs of Adelaide, South Australia",
  basePrice: "$300",
  googleRating: "5.0",
  reviewCount: "60"
};

export const PAGES_DATA: Record<string, PageData> = {
  home: {
    name: "Home",
    url: "/",
    purpose: "Establish trust immediately and route visitors to the specific service page matching their need.",
    meta_title: "Newborn Photographer in Lightsview, Adelaide | Falguni's",
    meta_description: "Unhurried newborn, maternity, family and cake smash photography from a home studio in Lightsview, Adelaide. Sessions from $300. Book your date today.",
    sections: [
      {
        section_name: "Hero",
        heading_tag: "h1",
        headline: "Newborn and Family Photography in Lightsview, Adelaide",
        subheadline: "Gentle sessions timed around your baby, with feeding breaks built in.",
        body_copy: "Falguni runs a warm home studio in Lightsview for newborn, maternity, family, and cake smash sessions. Every shoot moves at your baby's pace, with soft wraps, calm lighting, and the time it takes to settle.",
        cta_text: "Check Available Dates",
        image_source: "photo1",
        image_alt_text: "Newborn baby sleeping wrapped in a soft cream blanket during a photography session in Adelaide",
        seo_notes: "H1 leads with primary local keyword (newborn photographer + suburb), personality copy carried in the subheadline."
      },
      {
        section_name: "Studio intro",
        heading_tag: "h2",
        headline: "A Quiet Studio in Lightsview",
        subheadline: "",
        body_copy: "Falguni photographs newborns from five days old, working alongside her husband to keep sessions calm and unhurried. Parents return for second babies, first birthdays, and updated family portraits because the studio feels comfortable and easy.",
        cta_text: "Meet Falguni",
        seo_notes: "Reinforces the patience/unhurried value theme in plain language for both readers and crawlers."
      },
      {
        section_name: "Services overview",
        heading_tag: "h2",
        headline: "Sessions",
        subheadline: "Every package starts at $300.",
        body_copy: "Newborn, maternity, family, and cake smash sessions, tailored to the age and stage you want to capture.",
        cta_text: "View All Sessions",
        seo_notes: "Internal links out to each silo page for crawl distribution."
      },
      {
        section_name: "Testimonials",
        heading_tag: "h2",
        headline: "What Parents Say",
        subheadline: "5.0 stars across 60 Google reviews.",
        body_copy: "\"She is really very nice. Very cooperative and warm welcoming behaviour of her and family. Really recommend.\" - Harmandeep K.\n\n\"I am happy with experience of getting my 5 weeks baby photoshoot done by Falguni. She is excellent, amazing and wonderful.\" - Prabhjot G.\n\n\"Very professional and very calm, especially needed this kind of patience when it is newborns or month old baby's photoshoot.\" - Gurpreet S.",
        seo_notes: "Real, attributed reviews with no fabricated ratings or counts."
      },
      {
        section_name: "Closing CTA",
        heading_tag: "h2",
        headline: "Ready to Book",
        subheadline: "Newborn sessions book early, with the ideal window between 5 and 20 days old.",
        body_copy: "",
        cta_text: "Get in Touch"
      }
    ],
    faq_block: []
  },
  newborn: {
    name: "Newborn Photography",
    url: "/services/newborn-photography",
    purpose: "Convert expecting and new parents specifically searching for newborn photography.",
    meta_title: "Newborn Photography in Lightsview, Adelaide | Falguni's",
    meta_description: "Two-hour newborn sessions in a Lightsview home studio, timed to the 5-20 day window. Two wrap outfits, six edited photos, from $300.",
    sections: [
      {
        section_name: "Hero",
        heading_tag: "h1",
        headline: "Newborn Photography in Lightsview, Adelaide",
        subheadline: "Sessions timed for the first two weeks, when babies sleep deeply and curl up naturally.",
        body_copy: "Newborn sessions run for two hours in Falguni's Lightsview home studio. Two wrap outfits are provided, with plenty of time set aside for feeds, cuddles, and settling. The best window is five to twenty days old, though we always adjust to your baby's pace.",
        cta_text: "Book a Newborn Session",
        image_source: "photo2",
        image_alt_text: "Newborn baby curled up on a soft blanket during a gentle newborn photography session",
        seo_notes: "H1 keyword-first with suburb, matching local search intent for 'newborn photography Lightsview/Adelaide'."
      },
      {
        section_name: "What's included",
        heading_tag: "h2",
        headline: "What's Included",
        subheadline: "",
        body_copy: "A two-hour session includes six fully edited photos, two wrap outfit changes, and optional photos with parents. A deposit secures your date, and we adjust the timing if your baby arrives earlier or later than planned.",
        seo_notes: "Answers a common pre-booking question directly, supports FAQ schema."
      },
      {
        section_name: "Why parents choose this studio",
        heading_tag: "h2",
        headline: "Why Parents Choose This Studio",
        subheadline: "",
        body_copy: "\"She made him feel super comfortable. She even managed to capture some smiles from my little one.\" - Krima P.\n\n\"Falguni was patient, friendly, and made everyone feel comfortable throughout the session.\" - Priyanka D.",
        seo_notes: ""
      }
    ],
    faq_block: [
      {
        question: "When should I book my newborn photography session?",
        answer: "Book during your second or third trimester based on your due date. Newborn sessions work best between five and twenty days old. Booking early holds your spot on the studio calendar, and we confirm the exact day after baby arrives."
      },
      {
        question: "What if my baby is born early or late?",
        answer: "Falguni plans around your baby's actual arrival. Once your baby is born, message us with the birth date and Falguni will schedule your session within the five to twenty day window."
      },
      {
        question: "How much does a newborn session cost?",
        answer: "Newborn sessions start at $300 and include a two-hour studio visit, two wrap outfits, and six fully edited digital photos. A deposit is required to hold your date."
      }
    ]
  },
  maternity: {
    name: "Maternity Photography",
    url: "/services/maternity-photography",
    purpose: "Convert expecting parents searching for maternity photography.",
    meta_title: "Maternity Photography in Lightsview, Adelaide | Falguni's",
    meta_description: "Soft, unposed maternity photography in a Lightsview home studio. Sessions from $300, ideal between 28-34 weeks. Book your date today.",
    sections: [
      {
        section_name: "Hero",
        heading_tag: "h1",
        headline: "Maternity Photography in Lightsview, Adelaide",
        subheadline: "Simple portraits in the weeks before baby arrives.",
        body_copy: "Maternity sessions take place in the Lightsview studio using soft lighting and neutral backdrops that keep attention on you and your bump. Most parents book between 28 and 34 weeks, when the bump is full and moving around is still comfortable.",
        cta_text: "Book a Maternity Session",
        image_source: "photo3",
        image_alt_text: "Expecting mother photographed in soft natural light during a maternity photography session in Adelaide",
        seo_notes: "H1 keyword-first with suburb, matching 'maternity photographer Adelaide' intent."
      },
      {
        section_name: "What's included",
        heading_tag: "h2",
        headline: "What's Included",
        subheadline: "",
        body_copy: "Sessions start at $300 and run for approximately 90 minutes. We provide wardrobe advice beforehand so you know what to wear. Partners and older children are welcome to join for part of the session at no extra charge.",
        seo_notes: ""
      },
      {
        section_name: "Testimonials",
        heading_tag: "h2",
        headline: "What Parents Say",
        subheadline: "",
        body_copy: "\"It was wonderful experience... I really enjoyed my maternity shoot.\" - Veerpal K.\n\n\"We really enjoyed my wife's maternity shoot... we highly recommend your photography to everyone.\" - Arsh M.",
        seo_notes: ""
      }
    ],
    faq_block: [
      {
        question: "What's the best time in pregnancy for maternity photos?",
        answer: "Most parents book between 28 and 34 weeks, when your bump is nicely rounded and standing or sitting remains comfortable. An earlier week works well too if that suits your schedule."
      },
      {
        question: "Can my partner or other kids be in the photos?",
        answer: "Yes. Partners and children are welcome to join for part of the session. Falguni helps guide positioning so everyone looks natural together."
      }
    ]
  },
  family: {
    name: "Family Photography",
    url: "/services/family-photography",
    purpose: "Convert families searching for family or sitter photography.",
    meta_title: "Family Photographer in Lightsview, Adelaide | Falguni's",
    meta_description: "Relaxed family and sitter photography in a Lightsview home studio or nearby outdoor spot. Sessions from $300. Book your date today.",
    sections: [
      {
        section_name: "Hero",
        heading_tag: "h1",
        headline: "Family Photography in Lightsview, Adelaide",
        subheadline: "Natural portraits of your family, captured comfortably.",
        body_copy: "Family sessions run for about an hour in the studio or at a nearby outdoor park in Adelaide's north-east. Falguni gives children time to play and relax rather than demanding rigid poses. We also offer sitter sessions for babies around six to nine months who sit steadily on their own.",
        cta_text: "Book a Family Session",
        image_source: "photo4",
        image_alt_text: "Parents and young children photographed together during a relaxed family photography session",
        seo_notes: "H1 covers primary 'family photographer' intent; sitter session intent addressed in body copy for on-page relevance without a separate H1."
      },
      {
        section_name: "What's included",
        heading_tag: "h2",
        headline: "What's Included",
        subheadline: "",
        body_copy: "Sessions start at $300 for up to five family members, with a per-person add-on for extended groups. You will receive a gallery of fully edited digital images within two weeks.",
        seo_notes: ""
      },
      {
        section_name: "Testimonials",
        heading_tag: "h2",
        headline: "What Parents Say",
        subheadline: "",
        body_copy: "\"The way she worked with our kids was simply amazing, patient, kind, and creative, bringing out their genuine smiles.\" - Kuljeet S.\n\n\"Very happy with quality and the service!\" - Anwar",
        seo_notes: ""
      }
    ],
    faq_block: [
      {
        question: "My kids don't sit still for photos. Is that a problem?",
        answer: "No problem at all. Falguni photographs young children regularly and leaves extra time in the session. Play and natural movement are welcomed."
      },
      {
        question: "Do sessions happen indoors or outdoors?",
        answer: "Both options are available. The Lightsview studio works year-round in any weather. Outdoor sessions can be scheduled at a park in Adelaide's north-eastern suburbs if you prefer outdoor greenery."
      }
    ]
  },
  cakeSmash: {
    name: "Cake Smash Photography",
    url: "/services/cake-smash-photography",
    purpose: "Convert parents planning a first birthday cake smash session.",
    meta_title: "Cake Smash Photography in Lightsview, Adelaide | Falguni's",
    meta_description: "First birthday cake smash sessions in a Lightsview home studio, cleanup included. Sessions from $300. Book your date today.",
    sections: [
      {
        section_name: "Hero",
        heading_tag: "h1",
        headline: "Cake Smash Photography in Lightsview, Adelaide",
        subheadline: "A fun first birthday session with studio cleanup taken care of.",
        body_copy: "Cake smash sessions celebrate your little one turning one. Falguni sets up the backdrop and cleans up the frosting mess afterward. You bring the cake and the outfit.",
        cta_text: "Book a Cake Smash Session",
        image_source: "photo1",
        image_alt_text: "One-year-old baby smashing a birthday cake during a cake smash photography session",
        seo_notes: "H1 keyword-first with suburb, matching 'cake smash photographer Adelaide' intent."
      },
      {
        section_name: "What's included",
        heading_tag: "h2",
        headline: "What's Included",
        subheadline: "",
        body_copy: "Sessions start at $300 and last about 45 minutes, scheduled around your baby's nap times. A warm splash bath setup at the end is included so your baby leaves clean.",
        seo_notes: ""
      },
      {
        section_name: "Testimonial",
        heading_tag: "h2",
        headline: "What Parents Say",
        subheadline: "",
        body_copy: "\"Excellent service, I did my little one's first birthday photographs through her, she did amazing work.\" - Sanobiya V.",
        seo_notes: ""
      }
    ],
    faq_block: [
      {
        question: "How old should my baby be for a cake smash?",
        answer: "Most cake smash sessions take place around the first birthday, once babies sit comfortably and enjoy exploring food with their hands. A few weeks before or after the actual birthday date works well."
      },
      {
        question: "Do you provide the cake?",
        answer: "The studio setup, backdrop, and styling are included. You bring your baby's cake and outfit, and Falguni takes care of the session and cleanup."
      }
    ]
  },
  about: {
    name: "About",
    url: "/about",
    purpose: "Build trust and personal connection with Falguni before booking.",
    meta_title: "About Falguni's Photography | Lightsview, Adelaide",
    meta_description: "Meet Falguni, a Lightsview-based newborn and family photographer known for calm, unhurried sessions. Read her story and approach to photographing kids.",
    sections: [
      {
        section_name: "Hero",
        heading_tag: "h1",
        headline: "About Falguni's Photography",
        subheadline: "",
        body_copy: "Falguni started photographing newborns to give new parents a quiet, calm hour during those first few busy weeks. Her approach is straightforward: give babies time, follow their cues, and capture real expressions without forcing poses. Her husband assists with studio setup and lighting so every family feels looked after from the moment they arrive.",
        cta_text: "",
        image_source: "photo2",
        image_alt_text: "Falguni's Photography home studio setup in Lightsview, Adelaide",
        seo_notes: ""
      },
      {
        section_name: "How a session feels",
        heading_tag: "h2",
        headline: "How a Session Feels",
        subheadline: "",
        body_copy: "There is no rush here. Feeding breaks, diaper changes, and settling time are built into every session. Parents regularly mention how comfortable and relaxed their visit felt, which is exactly the goal.",
        cta_text: "Book a Session"
      }
    ],
    faq_block: []
  },
  gallery: {
    name: "Gallery",
    url: "/gallery",
    purpose: "Showcase real session photos to build visual trust before booking.",
    meta_title: "Photography Gallery | Falguni's Photography, Adelaide",
    meta_description: "Browse real newborn, maternity, family and cake smash photography sessions from Falguni's Photography's Lightsview studio in Adelaide.",
    sections: [
      {
        section_name: "Gallery intro",
        heading_tag: "h1",
        headline: "Newborn, Maternity & Family Photography Gallery",
        subheadline: "Photos from actual sessions in our Lightsview studio.",
        body_copy: "Every photograph shown here is from a client session in Adelaide. No stock photos.",
        seo_notes: "Single H1 governs the whole gallery; individual photos are presented as a grid beneath it rather than as separate headed sections, since they're variations of one gallery concept, not distinct topics."
      }
    ],
    faq_block: []
  },
  contact: {
    name: "Contact",
    url: "/contact",
    purpose: "Capture booking inquiries with session type and timeframe.",
    meta_title: "Book a Session | Falguni's Photography, Adelaide",
    meta_description: "Book newborn, maternity, family or cake smash photography in Lightsview, Adelaide. Sessions from $300. Send your details to check availability.",
    sections: [
      {
        section_name: "Hero",
        heading_tag: "h1",
        headline: "Book Your Session",
        subheadline: "Every session starts at $300. Send your details and Falguni will confirm the next available date.",
        body_copy: "Let us know your preferred session type and rough timeframe, such as your due date for newborns or your ideal month for family portraits. Falguni will reply within 24 hours with available dates.",
        cta_text: "Send Booking Request",
        image_source: "photo3",
        image_alt_text: "Expecting mother photographed in soft natural light during a maternity photography session in Adelaide",
        seo_notes: ""
      }
    ],
    faq_block: [
      {
        question: "How do I secure my date?",
        answer: "A deposit locks in your session date once we agree on a time. Details are provided after your initial inquiry so you know exactly what to expect before paying anything."
      },
      {
        question: "What areas do you service?",
        answer: "The studio is based in Lightsview, within Adelaide's northern suburbs, and serves Northfield and the surrounding north-eastern Adelaide suburbs. Outdoor sessions can be scheduled at nearby parks by request."
      }
    ]
  }
};
