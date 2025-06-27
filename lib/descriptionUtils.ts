import { DATE_FORMAT } from './dateTimeUtils';

const defaultName = 'document';

export const descriptions = {
    // documents and singletons
    analytics:      () => `A tracking script used for website analytics, if applicable.`,
    content:        (isMonolingual: boolean, name = defaultName) => `The body content of this ${name}.`,
    date:           (name = defaultName) => `The date associated with this ${name}, primarily used for sorting and display.`,
    document:       (nameWithArticle: string) => `A ${defaultName} representing ${nameWithArticle}.`,
    featuredItems:  () => `Pages to highlight as featured content.`,
    keywords:       (name = defaultName) => `Descriptive keywords for this ${name}, used for search engine optimisation. Type a keyword and press Enter to add it.`,
    language:       () => `The language of this ${defaultName}, used for organisation and other key functions. This value cannot be changed once set.`,
    location:       (name = 'event') => `The venue or place where this ${name} takes place.`,
    logo:           () => `The logo used across this website. Required format: SVG.`,
    mainImage:      (name = defaultName, refersToWebsite = false) => `The main visual representation of this ${name}${refersToWebsite ? '' : ' on the website and'} in social media previews. ${refersToWebsite ? 'Recommended dimensions: 1200×630px (1.91:1 aspect ratio). Recommended format: PNG (non-transparent).' : `Use the crop/hotspot tool (found in the field's upper-right corner) to ensure the image works well across multiple aspect ratios.`}`,
    slug:           (isMonolingual: boolean, name = defaultName) => `${isMonolingual ? 'A URL-friendly identifier' : 'URL-friendly identifiers'} used to generate a web page for this ${name}. Without a slug, this ${name} will not appear on the website. Changing ${isMonolingual ? 'the' : 'a'} slug after publication may break shared links.`,
    startDateTime:  (name = 'event') => `The local date and time when this ${name} takes place, used for sorting, display, and generating a downloadable calendar entry. Required date format: ${DATE_FORMAT}. Required time format: HH:mm (24-hour time).`,
    summary:        (isMonolingual: boolean, name = defaultName) => `${isMonolingual ? 'A brief text snippet that introduces' : 'Brief text snippets that introduce'} this ${name} in search engine results and social media previews.`,
    title:          (isMonolingual: boolean, name = defaultName) => `The title of this ${name}, used in listings, previews, and webpage headers.`,
    translations:   () => ``,
    // objects and modules
    // form
        formReferenceName:  () => `A name used to identify this form internally. Will not be shown on the website.`,
        formEndpoint:                   () => `The URL where this form should be submitted. Without a valid endpoint, submissions will not be received.`,
        formFields:                     () => `The set of fields that make up this form.`,
        formAttributes:                 () => `Additional HTML attributes to apply to this form.`,
        formFieldType:                  () => `The type of input used for this field.`,
        formFieldName:                  () => `The name used to identify this field when the form is submitted. Without a name, this field's data will not be included in the submission.`,
        formFieldLabel:                 () => `The visible label shown for this field.`,
        formFieldOptions:               () => `The list of selectable options available for this field.`,
        formFieldValue:                 () => `The predefined value for this field.`,
        // link
        linkType:                       () => `Specifies whether this link points to an internal page or to an external one.`,
        linkInternalTarget:             () => `The internal page this link points to.`,
        linkExternalTarget:             () => `The URL of the external page this link points to.`,
        // page builder
        pageBuilderCaption:             (name = 'media') => `Text that appears below the ${name}.`,
        pageBuilderImages:              () => `One or more images to display together in a visual block.`,
        pageBuilderImageAltText:        () => `A short description of the image, used by screen readers and search engines.`,
        pageBuilderVideoUrl:            () => `A link to a video (YouTube or Vimeo) to embed on the page.`,
        pageBuilderVideoAspectRatio:    () => `The width-to-height ratio of the video. Default value: 16:9.`,
        pageBuilderAudioFile:           () => `An audio file to embed on the page.`,
        pageBuilderForm:                () => `A form to display on the page.`,
};