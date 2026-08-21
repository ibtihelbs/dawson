// ============================================================
// DAWSON – Complete Sanity Schema (v2)
// Includes: SEO object, image-with-alt, services, projects,
// testimonials, benefits, process steps, FAQs, site settings, pages
// ============================================================

// ---------------------
// 1. SEO Object (reusable)
// ---------------------
const seo = {
  name: 'seo',
  title: 'SEO & Metadata',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title displayed in search results (50–60 characters recommended).',
      validation: (Rule) => Rule.max(60).warning('Longer titles may be truncated.'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Short summary for search results (150–160 characters recommended).',
      rows: 2,
      validation: (Rule) =>
        Rule.max(160).warning('Descriptions longer than 160 characters may be truncated.'),
    },
    {
      name: 'metaKeywords',
      title: 'Internal Tags (not used by Google)',
      type: 'array',
      of: [{type: 'string'}],
      description:
        'Optional internal tagging only — meta keywords are ignored by modern search engines.',
      options: {layout: 'tags'},
    },
    {
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      description: 'Title for social sharing (if different from meta title).',
    },
    {
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      description: 'Description for social sharing (if different from meta description).',
      rows: 2,
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'imageWithAlt',
      description:
        "Recommended size: 1200×630px. If left empty, falls back to the page's main image.",
    },
    {
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          {title: 'Summary', value: 'summary'},
          {title: 'Summary Large Image', value: 'summary_large_image'},
        ],
      },
      initialValue: 'summary_large_image',
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'If this page has duplicates, set the canonical URL.',
    },
  ],
}

// ---------------------
// 2. Image With Alt (reusable — every image on the site should carry alt text)
// ---------------------
const imageWithAlt = {
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description:
        'Describe the image for accessibility and SEO (e.g. "Paved backyard entertaining area in Subiaco").',
      validation: (Rule) =>
        Rule.required().warning('Alt text is important for accessibility and image SEO.'),
    },
  ],
}

// ---------------------
// 3. Service
// ---------------------
const service = {
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'imageWithAlt',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      group: 'content',
      description: 'Brief summary for cards and listings.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Full Description (Rich Text)',
      type: 'array',
      group: 'content',
      of: [
        {type: 'block'},
        {type: 'image'},
        {
          type: 'object',
          name: 'callout',
          fields: [{name: 'text', type: 'text'}],
        },
      ],
      description: 'Detailed service information with formatting, images, and callouts.',
    },
    {
      name: 'icon',
      title: 'Icon (optional)',
      type: 'image',
      group: 'content',
      description: 'Small icon for listing views (e.g., SVG or simple icon).',
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seo',
      group: 'seo',
    },
    {
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      description: 'Lower numbers display first.',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}

// ---------------------
// 4. Project
// ---------------------
const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'suburb',
      title: 'Suburb',
      type: 'string',
      group: 'content',
      description:
        'Where the project took place (e.g. "Subiaco"). Powers local SEO and location filtering.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'beforeImage',
      title: 'Before Image',
      type: 'imageWithAlt',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'afterImage',
      title: 'After Image',
      type: 'imageWithAlt',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'beforeDescription',
      title: 'Before Description',
      type: 'text',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'afterDescription',
      title: 'After Description',
      type: 'text',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Additional Images',
      type: 'array',
      group: 'content',
      of: [{type: 'imageWithAlt'}],
      description: 'Optional: add more images of the project.',
    },
    {
      name: 'body',
      title: 'Full Project Story (Rich Text)',
      type: 'array',
      group: 'content',
      of: [{type: 'block'}, {type: 'image'}],
      description: 'Optional detailed write-up.',
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seo',
      group: 'seo',
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    },
    {
      name: 'completedDate',
      title: 'Completion Date',
      type: 'date',
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'suburb',
      media: 'afterImage',
    },
  },
}

// ---------------------
// 5. Testimonial
// ---------------------
const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'suburb',
      title: 'Suburb',
      type: 'string',
      group: 'content',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      group: 'content',
      validation: (Rule) => Rule.required().min(1).max(5),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'imageWithAlt',
      group: 'content',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      group: 'content',
      description: 'Optional — helps signal freshness to visitors.',
    },
    {
      name: 'relatedProject',
      title: 'Related Project (optional)',
      type: 'reference',
      to: [{type: 'project'}],
      group: 'content',
      description: 'Link this testimonial to the project it refers to, if applicable.',
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seo',
      group: 'seo',
      description: 'Optional: Override default SEO for this testimonial page.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'suburb',
      media: 'avatar',
    },
  },
}

// ---------------------
// 6. Benefit
// ---------------------
const benefit = {
  name: 'benefit',
  title: 'Benefit',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon (optional)',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'content',
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seo',
      group: 'seo',
      description: 'Optional: Override default SEO for this benefit page.',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'icon',
    },
  },
}

