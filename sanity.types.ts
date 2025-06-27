export type PageBuilder = Array<
  | BodyPortableTextBlock
  | {
      images?: Array<{
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        media?: unknown
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        altText?: string
        _type: 'image'
        _key: string
      }>
      caption?: AuxiliaryPortableText
      _type: 'imageBlock'
      _key: string
    }
  | {
      url?: string
      aspectRatio?: string
      caption?: AuxiliaryPortableText
      _type: 'videoEmbedBlock'
      _key: string
    }
  | {
      file?: {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.fileAsset'
        }
        media?: unknown
        _type: 'file'
      }
      caption?: AuxiliaryPortableText
      _type: 'audioBlock'
      _key: string
    }
  | {
      form?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'form'
      }
      _type: 'formBlock'
      _key: string
    }
>

export type Language = 'ar' | 'en'

export type BodyPortableText = Array<{
  children?: Array<{
    marks?: Array<string>
    text?: string
    _type: 'span'
    _key: string
  }>
  style?: 'normal' | 'heading' | 'blockquote'
  listItem?: 'bullet' | 'number'
  markDefs?: Array<{
    type?: 'external' | 'internal'
    internalTarget?:
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'happening'
        }
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'project'
        }
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'resource'
        }
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'writing'
        }
    externalTarget?: string
    _type: 'link'
    _key: string
  }>
  level?: number
  _type: 'block'
  _key: string
}>

export type BodyPortableTextBlock = BodyPortableText[number]

export type AuxiliaryPortableText = Array<{
  children?: Array<{
    marks?: Array<string>
    text?: string
    _type: 'span'
    _key: string
  }>
  style?: 'normal'
  listItem?: never
  markDefs?: Array<{
    type?: 'external' | 'internal'
    internalTarget?:
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'happening'
        }
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'project'
        }
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'resource'
        }
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'writing'
        }
    externalTarget?: string
    _type: 'link'
    _key: string
  }>
  level?: number
  _type: 'block'
  _key: string
}>

export type LocalisedSlug = {
  _type: 'localisedSlug'
  ar?: Slug
  en?: Slug
}

export type Link = {
  _type: 'link'
  type?: 'external' | 'internal'
  internalTarget?:
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'happening'
      }
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'project'
      }
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'resource'
      }
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'writing'
      }
  externalTarget?: string
}

export type Website = {
  _id: string
  _type: 'website'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: LocalisedString
  summary?: LocalisedText
  keywords?: Array<string>
  logo?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  mainImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  analytics?: string
}

export type HomePage = {
  _id: string
  _type: 'homePage'
  _createdAt: string
  _updatedAt: string
  _rev: string
  featuredItems?: Array<
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'happening'
      }
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'project'
      }
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'resource'
      }
    | {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'writing'
      }
  >
}

export type AboutPage = {
  _id: string
  _type: 'aboutPage'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: LocalisedString
  slug?: {
    ar?: Slug
    en?: Slug
  }
  content?: {
    ar?: BodyPortableText
    en?: BodyPortableText
  }
}

export type TranslationGroup = {
  _id: string
  _type: 'translationGroup'
  _createdAt: string
  _updatedAt: string
  _rev: string
  type?: 'project' | 'writing'
  translations?: {
    ar?:
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'project'
        }
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'writing'
        }
    en?:
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'project'
        }
      | {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'writing'
        }
  }
}

