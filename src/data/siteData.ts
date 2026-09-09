import { PageData } from '../types';

export const STUDIO_INFO = {
  name: "Falguni's Photography",
  tagline: "Unhurried newborn, maternity, family and cake smash photography in Lightsview, Adelaide",
  address: "26 South Pkwy, Northfield SA 5085, Australia",
  phone: "+61 469 753 238",
  phoneDisplay: "+61 469 753 238",
  hours: "Open daily, 9 AM – 6 PM",
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
        headline: "Newborn & Family Photography in Lightsview, Adelaide",
        subheadline: "Unhurried sessions built around your baby's schedule, not a studio clock.",
        body_copy: "Falguni's Photography is a home studio in Lightsview specialising in newborn, maternity, family and cake smash sessions. Every shoot moves at your baby's pace, with warm light, soft wraps and the patience it takes to catch a real smile.",
        cta_text: "Check Available Dates",
        image_source: "photo1",
        image_alt_text: "Newborn baby sleeping wrapped in a soft cream blanket during a photography session in Adelaide",
        seo_notes: "H1 leads with primary local keyword (newborn photographer + suburb), personality copy carried in the subheadline."
      },
      {
        section_name: "Studio intro",
        heading_tag: "h2",
        headline: "A Studio Built on Patience",
        subheadline: "",
        body_copy: "Falguni has spent years photographing newborns as young as five days old, working alongside her husband to keep every session calm and unrushed. Parents come back for the second baby, the first birthday, the whole family — because the experience feels like visiting family, not sitting through a shoot.",
        cta_text: "Meet Falguni",
        seo_notes: "Reinforces the patience/unhurried value theme in plain language for both readers and crawlers."
      },
      {
        section_name: "Services overview",
        heading_tag: "h2",
        headline: "Sessions",
        subheadline: "Every package starts at $300.",
        body_copy: "Newborn, maternity, family and cake smash sessions, each tailored to the age and stage you're capturing.",
        cta_text: "View All Sessions",
        seo_notes: "Internal links out to each silo page for crawl distribution."
      },
      {
        section_name: "Testimonials",
        heading_tag: "h2",
        headline: "What Parents Say",
        subheadline: "5.0 stars across 60 Google reviews.",
        body_copy: "\"She is really very nice. Very cooperative and warm welcoming behaviour of her and family. Really recommend.\" — Harmandeep K.\n\n\"I am happy with experience of getting my 5 weeks baby photoshoot done by Falguni. She is excellent, amazing and wonderful.\" — Prabhjot G.\n\n\"Very professional and very calm, especially needed this kind of patience when it is newborns or month old baby's photoshoot.\" — Gurpreet S.",
        seo_notes: "Real, attributed reviews — no fabricated ratings or counts."
      },
      {
        section_name: "Closing CTA",
        heading_tag: "h2",
        headline: "Ready to Book",
        subheadline: "Newborn sessions book fastest — the sweet spot is 5 to 20 days old.",
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
        subheadline: "Sessions timed for the first two weeks, when babies sleep deepest and curl up smallest.",
        body_copy: "Newborn sessions run two hours in Falguni's Lightsview home studio, with two wrap outfits included and time built in for feeding and settling breaks. The best window is five to twenty days old, though every session moves around your baby, not the clock.",
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
        body_copy: "A two-hour session includes six fully edited photos, two wrap outfit changes, and optional shots with mum or dad. A non-refundable deposit secures your date, since newborn slots are limited to a narrow window around your due date.",
        seo_notes: "Answers a common pre-booking question directly, supports FAQ schema."
      },
      {
        section_name: "Why parents choose this studio",
        heading_tag: "h2",
        headline: "Why Parents Choose This Studio",
        subheadline: "",
        body_copy: "\"She made him feel super comfortable. She even managed to capture some smiles from my little one.\" — Krima P.\n\n\"Falguni was patient, friendly, and made everyone feel comfortable throughout the session.\" — Priyanka D.",
        seo_notes: ""
      }
    ],
    faq_block: [
      {
        question: "When should I book my newborn photography session?",
        answer: "Book as soon as you know your due date, ideally in your third trimester. Newborn sessions work best between five and twenty days old, and that window fills quickly, so early booking protects your spot even if the exact date shifts with your delivery."
      },
      {
        question: "What if my baby is born early or late?",
        answer: "Falguni works around your baby's actual arrival, not a fixed calendar date. Once your baby is born, message with the birth date and she'll help you find the closest available slot inside the five-to-twenty-day window."
      },
      {
        question: "How much does a newborn session cost?",
        answer: "Newborn sessions start at $300 and include a two-hour studio visit, two wrap outfit changes, and six fully edited photos. A non-refundable deposit is required to hold your date."
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
        subheadline: "Soft, unposed portraits for the last weeks before baby arrives.",
        body_copy: "Maternity sessions are shot in the same warm home studio, with wraps and simple backdrops that keep attention on you and the bump rather than props. Most parents book between 28 and 34 weeks, when the bump is full but travel is still comfortable.",
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
        body_copy: "Sessions start at $300 and run around 90 minutes, with wardrobe guidance provided beforehand so you know exactly what to bring. Partners and older siblings are welcome to join for part of the shoot at no extra cost.",
        seo_notes: ""
      },
      {
        section_name: "Testimonials",
        heading_tag: "h2",
        headline: "What Parents Say",
        subheadline: "",
        body_copy: "\"It was wonderful experience... I really enjoyed my maternity shoot.\" — Veerpal K.\n\n\"We really enjoyed my wife's maternity shoot... we highly recommend your photography to everyone.\" — Arsh M.",
        seo_notes: ""
      }
    ],
    faq_block: [
      {
        question: "What's the best time in pregnancy for maternity photos?",
        answer: "Most parents book between 28 and 34 weeks, when the bump is at its fullest but standing and moving around the studio is still comfortable. Earlier is fine too if that works better for your schedule."
      },
      {
        question: "Can my partner or other kids be in the photos?",
        answer: "Yes. Partners and siblings are welcome to join for part of the session, and Falguni will guide posing so everyone looks natural together, not stiff or staged."
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
        subheadline: "Relaxed portraits that actually look like your family, not a stock photo.",
        body_copy: "Family sessions run about an hour in studio or at a nearby outdoor spot in Adelaide's north-east, built around real interaction rather than stiff lineups. Falguni works especially well with young kids, using patience over posing to get genuine expressions. Family sessions also cover sitter sessions for babies around six to nine months who are steady enough to sit up on their own — same relaxed, patient approach, just scaled to a smaller subject.",
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
        body_copy: "Sessions start at $300 for up to five people, with a small per-person add-on for larger families. You'll receive a set of fully edited photos within two weeks of your session.",
        seo_notes: ""
      },
      {
        section_name: "Testimonials",
        heading_tag: "h2",
        headline: "What Parents Say",
        subheadline: "",
        body_copy: "\"The way she worked with our kids was simply amazing — patient, kind, and creative, bringing out their genuine smiles.\" — Kuljeet S.\n\n\"Very happy with quality and the service!\" — Anwar.",
        seo_notes: ""
      }
    ],
    faq_block: [
      {
        question: "My kids don't sit still for photos. Is that a problem?",
        answer: "No. Falguni photographs young children regularly and builds extra time into every session for that exact reason. Play and movement are part of the process, not something to avoid."
      },
      {
        question: "Do sessions happen indoors or outdoors?",
        answer: "Both are available. The Lightsview studio works year-round regardless of weather, and outdoor sessions can be arranged at a nearby park or location in Adelaide's north-east if you'd prefer natural surroundings."
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
        subheadline: "A messy, joyful first birthday session, cleanup included.",
        body_copy: "Cake smash sessions are built for one-year-olds who are ready to get their hands, and everything else, into a cake. Falguni supplies the backdrop and setup, and the studio cleanup is handled after — you just bring the outfit and the birthday energy.",
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
        body_copy: "Sessions start at $300 and run about 45 minutes, timed around your baby's nap schedule when possible. A simple bath setup can be added at the end so you're not driving home covered in frosting.",
        seo_notes: ""
      },
      {
        section_name: "Testimonial",
        heading_tag: "h2",
        headline: "What Parents Say",
        subheadline: "",
        body_copy: "\"Excellent service, I did my little one's first birthday photographs through her, she did amazing work.\" — Sanobiya V.",
        seo_notes: ""
      }
    ],
    faq_block: [
      {
        question: "How old should my baby be for a cake smash?",
        answer: "Most cake smash sessions happen right around the first birthday, once babies are sitting confidently and can grab and explore on their own. A few weeks before or after the birthday date works fine."
      },
      {
        question: "Do you provide the cake?",
        answer: "The studio setup, backdrop and styling are included. Bring your baby's cake and outfit, and Falguni will handle the rest, including a quick clean-up option afterward."
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
        body_copy: "Falguni started photographing newborns because she wanted new parents to have one calm hour in the middle of a chaotic first few weeks. Years and dozens of five-star reviews later, that's still the whole approach: slow down, let the baby set the pace, and capture what's actually happening instead of forcing a pose. She works alongside her husband, who handles setup and support so every session runs smoothly from the moment you walk in.",
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
        body_copy: "There's no rushing here. Feeding breaks, fussy moments and slow warm-ups are expected, not a problem to work around. Parents consistently mention how comfortable and unhurried their session felt — that's by design, not luck.",
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
        subheadline: "A look at real sessions from the Lightsview studio.",
        body_copy: "Every photo below is from an actual client session — no stock images, no filler.",
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
        subheadline: "Every session starts at $300. Send a few details and Falguni will confirm the next available date.",
        body_copy: "Fill in the form with your session type and rough timeframe — due date for newborns and maternity, or your preferred week for family and cake smash — and you'll hear back within a day or two with available dates and next steps.",
        cta_text: "Send Booking Request",
        image_source: "photo3",
        image_alt_text: "Expecting mother photographed in soft natural light during a maternity photography session in Adelaide",
        seo_notes: ""
      }
    ],
    faq_block: [
      {
        question: "How do I secure my date?",
        answer: "A non-refundable deposit locks in your session date once you've agreed on a time. Details are sent after your initial message so you know exactly what to expect before paying anything."
      },
      {
        question: "What areas do you service?",
        answer: "The studio is based in Lightsview, within Adelaide's northern suburbs, and covers Northfield and the surrounding north-east Adelaide area. Outdoor sessions can be arranged a little further out by request."
      }
    ]
  }
};
