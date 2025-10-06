import { DATE_FORMAT } from './dateTimeUtils';

const defaultName = 'document';

export const descriptions = {
    // documents and singletons
    analytics:      () => `A tracking script used for website analytics, if applicable.`,
    content:        (name = defaultName) => `The body content of this ${name}.`,
    date:           (name = defaultName) => `The date associated with this ${name}, primarily used for sorting and display.`,
    document:       (nameWithArticle: string) => `A ${defaultName} representing ${nameWithArticle}.`,
    featuredItems:  () => `Pages to highlight as featured content.`,
    keywords:       (name = defaultName) => `Descriptive keywords for this ${name}, used for search engine optimisation. Type a keyword and press Enter to add it.`,
    location:       (name = 'event') => `The venue or place where this ${name} takes place.`,
    logo:           () => `The logo used across this website. Required format: SVG.`,
    mainImage:      (name = defaultName, refersToWebsite = false) => `The main visual representation of this ${name}${refersToWebsite ? '' : ' on the website and'} in social media previews. ${refersToWebsite ? 'Recommended dimensions: 1200×630px (1.91:1 aspect ratio). Recommended format: PNG (non-transparent).' : `Use the crop/hotspot tool (found in the field's upper-right corner) to ensure the image works well across multiple aspect ratios.`}`,
    slug:           (name = defaultName) => `URL-friendly identifiers used to generate web pages for this ${name}. Changing a slug after publishing a document may break shared links.`,
    startDateTime:  (name = 'event') => `The local date and time when this ${name} takes place, used for sorting, display, and generating a downloadable calendar entry. Required date format: ${DATE_FORMAT}. Required time format: HH:mm (24-hour time).`,
    summary:        (name = defaultName) => `Brief text snippets that introduce this ${name} in search engine results and social media previews.`,
    title:          (name = defaultName) => `The title(s) of this ${name}, used in listings, previews, and webpage headers.`,
    // form
    formReferenceName:  () => `A name used to identify this form internally in Sanity Studio. Will not be shown on the website or anywhere else.`,
    formEndpoint:       () => `The URL where this form should be submitted. Without a valid endpoint, submissions will not be received. Refer to the specifications set by your form handling service of choice (e.g., Web3Forms) for information on how to correctly set up the form endpoint.`,
    formFields:         () => `The set of fields that make up this form.`,
    formAttributes:     () => `Additional HTML attributes to apply to this form.`,
    formFieldType:      () => `The type of input used for this field.`,
    formFieldLabel:     () => `The visible label shown for this field.`,
    formFieldOptions:   () => `The list of selectable options available for this field.`,
    formFieldName:      () => `The unique identifier for this field.`,
    formFieldValue:     () => `The predefined value for this field.`,
    // link
    linkType:           () => `Specifies whether this link points to an internal page or to an external one.`,
    linkInternalTarget: () => `The internal page this link points to.`,
    linkExternalTarget: () => `The URL of the external page this link points to.`,
    // page builder
    pageBuilderCaption:             (name = 'media') => `Text that appears below the ${name}.`,
    pageBuilderImages:              () => `One or more images to display together in a visual block.`,
    pageBuilderImageAltText:        () => `A short description of the image, used by screen readers and search engines.`,
    pageBuilderVideoUrl:            () => `A link to a video (YouTube or Vimeo) to embed on the page.`,
    pageBuilderVideoAspectRatio:    () => `The width-to-height ratio of the video. Default value: 16:9.`,
    pageBuilderAudioFile:           () => `An audio file to embed on the page.`,
    pageBuilderForm:                () => `A form to display on the page.`,
    // counter-map
    submissionForm:         () => `The form used to collect submissions for this counter-map. Ensure that the form endpoint is correctly set up.`,
    mapAsset:               () => `The base image used as the interactive asset for this counter-map. Required format: SVG.`,
    mapMarkers:             () => `Markers that appear on the interactive map, each linked to a specific initiative. Coordinates are expressed as percentages relative to the image's dimensions.`,
    mapMarkerX:             () => `The X-position of this marker. 0% corresponds to the map's left edge; 100% to its right.`,
    mapMarkerY:             () => `The Y-position of this marker. 0% corresponds to the map's top edge; 100% to its bottom.`,
    mapMarkerInitiative:    () => `The initiative associated with this marker.`,
};