export type Happening = {
  _id: string
  _type: 'happening'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: LocalisedString
  slug?: {
    ar?: Slug
    en?: Slug
  }
  startDate?: string
  startTime?: {
    hours?: string
    minutes?: string
  }
  timezone?:
    | 'America/Nuuk'
    | 'Atlantic/Cape_Verde'
    | 'America/Miquelon'
    | 'America/Noronha'
    | 'Atlantic/South_Georgia'
    | 'America/Argentina/Buenos_Aires'
    | 'America/Cayenne'
    | 'America/Halifax'
    | 'America/Montevideo'
    | 'America/Paramaribo'
    | 'America/Punta_Arenas'
    | 'America/Sao_Paulo'
    | 'America/Thule'
    | 'Antarctica/Palmer'
    | 'Atlantic/Bermuda'
    | 'Atlantic/Stanley'
    | 'America/St_Johns'
    | 'America/Anguilla'
    | 'America/Antigua'
    | 'America/Aruba'
    | 'America/Asuncion'
    | 'America/Barbados'
    | 'America/Blanc-Sablon'
    | 'America/Caracas'
    | 'America/Curacao'
    | 'America/Dominica'
    | 'America/Grand_Turk'
    | 'America/Grenada'
    | 'America/Guadeloupe'
    | 'America/Guyana'
    | 'America/Havana'
    | 'America/Kralendijk'
    | 'America/La_Paz'
    | 'America/Lower_Princes'
    | 'America/Manaus'
    | 'America/Marigot'
    | 'America/Martinique'
    | 'America/Montserrat'
    | 'America/Nassau'
    | 'America/New_York'
    | 'America/Port_of_Spain'
    | 'America/Port-au-Prince'
    | 'America/Puerto_Rico'
    | 'America/Santiago'
    | 'America/Santo_Domingo'
    | 'America/St_Barthelemy'
    | 'America/St_Kitts'
    | 'America/St_Lucia'
    | 'America/St_Thomas'
    | 'America/St_Vincent'
    | 'America/Toronto'
    | 'America/Tortola'
    | 'America/Atikokan'
    | 'America/Bogota'
    | 'America/Cancun'
    | 'America/Cayman'
    | 'America/Chicago'
    | 'America/Guayaquil'
    | 'America/Jamaica'
    | 'America/Lima'
    | 'America/Matamoros'
    | 'America/Panama'
    | 'America/Rio_Branco'
    | 'America/Winnipeg'
    | 'America/Belize'
    | 'America/Ciudad_Juarez'
    | 'America/Costa_Rica'
    | 'America/Denver'
    | 'America/Edmonton'
    | 'America/El_Salvador'
    | 'America/Guatemala'
    | 'America/Managua'
    | 'America/Mexico_City'
    | 'America/Regina'
    | 'America/Tegucigalpa'
    | 'Pacific/Easter'
    | 'Pacific/Galapagos'
    | 'America/Hermosillo'
    | 'America/Los_Angeles'
    | 'America/Phoenix'
    | 'America/Tijuana'
    | 'America/Vancouver'
    | 'America/Whitehorse'
    | 'America/Anchorage'
    | 'Pacific/Pitcairn'
    | 'America/Adak'
    | 'Pacific/Gambier'
    | 'Pacific/Honolulu'
    | 'Pacific/Rarotonga'
    | 'Pacific/Tahiti'
    | 'Pacific/Marquesas'
    | 'Pacific/Midway'
    | 'Pacific/Niue'
    | 'Pacific/Pago_Pago'
    | 'Africa/Abidjan'
    | 'Africa/Accra'
    | 'Africa/Bamako'
    | 'Africa/Banjul'
    | 'Africa/Bissau'
    | 'Africa/Conakry'
    | 'Africa/Dakar'
    | 'Africa/Freetown'
    | 'Africa/Lome'
    | 'Africa/Monrovia'
    | 'Africa/Nouakchott'
    | 'Africa/Ouagadougou'
    | 'Africa/Sao_Tome'
    | 'America/Danmarkshavn'
    | 'Atlantic/Azores'
    | 'Atlantic/Reykjavik'
    | 'Atlantic/St_Helena'
    | 'Africa/Algiers'
    | 'Africa/Bangui'
    | 'Africa/Brazzaville'
    | 'Africa/Casablanca'
    | 'Africa/Douala'
    | 'Africa/El_Aaiun'
    | 'Africa/Kinshasa'
    | 'Africa/Lagos'
    | 'Africa/Libreville'
    | 'Africa/Luanda'
    | 'Africa/Malabo'
    | 'Africa/Ndjamena'
    | 'Africa/Niamey'
    | 'Africa/Porto-Novo'
    | 'Africa/Tunis'
    | 'Atlantic/Canary'
    | 'Atlantic/Faroe'
    | 'Europe/Dublin'
    | 'Europe/Guernsey'
    | 'Europe/Isle_of_Man'
    | 'Europe/Jersey'
    | 'Europe/Lisbon'
    | 'Europe/London'
    | 'Africa/Blantyre'
    | 'Africa/Bujumbura'
    | 'Africa/Gaborone'
    | 'Africa/Harare'
    | 'Africa/Johannesburg'
    | 'Africa/Juba'
    | 'Africa/Khartoum'
    | 'Africa/Kigali'
    | 'Africa/Lubumbashi'
    | 'Africa/Lusaka'
    | 'Africa/Maputo'
    | 'Africa/Maseru'
    | 'Africa/Mbabane'
    | 'Africa/Tripoli'
    | 'Africa/Windhoek'
    | 'Antarctica/Troll'
    | 'Arctic/Longyearbyen'
    | 'Europe/Amsterdam'
    | 'Europe/Andorra'
    | 'Europe/Belgrade'
    | 'Europe/Berlin'
    | 'Europe/Bratislava'
    | 'Europe/Brussels'
    | 'Europe/Budapest'
    | 'Europe/Copenhagen'
    | 'Europe/Gibraltar'
    | 'Europe/Kaliningrad'
    | 'Europe/Ljubljana'
    | 'Europe/Luxembourg'
    | 'Europe/Madrid'
    | 'Europe/Malta'
    | 'Europe/Monaco'
    | 'Europe/Oslo'
    | 'Europe/Paris'
    | 'Europe/Podgorica'
    | 'Europe/Prague'
    | 'Europe/Rome'
    | 'Europe/San_Marino'
    | 'Europe/Sarajevo'
    | 'Europe/Skopje'
    | 'Europe/Stockholm'
    | 'Europe/Tirane'
    | 'Europe/Vaduz'
    | 'Europe/Vatican'
    | 'Europe/Vienna'
    | 'Europe/Warsaw'
    | 'Europe/Zagreb'
    | 'Europe/Zurich'
    | 'Africa/Addis_Ababa'
    | 'Africa/Asmara'
    | 'Africa/Cairo'
    | 'Africa/Dar_es_Salaam'
    | 'Africa/Djibouti'
    | 'Africa/Kampala'
    | 'Africa/Mogadishu'
    | 'Africa/Nairobi'
    | 'Antarctica/Syowa'
    | 'Asia/Aden'
    | 'Asia/Amman'
    | 'Asia/Baghdad'
    | 'Asia/Bahrain'
    | 'Asia/Beirut'
    | 'Asia/Damascus'
    | 'Asia/Hebron'
    | 'Asia/Jerusalem'
    | 'Asia/Kuwait'
    | 'Asia/Nicosia'
    | 'Asia/Qatar'
    | 'Asia/Riyadh'
    | 'Europe/Athens'
    | 'Europe/Bucharest'
    | 'Europe/Chisinau'
    | 'Europe/Helsinki'
    | 'Europe/Istanbul'
    | 'Europe/Kyiv'
    | 'Europe/Mariehamn'
    | 'Europe/Minsk'
    | 'Europe/Moscow'
    | 'Europe/Riga'
    | 'Europe/Simferopol'
    | 'Europe/Sofia'
    | 'Europe/Tallinn'
    | 'Europe/Vilnius'
    | 'Indian/Antananarivo'
    | 'Indian/Comoro'
    | 'Indian/Mayotte'
    | 'Asia/Tehran'
    | 'Asia/Baku'
    | 'Asia/Dubai'
    | 'Asia/Muscat'
    | 'Asia/Tbilisi'
    | 'Asia/Yerevan'
    | 'Europe/Samara'
    | 'Indian/Mahe'
    | 'Indian/Mauritius'
    | 'Indian/Reunion'
    | 'Asia/Kabul'
    | 'Antarctica/Mawson'
    | 'Asia/Almaty'
    | 'Asia/Ashgabat'
    | 'Asia/Dushanbe'
    | 'Asia/Karachi'
    | 'Asia/Tashkent'
    | 'Asia/Yekaterinburg'
    | 'Indian/Kerguelen'
    | 'Indian/Maldives'
    | 'Asia/Colombo'
    | 'Asia/Kolkata'
    | 'Asia/Kathmandu'
    | 'Asia/Bishkek'
    | 'Asia/Dhaka'
    | 'Asia/Omsk'
    | 'Asia/Thimphu'
    | 'Asia/Urumqi'
    | 'Indian/Chagos'
    | 'Asia/Yangon'
    | 'Indian/Cocos'
    | 'Antarctica/Davis'
    | 'Asia/Bangkok'
    | 'Asia/Ho_Chi_Minh'
    | 'Asia/Hovd'
    | 'Asia/Jakarta'
    | 'Asia/Novosibirsk'
    | 'Asia/Phnom_Penh'
    | 'Asia/Vientiane'
    | 'Indian/Christmas'
    | 'Antarctica/Casey'
    | 'Asia/Brunei'
    | 'Asia/Hong_Kong'
    | 'Asia/Irkutsk'
    | 'Asia/Kuala_Lumpur'
    | 'Asia/Macau'
    | 'Asia/Makassar'
    | 'Asia/Manila'
    | 'Asia/Shanghai'
    | 'Asia/Singapore'
    | 'Asia/Taipei'
    | 'Asia/Ulaanbaatar'
    | 'Australia/Perth'
    | 'Australia/Eucla'
    | 'Asia/Chita'
    | 'Asia/Dili'
    | 'Asia/Jayapura'
    | 'Asia/Pyongyang'
    | 'Asia/Seoul'
    | 'Asia/Tokyo'
    | 'Pacific/Palau'
    | 'Australia/Adelaide'
    | 'Australia/Darwin'
    | 'Antarctica/DumontDUrville'
    | 'Asia/Vladivostok'
    | 'Australia/Brisbane'
    | 'Australia/Sydney'
    | 'Pacific/Chuuk'
    | 'Pacific/Guam'
    | 'Pacific/Port_Moresby'
    | 'Pacific/Saipan'
    | 'Australia/Lord_Howe'
    | 'Asia/Sakhalin'
    | 'Pacific/Bougainville'
    | 'Pacific/Efate'
    | 'Pacific/Guadalcanal'
    | 'Pacific/Kosrae'
    | 'Pacific/Norfolk'
    | 'Pacific/Noumea'
    | 'Antarctica/McMurdo'
    | 'Asia/Kamchatka'
    | 'Pacific/Auckland'
    | 'Pacific/Fiji'
    | 'Pacific/Funafuti'
    | 'Pacific/Majuro'
    | 'Pacific/Nauru'
    | 'Pacific/Tarawa'
    | 'Pacific/Wake'
    | 'Pacific/Wallis'
    | 'Pacific/Chatham'
    | 'Pacific/Apia'
    | 'Pacific/Fakaofo'
    | 'Pacific/Kanton'
    | 'Pacific/Tongatapu'
    | 'Pacific/Kiritimati'
  location?: LocalisedString
  summary?: LocalisedText
  mainImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  content?: {
    ar?: BodyPortableText
    en?: BodyPortableText
  }
}