// ---------------------
// 7. Process Step ("From Initial Concept to Handover" section)
// ---------------------
const processStep = {
  name: 'processStep',
  title: 'Process Step',
  type: 'document',
  fields: [
    {
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      description: 'Displayed as "01", "02", etc. Also controls sort order.',
      validation: (Rule) => Rule.required().integer().positive(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
  ],
  orderings: [
    {
      title: 'Step Number',
      name: 'stepNumberAsc',
      by: [{field: 'stepNumber', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'stepNumber',
    },
    prepare({title, subtitle}) {
      return {
        title: `${subtitle ?? '–'}. ${title}`,
      }
    },
  },
}

// ---------------------
// 8. FAQ
// ---------------------
const faq = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{type: 'block'}],
      description:
        'Rich text so answers can include links or formatting. Powers FAQPage schema markup.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Pricing & Quotes', value: 'pricing'},
          {title: 'Process & Timeline', value: 'process'},
          {title: 'Services', value: 'services'},
          {title: 'General', value: 'general'},
        ],
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers display first.',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
}

// ---------------------
// 9. Site Settings
// ---------------------
const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'business', title: 'Business Info'},
    {name: 'contact', title: 'Contact'},
    {name: 'social', title: 'Social Media'},
    {name: 'globalSeo', title: 'Global SEO'},
  ],
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle (optional)',
      type: 'text',
      group: 'hero',
      rows: 2,
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      group: 'hero',
      rows: 3,
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'imageWithAlt',
      group: 'hero',
    },

    // --- Business identity & structured-data fields (LocalBusiness schema) ---
    {
      name: 'businessName',
      title: 'Legal / Display Business Name',
      type: 'string',
      group: 'business',
      description: 'Used in LocalBusiness structured data.',
    },
    {
      name: 'businessDescription',
      title: 'Business Description',
      type: 'text',
      group: 'business',
      rows: 3,
      description: 'Used as the "description" field in structured data.',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'imageWithAlt',
      group: 'business',
    },
    {
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      group: 'business',
      description: 'e.g. "$$" — shown in some search results and used in structured data.',
    },
    {
      name: 'geo',
      title: 'Map Location',
      type: 'geopoint',
      group: 'business',
      description: 'Used for LocalBusiness geo coordinates and the map embed.',
    },
    {
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      group: 'business',
      of: [{type: 'string'}],
      description: 'One entry per line, schema.org format, e.g. "Mo-Sa 07:00-17:00".',
    },
    {
      name: 'serviceAreas',
      title: 'Service Areas (Suburbs)',
      type: 'array',
      group: 'business',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Powers the footer list and the "areaServed" structured data field.',
    },

    // --- Contact ---
    {
      name: 'contactPhone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'contactEmail',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'address',
      title: 'Physical Address',
      type: 'text',
      group: 'contact',
    },

    // --- Social ---
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Pinterest', value: 'pinterest'},
                ],
              },
            },
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    },

    // --- Global SEO fallback ---
    {
      name: 'seo',
      title: 'Default SEO Metadata',
      type: 'seo',
      group: 'globalSeo',
      description: 'These settings are used as fallback for pages that do not override them.',
    },
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
  },
}

// ---------------------
// 10. Page (optional modular page builder — consider deferring past launch)
// ---------------------
const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'heroBlock',
          fields: [{name: 'text', type: 'text'}],
        },
        {
          type: 'object',
          name: 'featuresBlock',
          fields: [
            {
              name: 'items',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'benefit'}]}],
            },
          ],
        },
        {
          type: 'object',
          name: 'testimonialsBlock',
          fields: [
            {
              name: 'testimonials',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'testimonial'}]}],
            },
          ],
        },
        {
          type: 'object',
          name: 'servicesBlock',
          fields: [
            {
              name: 'services',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'service'}]}],
            },
          ],
        },
        {
          type: 'object',
          name: 'projectsBlock',
          fields: [
            {
              name: 'projects',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'project'}]}],
            },
          ],
        },
        {
          type: 'object',
          name: 'processBlock',
          fields: [
            {
              name: 'steps',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'processStep'}]}],
            },
          ],
        },
        {
          type: 'object',
          name: 'faqBlock',
          fields: [
            {
              name: 'faqs',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'faq'}]}],
            },
          ],
        },
        {
          type: 'object',
          name: 'ctaBlock',
          fields: [
            {name: 'text', type: 'text'},
            {name: 'buttonText', type: 'string'},
            {name: 'buttonLink', type: 'url'},
          ],
        },
        {
          type: 'object',
          name: 'textBlock',
          fields: [
            {
              name: 'content',
              type: 'array',
              of: [{type: 'block'}],
            },
          ],
        },
      ],
      description: 'Build your page by adding and arranging sections.',
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seo',
      group: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}

// ---------------------
// EXPORT ALL SCHEMAS
// ---------------------
export const schemaTypes = [
  // Reusable object types must be registered too
  seo,
  imageWithAlt,

  // Document types
  service,
  project,
  testimonial,
  benefit,
  processStep,
  faq,
  siteSettings,
  page, // optional – remove or keep as a post-launch stretch goal
]

// If you are using a single default export, uncomment below:
// export default schemaTypes