export type Project = {
  _id: string
  _type: 'project'
  _createdAt: string
  _updatedAt: string
  _rev: string
  language?: Language
  title?: string
  slug?: Slug
  date?: string
  summary?: string
  mainImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  content?: BodyPortableText
}

export type Resource = {
  _id: string
  _type: 'resource'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: LocalisedString
  slug?: {
    ar?: Slug
    en?: Slug
  }
  date?: string
  summary?: LocalisedText
  mainImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  content?: {
    ar?: BodyPortableText
    en?: BodyPortableText
  }
}

export type Writing = {
  _id: string
  _type: 'writing'
  _createdAt: string
  _updatedAt: string
  _rev: string
  language?: Language
  title?: string
  slug?: Slug
  date?: string
  summary?: string
  mainImage?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  content?: BodyPortableText
}

export type LocalisedText = {
  _type: 'localisedText'
  ar?: string
  en?: string
}

export type Form = {
  _id: string
  _type: 'form'
  _createdAt: string
  _updatedAt: string
  _rev: string
  referenceName?: string
  endpoint?: string
  fields?: Array<{
    type?: 'text' | 'textarea' | 'select' | 'checkbox' | 'hidden'
    name?: string
    label?: LocalisedString
    options?: Array<string>
    value?: string
    _key: string
  }>
  attributes?: Array<string>
}

export type LocalisedString = {
  _type: 'localisedString'
  ar?: string
  en?: string
}

export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  height?: number
  width?: number
  aspectRatio?: number
}

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot'
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageCrop = {
  _type: 'sanity.imageCrop'
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityFileAsset = {
  _id: string
  _type: 'sanity.fileAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type SanityImageAsset = {
  _id: string
  _type: 'sanity.imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata'
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type Geopoint = {
  _type: 'geopoint'
  lat?: number
  lng?: number
  alt?: number
}

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData'
  name?: string
  id?: string
  url?: string
}

export type AllSanitySchemaTypes =
  | PageBuilder
  | Language
  | BodyPortableText
  | AuxiliaryPortableText
  | LocalisedSlug
  | Link
  | Website
  | HomePage
  | AboutPage
  | TranslationGroup
  | Happening
  | Project
  | Resource
  | Writing
  | LocalisedText
  | Form
  | LocalisedString
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityImageHotspot
  | SanityImageCrop
  | SanityFileAsset
  | SanityImageAsset
  | SanityImageMetadata
  | Geopoint
  | Slug
  | SanityAssetSourceData
export declare const internalGroqTypeReferenceTo: unique symbol
