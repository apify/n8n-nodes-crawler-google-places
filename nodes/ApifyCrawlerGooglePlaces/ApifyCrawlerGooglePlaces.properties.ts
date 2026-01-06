import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		// 🔍 Search term(s) (searchStringsArray)
		...((() => {
			const searchStringsArray = context.getNodeParameter('searchStringsArray', itemIndex, {}) as { values?: { value: string }[] };
			return searchStringsArray?.values?.length ? { searchStringsArray: searchStringsArray.values.map(e => e.value) } : {};
		})()),
		// 📍 Location (use only one location per run) (locationQuery)
		...((() => {
			const value = context.getNodeParameter('locationQuery', itemIndex);
			return (value !== undefined && value !== null && value !== '') ? { locationQuery: value } : {};
		})()),
		// 💯 Number of places to extract (per each search term or URL) (maxCrawledPlacesPerSearch)
		maxCrawledPlacesPerSearch: context.getNodeParameter('maxCrawledPlacesPerSearch', itemIndex),
		// 🌍 Language (language)
		language: context.getNodeParameter('language', itemIndex),
		// 🎢 Place categories ($) (categoryFilterWords)
		categoryFilterWords: context.getNodeParameter('categoryFilterWords', itemIndex),
		// Get exact name matches (no similar results)($) (searchMatching)
		searchMatching: context.getNodeParameter('searchMatching', itemIndex),
		// Set a minimum star rating ($) (placeMinimumStars)
		placeMinimumStars: context.getNodeParameter('placeMinimumStars', itemIndex),
		// Scrape places with/without a website($) (website)
		website: context.getNodeParameter('website', itemIndex),
		// ⏩ Skip closed places ($) (skipClosedPlaces)
		skipClosedPlaces: context.getNodeParameter('skipClosedPlaces', itemIndex),
		// Scrape place detail page ($) (scrapePlaceDetailPage)
		scrapePlaceDetailPage: context.getNodeParameter('scrapePlaceDetailPage', itemIndex),
		// Scrape table reservation provider data ($) (scrapeTableReservationProvider)
		scrapeTableReservationProvider: context.getNodeParameter('scrapeTableReservationProvider', itemIndex),
		// 🌐 Include "Web results" ($) (includeWebResults)
		includeWebResults: context.getNodeParameter('includeWebResults', itemIndex),
		// 🛍 Scrape inside places (e.g. malls or shopping center) ($) (scrapeDirectories)
		scrapeDirectories: context.getNodeParameter('scrapeDirectories', itemIndex),
		// Number of questions to extract ($) (maxQuestions)
		maxQuestions: context.getNodeParameter('maxQuestions', itemIndex),
		// ⏩ Add-on: Company contacts enrichment (from website) (scrapeContacts)
		scrapeContacts: context.getNodeParameter('scrapeContacts', itemIndex),
		// 🔍 Add-on: Social media profile enrichment (scrapeSocialMediaProfiles)
		...((() => {
			try {
				const rawValue = context.getNodeParameter("scrapeSocialMediaProfiles", itemIndex);
				if (typeof rawValue === "string" && rawValue.trim() === "") {
					return { scrapeSocialMediaProfiles: undefined };
				}
				return { scrapeSocialMediaProfiles: typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue };
			} catch (error) {
				throw new Error(`Invalid JSON in parameter "scrapeSocialMediaProfiles": ${(error as Error).message}`);
			}
		})()),
		// ⏩ Add-on: Extract business leads information - Maximum leads per place (maximumLeadsEnrichmentRecords)
		maximumLeadsEnrichmentRecords: context.getNodeParameter('maximumLeadsEnrichmentRecords', itemIndex),
		// Leads departments selection (leadsEnrichmentDepartments)
		leadsEnrichmentDepartments: context.getNodeParameter('leadsEnrichmentDepartments', itemIndex),
		// Number of reviews to extract ($) (maxReviews)
		maxReviews: context.getNodeParameter('maxReviews', itemIndex),
		// Extract only reviews posted after [date] (reviewsStartDate)
		...((() => {
			const value = context.getNodeParameter('reviewsStartDate', itemIndex);
			return (value !== undefined && value !== null && value !== '') ? { reviewsStartDate: value } : {};
		})()),
		// Sort reviews by (reviewsSort)
		reviewsSort: context.getNodeParameter('reviewsSort', itemIndex),
		// Filter reviews by keywords (reviewsFilterString)
		...((() => {
			const value = context.getNodeParameter('reviewsFilterString', itemIndex);
			return (value !== undefined && value !== null && value !== '') ? { reviewsFilterString: value } : {};
		})()),
		// Reviews origin (reviewsOrigin)
		reviewsOrigin: context.getNodeParameter('reviewsOrigin', itemIndex),
		// 🧛‍♂️ Include reviewers' data (scrapeReviewsPersonalData)
		scrapeReviewsPersonalData: context.getNodeParameter('scrapeReviewsPersonalData', itemIndex),
		// Number of additional images to extract ($) (maxImages)
		maxImages: context.getNodeParameter('maxImages', itemIndex),
		// 🧑‍🎨 Include the image authors (scrapeImageAuthors)
		scrapeImageAuthors: context.getNodeParameter('scrapeImageAuthors', itemIndex),
		// 🗺 Country (countryCode)
		countryCode: context.getNodeParameter('countryCode', itemIndex),
		// 🌇 City (city)
		...((() => {
			const value = context.getNodeParameter('city', itemIndex);
			return (value !== undefined && value !== null && value !== '') ? { city: value } : {};
		})()),
		// State (state)
		...((() => {
			const value = context.getNodeParameter('state', itemIndex);
			return (value !== undefined && value !== null && value !== '') ? { state: value } : {};
		})()),
		// County (county)
		...((() => {
			const value = context.getNodeParameter('county', itemIndex);
			return (value !== undefined && value !== null && value !== '') ? { county: value } : {};
		})()),
		// Postal code (postalCode)
		...((() => {
			const value = context.getNodeParameter('postalCode', itemIndex);
			return (value !== undefined && value !== null && value !== '') ? { postalCode: value } : {};
		})()),
		// 🛰 Custom search area (coordinate order must be: [↕ longitude, ↔ latitude]) (customGeolocation)
		...((() => {
			try {
				const rawValue = context.getNodeParameter("customGeolocation", itemIndex);
				if (typeof rawValue === "string" && rawValue.trim() === "") {
					return { customGeolocation: undefined };
				}
				return { customGeolocation: typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue };
			} catch (error) {
				throw new Error(`Invalid JSON in parameter "customGeolocation": ${(error as Error).message}`);
			}
		})()),
		// Google Maps URLs (startUrls)
		...((() => {
			const startUrls = context.getNodeParameter('startUrls', itemIndex, {}) as { items?: { value: string }[] };
			return startUrls?.items?.length ? { startUrls: startUrls.items.map(e => e.value) } : {};
		})()),
		// 🗃 Place IDs (placeIds)
		...((() => {
			const placeIds = context.getNodeParameter('placeIds', itemIndex, {}) as { values?: { value: string }[] };
			return placeIds?.values?.length ? { placeIds: placeIds.values.map(e => e.value) } : {};
		})()),
		// Scrape all places (allPlacesNoSearchAction)
		allPlacesNoSearchAction: context.getNodeParameter('allPlacesNoSearchAction', itemIndex),
	};
}

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const actorProperties: INodeProperties[] = [
  {
    "displayName": "🔍 Search term(s)",
    "name": "searchStringsArray",
    "description": "Type what you’d normally search for in the Google Maps search bar, like <b>English breakfast</b> or <b>pet shelter</b>. Aim for unique terms for faster processing. Using similar terms (e.g., <b>bar</b> vs. <b>restaurant</b> vs. <b>cafe</b>) may slightly increase your capture rate but is less efficient.<br><br> ⚠️ Heads up: Adding a location directly to the search, e.g., <b>restaurant Pittsburgh</b>, can limit you to a maximum of 120 results per search term due to <a href='https://blog.apify.com/google-places-api-limits/#%E2%9B%94-what-are-google-maps-limitations-for-scraping'>Google Maps' scrolling limit</a>.<br><br> You can also use direct place IDs here in the format <code>place_id:ChIJ8_JBApXMDUcRDzXcYUPTGUY</code>. See the [detailed description](https://apify.com/compass/crawler-google-places#search-terms).",
    "required": false,
    "default": {},
    "type": "fixedCollection",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "values",
        "displayName": "Values",
        "values": [
          {
            "displayName": "Value",
            "name": "value",
            "type": "string",
            "default": ""
          }
        ]
      }
    ]
  },
  {
    "displayName": "📍 Location (use only one location per run)",
    "name": "locationQuery",
    "description": "Define location using free text. Simpler formats work best; e.g., use City + Country rather than City + Country + State. Verify with the <a href='https://nominatim.openstreetmap.org/ui/search.html'>OpenStreetMap webapp</a> for visual validation of the exact area you want to cover. <br><br>⚠️ Automatically defined City polygons may be smaller than expected (e.g., they don't include agglomeration areas). If you need to define the whole city area, head over to the 📡 <b>Geolocation parameters*</b> section instead to select Country, State, County, City, or Postal code.<br>For an even more precise location definition (especially when using City name as a starting point), head over to <b>🛰 Custom search area</b> section to create polygon shapes of the areas you want to scrape. Note that 📍 <b>Location</b> settings always take priority over <b>📡 Geolocation*</b> (so use either section but not both at the same time). <br><br>For guidance and tricks on location definition, check <a href='https://blog.apify.com/google-places-api-limits/#2-choose-the-location-using-regular-toponomy%F0%9F%93%8D'>our tutorial</a>.",
    "required": false,
    "default": "New York, USA",
    "type": "string"
  },
  {
    "displayName": "💯 Number of places to extract (per each search term or URL)",
    "name": "maxCrawledPlacesPerSearch",
    "description": "Number of results you expect to get per each Search term, Category or URL. The higher the number, the longer it will take. <br><br>If you want to scrape all the places available, <b>leave this field empty</b> or use this section <b>🧭 Scrape all places on the map*</b>.",
    "required": false,
    "default": 0,
    "type": "number",
    "typeOptions": {
      "minValue": 1
    }
  },
  {
    "displayName": "🌍 Language",
    "name": "language",
    "description": "Results details will show in this language.",
    "required": false,
    "default": "en",
    "type": "options",
    "options": [
      {
        "name": "English",
        "value": "en"
      },
      {
        "name": "Afrikaans",
        "value": "af"
      },
      {
        "name": "azərbaycan",
        "value": "az"
      },
      {
        "name": "BahasaIndonesia",
        "value": "id"
      },
      {
        "name": "BahasaMelayu",
        "value": "ms"
      },
      {
        "name": "bosanski",
        "value": "bs"
      },
      {
        "name": "català",
        "value": "ca"
      },
      {
        "name": "Čeština",
        "value": "cs"
      },
      {
        "name": "Dansk",
        "value": "da"
      },
      {
        "name": "Deutsch (Deutschland)",
        "value": "de"
      },
      {
        "name": "eesti",
        "value": "et"
      },
      {
        "name": "Español (España)",
        "value": "es"
      },
      {
        "name": "Español (Latinoamérica)",
        "value": "es-419"
      },
      {
        "name": "euskara",
        "value": "eu"
      },
      {
        "name": "Filipino",
        "value": "fil"
      },
      {
        "name": "Français (France)",
        "value": "fr"
      },
      {
        "name": "galego",
        "value": "gl"
      },
      {
        "name": "Hrvatski",
        "value": "hr"
      },
      {
        "name": "isiZulu",
        "value": "zu"
      },
      {
        "name": "íslenska",
        "value": "is"
      },
      {
        "name": "Italiano",
        "value": "it"
      },
      {
        "name": "Kiswahili",
        "value": "sw"
      },
      {
        "name": "latviešu",
        "value": "lv"
      },
      {
        "name": "lietuvių",
        "value": "lt"
      },
      {
        "name": "magyar",
        "value": "hu"
      },
      {
        "name": "Nederlands",
        "value": "nl"
      },
      {
        "name": "norsk",
        "value": "no"
      },
      {
        "name": "oʻzbekcha",
        "value": "uz"
      },
      {
        "name": "polski",
        "value": "pl"
      },
      {
        "name": "Português (Brasil)",
        "value": "pt-BR"
      },
      {
        "name": "Português (Portugal)",
        "value": "pt-PT"
      },
      {
        "name": "română",
        "value": "ro"
      },
      {
        "name": "shqip",
        "value": "sq"
      },
      {
        "name": "Slovenčina",
        "value": "sk"
      },
      {
        "name": "slovenščina",
        "value": "sl"
      },
      {
        "name": "Suomi",
        "value": "fi"
      },
      {
        "name": "Svenska",
        "value": "sv"
      },
      {
        "name": "TiếngViệt",
        "value": "vi"
      },
      {
        "name": "Türkçe",
        "value": "tr"
      },
      {
        "name": "Ελληνικά",
        "value": "el"
      },
      {
        "name": "български",
        "value": "bg"
      },
      {
        "name": "кыргызча",
        "value": "ky"
      },
      {
        "name": "қазақтілі",
        "value": "kk"
      },
      {
        "name": "македонски",
        "value": "mk"
      },
      {
        "name": "монгол",
        "value": "mn"
      },
      {
        "name": "Русский",
        "value": "ru"
      },
      {
        "name": "српски (ћирилица)",
        "value": "sr"
      },
      {
        "name": "Українська",
        "value": "uk"
      },
      {
        "name": "ქართული",
        "value": "ka"
      },
      {
        "name": "հայերեն",
        "value": "hy"
      },
      {
        "name": "עברית",
        "value": "iw"
      },
      {
        "name": "اردو",
        "value": "ur"
      },
      {
        "name": "العربية",
        "value": "ar"
      },
      {
        "name": "فارسی",
        "value": "fa"
      },
      {
        "name": "አማርኛ",
        "value": "am"
      },
      {
        "name": "नेपाली",
        "value": "ne"
      },
      {
        "name": "हिन्दी",
        "value": "hi"
      },
      {
        "name": "मराठी",
        "value": "mr"
      },
      {
        "name": "বাংলা",
        "value": "bn"
      },
      {
        "name": "ਪੰਜਾਬੀ",
        "value": "pa"
      },
      {
        "name": "ગુજરાતી",
        "value": "gu"
      },
      {
        "name": "தமிழ்",
        "value": "ta"
      },
      {
        "name": "తెలుగు",
        "value": "te"
      },
      {
        "name": "ಕನ್ನಡ",
        "value": "kn"
      },
      {
        "name": "മലയാളം",
        "value": "ml"
      },
      {
        "name": "සිංහල",
        "value": "si"
      },
      {
        "name": "ไทย",
        "value": "th"
      },
      {
        "name": "ລາວ",
        "value": "lo"
      },
      {
        "name": "ဗမာ",
        "value": "my"
      },
      {
        "name": "ខ្មែរ",
        "value": "km"
      },
      {
        "name": "한국어",
        "value": "ko"
      },
      {
        "name": "日本語",
        "value": "ja"
      },
      {
        "name": "简体中文",
        "value": "zh-CN"
      },
      {
        "name": "繁體中文",
        "value": "zh-TW"
      }
    ]
  },
  {
    "displayName": "🎢 Place categories ($)",
    "name": "categoryFilterWords",
    "description": "You can limit the places that are scraped based on the Category filter; you can choose as many categories for one flat fee for the whole field. ⚠️ Using categories can sometimes lead to false negatives, as many places do not properly categorize themselves, and there are over <a href='https://api.apify.com/v2/key-value-stores/epxZwNRgmnzzBpNJd/records/categories'> 4,000</a> available categories which Google Maps has. Using categories might filter out places that you’d like to scrape. To avoid this problem, you must list all categories that you want to scrape, including synonyms, e.g., divorce lawyer, divorce attorney, divorce service, etc. See the [detailed description](https://apify.com/compass/crawler-google-places#categories).",
    "required": false,
    "default": [],
    "type": "multiOptions",
    "options": [
      {
        "name": "abbey",
        "value": "abbey"
      },
      {
        "name": "accountant",
        "value": "accountant"
      },
      {
        "name": "accounting",
        "value": "accounting"
      },
      {
        "name": "acupuncturist",
        "value": "acupuncturist"
      },
      {
        "name": "aeroclub",
        "value": "aeroclub"
      },
      {
        "name": "agriculture",
        "value": "agriculture"
      },
      {
        "name": "airline",
        "value": "airline"
      },
      {
        "name": "airport",
        "value": "airport"
      },
      {
        "name": "airstrip",
        "value": "airstrip"
      },
      {
        "name": "allergist",
        "value": "allergist"
      },
      {
        "name": "amphitheater",
        "value": "amphitheater"
      },
      {
        "name": "amphitheatre",
        "value": "amphitheatre"
      },
      {
        "name": "anesthesiologist",
        "value": "anesthesiologist"
      },
      {
        "name": "appraiser",
        "value": "appraiser"
      },
      {
        "name": "aquarium",
        "value": "aquarium"
      },
      {
        "name": "arboretum",
        "value": "arboretum"
      },
      {
        "name": "architect",
        "value": "architect"
      },
      {
        "name": "archive",
        "value": "archive"
      },
      {
        "name": "arena",
        "value": "arena"
      },
      {
        "name": "artist",
        "value": "artist"
      },
      {
        "name": "ashram",
        "value": "ashram"
      },
      {
        "name": "astrologer",
        "value": "astrologer"
      },
      {
        "name": "atm",
        "value": "atm"
      },
      {
        "name": "attorney",
        "value": "attorney"
      },
      {
        "name": "audiologist",
        "value": "audiologist"
      },
      {
        "name": "auditor",
        "value": "auditor"
      },
      {
        "name": "auditorium",
        "value": "auditorium"
      },
      {
        "name": "bakery",
        "value": "bakery"
      },
      {
        "name": "band",
        "value": "band"
      },
      {
        "name": "bank",
        "value": "bank"
      },
      {
        "name": "bar",
        "value": "bar"
      },
      {
        "name": "barrister",
        "value": "barrister"
      },
      {
        "name": "basilica",
        "value": "basilica"
      },
      {
        "name": "bazar",
        "value": "bazar"
      },
      {
        "name": "beach",
        "value": "beach"
      },
      {
        "name": "beautician",
        "value": "beautician"
      },
      {
        "name": "bistro",
        "value": "bistro"
      },
      {
        "name": "blacksmith",
        "value": "blacksmith"
      },
      {
        "name": "bodega",
        "value": "bodega"
      },
      {
        "name": "bookbinder",
        "value": "bookbinder"
      },
      {
        "name": "botanica",
        "value": "botanica"
      },
      {
        "name": "boutique",
        "value": "boutique"
      },
      {
        "name": "brasserie",
        "value": "brasserie"
      },
      {
        "name": "brewery",
        "value": "brewery"
      },
      {
        "name": "brewpub",
        "value": "brewpub"
      },
      {
        "name": "bricklayer",
        "value": "bricklayer"
      },
      {
        "name": "bridge",
        "value": "bridge"
      },
      {
        "name": "builder",
        "value": "builder"
      },
      {
        "name": "building",
        "value": "building"
      },
      {
        "name": "bullring",
        "value": "bullring"
      },
      {
        "name": "butchers",
        "value": "butchers"
      },
      {
        "name": "cafe",
        "value": "cafe"
      },
      {
        "name": "cafeteria",
        "value": "cafeteria"
      },
      {
        "name": "campground",
        "value": "campground"
      },
      {
        "name": "cannery",
        "value": "cannery"
      },
      {
        "name": "cardiologist",
        "value": "cardiologist"
      },
      {
        "name": "carpenter",
        "value": "carpenter"
      },
      {
        "name": "cars",
        "value": "cars"
      },
      {
        "name": "carvery",
        "value": "carvery"
      },
      {
        "name": "cashpoint",
        "value": "cashpoint"
      },
      {
        "name": "casino",
        "value": "casino"
      },
      {
        "name": "castle",
        "value": "castle"
      },
      {
        "name": "caterer",
        "value": "caterer"
      },
      {
        "name": "catering",
        "value": "catering"
      },
      {
        "name": "cathedral",
        "value": "cathedral"
      },
      {
        "name": "cattery",
        "value": "cattery"
      },
      {
        "name": "cemetery",
        "value": "cemetery"
      },
      {
        "name": "chalet",
        "value": "chalet"
      },
      {
        "name": "chapel",
        "value": "chapel"
      },
      {
        "name": "charcuterie",
        "value": "charcuterie"
      },
      {
        "name": "charity",
        "value": "charity"
      },
      {
        "name": "chemist",
        "value": "chemist"
      },
      {
        "name": "childminder",
        "value": "childminder"
      },
      {
        "name": "chiropractor",
        "value": "chiropractor"
      },
      {
        "name": "choir",
        "value": "choir"
      },
      {
        "name": "church",
        "value": "church"
      },
      {
        "name": "churreria",
        "value": "churreria"
      },
      {
        "name": "circus",
        "value": "circus"
      },
      {
        "name": "cleaners",
        "value": "cleaners"
      },
      {
        "name": "clergyman",
        "value": "clergyman"
      },
      {
        "name": "clinic",
        "value": "clinic"
      },
      {
        "name": "club",
        "value": "club"
      },
      {
        "name": "coalfield",
        "value": "coalfield"
      },
      {
        "name": "college",
        "value": "college"
      },
      {
        "name": "company",
        "value": "company"
      },
      {
        "name": "computers",
        "value": "computers"
      },
      {
        "name": "congregation",
        "value": "congregation"
      },
      {
        "name": "construction",
        "value": "construction"
      },
      {
        "name": "consultant",
        "value": "consultant"
      },
      {
        "name": "contractor",
        "value": "contractor"
      },
      {
        "name": "conveyancer",
        "value": "conveyancer"
      },
      {
        "name": "coppersmith",
        "value": "coppersmith"
      },
      {
        "name": "cottage",
        "value": "cottage"
      },
      {
        "name": "council",
        "value": "council"
      },
      {
        "name": "counselor",
        "value": "counselor"
      },
      {
        "name": "courthouse",
        "value": "courthouse"
      },
      {
        "name": "creperie",
        "value": "creperie"
      },
      {
        "name": "dairy",
        "value": "dairy"
      },
      {
        "name": "deli",
        "value": "deli"
      },
      {
        "name": "delicatessen",
        "value": "delicatessen"
      },
      {
        "name": "dentist",
        "value": "dentist"
      },
      {
        "name": "dermatologist",
        "value": "dermatologist"
      },
      {
        "name": "design",
        "value": "design"
      },
      {
        "name": "dhaba",
        "value": "dhaba"
      },
      {
        "name": "diabetologist",
        "value": "diabetologist"
      },
      {
        "name": "dietitian",
        "value": "dietitian"
      },
      {
        "name": "diner",
        "value": "diner"
      },
      {
        "name": "distillery",
        "value": "distillery"
      },
      {
        "name": "dj",
        "value": "dj"
      },
      {
        "name": "doctor",
        "value": "doctor"
      },
      {
        "name": "doula",
        "value": "doula"
      },
      {
        "name": "dressmaker",
        "value": "dressmaker"
      },
      {
        "name": "dyeworks",
        "value": "dyeworks"
      },
      {
        "name": "eatery",
        "value": "eatery"
      },
      {
        "name": "education",
        "value": "education"
      },
      {
        "name": "electrician",
        "value": "electrician"
      },
      {
        "name": "electronics",
        "value": "electronics"
      },
      {
        "name": "embassy",
        "value": "embassy"
      },
      {
        "name": "endocrinologist",
        "value": "endocrinologist"
      },
      {
        "name": "endodontist",
        "value": "endodontist"
      },
      {
        "name": "endoscopist",
        "value": "endoscopist"
      },
      {
        "name": "engineer",
        "value": "engineer"
      },
      {
        "name": "engraver",
        "value": "engraver"
      },
      {
        "name": "entertainer",
        "value": "entertainer"
      },
      {
        "name": "entertainment",
        "value": "entertainment"
      },
      {
        "name": "establishment",
        "value": "establishment"
      },
      {
        "name": "executor",
        "value": "executor"
      },
      {
        "name": "exhibit",
        "value": "exhibit"
      },
      {
        "name": "exporter",
        "value": "exporter"
      },
      {
        "name": "fairground",
        "value": "fairground"
      },
      {
        "name": "farm",
        "value": "farm"
      },
      {
        "name": "farmstay",
        "value": "farmstay"
      },
      {
        "name": "favela",
        "value": "favela"
      },
      {
        "name": "festival",
        "value": "festival"
      },
      {
        "name": "florist",
        "value": "florist"
      },
      {
        "name": "fortress",
        "value": "fortress"
      },
      {
        "name": "foundation",
        "value": "foundation"
      },
      {
        "name": "foundry",
        "value": "foundry"
      },
      {
        "name": "frituur",
        "value": "frituur"
      },
      {
        "name": "garden",
        "value": "garden"
      },
      {
        "name": "gardener",
        "value": "gardener"
      },
      {
        "name": "gasfitter",
        "value": "gasfitter"
      },
      {
        "name": "gastroenterologist",
        "value": "gastroenterologist"
      },
      {
        "name": "gastropub",
        "value": "gastropub"
      },
      {
        "name": "gemologist",
        "value": "gemologist"
      },
      {
        "name": "genealogist",
        "value": "genealogist"
      },
      {
        "name": "geriatrician",
        "value": "geriatrician"
      },
      {
        "name": "glazier",
        "value": "glazier"
      },
      {
        "name": "goldsmith",
        "value": "goldsmith"
      },
      {
        "name": "government",
        "value": "government"
      },
      {
        "name": "greengrocer",
        "value": "greengrocer"
      },
      {
        "name": "greenhouse",
        "value": "greenhouse"
      },
      {
        "name": "grill",
        "value": "grill"
      },
      {
        "name": "gurudwara",
        "value": "gurudwara"
      },
      {
        "name": "gym",
        "value": "gym"
      },
      {
        "name": "gynecologist",
        "value": "gynecologist"
      },
      {
        "name": "haberdashery",
        "value": "haberdashery"
      },
      {
        "name": "hairdresser",
        "value": "hairdresser"
      },
      {
        "name": "hammam",
        "value": "hammam"
      },
      {
        "name": "handicraft",
        "value": "handicraft"
      },
      {
        "name": "handyman/handywoman/handyperson",
        "value": "handyman/handywoman/handyperson"
      },
      {
        "name": "health",
        "value": "health"
      },
      {
        "name": "heliport",
        "value": "heliport"
      },
      {
        "name": "hematologist",
        "value": "hematologist"
      },
      {
        "name": "hepatologist",
        "value": "hepatologist"
      },
      {
        "name": "herbalist",
        "value": "herbalist"
      },
      {
        "name": "homeopath",
        "value": "homeopath"
      },
      {
        "name": "homestay",
        "value": "homestay"
      },
      {
        "name": "hospice",
        "value": "hospice"
      },
      {
        "name": "hospital",
        "value": "hospital"
      },
      {
        "name": "hostel",
        "value": "hostel"
      },
      {
        "name": "hotel",
        "value": "hotel"
      },
      {
        "name": "hypermarket",
        "value": "hypermarket"
      },
      {
        "name": "immunologist",
        "value": "immunologist"
      },
      {
        "name": "importer",
        "value": "importer"
      },
      {
        "name": "inn",
        "value": "inn"
      },
      {
        "name": "instruction",
        "value": "instruction"
      },
      {
        "name": "intensivist",
        "value": "intensivist"
      },
      {
        "name": "internist",
        "value": "internist"
      },
      {
        "name": "island",
        "value": "island"
      },
      {
        "name": "jeweler",
        "value": "jeweler"
      },
      {
        "name": "joiner",
        "value": "joiner"
      },
      {
        "name": "junkyard",
        "value": "junkyard"
      },
      {
        "name": "karaoke",
        "value": "karaoke"
      },
      {
        "name": "kennel",
        "value": "kennel"
      },
      {
        "name": "kindergarten",
        "value": "kindergarten"
      },
      {
        "name": "kinesiologist",
        "value": "kinesiologist"
      },
      {
        "name": "kinesiotherapist",
        "value": "kinesiotherapist"
      },
      {
        "name": "kiosk",
        "value": "kiosk"
      },
      {
        "name": "laboratory",
        "value": "laboratory"
      },
      {
        "name": "lake",
        "value": "lake"
      },
      {
        "name": "landscaper",
        "value": "landscaper"
      },
      {
        "name": "lapidary",
        "value": "lapidary"
      },
      {
        "name": "laundromat",
        "value": "laundromat"
      },
      {
        "name": "laundry",
        "value": "laundry"
      },
      {
        "name": "lawyer",
        "value": "lawyer"
      },
      {
        "name": "library",
        "value": "library"
      },
      {
        "name": "lido",
        "value": "lido"
      },
      {
        "name": "liquidator",
        "value": "liquidator"
      },
      {
        "name": "locksmith",
        "value": "locksmith"
      },
      {
        "name": "lodge",
        "value": "lodge"
      },
      {
        "name": "lodging",
        "value": "lodging"
      },
      {
        "name": "lounge",
        "value": "lounge"
      },
      {
        "name": "lyceum",
        "value": "lyceum"
      },
      {
        "name": "magician",
        "value": "magician"
      },
      {
        "name": "makerspace",
        "value": "makerspace"
      },
      {
        "name": "manufacturer",
        "value": "manufacturer"
      },
      {
        "name": "marae",
        "value": "marae"
      },
      {
        "name": "marina",
        "value": "marina"
      },
      {
        "name": "market",
        "value": "market"
      },
      {
        "name": "mechanic",
        "value": "mechanic"
      },
      {
        "name": "memorial",
        "value": "memorial"
      },
      {
        "name": "metalwork",
        "value": "metalwork"
      },
      {
        "name": "meyhane",
        "value": "meyhane"
      },
      {
        "name": "midwife",
        "value": "midwife"
      },
      {
        "name": "mill",
        "value": "mill"
      },
      {
        "name": "mine",
        "value": "mine"
      },
      {
        "name": "mission",
        "value": "mission"
      },
      {
        "name": "mohel",
        "value": "mohel"
      },
      {
        "name": "monastery",
        "value": "monastery"
      },
      {
        "name": "monument",
        "value": "monument"
      },
      {
        "name": "mortuary",
        "value": "mortuary"
      },
      {
        "name": "mosque",
        "value": "mosque"
      },
      {
        "name": "motel",
        "value": "motel"
      },
      {
        "name": "mover",
        "value": "mover"
      },
      {
        "name": "musalla",
        "value": "musalla"
      },
      {
        "name": "museum",
        "value": "museum"
      },
      {
        "name": "musician",
        "value": "musician"
      },
      {
        "name": "nephrologist",
        "value": "nephrologist"
      },
      {
        "name": "neurologist",
        "value": "neurologist"
      },
      {
        "name": "neurophysiologist",
        "value": "neurophysiologist"
      },
      {
        "name": "neuropsychologist",
        "value": "neuropsychologist"
      },
      {
        "name": "neurosurgeon",
        "value": "neurosurgeon"
      },
      {
        "name": "newsstand",
        "value": "newsstand"
      },
      {
        "name": "numerologist",
        "value": "numerologist"
      },
      {
        "name": "nutritionist",
        "value": "nutritionist"
      },
      {
        "name": "observatory",
        "value": "observatory"
      },
      {
        "name": "obstetrician-gynecologist",
        "value": "obstetrician-gynecologist"
      },
      {
        "name": "office",
        "value": "office"
      },
      {
        "name": "oilfield",
        "value": "oilfield"
      },
      {
        "name": "oncologist",
        "value": "oncologist"
      },
      {
        "name": "onsen",
        "value": "onsen"
      },
      {
        "name": "ophthalmologist",
        "value": "ophthalmologist"
      },
      {
        "name": "optician",
        "value": "optician"
      },
      {
        "name": "optometrist",
        "value": "optometrist"
      },
      {
        "name": "orchard",
        "value": "orchard"
      },
      {
        "name": "orchestra",
        "value": "orchestra"
      },
      {
        "name": "orphanage",
        "value": "orphanage"
      },
      {
        "name": "orthodontist",
        "value": "orthodontist"
      },
      {
        "name": "orthoptist",
        "value": "orthoptist"
      },
      {
        "name": "osteopath",
        "value": "osteopath"
      },
      {
        "name": "otolaryngologist",
        "value": "otolaryngologist"
      },
      {
        "name": "pagoda",
        "value": "pagoda"
      },
      {
        "name": "painter",
        "value": "painter"
      },
      {
        "name": "painting",
        "value": "painting"
      },
      {
        "name": "parapharmacy",
        "value": "parapharmacy"
      },
      {
        "name": "parish",
        "value": "parish"
      },
      {
        "name": "park",
        "value": "park"
      },
      {
        "name": "parking",
        "value": "parking"
      },
      {
        "name": "pathologist",
        "value": "pathologist"
      },
      {
        "name": "patisserie",
        "value": "patisserie"
      },
      {
        "name": "pediatrician",
        "value": "pediatrician"
      },
      {
        "name": "pedorthist",
        "value": "pedorthist"
      },
      {
        "name": "periodontist",
        "value": "periodontist"
      },
      {
        "name": "pharmacy",
        "value": "pharmacy"
      },
      {
        "name": "photographer",
        "value": "photographer"
      },
      {
        "name": "physiatrist",
        "value": "physiatrist"
      },
      {
        "name": "physiotherapist",
        "value": "physiotherapist"
      },
      {
        "name": "planetarium",
        "value": "planetarium"
      },
      {
        "name": "plasterer",
        "value": "plasterer"
      },
      {
        "name": "playground",
        "value": "playground"
      },
      {
        "name": "playgroup",
        "value": "playgroup"
      },
      {
        "name": "plumber",
        "value": "plumber"
      },
      {
        "name": "podiatrist",
        "value": "podiatrist"
      },
      {
        "name": "pre-school",
        "value": "pre-school"
      },
      {
        "name": "preschool",
        "value": "preschool"
      },
      {
        "name": "priest",
        "value": "priest"
      },
      {
        "name": "prison",
        "value": "prison"
      },
      {
        "name": "proctologist",
        "value": "proctologist"
      },
      {
        "name": "promenade",
        "value": "promenade"
      },
      {
        "name": "prosthodontist",
        "value": "prosthodontist"
      },
      {
        "name": "psychiatrist",
        "value": "psychiatrist"
      },
      {
        "name": "psychic",
        "value": "psychic"
      },
      {
        "name": "psychoanalyst",
        "value": "psychoanalyst"
      },
      {
        "name": "psychologist",
        "value": "psychologist"
      },
      {
        "name": "psychotherapist",
        "value": "psychotherapist"
      },
      {
        "name": "pub",
        "value": "pub"
      },
      {
        "name": "publisher",
        "value": "publisher"
      },
      {
        "name": "pulmonologist",
        "value": "pulmonologist"
      },
      {
        "name": "pyrotechnician",
        "value": "pyrotechnician"
      },
      {
        "name": "quarry",
        "value": "quarry"
      },
      {
        "name": "radiologist",
        "value": "radiologist"
      },
      {
        "name": "radiotherapist",
        "value": "radiotherapist"
      },
      {
        "name": "rafting",
        "value": "rafting"
      },
      {
        "name": "ranch",
        "value": "ranch"
      },
      {
        "name": "recreation",
        "value": "recreation"
      },
      {
        "name": "recruiter",
        "value": "recruiter"
      },
      {
        "name": "rectory",
        "value": "rectory"
      },
      {
        "name": "recycling",
        "value": "recycling"
      },
      {
        "name": "reflexologist",
        "value": "reflexologist"
      },
      {
        "name": "remodeler",
        "value": "remodeler"
      },
      {
        "name": "restaurant",
        "value": "restaurant"
      },
      {
        "name": "rheumatologist",
        "value": "rheumatologist"
      },
      {
        "name": "river",
        "value": "river"
      },
      {
        "name": "rodeo",
        "value": "rodeo"
      },
      {
        "name": "rugby",
        "value": "rugby"
      },
      {
        "name": "sacem",
        "value": "sacem"
      },
      {
        "name": "saddlery",
        "value": "saddlery"
      },
      {
        "name": "sailmaker",
        "value": "sailmaker"
      },
      {
        "name": "sambodrome",
        "value": "sambodrome"
      },
      {
        "name": "sauna",
        "value": "sauna"
      },
      {
        "name": "school",
        "value": "school"
      },
      {
        "name": "scouting",
        "value": "scouting"
      },
      {
        "name": "sculptor",
        "value": "sculptor"
      },
      {
        "name": "sculpture",
        "value": "sculpture"
      },
      {
        "name": "seitai",
        "value": "seitai"
      },
      {
        "name": "seminary",
        "value": "seminary"
      },
      {
        "name": "services",
        "value": "services"
      },
      {
        "name": "sexologist",
        "value": "sexologist"
      },
      {
        "name": "shelter",
        "value": "shelter"
      },
      {
        "name": "shipyard",
        "value": "shipyard"
      },
      {
        "name": "shop",
        "value": "shop"
      },
      {
        "name": "shopfitter",
        "value": "shopfitter"
      },
      {
        "name": "showroom",
        "value": "showroom"
      },
      {
        "name": "shrine",
        "value": "shrine"
      },
      {
        "name": "silversmith",
        "value": "silversmith"
      },
      {
        "name": "skatepark",
        "value": "skatepark"
      },
      {
        "name": "slaughterhouse",
        "value": "slaughterhouse"
      },
      {
        "name": "soapland",
        "value": "soapland"
      },
      {
        "name": "spa",
        "value": "spa"
      },
      {
        "name": "sports",
        "value": "sports"
      },
      {
        "name": "stable",
        "value": "stable"
      },
      {
        "name": "stadium",
        "value": "stadium"
      },
      {
        "name": "stage",
        "value": "stage"
      },
      {
        "name": "statuary",
        "value": "statuary"
      },
      {
        "name": "store",
        "value": "store"
      },
      {
        "name": "stylist",
        "value": "stylist"
      },
      {
        "name": "supermarket",
        "value": "supermarket"
      },
      {
        "name": "surgeon",
        "value": "surgeon"
      },
      {
        "name": "surveyor",
        "value": "surveyor"
      },
      {
        "name": "synagogue",
        "value": "synagogue"
      },
      {
        "name": "tailor",
        "value": "tailor"
      },
      {
        "name": "takeaway",
        "value": "takeaway"
      },
      {
        "name": "tannery",
        "value": "tannery"
      },
      {
        "name": "taxidermist",
        "value": "taxidermist"
      },
      {
        "name": "telecommunications",
        "value": "telecommunications"
      },
      {
        "name": "toolroom",
        "value": "toolroom"
      },
      {
        "name": "travel",
        "value": "travel"
      },
      {
        "name": "turnery",
        "value": "turnery"
      },
      {
        "name": "university",
        "value": "university"
      },
      {
        "name": "urologist",
        "value": "urologist"
      },
      {
        "name": "velodrome",
        "value": "velodrome"
      },
      {
        "name": "venereologist",
        "value": "venereologist"
      },
      {
        "name": "veterinarian",
        "value": "veterinarian"
      },
      {
        "name": "villa",
        "value": "villa"
      },
      {
        "name": "vineyard",
        "value": "vineyard"
      },
      {
        "name": "warehouse",
        "value": "warehouse"
      },
      {
        "name": "weir",
        "value": "weir"
      },
      {
        "name": "welder",
        "value": "welder"
      },
      {
        "name": "wholesaler",
        "value": "wholesaler"
      },
      {
        "name": "winery",
        "value": "winery"
      },
      {
        "name": "woods",
        "value": "woods"
      },
      {
        "name": "woodworker",
        "value": "woodworker"
      },
      {
        "name": "yakatabune",
        "value": "yakatabune"
      },
      {
        "name": "yeshiva",
        "value": "yeshiva"
      },
      {
        "name": "zoo",
        "value": "zoo"
      },
      {
        "name": "abarth dealer",
        "value": "abarth dealer"
      },
      {
        "name": "abortion clinic",
        "value": "abortion clinic"
      },
      {
        "name": "abrasives supplier",
        "value": "abrasives supplier"
      },
      {
        "name": "academic department",
        "value": "academic department"
      },
      {
        "name": "açaí shop",
        "value": "açaí shop"
      },
      {
        "name": "acaraje restaurant",
        "value": "acaraje restaurant"
      },
      {
        "name": "accounting firm",
        "value": "accounting firm"
      },
      {
        "name": "accounting school",
        "value": "accounting school"
      },
      {
        "name": "acoustical consultant",
        "value": "acoustical consultant"
      },
      {
        "name": "acrylic store",
        "value": "acrylic store"
      },
      {
        "name": "acupuncture clinic",
        "value": "acupuncture clinic"
      },
      {
        "name": "acupuncture school",
        "value": "acupuncture school"
      },
      {
        "name": "acura dealer",
        "value": "acura dealer"
      },
      {
        "name": "administrative attorney",
        "value": "administrative attorney"
      },
      {
        "name": "adoption agency",
        "value": "adoption agency"
      },
      {
        "name": "advertising agency",
        "value": "advertising agency"
      },
      {
        "name": "advertising photographer",
        "value": "advertising photographer"
      },
      {
        "name": "advertising service",
        "value": "advertising service"
      },
      {
        "name": "aerial photographer",
        "value": "aerial photographer"
      },
      {
        "name": "aerobics instructor",
        "value": "aerobics instructor"
      },
      {
        "name": "aeromodel shop",
        "value": "aeromodel shop"
      },
      {
        "name": "aeronautical engineer",
        "value": "aeronautical engineer"
      },
      {
        "name": "aerospace company",
        "value": "aerospace company"
      },
      {
        "name": "afghan restaurant",
        "value": "afghan restaurant"
      },
      {
        "name": "african restaurant",
        "value": "african restaurant"
      },
      {
        "name": "agenzia entrate",
        "value": "agenzia entrate"
      },
      {
        "name": "aggregate supplier",
        "value": "aggregate supplier"
      },
      {
        "name": "agistment service",
        "value": "agistment service"
      },
      {
        "name": "agricultural association",
        "value": "agricultural association"
      },
      {
        "name": "agricultural cooperative",
        "value": "agricultural cooperative"
      },
      {
        "name": "agricultural engineer",
        "value": "agricultural engineer"
      },
      {
        "name": "agricultural organization",
        "value": "agricultural organization"
      },
      {
        "name": "agricultural production",
        "value": "agricultural production"
      },
      {
        "name": "agricultural service",
        "value": "agricultural service"
      },
      {
        "name": "agrochemicals supplier",
        "value": "agrochemicals supplier"
      },
      {
        "name": "aikido club",
        "value": "aikido club"
      },
      {
        "name": "aikido school",
        "value": "aikido school"
      },
      {
        "name": "air taxi",
        "value": "air taxi"
      },
      {
        "name": "airbrushing service",
        "value": "airbrushing service"
      },
      {
        "name": "aircraft dealer",
        "value": "aircraft dealer"
      },
      {
        "name": "aircraft manufacturer",
        "value": "aircraft manufacturer"
      },
      {
        "name": "alcohol manufacturer",
        "value": "alcohol manufacturer"
      },
      {
        "name": "alliance church",
        "value": "alliance church"
      },
      {
        "name": "alsace restaurant",
        "value": "alsace restaurant"
      },
      {
        "name": "alternator supplier",
        "value": "alternator supplier"
      },
      {
        "name": "aluminium supplier",
        "value": "aluminium supplier"
      },
      {
        "name": "aluminum supplier",
        "value": "aluminum supplier"
      },
      {
        "name": "aluminum welder",
        "value": "aluminum welder"
      },
      {
        "name": "aluminum window",
        "value": "aluminum window"
      },
      {
        "name": "ambulance service",
        "value": "ambulance service"
      },
      {
        "name": "american restaurant",
        "value": "american restaurant"
      },
      {
        "name": "ammunition supplier",
        "value": "ammunition supplier"
      },
      {
        "name": "amusement center",
        "value": "amusement center"
      },
      {
        "name": "amusement park",
        "value": "amusement park"
      },
      {
        "name": "anago restaurant",
        "value": "anago restaurant"
      },
      {
        "name": "andalusian restaurant",
        "value": "andalusian restaurant"
      },
      {
        "name": "andhra restaurant",
        "value": "andhra restaurant"
      },
      {
        "name": "anganwadi center",
        "value": "anganwadi center"
      },
      {
        "name": "anglican church",
        "value": "anglican church"
      },
      {
        "name": "animal hospital",
        "value": "animal hospital"
      },
      {
        "name": "animal shelter",
        "value": "animal shelter"
      },
      {
        "name": "animation studio",
        "value": "animation studio"
      },
      {
        "name": "anime club",
        "value": "anime club"
      },
      {
        "name": "antenna service",
        "value": "antenna service"
      },
      {
        "name": "antique store",
        "value": "antique store"
      },
      {
        "name": "apartment building",
        "value": "apartment building"
      },
      {
        "name": "apartment complex",
        "value": "apartment complex"
      },
      {
        "name": "apostolic church",
        "value": "apostolic church"
      },
      {
        "name": "apparel company",
        "value": "apparel company"
      },
      {
        "name": "appliance store",
        "value": "appliance store"
      },
      {
        "name": "apprenticeship center",
        "value": "apprenticeship center"
      },
      {
        "name": "aquaculture farm",
        "value": "aquaculture farm"
      },
      {
        "name": "aquarium shop",
        "value": "aquarium shop"
      },
      {
        "name": "aquatic centre",
        "value": "aquatic centre"
      },
      {
        "name": "arab restaurant",
        "value": "arab restaurant"
      },
      {
        "name": "arborist service",
        "value": "arborist service"
      },
      {
        "name": "archaeological museum",
        "value": "archaeological museum"
      },
      {
        "name": "archery club",
        "value": "archery club"
      },
      {
        "name": "archery range",
        "value": "archery range"
      },
      {
        "name": "archery store",
        "value": "archery store"
      },
      {
        "name": "architects association",
        "value": "architects association"
      },
      {
        "name": "architectural designer",
        "value": "architectural designer"
      },
      {
        "name": "architecture firm",
        "value": "architecture firm"
      },
      {
        "name": "architecture school",
        "value": "architecture school"
      },
      {
        "name": "argentinian restaurant",
        "value": "argentinian restaurant"
      },
      {
        "name": "armenian church",
        "value": "armenian church"
      },
      {
        "name": "armenian restaurant",
        "value": "armenian restaurant"
      },
      {
        "name": "army facility",
        "value": "army facility"
      },
      {
        "name": "army museum",
        "value": "army museum"
      },
      {
        "name": "aromatherapy class",
        "value": "aromatherapy class"
      },
      {
        "name": "aromatherapy service",
        "value": "aromatherapy service"
      },
      {
        "name": "art cafe",
        "value": "art cafe"
      },
      {
        "name": "art center",
        "value": "art center"
      },
      {
        "name": "art dealer",
        "value": "art dealer"
      },
      {
        "name": "art gallery",
        "value": "art gallery"
      },
      {
        "name": "art museum",
        "value": "art museum"
      },
      {
        "name": "art school",
        "value": "art school"
      },
      {
        "name": "art studio",
        "value": "art studio"
      },
      {
        "name": "artistic handicrafts",
        "value": "artistic handicrafts"
      },
      {
        "name": "arts organization",
        "value": "arts organization"
      },
      {
        "name": "asian restaurant",
        "value": "asian restaurant"
      },
      {
        "name": "asphalt contractor",
        "value": "asphalt contractor"
      },
      {
        "name": "assamese restaurant",
        "value": "assamese restaurant"
      },
      {
        "name": "assistante maternelle",
        "value": "assistante maternelle"
      },
      {
        "name": "asturian restaurant",
        "value": "asturian restaurant"
      },
      {
        "name": "athletic club",
        "value": "athletic club"
      },
      {
        "name": "athletic field",
        "value": "athletic field"
      },
      {
        "name": "athletic park",
        "value": "athletic park"
      },
      {
        "name": "athletic track",
        "value": "athletic track"
      },
      {
        "name": "atv dealer",
        "value": "atv dealer"
      },
      {
        "name": "auction house",
        "value": "auction house"
      },
      {
        "name": "audi dealer",
        "value": "audi dealer"
      },
      {
        "name": "australian restaurant",
        "value": "australian restaurant"
      },
      {
        "name": "austrian restaurant",
        "value": "austrian restaurant"
      },
      {
        "name": "auto auction",
        "value": "auto auction"
      },
      {
        "name": "auto broker",
        "value": "auto broker"
      },
      {
        "name": "auto market",
        "value": "auto market"
      },
      {
        "name": "auto painting",
        "value": "auto painting"
      },
      {
        "name": "auto upholsterer",
        "value": "auto upholsterer"
      },
      {
        "name": "auto wrecker",
        "value": "auto wrecker"
      },
      {
        "name": "automation company",
        "value": "automation company"
      },
      {
        "name": "aviation consultant",
        "value": "aviation consultant"
      },
      {
        "name": "awadhi restaurant",
        "value": "awadhi restaurant"
      },
      {
        "name": "awning supplier",
        "value": "awning supplier"
      },
      {
        "name": "ayurvedic clinic",
        "value": "ayurvedic clinic"
      },
      {
        "name": "azerbaijani restaurant",
        "value": "azerbaijani restaurant"
      },
      {
        "name": "baby store",
        "value": "baby store"
      },
      {
        "name": "baden restaurant",
        "value": "baden restaurant"
      },
      {
        "name": "badminton club",
        "value": "badminton club"
      },
      {
        "name": "badminton complex",
        "value": "badminton complex"
      },
      {
        "name": "badminton court",
        "value": "badminton court"
      },
      {
        "name": "bag shop",
        "value": "bag shop"
      },
      {
        "name": "bagel shop",
        "value": "bagel shop"
      },
      {
        "name": "bait shop",
        "value": "bait shop"
      },
      {
        "name": "bakery equipment",
        "value": "bakery equipment"
      },
      {
        "name": "bakso restaurant",
        "value": "bakso restaurant"
      },
      {
        "name": "balinese restaurant",
        "value": "balinese restaurant"
      },
      {
        "name": "ballet school",
        "value": "ballet school"
      },
      {
        "name": "ballet theater",
        "value": "ballet theater"
      },
      {
        "name": "balloon artist",
        "value": "balloon artist"
      },
      {
        "name": "balloon store",
        "value": "balloon store"
      },
      {
        "name": "bangladeshi restaurant",
        "value": "bangladeshi restaurant"
      },
      {
        "name": "bangle shop",
        "value": "bangle shop"
      },
      {
        "name": "bankruptcy attorney",
        "value": "bankruptcy attorney"
      },
      {
        "name": "bankruptcy service",
        "value": "bankruptcy service"
      },
      {
        "name": "banner store",
        "value": "banner store"
      },
      {
        "name": "banquet hall",
        "value": "banquet hall"
      },
      {
        "name": "baptist church",
        "value": "baptist church"
      },
      {
        "name": "bar pmu",
        "value": "bar pmu"
      },
      {
        "name": "bar tabac",
        "value": "bar tabac"
      },
      {
        "name": "barbecue area",
        "value": "barbecue area"
      },
      {
        "name": "barbecue restaurant",
        "value": "barbecue restaurant"
      },
      {
        "name": "barber school",
        "value": "barber school"
      },
      {
        "name": "barber shop",
        "value": "barber shop"
      },
      {
        "name": "bariatric surgeon",
        "value": "bariatric surgeon"
      },
      {
        "name": "bark supplier",
        "value": "bark supplier"
      },
      {
        "name": "barrel supplier",
        "value": "barrel supplier"
      },
      {
        "name": "bartending school",
        "value": "bartending school"
      },
      {
        "name": "baseball club",
        "value": "baseball club"
      },
      {
        "name": "baseball field",
        "value": "baseball field"
      },
      {
        "name": "basket supplier",
        "value": "basket supplier"
      },
      {
        "name": "basketball club",
        "value": "basketball club"
      },
      {
        "name": "basketball court",
        "value": "basketball court"
      },
      {
        "name": "basque restaurant",
        "value": "basque restaurant"
      },
      {
        "name": "batak restaurant",
        "value": "batak restaurant"
      },
      {
        "name": "bathroom remodeler",
        "value": "bathroom remodeler"
      },
      {
        "name": "bathroom renovator",
        "value": "bathroom renovator"
      },
      {
        "name": "battery manufacturer",
        "value": "battery manufacturer"
      },
      {
        "name": "battery store",
        "value": "battery store"
      },
      {
        "name": "battery wholesaler",
        "value": "battery wholesaler"
      },
      {
        "name": "bavarian restaurant",
        "value": "bavarian restaurant"
      },
      {
        "name": "beach club",
        "value": "beach club"
      },
      {
        "name": "beach pavillion",
        "value": "beach pavillion"
      },
      {
        "name": "bead store",
        "value": "bead store"
      },
      {
        "name": "bead wholesaler",
        "value": "bead wholesaler"
      },
      {
        "name": "bearing supplier",
        "value": "bearing supplier"
      },
      {
        "name": "beauty parlour",
        "value": "beauty parlour"
      },
      {
        "name": "beauty salon",
        "value": "beauty salon"
      },
      {
        "name": "beauty school",
        "value": "beauty school"
      },
      {
        "name": "bed shop",
        "value": "bed shop"
      },
      {
        "name": "bedding store",
        "value": "bedding store"
      },
      {
        "name": "beer distributor",
        "value": "beer distributor"
      },
      {
        "name": "beer garden",
        "value": "beer garden"
      },
      {
        "name": "beer hall",
        "value": "beer hall"
      },
      {
        "name": "beer store",
        "value": "beer store"
      },
      {
        "name": "belgian restaurant",
        "value": "belgian restaurant"
      },
      {
        "name": "belt shop",
        "value": "belt shop"
      },
      {
        "name": "bengali restaurant",
        "value": "bengali restaurant"
      },
      {
        "name": "bentley dealer",
        "value": "bentley dealer"
      },
      {
        "name": "berry restaurant",
        "value": "berry restaurant"
      },
      {
        "name": "betawi restaurant",
        "value": "betawi restaurant"
      },
      {
        "name": "betting agency",
        "value": "betting agency"
      },
      {
        "name": "beverage distributor",
        "value": "beverage distributor"
      },
      {
        "name": "beverage supplier",
        "value": "beverage supplier"
      },
      {
        "name": "bicycle club",
        "value": "bicycle club"
      },
      {
        "name": "bicycle rack",
        "value": "bicycle rack"
      },
      {
        "name": "bicycle shop",
        "value": "bicycle shop"
      },
      {
        "name": "bicycle store",
        "value": "bicycle store"
      },
      {
        "name": "bicycle wholesaler",
        "value": "bicycle wholesaler"
      },
      {
        "name": "bike wash",
        "value": "bike wash"
      },
      {
        "name": "bilingual school",
        "value": "bilingual school"
      },
      {
        "name": "bingo hall",
        "value": "bingo hall"
      },
      {
        "name": "biochemistry lab",
        "value": "biochemistry lab"
      },
      {
        "name": "biofeedback therapist",
        "value": "biofeedback therapist"
      },
      {
        "name": "biotechnology company",
        "value": "biotechnology company"
      },
      {
        "name": "bird shop",
        "value": "bird shop"
      },
      {
        "name": "birth center",
        "value": "birth center"
      },
      {
        "name": "biryani restaurant",
        "value": "biryani restaurant"
      },
      {
        "name": "blinds shop",
        "value": "blinds shop"
      },
      {
        "name": "blood bank",
        "value": "blood bank"
      },
      {
        "name": "blueprint service",
        "value": "blueprint service"
      },
      {
        "name": "blues club",
        "value": "blues club"
      },
      {
        "name": "bmw dealer",
        "value": "bmw dealer"
      },
      {
        "name": "bmx club",
        "value": "bmx club"
      },
      {
        "name": "bmx park",
        "value": "bmx park"
      },
      {
        "name": "boarding house",
        "value": "boarding house"
      },
      {
        "name": "boarding school",
        "value": "boarding school"
      },
      {
        "name": "boat builders",
        "value": "boat builders"
      },
      {
        "name": "boat club",
        "value": "boat club"
      },
      {
        "name": "boat dealer",
        "value": "boat dealer"
      },
      {
        "name": "boat ramp",
        "value": "boat ramp"
      },
      {
        "name": "boating instructor",
        "value": "boating instructor"
      },
      {
        "name": "boiler manufacturer",
        "value": "boiler manufacturer"
      },
      {
        "name": "boiler supplier",
        "value": "boiler supplier"
      },
      {
        "name": "bonesetting house",
        "value": "bonesetting house"
      },
      {
        "name": "book publisher",
        "value": "book publisher"
      },
      {
        "name": "book store",
        "value": "book store"
      },
      {
        "name": "bookkeeping service",
        "value": "bookkeeping service"
      },
      {
        "name": "books wholesaler",
        "value": "books wholesaler"
      },
      {
        "name": "boot camp",
        "value": "boot camp"
      },
      {
        "name": "boot store",
        "value": "boot store"
      },
      {
        "name": "border guard",
        "value": "border guard"
      },
      {
        "name": "botanical garden",
        "value": "botanical garden"
      },
      {
        "name": "bowling alley",
        "value": "bowling alley"
      },
      {
        "name": "bowling club",
        "value": "bowling club"
      },
      {
        "name": "boxing club",
        "value": "boxing club"
      },
      {
        "name": "boxing gym",
        "value": "boxing gym"
      },
      {
        "name": "boxing ring",
        "value": "boxing ring"
      },
      {
        "name": "boys' hostel",
        "value": "boys' hostel"
      },
      {
        "name": "bpo company",
        "value": "bpo company"
      },
      {
        "name": "brake shop",
        "value": "brake shop"
      },
      {
        "name": "branding agency",
        "value": "branding agency"
      },
      {
        "name": "brazilian pastelaria",
        "value": "brazilian pastelaria"
      },
      {
        "name": "brazilian restaurant",
        "value": "brazilian restaurant"
      },
      {
        "name": "breakfast restaurant",
        "value": "breakfast restaurant"
      },
      {
        "name": "brick manufacturer",
        "value": "brick manufacturer"
      },
      {
        "name": "bridal shop",
        "value": "bridal shop"
      },
      {
        "name": "bridge club",
        "value": "bridge club"
      },
      {
        "name": "british restaurant",
        "value": "british restaurant"
      },
      {
        "name": "brunch restaurant",
        "value": "brunch restaurant"
      },
      {
        "name": "buddhist temple",
        "value": "buddhist temple"
      },
      {
        "name": "buffet restaurant",
        "value": "buffet restaurant"
      },
      {
        "name": "bugatti dealer",
        "value": "bugatti dealer"
      },
      {
        "name": "buick dealer",
        "value": "buick dealer"
      },
      {
        "name": "building consultant",
        "value": "building consultant"
      },
      {
        "name": "building designer",
        "value": "building designer"
      },
      {
        "name": "building firm",
        "value": "building firm"
      },
      {
        "name": "building inspector",
        "value": "building inspector"
      },
      {
        "name": "building society",
        "value": "building society"
      },
      {
        "name": "bulgarian restaurant",
        "value": "bulgarian restaurant"
      },
      {
        "name": "burmese restaurant",
        "value": "burmese restaurant"
      },
      {
        "name": "burrito restaurant",
        "value": "burrito restaurant"
      },
      {
        "name": "bus charter",
        "value": "bus charter"
      },
      {
        "name": "bus company",
        "value": "bus company"
      },
      {
        "name": "bus depot",
        "value": "bus depot"
      },
      {
        "name": "bus station",
        "value": "bus station"
      },
      {
        "name": "bus stop",
        "value": "bus stop"
      },
      {
        "name": "business attorney",
        "value": "business attorney"
      },
      {
        "name": "business broker",
        "value": "business broker"
      },
      {
        "name": "business center",
        "value": "business center"
      },
      {
        "name": "business park",
        "value": "business park"
      },
      {
        "name": "business school",
        "value": "business school"
      },
      {
        "name": "butcher shop",
        "value": "butcher shop"
      },
      {
        "name": "butsudan store",
        "value": "butsudan store"
      },
      {
        "name": "cabaret club",
        "value": "cabaret club"
      },
      {
        "name": "cabinet maker",
        "value": "cabinet maker"
      },
      {
        "name": "cabinet store",
        "value": "cabinet store"
      },
      {
        "name": "cable company",
        "value": "cable company"
      },
      {
        "name": "cadillac dealer",
        "value": "cadillac dealer"
      },
      {
        "name": "cajun restaurant",
        "value": "cajun restaurant"
      },
      {
        "name": "cake shop",
        "value": "cake shop"
      },
      {
        "name": "californian restaurant",
        "value": "californian restaurant"
      },
      {
        "name": "call center",
        "value": "call center"
      },
      {
        "name": "call shop",
        "value": "call shop"
      },
      {
        "name": "calligraphy lesson",
        "value": "calligraphy lesson"
      },
      {
        "name": "cambodian restaurant",
        "value": "cambodian restaurant"
      },
      {
        "name": "camera store",
        "value": "camera store"
      },
      {
        "name": "camping cabin",
        "value": "camping cabin"
      },
      {
        "name": "camping farm",
        "value": "camping farm"
      },
      {
        "name": "camping store",
        "value": "camping store"
      },
      {
        "name": "canadian restaurant",
        "value": "canadian restaurant"
      },
      {
        "name": "candle store",
        "value": "candle store"
      },
      {
        "name": "candy store",
        "value": "candy store"
      },
      {
        "name": "cannabis club",
        "value": "cannabis club"
      },
      {
        "name": "cannabis store",
        "value": "cannabis store"
      },
      {
        "name": "canoeing area",
        "value": "canoeing area"
      },
      {
        "name": "cantabrian restaurant",
        "value": "cantabrian restaurant"
      },
      {
        "name": "cantonese restaurant",
        "value": "cantonese restaurant"
      },
      {
        "name": "capoeira school",
        "value": "capoeira school"
      },
      {
        "name": "capsule hotel",
        "value": "capsule hotel"
      },
      {
        "name": "car dealer",
        "value": "car dealer"
      },
      {
        "name": "car factory",
        "value": "car factory"
      },
      {
        "name": "car manufacturer",
        "value": "car manufacturer"
      },
      {
        "name": "car wash",
        "value": "car wash"
      },
      {
        "name": "carabinieri police",
        "value": "carabinieri police"
      },
      {
        "name": "care services",
        "value": "care services"
      },
      {
        "name": "caribbean restaurant",
        "value": "caribbean restaurant"
      },
      {
        "name": "carnival club",
        "value": "carnival club"
      },
      {
        "name": "carpet installer",
        "value": "carpet installer"
      },
      {
        "name": "carpet manufacturer",
        "value": "carpet manufacturer"
      },
      {
        "name": "carpet store",
        "value": "carpet store"
      },
      {
        "name": "carpet wholesaler",
        "value": "carpet wholesaler"
      },
      {
        "name": "casket service",
        "value": "casket service"
      },
      {
        "name": "castilian restaurant",
        "value": "castilian restaurant"
      },
      {
        "name": "cat breeder",
        "value": "cat breeder"
      },
      {
        "name": "cat cafe",
        "value": "cat cafe"
      },
      {
        "name": "cat trainer",
        "value": "cat trainer"
      },
      {
        "name": "catalonian restaurant",
        "value": "catalonian restaurant"
      },
      {
        "name": "catholic cathedral",
        "value": "catholic cathedral"
      },
      {
        "name": "catholic church",
        "value": "catholic church"
      },
      {
        "name": "catholic school",
        "value": "catholic school"
      },
      {
        "name": "cattle farm",
        "value": "cattle farm"
      },
      {
        "name": "cattle market",
        "value": "cattle market"
      },
      {
        "name": "caucasian restaurant",
        "value": "caucasian restaurant"
      },
      {
        "name": "cbse school",
        "value": "cbse school"
      },
      {
        "name": "cd store",
        "value": "cd store"
      },
      {
        "name": "ceiling supplier",
        "value": "ceiling supplier"
      },
      {
        "name": "cement manufacturer",
        "value": "cement manufacturer"
      },
      {
        "name": "cement supplier",
        "value": "cement supplier"
      },
      {
        "name": "cendol restaurant",
        "value": "cendol restaurant"
      },
      {
        "name": "central bank",
        "value": "central bank"
      },
      {
        "name": "ceramic manufacturer",
        "value": "ceramic manufacturer"
      },
      {
        "name": "ceramics wholesaler",
        "value": "ceramics wholesaler"
      },
      {
        "name": "certification agency",
        "value": "certification agency"
      },
      {
        "name": "charter school",
        "value": "charter school"
      },
      {
        "name": "chartered accountant",
        "value": "chartered accountant"
      },
      {
        "name": "chauffeur service",
        "value": "chauffeur service"
      },
      {
        "name": "cheese manufacturer",
        "value": "cheese manufacturer"
      },
      {
        "name": "cheese shop",
        "value": "cheese shop"
      },
      {
        "name": "cheesesteak restaurant",
        "value": "cheesesteak restaurant"
      },
      {
        "name": "chemical exporter",
        "value": "chemical exporter"
      },
      {
        "name": "chemical industry",
        "value": "chemical industry"
      },
      {
        "name": "chemical manufacturer",
        "value": "chemical manufacturer"
      },
      {
        "name": "chemical plant",
        "value": "chemical plant"
      },
      {
        "name": "chemical wholesaler",
        "value": "chemical wholesaler"
      },
      {
        "name": "chemistry lab",
        "value": "chemistry lab"
      },
      {
        "name": "chesapeake restaurant",
        "value": "chesapeake restaurant"
      },
      {
        "name": "chess club",
        "value": "chess club"
      },
      {
        "name": "chess instructor",
        "value": "chess instructor"
      },
      {
        "name": "chevrolet dealer",
        "value": "chevrolet dealer"
      },
      {
        "name": "chicken restaurant",
        "value": "chicken restaurant"
      },
      {
        "name": "chicken shop",
        "value": "chicken shop"
      },
      {
        "name": "child psychiatrist",
        "value": "child psychiatrist"
      },
      {
        "name": "child psychologist",
        "value": "child psychologist"
      },
      {
        "name": "childbirth class",
        "value": "childbirth class"
      },
      {
        "name": "children hall",
        "value": "children hall"
      },
      {
        "name": "children policlinic",
        "value": "children policlinic"
      },
      {
        "name": "children's cafe",
        "value": "children's cafe"
      },
      {
        "name": "children's camp",
        "value": "children's camp"
      },
      {
        "name": "children's club",
        "value": "children's club"
      },
      {
        "name": "children's hospital",
        "value": "children's hospital"
      },
      {
        "name": "children's store",
        "value": "children's store"
      },
      {
        "name": "childrens store",
        "value": "childrens store"
      },
      {
        "name": "chilean restaurant",
        "value": "chilean restaurant"
      },
      {
        "name": "chimney services",
        "value": "chimney services"
      },
      {
        "name": "chimney sweep",
        "value": "chimney sweep"
      },
      {
        "name": "chinaware store",
        "value": "chinaware store"
      },
      {
        "name": "chinese bakery",
        "value": "chinese bakery"
      },
      {
        "name": "chinese restaurant",
        "value": "chinese restaurant"
      },
      {
        "name": "chinese supermarket",
        "value": "chinese supermarket"
      },
      {
        "name": "chinese takeaway",
        "value": "chinese takeaway"
      },
      {
        "name": "chocolate artisan",
        "value": "chocolate artisan"
      },
      {
        "name": "chocolate cafe",
        "value": "chocolate cafe"
      },
      {
        "name": "chocolate factory",
        "value": "chocolate factory"
      },
      {
        "name": "chocolate shop",
        "value": "chocolate shop"
      },
      {
        "name": "chop bar",
        "value": "chop bar"
      },
      {
        "name": "chophouse restaurant",
        "value": "chophouse restaurant"
      },
      {
        "name": "christian church",
        "value": "christian church"
      },
      {
        "name": "christian college",
        "value": "christian college"
      },
      {
        "name": "christmas market",
        "value": "christmas market"
      },
      {
        "name": "christmas store",
        "value": "christmas store"
      },
      {
        "name": "chrysler dealer",
        "value": "chrysler dealer"
      },
      {
        "name": "cider bar",
        "value": "cider bar"
      },
      {
        "name": "cider mill",
        "value": "cider mill"
      },
      {
        "name": "cigar shop",
        "value": "cigar shop"
      },
      {
        "name": "citroen dealer",
        "value": "citroen dealer"
      },
      {
        "name": "city courthouse",
        "value": "city courthouse"
      },
      {
        "name": "city hall",
        "value": "city hall"
      },
      {
        "name": "city park",
        "value": "city park"
      },
      {
        "name": "civic center",
        "value": "civic center"
      },
      {
        "name": "civil engineer",
        "value": "civil engineer"
      },
      {
        "name": "civil police",
        "value": "civil police"
      },
      {
        "name": "cleaning service",
        "value": "cleaning service"
      },
      {
        "name": "clothes market",
        "value": "clothes market"
      },
      {
        "name": "clothing manufacturer",
        "value": "clothing manufacturer"
      },
      {
        "name": "clothing shop",
        "value": "clothing shop"
      },
      {
        "name": "clothing store",
        "value": "clothing store"
      },
      {
        "name": "clothing supplier",
        "value": "clothing supplier"
      },
      {
        "name": "clothing wholesaler",
        "value": "clothing wholesaler"
      },
      {
        "name": "co-ed school",
        "value": "co-ed school"
      },
      {
        "name": "coaching center",
        "value": "coaching center"
      },
      {
        "name": "coaching service",
        "value": "coaching service"
      },
      {
        "name": "coal exporter",
        "value": "coal exporter"
      },
      {
        "name": "coal supplier",
        "value": "coal supplier"
      },
      {
        "name": "cocktail bar",
        "value": "cocktail bar"
      },
      {
        "name": "coffee roasters",
        "value": "coffee roasters"
      },
      {
        "name": "coffee shop",
        "value": "coffee shop"
      },
      {
        "name": "coffee stand",
        "value": "coffee stand"
      },
      {
        "name": "coffee store",
        "value": "coffee store"
      },
      {
        "name": "coffee wholesaler",
        "value": "coffee wholesaler"
      },
      {
        "name": "coffin supplier",
        "value": "coffin supplier"
      },
      {
        "name": "coin dealer",
        "value": "coin dealer"
      },
      {
        "name": "collectibles store",
        "value": "collectibles store"
      },
      {
        "name": "colombian restaurant",
        "value": "colombian restaurant"
      },
      {
        "name": "comedy club",
        "value": "comedy club"
      },
      {
        "name": "comic cafe",
        "value": "comic cafe"
      },
      {
        "name": "commercial agent",
        "value": "commercial agent"
      },
      {
        "name": "commercial photographer",
        "value": "commercial photographer"
      },
      {
        "name": "commercial printer",
        "value": "commercial printer"
      },
      {
        "name": "community center",
        "value": "community center"
      },
      {
        "name": "community college",
        "value": "community college"
      },
      {
        "name": "community garden",
        "value": "community garden"
      },
      {
        "name": "community school",
        "value": "community school"
      },
      {
        "name": "company registry",
        "value": "company registry"
      },
      {
        "name": "computer club",
        "value": "computer club"
      },
      {
        "name": "computer consultant",
        "value": "computer consultant"
      },
      {
        "name": "computer service",
        "value": "computer service"
      },
      {
        "name": "computer shop",
        "value": "computer shop"
      },
      {
        "name": "computer store",
        "value": "computer store"
      },
      {
        "name": "computer wholesaler",
        "value": "computer wholesaler"
      },
      {
        "name": "concert hall",
        "value": "concert hall"
      },
      {
        "name": "concrete contractor",
        "value": "concrete contractor"
      },
      {
        "name": "concrete factory",
        "value": "concrete factory"
      },
      {
        "name": "condiments supplier",
        "value": "condiments supplier"
      },
      {
        "name": "condominium complex",
        "value": "condominium complex"
      },
      {
        "name": "confectionery store",
        "value": "confectionery store"
      },
      {
        "name": "confectionery wholesaler",
        "value": "confectionery wholesaler"
      },
      {
        "name": "conference center",
        "value": "conference center"
      },
      {
        "name": "conservative club",
        "value": "conservative club"
      },
      {
        "name": "conservative synagogue",
        "value": "conservative synagogue"
      },
      {
        "name": "consignment shop",
        "value": "consignment shop"
      },
      {
        "name": "construction company",
        "value": "construction company"
      },
      {
        "name": "container service",
        "value": "container service"
      },
      {
        "name": "container supplier",
        "value": "container supplier"
      },
      {
        "name": "container terminal",
        "value": "container terminal"
      },
      {
        "name": "containers supplier",
        "value": "containers supplier"
      },
      {
        "name": "continental restaurant",
        "value": "continental restaurant"
      },
      {
        "name": "convenience store",
        "value": "convenience store"
      },
      {
        "name": "convention center",
        "value": "convention center"
      },
      {
        "name": "cookie shop",
        "value": "cookie shop"
      },
      {
        "name": "cooking class",
        "value": "cooking class"
      },
      {
        "name": "cooking school",
        "value": "cooking school"
      },
      {
        "name": "cooling plant",
        "value": "cooling plant"
      },
      {
        "name": "cooperative bank",
        "value": "cooperative bank"
      },
      {
        "name": "copper supplier",
        "value": "copper supplier"
      },
      {
        "name": "copy shop",
        "value": "copy shop"
      },
      {
        "name": "copywriting service",
        "value": "copywriting service"
      },
      {
        "name": "corporate campus",
        "value": "corporate campus"
      },
      {
        "name": "corporate office",
        "value": "corporate office"
      },
      {
        "name": "cosmetic dentist",
        "value": "cosmetic dentist"
      },
      {
        "name": "cosmetic surgeon",
        "value": "cosmetic surgeon"
      },
      {
        "name": "cosmetics industry",
        "value": "cosmetics industry"
      },
      {
        "name": "cosmetics shop",
        "value": "cosmetics shop"
      },
      {
        "name": "cosmetics store",
        "value": "cosmetics store"
      },
      {
        "name": "cosmetics wholesaler",
        "value": "cosmetics wholesaler"
      },
      {
        "name": "cosplay cafe",
        "value": "cosplay cafe"
      },
      {
        "name": "costume store",
        "value": "costume store"
      },
      {
        "name": "cottage rental",
        "value": "cottage rental"
      },
      {
        "name": "cottage village",
        "value": "cottage village"
      },
      {
        "name": "cotton exporter",
        "value": "cotton exporter"
      },
      {
        "name": "cotton mill",
        "value": "cotton mill"
      },
      {
        "name": "cotton supplier",
        "value": "cotton supplier"
      },
      {
        "name": "countertop contractor",
        "value": "countertop contractor"
      },
      {
        "name": "countertop store",
        "value": "countertop store"
      },
      {
        "name": "country club",
        "value": "country club"
      },
      {
        "name": "country house",
        "value": "country house"
      },
      {
        "name": "country park",
        "value": "country park"
      },
      {
        "name": "courier service",
        "value": "courier service"
      },
      {
        "name": "court reporter",
        "value": "court reporter"
      },
      {
        "name": "couscous restaurant",
        "value": "couscous restaurant"
      },
      {
        "name": "coworking space",
        "value": "coworking space"
      },
      {
        "name": "crab house",
        "value": "crab house"
      },
      {
        "name": "craft store",
        "value": "craft store"
      },
      {
        "name": "cramming school",
        "value": "cramming school"
      },
      {
        "name": "crane dealer",
        "value": "crane dealer"
      },
      {
        "name": "crane service",
        "value": "crane service"
      },
      {
        "name": "craniosacral therapy",
        "value": "craniosacral therapy"
      },
      {
        "name": "credit union",
        "value": "credit union"
      },
      {
        "name": "cremation service",
        "value": "cremation service"
      },
      {
        "name": "creole restaurant",
        "value": "creole restaurant"
      },
      {
        "name": "cricket club",
        "value": "cricket club"
      },
      {
        "name": "cricket ground",
        "value": "cricket ground"
      },
      {
        "name": "cricket shop",
        "value": "cricket shop"
      },
      {
        "name": "croatian restaurant",
        "value": "croatian restaurant"
      },
      {
        "name": "crop grower",
        "value": "crop grower"
      },
      {
        "name": "croquet club",
        "value": "croquet club"
      },
      {
        "name": "cruise agency",
        "value": "cruise agency"
      },
      {
        "name": "cruise terminal",
        "value": "cruise terminal"
      },
      {
        "name": "crypto atm",
        "value": "crypto atm"
      },
      {
        "name": "cuban restaurant",
        "value": "cuban restaurant"
      },
      {
        "name": "culinary school",
        "value": "culinary school"
      },
      {
        "name": "cultural association",
        "value": "cultural association"
      },
      {
        "name": "cultural center",
        "value": "cultural center"
      },
      {
        "name": "cultural landmark",
        "value": "cultural landmark"
      },
      {
        "name": "cupcake shop",
        "value": "cupcake shop"
      },
      {
        "name": "cupra dealer",
        "value": "cupra dealer"
      },
      {
        "name": "curling club",
        "value": "curling club"
      },
      {
        "name": "curling hall",
        "value": "curling hall"
      },
      {
        "name": "curtain store",
        "value": "curtain store"
      },
      {
        "name": "custom tailor",
        "value": "custom tailor"
      },
      {
        "name": "customs broker",
        "value": "customs broker"
      },
      {
        "name": "customs consultant",
        "value": "customs consultant"
      },
      {
        "name": "customs office",
        "value": "customs office"
      },
      {
        "name": "customs warehouse",
        "value": "customs warehouse"
      },
      {
        "name": "cutlery store",
        "value": "cutlery store"
      },
      {
        "name": "cycling park",
        "value": "cycling park"
      },
      {
        "name": "czech restaurant",
        "value": "czech restaurant"
      },
      {
        "name": "dacia dealer",
        "value": "dacia dealer"
      },
      {
        "name": "daihatsu dealer",
        "value": "daihatsu dealer"
      },
      {
        "name": "dairy farm",
        "value": "dairy farm"
      },
      {
        "name": "dairy store",
        "value": "dairy store"
      },
      {
        "name": "dairy supplier",
        "value": "dairy supplier"
      },
      {
        "name": "dance club",
        "value": "dance club"
      },
      {
        "name": "dance company",
        "value": "dance company"
      },
      {
        "name": "dance hall",
        "value": "dance hall"
      },
      {
        "name": "dance pavillion",
        "value": "dance pavillion"
      },
      {
        "name": "dance restaurant",
        "value": "dance restaurant"
      },
      {
        "name": "dance school",
        "value": "dance school"
      },
      {
        "name": "dance store",
        "value": "dance store"
      },
      {
        "name": "danish restaurant",
        "value": "danish restaurant"
      },
      {
        "name": "dart bar",
        "value": "dart bar"
      },
      {
        "name": "dating service",
        "value": "dating service"
      },
      {
        "name": "day spa",
        "value": "day spa"
      },
      {
        "name": "day-use onsen",
        "value": "day-use onsen"
      },
      {
        "name": "deaf church",
        "value": "deaf church"
      },
      {
        "name": "deaf service",
        "value": "deaf service"
      },
      {
        "name": "debt collecting",
        "value": "debt collecting"
      },
      {
        "name": "decal supplier",
        "value": "decal supplier"
      },
      {
        "name": "deck builder",
        "value": "deck builder"
      },
      {
        "name": "delivery restaurant",
        "value": "delivery restaurant"
      },
      {
        "name": "delivery service",
        "value": "delivery service"
      },
      {
        "name": "demolition contractor",
        "value": "demolition contractor"
      },
      {
        "name": "dental clinic",
        "value": "dental clinic"
      },
      {
        "name": "dental hygienist",
        "value": "dental hygienist"
      },
      {
        "name": "dental laboratory",
        "value": "dental laboratory"
      },
      {
        "name": "dental radiology",
        "value": "dental radiology"
      },
      {
        "name": "dental school",
        "value": "dental school"
      },
      {
        "name": "department store",
        "value": "department store"
      },
      {
        "name": "desalination plant",
        "value": "desalination plant"
      },
      {
        "name": "design agency",
        "value": "design agency"
      },
      {
        "name": "design engineer",
        "value": "design engineer"
      },
      {
        "name": "design institute",
        "value": "design institute"
      },
      {
        "name": "dessert restaurant",
        "value": "dessert restaurant"
      },
      {
        "name": "dessert shop",
        "value": "dessert shop"
      },
      {
        "name": "detention center",
        "value": "detention center"
      },
      {
        "name": "diabetes center",
        "value": "diabetes center"
      },
      {
        "name": "diagnostic center",
        "value": "diagnostic center"
      },
      {
        "name": "dialysis center",
        "value": "dialysis center"
      },
      {
        "name": "diamond buyer",
        "value": "diamond buyer"
      },
      {
        "name": "diamond dealer",
        "value": "diamond dealer"
      },
      {
        "name": "diaper service",
        "value": "diaper service"
      },
      {
        "name": "digital printer",
        "value": "digital printer"
      },
      {
        "name": "dinner theater",
        "value": "dinner theater"
      },
      {
        "name": "dirt supplier",
        "value": "dirt supplier"
      },
      {
        "name": "disco club",
        "value": "disco club"
      },
      {
        "name": "discount store",
        "value": "discount store"
      },
      {
        "name": "discount supermarket",
        "value": "discount supermarket"
      },
      {
        "name": "distribution service",
        "value": "distribution service"
      },
      {
        "name": "district attorney",
        "value": "district attorney"
      },
      {
        "name": "district justice",
        "value": "district justice"
      },
      {
        "name": "district office",
        "value": "district office"
      },
      {
        "name": "dive club",
        "value": "dive club"
      },
      {
        "name": "dive shop",
        "value": "dive shop"
      },
      {
        "name": "diving center",
        "value": "diving center"
      },
      {
        "name": "divorce lawyer",
        "value": "divorce lawyer"
      },
      {
        "name": "divorce service",
        "value": "divorce service"
      },
      {
        "name": "dj service",
        "value": "dj service"
      },
      {
        "name": "do-it-yourself shop",
        "value": "do-it-yourself shop"
      },
      {
        "name": "dock builder",
        "value": "dock builder"
      },
      {
        "name": "dodge dealer",
        "value": "dodge dealer"
      },
      {
        "name": "dog breeder",
        "value": "dog breeder"
      },
      {
        "name": "dog cafe",
        "value": "dog cafe"
      },
      {
        "name": "dog park",
        "value": "dog park"
      },
      {
        "name": "dog trainer",
        "value": "dog trainer"
      },
      {
        "name": "dog walker",
        "value": "dog walker"
      },
      {
        "name": "dojo restaurant",
        "value": "dojo restaurant"
      },
      {
        "name": "doll store",
        "value": "doll store"
      },
      {
        "name": "dollar store",
        "value": "dollar store"
      },
      {
        "name": "domestic airport",
        "value": "domestic airport"
      },
      {
        "name": "dominican restaurant",
        "value": "dominican restaurant"
      },
      {
        "name": "donations center",
        "value": "donations center"
      },
      {
        "name": "donut shop",
        "value": "donut shop"
      },
      {
        "name": "door manufacturer",
        "value": "door manufacturer"
      },
      {
        "name": "door shop",
        "value": "door shop"
      },
      {
        "name": "door supplier",
        "value": "door supplier"
      },
      {
        "name": "door warehouse",
        "value": "door warehouse"
      },
      {
        "name": "drafting service",
        "value": "drafting service"
      },
      {
        "name": "drainage service",
        "value": "drainage service"
      },
      {
        "name": "drama school",
        "value": "drama school"
      },
      {
        "name": "drawing lessons",
        "value": "drawing lessons"
      },
      {
        "name": "dress shop",
        "value": "dress shop"
      },
      {
        "name": "dress store",
        "value": "dress store"
      },
      {
        "name": "drilling contractor",
        "value": "drilling contractor"
      },
      {
        "name": "driveshaft shop",
        "value": "driveshaft shop"
      },
      {
        "name": "driving school",
        "value": "driving school"
      },
      {
        "name": "drone service",
        "value": "drone service"
      },
      {
        "name": "drone shop",
        "value": "drone shop"
      },
      {
        "name": "drug store",
        "value": "drug store"
      },
      {
        "name": "drum school",
        "value": "drum school"
      },
      {
        "name": "drum store",
        "value": "drum store"
      },
      {
        "name": "dry cleaner",
        "value": "dry cleaner"
      },
      {
        "name": "ducati dealer",
        "value": "ducati dealer"
      },
      {
        "name": "dude ranch",
        "value": "dude ranch"
      },
      {
        "name": "dumpling restaurant",
        "value": "dumpling restaurant"
      },
      {
        "name": "durum restaurant",
        "value": "durum restaurant"
      },
      {
        "name": "dutch restaurant",
        "value": "dutch restaurant"
      },
      {
        "name": "dvd store",
        "value": "dvd store"
      },
      {
        "name": "dye store",
        "value": "dye store"
      },
      {
        "name": "dynamometer supplier",
        "value": "dynamometer supplier"
      },
      {
        "name": "e-commerce service",
        "value": "e-commerce service"
      },
      {
        "name": "eclectic restaurant",
        "value": "eclectic restaurant"
      },
      {
        "name": "ecological park",
        "value": "ecological park"
      },
      {
        "name": "ecologists association",
        "value": "ecologists association"
      },
      {
        "name": "economic consultant",
        "value": "economic consultant"
      },
      {
        "name": "ecuadorian restaurant",
        "value": "ecuadorian restaurant"
      },
      {
        "name": "education center",
        "value": "education center"
      },
      {
        "name": "education centre",
        "value": "education centre"
      },
      {
        "name": "educational consultant",
        "value": "educational consultant"
      },
      {
        "name": "educational institution",
        "value": "educational institution"
      },
      {
        "name": "egg supplier",
        "value": "egg supplier"
      },
      {
        "name": "egyptian restaurant",
        "value": "egyptian restaurant"
      },
      {
        "name": "electrical engineer",
        "value": "electrical engineer"
      },
      {
        "name": "electrical substation",
        "value": "electrical substation"
      },
      {
        "name": "electronics company",
        "value": "electronics company"
      },
      {
        "name": "electronics engineer",
        "value": "electronics engineer"
      },
      {
        "name": "electronics manufacturer",
        "value": "electronics manufacturer"
      },
      {
        "name": "electronics store",
        "value": "electronics store"
      },
      {
        "name": "electronics wholesaler",
        "value": "electronics wholesaler"
      },
      {
        "name": "elementary school",
        "value": "elementary school"
      },
      {
        "name": "elevator manufacturer",
        "value": "elevator manufacturer"
      },
      {
        "name": "elevator service",
        "value": "elevator service"
      },
      {
        "name": "embossing service",
        "value": "embossing service"
      },
      {
        "name": "embroidery service",
        "value": "embroidery service"
      },
      {
        "name": "embroidery shop",
        "value": "embroidery shop"
      },
      {
        "name": "emdr psychotherapist",
        "value": "emdr psychotherapist"
      },
      {
        "name": "emergency room",
        "value": "emergency room"
      },
      {
        "name": "emergency training",
        "value": "emergency training"
      },
      {
        "name": "employment agency",
        "value": "employment agency"
      },
      {
        "name": "employment attorney",
        "value": "employment attorney"
      },
      {
        "name": "employment center",
        "value": "employment center"
      },
      {
        "name": "employment consultant",
        "value": "employment consultant"
      },
      {
        "name": "energy supplier",
        "value": "energy supplier"
      },
      {
        "name": "engineering consultant",
        "value": "engineering consultant"
      },
      {
        "name": "engineering school",
        "value": "engineering school"
      },
      {
        "name": "english restaurant",
        "value": "english restaurant"
      },
      {
        "name": "entertainment agency",
        "value": "entertainment agency"
      },
      {
        "name": "envelope supplier",
        "value": "envelope supplier"
      },
      {
        "name": "environment office",
        "value": "environment office"
      },
      {
        "name": "environmental consultant",
        "value": "environmental consultant"
      },
      {
        "name": "environmental engineer",
        "value": "environmental engineer"
      },
      {
        "name": "environmental organization",
        "value": "environmental organization"
      },
      {
        "name": "episcopal church",
        "value": "episcopal church"
      },
      {
        "name": "equestrian club",
        "value": "equestrian club"
      },
      {
        "name": "equestrian facility",
        "value": "equestrian facility"
      },
      {
        "name": "equestrian store",
        "value": "equestrian store"
      },
      {
        "name": "equipment exporter",
        "value": "equipment exporter"
      },
      {
        "name": "equipment importer",
        "value": "equipment importer"
      },
      {
        "name": "equipment supplier",
        "value": "equipment supplier"
      },
      {
        "name": "eritrean restaurant",
        "value": "eritrean restaurant"
      },
      {
        "name": "erotic massage",
        "value": "erotic massage"
      },
      {
        "name": "escrow service",
        "value": "escrow service"
      },
      {
        "name": "espresso bar",
        "value": "espresso bar"
      },
      {
        "name": "estate agent",
        "value": "estate agent"
      },
      {
        "name": "estate appraiser",
        "value": "estate appraiser"
      },
      {
        "name": "estate liquidator",
        "value": "estate liquidator"
      },
      {
        "name": "ethiopian restaurant",
        "value": "ethiopian restaurant"
      },
      {
        "name": "ethnographic museum",
        "value": "ethnographic museum"
      },
      {
        "name": "european restaurant",
        "value": "european restaurant"
      },
      {
        "name": "evangelical church",
        "value": "evangelical church"
      },
      {
        "name": "evening school",
        "value": "evening school"
      },
      {
        "name": "event planner",
        "value": "event planner"
      },
      {
        "name": "event venue",
        "value": "event venue"
      },
      {
        "name": "excavating contractor",
        "value": "excavating contractor"
      },
      {
        "name": "exhibition planner",
        "value": "exhibition planner"
      },
      {
        "name": "eyebrow bar",
        "value": "eyebrow bar"
      },
      {
        "name": "eyelash salon",
        "value": "eyelash salon"
      },
      {
        "name": "fabric store",
        "value": "fabric store"
      },
      {
        "name": "fabric wholesaler",
        "value": "fabric wholesaler"
      },
      {
        "name": "fabrication engineer",
        "value": "fabrication engineer"
      },
      {
        "name": "facial spa",
        "value": "facial spa"
      },
      {
        "name": "falafel restaurant",
        "value": "falafel restaurant"
      },
      {
        "name": "family counselor",
        "value": "family counselor"
      },
      {
        "name": "family restaurant",
        "value": "family restaurant"
      },
      {
        "name": "farm bureau",
        "value": "farm bureau"
      },
      {
        "name": "farm school",
        "value": "farm school"
      },
      {
        "name": "farm shop",
        "value": "farm shop"
      },
      {
        "name": "farmers' market",
        "value": "farmers' market"
      },
      {
        "name": "farrier service",
        "value": "farrier service"
      },
      {
        "name": "fashion designer",
        "value": "fashion designer"
      },
      {
        "name": "fast food",
        "value": "fast food"
      },
      {
        "name": "fastener supplier",
        "value": "fastener supplier"
      },
      {
        "name": "fax service",
        "value": "fax service"
      },
      {
        "name": "federal police",
        "value": "federal police"
      },
      {
        "name": "feed manufacturer",
        "value": "feed manufacturer"
      },
      {
        "name": "fence contractor",
        "value": "fence contractor"
      },
      {
        "name": "fencing salon",
        "value": "fencing salon"
      },
      {
        "name": "fencing school",
        "value": "fencing school"
      },
      {
        "name": "ferrari dealer",
        "value": "ferrari dealer"
      },
      {
        "name": "ferris wheel",
        "value": "ferris wheel"
      },
      {
        "name": "ferry service",
        "value": "ferry service"
      },
      {
        "name": "fertility clinic",
        "value": "fertility clinic"
      },
      {
        "name": "fertility physician",
        "value": "fertility physician"
      },
      {
        "name": "fertilizer supplier",
        "value": "fertilizer supplier"
      },
      {
        "name": "festival hall",
        "value": "festival hall"
      },
      {
        "name": "fiat dealer",
        "value": "fiat dealer"
      },
      {
        "name": "fiberglass supplier",
        "value": "fiberglass supplier"
      },
      {
        "name": "figurine shop",
        "value": "figurine shop"
      },
      {
        "name": "filipino restaurant",
        "value": "filipino restaurant"
      },
      {
        "name": "filtration plant",
        "value": "filtration plant"
      },
      {
        "name": "finance broker",
        "value": "finance broker"
      },
      {
        "name": "financial advisor",
        "value": "financial advisor"
      },
      {
        "name": "financial audit",
        "value": "financial audit"
      },
      {
        "name": "financial consultant",
        "value": "financial consultant"
      },
      {
        "name": "financial institution",
        "value": "financial institution"
      },
      {
        "name": "financial planner",
        "value": "financial planner"
      },
      {
        "name": "fingerprinting service",
        "value": "fingerprinting service"
      },
      {
        "name": "finnish restaurant",
        "value": "finnish restaurant"
      },
      {
        "name": "fire station",
        "value": "fire station"
      },
      {
        "name": "firearms academy",
        "value": "firearms academy"
      },
      {
        "name": "fireplace manufacturer",
        "value": "fireplace manufacturer"
      },
      {
        "name": "fireplace store",
        "value": "fireplace store"
      },
      {
        "name": "firewood supplier",
        "value": "firewood supplier"
      },
      {
        "name": "fireworks store",
        "value": "fireworks store"
      },
      {
        "name": "fireworks supplier",
        "value": "fireworks supplier"
      },
      {
        "name": "fish farm",
        "value": "fish farm"
      },
      {
        "name": "fish processing",
        "value": "fish processing"
      },
      {
        "name": "fish restaurant",
        "value": "fish restaurant"
      },
      {
        "name": "fish spa",
        "value": "fish spa"
      },
      {
        "name": "fish store",
        "value": "fish store"
      },
      {
        "name": "fishing camp",
        "value": "fishing camp"
      },
      {
        "name": "fishing charter",
        "value": "fishing charter"
      },
      {
        "name": "fishing club",
        "value": "fishing club"
      },
      {
        "name": "fishing pier",
        "value": "fishing pier"
      },
      {
        "name": "fishing pond",
        "value": "fishing pond"
      },
      {
        "name": "fishing store",
        "value": "fishing store"
      },
      {
        "name": "fitness center",
        "value": "fitness center"
      },
      {
        "name": "fitness centre",
        "value": "fitness centre"
      },
      {
        "name": "flag store",
        "value": "flag store"
      },
      {
        "name": "flamenco school",
        "value": "flamenco school"
      },
      {
        "name": "flamenco theater",
        "value": "flamenco theater"
      },
      {
        "name": "flea market",
        "value": "flea market"
      },
      {
        "name": "flight school",
        "value": "flight school"
      },
      {
        "name": "floating market",
        "value": "floating market"
      },
      {
        "name": "flooring contractor",
        "value": "flooring contractor"
      },
      {
        "name": "flooring store",
        "value": "flooring store"
      },
      {
        "name": "floridian restaurant",
        "value": "floridian restaurant"
      },
      {
        "name": "flour mill",
        "value": "flour mill"
      },
      {
        "name": "flower delivery",
        "value": "flower delivery"
      },
      {
        "name": "flower designer",
        "value": "flower designer"
      },
      {
        "name": "flower market",
        "value": "flower market"
      },
      {
        "name": "fmcg manufacturer",
        "value": "fmcg manufacturer"
      },
      {
        "name": "fondue restaurant",
        "value": "fondue restaurant"
      },
      {
        "name": "food bank",
        "value": "food bank"
      },
      {
        "name": "food broker",
        "value": "food broker"
      },
      {
        "name": "food court",
        "value": "food court"
      },
      {
        "name": "food manufacturer",
        "value": "food manufacturer"
      },
      {
        "name": "food producer",
        "value": "food producer"
      },
      {
        "name": "food store",
        "value": "food store"
      },
      {
        "name": "foot bath",
        "value": "foot bath"
      },
      {
        "name": "foot care",
        "value": "foot care"
      },
      {
        "name": "football club",
        "value": "football club"
      },
      {
        "name": "football field",
        "value": "football field"
      },
      {
        "name": "footwear wholesaler",
        "value": "footwear wholesaler"
      },
      {
        "name": "ford dealer",
        "value": "ford dealer"
      },
      {
        "name": "foreclosure service",
        "value": "foreclosure service"
      },
      {
        "name": "foreign consulate",
        "value": "foreign consulate"
      },
      {
        "name": "forensic consultant",
        "value": "forensic consultant"
      },
      {
        "name": "forestry service",
        "value": "forestry service"
      },
      {
        "name": "forklift dealer",
        "value": "forklift dealer"
      },
      {
        "name": "fountain contractor",
        "value": "fountain contractor"
      },
      {
        "name": "foursquare church",
        "value": "foursquare church"
      },
      {
        "name": "franconian restaurant",
        "value": "franconian restaurant"
      },
      {
        "name": "fraternal organization",
        "value": "fraternal organization"
      },
      {
        "name": "free clinic",
        "value": "free clinic"
      },
      {
        "name": "freestyle wrestling",
        "value": "freestyle wrestling"
      },
      {
        "name": "french restaurant",
        "value": "french restaurant"
      },
      {
        "name": "friends church",
        "value": "friends church"
      },
      {
        "name": "fruit parlor",
        "value": "fruit parlor"
      },
      {
        "name": "fruit wholesaler",
        "value": "fruit wholesaler"
      },
      {
        "name": "fruits wholesaler",
        "value": "fruits wholesaler"
      },
      {
        "name": "fuel pump",
        "value": "fuel pump"
      },
      {
        "name": "fuel supplier",
        "value": "fuel supplier"
      },
      {
        "name": "fugu restaurant",
        "value": "fugu restaurant"
      },
      {
        "name": "funeral director",
        "value": "funeral director"
      },
      {
        "name": "funeral home",
        "value": "funeral home"
      },
      {
        "name": "fur manufacturer",
        "value": "fur manufacturer"
      },
      {
        "name": "fur service",
        "value": "fur service"
      },
      {
        "name": "furnace store",
        "value": "furnace store"
      },
      {
        "name": "furniture accessories",
        "value": "furniture accessories"
      },
      {
        "name": "furniture maker",
        "value": "furniture maker"
      },
      {
        "name": "furniture manufacturer",
        "value": "furniture manufacturer"
      },
      {
        "name": "furniture store",
        "value": "furniture store"
      },
      {
        "name": "furniture wholesaler",
        "value": "furniture wholesaler"
      },
      {
        "name": "fusion restaurant",
        "value": "fusion restaurant"
      },
      {
        "name": "futon store",
        "value": "futon store"
      },
      {
        "name": "futsal court",
        "value": "futsal court"
      },
      {
        "name": "galician restaurant",
        "value": "galician restaurant"
      },
      {
        "name": "gambling house",
        "value": "gambling house"
      },
      {
        "name": "gambling instructor",
        "value": "gambling instructor"
      },
      {
        "name": "game store",
        "value": "game store"
      },
      {
        "name": "garage builder",
        "value": "garage builder"
      },
      {
        "name": "garbage dump",
        "value": "garbage dump"
      },
      {
        "name": "garden center",
        "value": "garden center"
      },
      {
        "name": "garment exporter",
        "value": "garment exporter"
      },
      {
        "name": "gas company",
        "value": "gas company"
      },
      {
        "name": "gas engineer",
        "value": "gas engineer"
      },
      {
        "name": "gas shop",
        "value": "gas shop"
      },
      {
        "name": "gas station",
        "value": "gas station"
      },
      {
        "name": "gasket manufacturer",
        "value": "gasket manufacturer"
      },
      {
        "name": "gastrointestinal surgeon",
        "value": "gastrointestinal surgeon"
      },
      {
        "name": "gated community",
        "value": "gated community"
      },
      {
        "name": "gay bar",
        "value": "gay bar"
      },
      {
        "name": "gay sauna",
        "value": "gay sauna"
      },
      {
        "name": "gazebo builder",
        "value": "gazebo builder"
      },
      {
        "name": "general contractor",
        "value": "general contractor"
      },
      {
        "name": "general hospital",
        "value": "general hospital"
      },
      {
        "name": "general practitioner",
        "value": "general practitioner"
      },
      {
        "name": "general store",
        "value": "general store"
      },
      {
        "name": "genesis dealer",
        "value": "genesis dealer"
      },
      {
        "name": "geological service",
        "value": "geological service"
      },
      {
        "name": "georgian restaurant",
        "value": "georgian restaurant"
      },
      {
        "name": "geotechnical engineer",
        "value": "geotechnical engineer"
      },
      {
        "name": "german restaurant",
        "value": "german restaurant"
      },
      {
        "name": "ghost town",
        "value": "ghost town"
      },
      {
        "name": "gift shop",
        "value": "gift shop"
      },
      {
        "name": "gimbap restaurant",
        "value": "gimbap restaurant"
      },
      {
        "name": "girl bar",
        "value": "girl bar"
      },
      {
        "name": "girls' hostel",
        "value": "girls' hostel"
      },
      {
        "name": "glass blower",
        "value": "glass blower"
      },
      {
        "name": "glass industry",
        "value": "glass industry"
      },
      {
        "name": "glass manufacturer",
        "value": "glass manufacturer"
      },
      {
        "name": "glass merchant",
        "value": "glass merchant"
      },
      {
        "name": "glass shop",
        "value": "glass shop"
      },
      {
        "name": "glassware manufacturer",
        "value": "glassware manufacturer"
      },
      {
        "name": "glassware store",
        "value": "glassware store"
      },
      {
        "name": "glassware wholesaler",
        "value": "glassware wholesaler"
      },
      {
        "name": "gluten-free restaurant",
        "value": "gluten-free restaurant"
      },
      {
        "name": "gmc dealer",
        "value": "gmc dealer"
      },
      {
        "name": "goan restaurant",
        "value": "goan restaurant"
      },
      {
        "name": "gold dealer",
        "value": "gold dealer"
      },
      {
        "name": "goldfish store",
        "value": "goldfish store"
      },
      {
        "name": "golf club",
        "value": "golf club"
      },
      {
        "name": "golf course",
        "value": "golf course"
      },
      {
        "name": "golf instructor",
        "value": "golf instructor"
      },
      {
        "name": "golf shop",
        "value": "golf shop"
      },
      {
        "name": "gospel church",
        "value": "gospel church"
      },
      {
        "name": "government college",
        "value": "government college"
      },
      {
        "name": "government hospital",
        "value": "government hospital"
      },
      {
        "name": "government office",
        "value": "government office"
      },
      {
        "name": "government school",
        "value": "government school"
      },
      {
        "name": "gps supplier",
        "value": "gps supplier"
      },
      {
        "name": "graduate school",
        "value": "graduate school"
      },
      {
        "name": "grain elevator",
        "value": "grain elevator"
      },
      {
        "name": "grammar school",
        "value": "grammar school"
      },
      {
        "name": "granite supplier",
        "value": "granite supplier"
      },
      {
        "name": "graphic designer",
        "value": "graphic designer"
      },
      {
        "name": "gravel pit",
        "value": "gravel pit"
      },
      {
        "name": "gravel plant",
        "value": "gravel plant"
      },
      {
        "name": "greek restaurant",
        "value": "greek restaurant"
      },
      {
        "name": "greyhound stadium",
        "value": "greyhound stadium"
      },
      {
        "name": "grill store",
        "value": "grill store"
      },
      {
        "name": "grocery store",
        "value": "grocery store"
      },
      {
        "name": "group accommodation",
        "value": "group accommodation"
      },
      {
        "name": "group home",
        "value": "group home"
      },
      {
        "name": "grow shop",
        "value": "grow shop"
      },
      {
        "name": "guardia civil",
        "value": "guardia civil"
      },
      {
        "name": "guatemalan restaurant",
        "value": "guatemalan restaurant"
      },
      {
        "name": "guest house",
        "value": "guest house"
      },
      {
        "name": "guitar instructor",
        "value": "guitar instructor"
      },
      {
        "name": "guitar store",
        "value": "guitar store"
      },
      {
        "name": "gujarati restaurant",
        "value": "gujarati restaurant"
      },
      {
        "name": "gun club",
        "value": "gun club"
      },
      {
        "name": "gun shop",
        "value": "gun shop"
      },
      {
        "name": "gutter service",
        "value": "gutter service"
      },
      {
        "name": "gymnasium school",
        "value": "gymnasium school"
      },
      {
        "name": "gymnastics center",
        "value": "gymnastics center"
      },
      {
        "name": "gymnastics club",
        "value": "gymnastics club"
      },
      {
        "name": "gyro restaurant",
        "value": "gyro restaurant"
      },
      {
        "name": "gyudon restaurant",
        "value": "gyudon restaurant"
      },
      {
        "name": "hair salon",
        "value": "hair salon"
      },
      {
        "name": "haitian restaurant",
        "value": "haitian restaurant"
      },
      {
        "name": "hakka restaurant",
        "value": "hakka restaurant"
      },
      {
        "name": "halal restaurant",
        "value": "halal restaurant"
      },
      {
        "name": "haleem restaurant",
        "value": "haleem restaurant"
      },
      {
        "name": "halfway house",
        "value": "halfway house"
      },
      {
        "name": "ham shop",
        "value": "ham shop"
      },
      {
        "name": "hamburger restaurant",
        "value": "hamburger restaurant"
      },
      {
        "name": "hand surgeon",
        "value": "hand surgeon"
      },
      {
        "name": "handbags shop",
        "value": "handbags shop"
      },
      {
        "name": "handball club",
        "value": "handball club"
      },
      {
        "name": "handball court",
        "value": "handball court"
      },
      {
        "name": "handicraft exporter",
        "value": "handicraft exporter"
      },
      {
        "name": "handicraft fair",
        "value": "handicraft fair"
      },
      {
        "name": "handicraft museum",
        "value": "handicraft museum"
      },
      {
        "name": "handicraft school",
        "value": "handicraft school"
      },
      {
        "name": "handicrafts wholesaler",
        "value": "handicrafts wholesaler"
      },
      {
        "name": "hardware shop",
        "value": "hardware shop"
      },
      {
        "name": "hardware store",
        "value": "hardware store"
      },
      {
        "name": "harley-davidson dealer",
        "value": "harley-davidson dealer"
      },
      {
        "name": "hat shop",
        "value": "hat shop"
      },
      {
        "name": "haunted house",
        "value": "haunted house"
      },
      {
        "name": "hawaiian restaurant",
        "value": "hawaiian restaurant"
      },
      {
        "name": "hawker stall",
        "value": "hawker stall"
      },
      {
        "name": "hay supplier",
        "value": "hay supplier"
      },
      {
        "name": "health consultant",
        "value": "health consultant"
      },
      {
        "name": "health counselor",
        "value": "health counselor"
      },
      {
        "name": "health resort",
        "value": "health resort"
      },
      {
        "name": "health spa",
        "value": "health spa"
      },
      {
        "name": "heart hospital",
        "value": "heart hospital"
      },
      {
        "name": "heating contractor",
        "value": "heating contractor"
      },
      {
        "name": "height works",
        "value": "height works"
      },
      {
        "name": "helicopter charter",
        "value": "helicopter charter"
      },
      {
        "name": "herb shop",
        "value": "herb shop"
      },
      {
        "name": "heritage building",
        "value": "heritage building"
      },
      {
        "name": "heritage museum",
        "value": "heritage museum"
      },
      {
        "name": "heritage preservation",
        "value": "heritage preservation"
      },
      {
        "name": "heritage railroad",
        "value": "heritage railroad"
      },
      {
        "name": "high school",
        "value": "high school"
      },
      {
        "name": "highway patrol",
        "value": "highway patrol"
      },
      {
        "name": "hiking area",
        "value": "hiking area"
      },
      {
        "name": "hiking guide",
        "value": "hiking guide"
      },
      {
        "name": "hindu priest",
        "value": "hindu priest"
      },
      {
        "name": "hindu temple",
        "value": "hindu temple"
      },
      {
        "name": "hispanic church",
        "value": "hispanic church"
      },
      {
        "name": "historical landmark",
        "value": "historical landmark"
      },
      {
        "name": "historical place",
        "value": "historical place"
      },
      {
        "name": "historical society",
        "value": "historical society"
      },
      {
        "name": "history museum",
        "value": "history museum"
      },
      {
        "name": "hoagie restaurant",
        "value": "hoagie restaurant"
      },
      {
        "name": "hobby store",
        "value": "hobby store"
      },
      {
        "name": "hockey club",
        "value": "hockey club"
      },
      {
        "name": "hockey field",
        "value": "hockey field"
      },
      {
        "name": "hockey rink",
        "value": "hockey rink"
      },
      {
        "name": "holding company",
        "value": "holding company"
      },
      {
        "name": "holiday apartment",
        "value": "holiday apartment"
      },
      {
        "name": "holiday flat",
        "value": "holiday flat"
      },
      {
        "name": "holiday home",
        "value": "holiday home"
      },
      {
        "name": "holiday park",
        "value": "holiday park"
      },
      {
        "name": "home builder",
        "value": "home builder"
      },
      {
        "name": "home help",
        "value": "home help"
      },
      {
        "name": "home inspector",
        "value": "home inspector"
      },
      {
        "name": "homekill service",
        "value": "homekill service"
      },
      {
        "name": "homeless service",
        "value": "homeless service"
      },
      {
        "name": "homeless shelter",
        "value": "homeless shelter"
      },
      {
        "name": "homeopathic pharmacy",
        "value": "homeopathic pharmacy"
      },
      {
        "name": "homeowners' association",
        "value": "homeowners' association"
      },
      {
        "name": "homewares shop",
        "value": "homewares shop"
      },
      {
        "name": "honda dealer",
        "value": "honda dealer"
      },
      {
        "name": "honduran restaurant",
        "value": "honduran restaurant"
      },
      {
        "name": "honey farm",
        "value": "honey farm"
      },
      {
        "name": "hookah bar",
        "value": "hookah bar"
      },
      {
        "name": "hookah store",
        "value": "hookah store"
      },
      {
        "name": "horse breeder",
        "value": "horse breeder"
      },
      {
        "name": "horse trainer",
        "value": "horse trainer"
      },
      {
        "name": "horseshoe smith",
        "value": "horseshoe smith"
      },
      {
        "name": "horsestable studfarm",
        "value": "horsestable studfarm"
      },
      {
        "name": "hose supplier",
        "value": "hose supplier"
      },
      {
        "name": "hospital department",
        "value": "hospital department"
      },
      {
        "name": "host club",
        "value": "host club"
      },
      {
        "name": "house sitter",
        "value": "house sitter"
      },
      {
        "name": "housing association",
        "value": "housing association"
      },
      {
        "name": "housing authority",
        "value": "housing authority"
      },
      {
        "name": "housing complex",
        "value": "housing complex"
      },
      {
        "name": "housing cooperative",
        "value": "housing cooperative"
      },
      {
        "name": "housing development",
        "value": "housing development"
      },
      {
        "name": "housing society",
        "value": "housing society"
      },
      {
        "name": "hungarian restaurant",
        "value": "hungarian restaurant"
      },
      {
        "name": "hunting area",
        "value": "hunting area"
      },
      {
        "name": "hunting club",
        "value": "hunting club"
      },
      {
        "name": "hunting preserve",
        "value": "hunting preserve"
      },
      {
        "name": "hunting store",
        "value": "hunting store"
      },
      {
        "name": "hvac contractor",
        "value": "hvac contractor"
      },
      {
        "name": "hyderabadi restaurant",
        "value": "hyderabadi restaurant"
      },
      {
        "name": "hydraulic engineer",
        "value": "hydraulic engineer"
      },
      {
        "name": "hypnotherapy service",
        "value": "hypnotherapy service"
      },
      {
        "name": "hyundai dealer",
        "value": "hyundai dealer"
      },
      {
        "name": "ice supplier",
        "value": "ice supplier"
      },
      {
        "name": "icelandic restaurant",
        "value": "icelandic restaurant"
      },
      {
        "name": "icse school",
        "value": "icse school"
      },
      {
        "name": "image consultant",
        "value": "image consultant"
      },
      {
        "name": "imax theater",
        "value": "imax theater"
      },
      {
        "name": "immigration attorney",
        "value": "immigration attorney"
      },
      {
        "name": "impermeabilization service",
        "value": "impermeabilization service"
      },
      {
        "name": "incense supplier",
        "value": "incense supplier"
      },
      {
        "name": "incineration plant",
        "value": "incineration plant"
      },
      {
        "name": "indian restaurant",
        "value": "indian restaurant"
      },
      {
        "name": "indian takeaway",
        "value": "indian takeaway"
      },
      {
        "name": "indonesian restaurant",
        "value": "indonesian restaurant"
      },
      {
        "name": "indoor cycling",
        "value": "indoor cycling"
      },
      {
        "name": "indoor lodging",
        "value": "indoor lodging"
      },
      {
        "name": "indoor playground",
        "value": "indoor playground"
      },
      {
        "name": "indoor snowcenter",
        "value": "indoor snowcenter"
      },
      {
        "name": "industrial consultant",
        "value": "industrial consultant"
      },
      {
        "name": "industrial engineer",
        "value": "industrial engineer"
      },
      {
        "name": "industrial supermarket",
        "value": "industrial supermarket"
      },
      {
        "name": "infiniti dealer",
        "value": "infiniti dealer"
      },
      {
        "name": "information services",
        "value": "information services"
      },
      {
        "name": "insolvency service",
        "value": "insolvency service"
      },
      {
        "name": "installation service",
        "value": "installation service"
      },
      {
        "name": "instrumentation engineer",
        "value": "instrumentation engineer"
      },
      {
        "name": "insulation contractor",
        "value": "insulation contractor"
      },
      {
        "name": "insulator supplier",
        "value": "insulator supplier"
      },
      {
        "name": "insurance agency",
        "value": "insurance agency"
      },
      {
        "name": "insurance attorney",
        "value": "insurance attorney"
      },
      {
        "name": "insurance broker",
        "value": "insurance broker"
      },
      {
        "name": "insurance company",
        "value": "insurance company"
      },
      {
        "name": "interior decoration",
        "value": "interior decoration"
      },
      {
        "name": "interior decorator",
        "value": "interior decorator"
      },
      {
        "name": "interior designer",
        "value": "interior designer"
      },
      {
        "name": "international airport",
        "value": "international airport"
      },
      {
        "name": "international school",
        "value": "international school"
      },
      {
        "name": "internet cafe",
        "value": "internet cafe"
      },
      {
        "name": "internet shop",
        "value": "internet shop"
      },
      {
        "name": "investment bank",
        "value": "investment bank"
      },
      {
        "name": "investment company",
        "value": "investment company"
      },
      {
        "name": "investment service",
        "value": "investment service"
      },
      {
        "name": "irish pub",
        "value": "irish pub"
      },
      {
        "name": "irish restaurant",
        "value": "irish restaurant"
      },
      {
        "name": "iron works",
        "value": "iron works"
      },
      {
        "name": "israeli restaurant",
        "value": "israeli restaurant"
      },
      {
        "name": "isuzu dealer",
        "value": "isuzu dealer"
      },
      {
        "name": "italian restaurant",
        "value": "italian restaurant"
      },
      {
        "name": "izakaya restaurant",
        "value": "izakaya restaurant"
      },
      {
        "name": "jaguar dealer",
        "value": "jaguar dealer"
      },
      {
        "name": "jain temple",
        "value": "jain temple"
      },
      {
        "name": "jamaican restaurant",
        "value": "jamaican restaurant"
      },
      {
        "name": "janitorial service",
        "value": "janitorial service"
      },
      {
        "name": "japanese delicatessen",
        "value": "japanese delicatessen"
      },
      {
        "name": "japanese inn",
        "value": "japanese inn"
      },
      {
        "name": "japanese restaurant",
        "value": "japanese restaurant"
      },
      {
        "name": "japanese steakhouse",
        "value": "japanese steakhouse"
      },
      {
        "name": "javanese restaurant",
        "value": "javanese restaurant"
      },
      {
        "name": "jazz club",
        "value": "jazz club"
      },
      {
        "name": "jeans shop",
        "value": "jeans shop"
      },
      {
        "name": "jeep dealer",
        "value": "jeep dealer"
      },
      {
        "name": "jewellery store",
        "value": "jewellery store"
      },
      {
        "name": "jewelry appraiser",
        "value": "jewelry appraiser"
      },
      {
        "name": "jewelry buyer",
        "value": "jewelry buyer"
      },
      {
        "name": "jewelry designer",
        "value": "jewelry designer"
      },
      {
        "name": "jewelry engraver",
        "value": "jewelry engraver"
      },
      {
        "name": "jewelry exporter",
        "value": "jewelry exporter"
      },
      {
        "name": "jewelry manufacturer",
        "value": "jewelry manufacturer"
      },
      {
        "name": "jewelry store",
        "value": "jewelry store"
      },
      {
        "name": "jewish restaurant",
        "value": "jewish restaurant"
      },
      {
        "name": "judaica store",
        "value": "judaica store"
      },
      {
        "name": "judicial auction",
        "value": "judicial auction"
      },
      {
        "name": "judicial scrivener",
        "value": "judicial scrivener"
      },
      {
        "name": "judo club",
        "value": "judo club"
      },
      {
        "name": "judo school",
        "value": "judo school"
      },
      {
        "name": "juice shop",
        "value": "juice shop"
      },
      {
        "name": "jujitsu school",
        "value": "jujitsu school"
      },
      {
        "name": "junior college",
        "value": "junior college"
      },
      {
        "name": "junk dealer",
        "value": "junk dealer"
      },
      {
        "name": "justice department",
        "value": "justice department"
      },
      {
        "name": "jute exporter",
        "value": "jute exporter"
      },
      {
        "name": "jute mill",
        "value": "jute mill"
      },
      {
        "name": "kabaddi club",
        "value": "kabaddi club"
      },
      {
        "name": "kaiseki restaurant",
        "value": "kaiseki restaurant"
      },
      {
        "name": "karaoke bar",
        "value": "karaoke bar"
      },
      {
        "name": "karate club",
        "value": "karate club"
      },
      {
        "name": "karate school",
        "value": "karate school"
      },
      {
        "name": "karma dealer",
        "value": "karma dealer"
      },
      {
        "name": "karnataka restaurant",
        "value": "karnataka restaurant"
      },
      {
        "name": "kashmiri restaurant",
        "value": "kashmiri restaurant"
      },
      {
        "name": "kazakhstani restaurant",
        "value": "kazakhstani restaurant"
      },
      {
        "name": "kebab shop",
        "value": "kebab shop"
      },
      {
        "name": "kerala restaurant",
        "value": "kerala restaurant"
      },
      {
        "name": "kerosene supplier",
        "value": "kerosene supplier"
      },
      {
        "name": "kia dealer",
        "value": "kia dealer"
      },
      {
        "name": "kickboxing school",
        "value": "kickboxing school"
      },
      {
        "name": "kimono store",
        "value": "kimono store"
      },
      {
        "name": "kitchen remodeler",
        "value": "kitchen remodeler"
      },
      {
        "name": "kitchen renovator",
        "value": "kitchen renovator"
      },
      {
        "name": "kite shop",
        "value": "kite shop"
      },
      {
        "name": "knife store",
        "value": "knife store"
      },
      {
        "name": "knit shop",
        "value": "knit shop"
      },
      {
        "name": "knitting instructor",
        "value": "knitting instructor"
      },
      {
        "name": "knitwear manufacturer",
        "value": "knitwear manufacturer"
      },
      {
        "name": "kofta restaurant",
        "value": "kofta restaurant"
      },
      {
        "name": "konkani restaurant",
        "value": "konkani restaurant"
      },
      {
        "name": "korean church",
        "value": "korean church"
      },
      {
        "name": "korean restaurant",
        "value": "korean restaurant"
      },
      {
        "name": "koshari restaurant",
        "value": "koshari restaurant"
      },
      {
        "name": "kosher restaurant",
        "value": "kosher restaurant"
      },
      {
        "name": "kushiyaki restaurant",
        "value": "kushiyaki restaurant"
      },
      {
        "name": "labor union",
        "value": "labor union"
      },
      {
        "name": "ladder supplier",
        "value": "ladder supplier"
      },
      {
        "name": "lamborghini dealer",
        "value": "lamborghini dealer"
      },
      {
        "name": "lamination service",
        "value": "lamination service"
      },
      {
        "name": "lancia dealer",
        "value": "lancia dealer"
      },
      {
        "name": "land allotment",
        "value": "land allotment"
      },
      {
        "name": "land surveyor",
        "value": "land surveyor"
      },
      {
        "name": "landscape architect",
        "value": "landscape architect"
      },
      {
        "name": "landscape designer",
        "value": "landscape designer"
      },
      {
        "name": "landscape gardener",
        "value": "landscape gardener"
      },
      {
        "name": "language school",
        "value": "language school"
      },
      {
        "name": "laotian restaurant",
        "value": "laotian restaurant"
      },
      {
        "name": "lasik surgeon",
        "value": "lasik surgeon"
      },
      {
        "name": "laundry service",
        "value": "laundry service"
      },
      {
        "name": "law firm",
        "value": "law firm"
      },
      {
        "name": "law library",
        "value": "law library"
      },
      {
        "name": "law school",
        "value": "law school"
      },
      {
        "name": "lawyers association",
        "value": "lawyers association"
      },
      {
        "name": "leagues club",
        "value": "leagues club"
      },
      {
        "name": "learning center",
        "value": "learning center"
      },
      {
        "name": "leasing service",
        "value": "leasing service"
      },
      {
        "name": "leather exporter",
        "value": "leather exporter"
      },
      {
        "name": "leather wholesaler",
        "value": "leather wholesaler"
      },
      {
        "name": "lebanese restaurant",
        "value": "lebanese restaurant"
      },
      {
        "name": "lechon restaurant",
        "value": "lechon restaurant"
      },
      {
        "name": "legal services",
        "value": "legal services"
      },
      {
        "name": "leisure centre",
        "value": "leisure centre"
      },
      {
        "name": "lesbian bar",
        "value": "lesbian bar"
      },
      {
        "name": "lexus dealer",
        "value": "lexus dealer"
      },
      {
        "name": "license bureau",
        "value": "license bureau"
      },
      {
        "name": "life coach",
        "value": "life coach"
      },
      {
        "name": "lighting consultant",
        "value": "lighting consultant"
      },
      {
        "name": "lighting contractor",
        "value": "lighting contractor"
      },
      {
        "name": "lighting manufacturer",
        "value": "lighting manufacturer"
      },
      {
        "name": "lighting store",
        "value": "lighting store"
      },
      {
        "name": "ligurian restaurant",
        "value": "ligurian restaurant"
      },
      {
        "name": "limousine service",
        "value": "limousine service"
      },
      {
        "name": "linens store",
        "value": "linens store"
      },
      {
        "name": "lingerie manufacturer",
        "value": "lingerie manufacturer"
      },
      {
        "name": "lingerie store",
        "value": "lingerie store"
      },
      {
        "name": "lingerie wholesaler",
        "value": "lingerie wholesaler"
      },
      {
        "name": "linoleum store",
        "value": "linoleum store"
      },
      {
        "name": "liquor store",
        "value": "liquor store"
      },
      {
        "name": "literacy program",
        "value": "literacy program"
      },
      {
        "name": "lithuanian restaurant",
        "value": "lithuanian restaurant"
      },
      {
        "name": "livery company",
        "value": "livery company"
      },
      {
        "name": "livestock breeder",
        "value": "livestock breeder"
      },
      {
        "name": "livestock dealer",
        "value": "livestock dealer"
      },
      {
        "name": "livestock producer",
        "value": "livestock producer"
      },
      {
        "name": "loan agency",
        "value": "loan agency"
      },
      {
        "name": "lock store",
        "value": "lock store"
      },
      {
        "name": "locks supplier",
        "value": "locks supplier"
      },
      {
        "name": "log cabins",
        "value": "log cabins"
      },
      {
        "name": "logging contractor",
        "value": "logging contractor"
      },
      {
        "name": "logistics service",
        "value": "logistics service"
      },
      {
        "name": "lombardian restaurant",
        "value": "lombardian restaurant"
      },
      {
        "name": "loss adjuster",
        "value": "loss adjuster"
      },
      {
        "name": "lottery retailer",
        "value": "lottery retailer"
      },
      {
        "name": "lottery shop",
        "value": "lottery shop"
      },
      {
        "name": "love hotel",
        "value": "love hotel"
      },
      {
        "name": "lpg conversion",
        "value": "lpg conversion"
      },
      {
        "name": "luggage store",
        "value": "luggage store"
      },
      {
        "name": "luggage wholesaler",
        "value": "luggage wholesaler"
      },
      {
        "name": "lumber store",
        "value": "lumber store"
      },
      {
        "name": "lunch restaurant",
        "value": "lunch restaurant"
      },
      {
        "name": "lutheran church",
        "value": "lutheran church"
      },
      {
        "name": "machine construction",
        "value": "machine construction"
      },
      {
        "name": "machine shop",
        "value": "machine shop"
      },
      {
        "name": "machine workshop",
        "value": "machine workshop"
      },
      {
        "name": "machining manufacturer",
        "value": "machining manufacturer"
      },
      {
        "name": "macrobiotic restaurant",
        "value": "macrobiotic restaurant"
      },
      {
        "name": "madrilian restaurant",
        "value": "madrilian restaurant"
      },
      {
        "name": "magazine store",
        "value": "magazine store"
      },
      {
        "name": "magic store",
        "value": "magic store"
      },
      {
        "name": "mailbox supplier",
        "value": "mailbox supplier"
      },
      {
        "name": "mailing service",
        "value": "mailing service"
      },
      {
        "name": "majorcan restaurant",
        "value": "majorcan restaurant"
      },
      {
        "name": "make-up artist",
        "value": "make-up artist"
      },
      {
        "name": "malaysian restaurant",
        "value": "malaysian restaurant"
      },
      {
        "name": "maltese restaurant",
        "value": "maltese restaurant"
      },
      {
        "name": "mammography service",
        "value": "mammography service"
      },
      {
        "name": "manado restaurant",
        "value": "manado restaurant"
      },
      {
        "name": "management school",
        "value": "management school"
      },
      {
        "name": "mandarin restaurant",
        "value": "mandarin restaurant"
      },
      {
        "name": "manor house",
        "value": "manor house"
      },
      {
        "name": "maori organization",
        "value": "maori organization"
      },
      {
        "name": "map store",
        "value": "map store"
      },
      {
        "name": "mapping service",
        "value": "mapping service"
      },
      {
        "name": "marathi restaurant",
        "value": "marathi restaurant"
      },
      {
        "name": "marble contractor",
        "value": "marble contractor"
      },
      {
        "name": "marble supplier",
        "value": "marble supplier"
      },
      {
        "name": "marche restaurant",
        "value": "marche restaurant"
      },
      {
        "name": "marine engineer",
        "value": "marine engineer"
      },
      {
        "name": "marine surveyor",
        "value": "marine surveyor"
      },
      {
        "name": "maritime museum",
        "value": "maritime museum"
      },
      {
        "name": "market researcher",
        "value": "market researcher"
      },
      {
        "name": "marketing agency",
        "value": "marketing agency"
      },
      {
        "name": "marketing consultant",
        "value": "marketing consultant"
      },
      {
        "name": "marriage celebrant",
        "value": "marriage celebrant"
      },
      {
        "name": "maserati dealer",
        "value": "maserati dealer"
      },
      {
        "name": "masonry contractor",
        "value": "masonry contractor"
      },
      {
        "name": "massage parlor",
        "value": "massage parlor"
      },
      {
        "name": "massage school",
        "value": "massage school"
      },
      {
        "name": "massage service",
        "value": "massage service"
      },
      {
        "name": "massage spa",
        "value": "massage spa"
      },
      {
        "name": "massage therapist",
        "value": "massage therapist"
      },
      {
        "name": "maternity hospital",
        "value": "maternity hospital"
      },
      {
        "name": "maternity store",
        "value": "maternity store"
      },
      {
        "name": "mathematics school",
        "value": "mathematics school"
      },
      {
        "name": "mattress store",
        "value": "mattress store"
      },
      {
        "name": "mausoleum builder",
        "value": "mausoleum builder"
      },
      {
        "name": "maybach dealer",
        "value": "maybach dealer"
      },
      {
        "name": "mazda dealer",
        "value": "mazda dealer"
      },
      {
        "name": "mclaren dealer",
        "value": "mclaren dealer"
      },
      {
        "name": "meal delivery",
        "value": "meal delivery"
      },
      {
        "name": "meat packer",
        "value": "meat packer"
      },
      {
        "name": "meat processor",
        "value": "meat processor"
      },
      {
        "name": "meat wholesaler",
        "value": "meat wholesaler"
      },
      {
        "name": "mechanical contractor",
        "value": "mechanical contractor"
      },
      {
        "name": "mechanical engineer",
        "value": "mechanical engineer"
      },
      {
        "name": "mechanical plant",
        "value": "mechanical plant"
      },
      {
        "name": "media company",
        "value": "media company"
      },
      {
        "name": "media consultant",
        "value": "media consultant"
      },
      {
        "name": "media house",
        "value": "media house"
      },
      {
        "name": "mediation service",
        "value": "mediation service"
      },
      {
        "name": "medical center",
        "value": "medical center"
      },
      {
        "name": "medical centre",
        "value": "medical centre"
      },
      {
        "name": "medical clinic",
        "value": "medical clinic"
      },
      {
        "name": "medical examiner",
        "value": "medical examiner"
      },
      {
        "name": "medical group",
        "value": "medical group"
      },
      {
        "name": "medical laboratory",
        "value": "medical laboratory"
      },
      {
        "name": "medical lawyer",
        "value": "medical lawyer"
      },
      {
        "name": "medical office",
        "value": "medical office"
      },
      {
        "name": "medical school",
        "value": "medical school"
      },
      {
        "name": "medical spa",
        "value": "medical spa"
      },
      {
        "name": "medicine exporter",
        "value": "medicine exporter"
      },
      {
        "name": "meditation center",
        "value": "meditation center"
      },
      {
        "name": "meditation instructor",
        "value": "meditation instructor"
      },
      {
        "name": "mediterranean restaurant",
        "value": "mediterranean restaurant"
      },
      {
        "name": "mehandi class",
        "value": "mehandi class"
      },
      {
        "name": "mehndi designer",
        "value": "mehndi designer"
      },
      {
        "name": "memorial estate",
        "value": "memorial estate"
      },
      {
        "name": "memorial park",
        "value": "memorial park"
      },
      {
        "name": "men's tailor",
        "value": "men's tailor"
      },
      {
        "name": "mennonite church",
        "value": "mennonite church"
      },
      {
        "name": "mens tailor",
        "value": "mens tailor"
      },
      {
        "name": "mercantile development",
        "value": "mercantile development"
      },
      {
        "name": "mercedes-benz dealer",
        "value": "mercedes-benz dealer"
      },
      {
        "name": "messianic synagogue",
        "value": "messianic synagogue"
      },
      {
        "name": "metal fabricator",
        "value": "metal fabricator"
      },
      {
        "name": "metal finisher",
        "value": "metal finisher"
      },
      {
        "name": "metal supplier",
        "value": "metal supplier"
      },
      {
        "name": "metal workshop",
        "value": "metal workshop"
      },
      {
        "name": "metallurgy company",
        "value": "metallurgy company"
      },
      {
        "name": "metalware dealer",
        "value": "metalware dealer"
      },
      {
        "name": "metalware producer",
        "value": "metalware producer"
      },
      {
        "name": "methodist church",
        "value": "methodist church"
      },
      {
        "name": "mexican restaurant",
        "value": "mexican restaurant"
      },
      {
        "name": "mg dealer",
        "value": "mg dealer"
      },
      {
        "name": "middle school",
        "value": "middle school"
      },
      {
        "name": "military base",
        "value": "military base"
      },
      {
        "name": "military board",
        "value": "military board"
      },
      {
        "name": "military cemetery",
        "value": "military cemetery"
      },
      {
        "name": "military hospital",
        "value": "military hospital"
      },
      {
        "name": "military school",
        "value": "military school"
      },
      {
        "name": "military town",
        "value": "military town"
      },
      {
        "name": "millwork shop",
        "value": "millwork shop"
      },
      {
        "name": "mini dealer",
        "value": "mini dealer"
      },
      {
        "name": "miniatures store",
        "value": "miniatures store"
      },
      {
        "name": "mining company",
        "value": "mining company"
      },
      {
        "name": "mining consultant",
        "value": "mining consultant"
      },
      {
        "name": "mining engineer",
        "value": "mining engineer"
      },
      {
        "name": "mining equipment",
        "value": "mining equipment"
      },
      {
        "name": "mirror shop",
        "value": "mirror shop"
      },
      {
        "name": "mitsubishi dealer",
        "value": "mitsubishi dealer"
      },
      {
        "name": "mobile caterer",
        "value": "mobile caterer"
      },
      {
        "name": "model shop",
        "value": "model shop"
      },
      {
        "name": "modeling agency",
        "value": "modeling agency"
      },
      {
        "name": "modeling school",
        "value": "modeling school"
      },
      {
        "name": "mold maker",
        "value": "mold maker"
      },
      {
        "name": "molding supplier",
        "value": "molding supplier"
      },
      {
        "name": "momo restaurant",
        "value": "momo restaurant"
      },
      {
        "name": "monogramming service",
        "value": "monogramming service"
      },
      {
        "name": "montessori school",
        "value": "montessori school"
      },
      {
        "name": "monument maker",
        "value": "monument maker"
      },
      {
        "name": "moped dealer",
        "value": "moped dealer"
      },
      {
        "name": "moravian church",
        "value": "moravian church"
      },
      {
        "name": "moroccan restaurant",
        "value": "moroccan restaurant"
      },
      {
        "name": "mortgage broker",
        "value": "mortgage broker"
      },
      {
        "name": "mortgage lender",
        "value": "mortgage lender"
      },
      {
        "name": "motorcycle dealer",
        "value": "motorcycle dealer"
      },
      {
        "name": "motorcycle shop",
        "value": "motorcycle shop"
      },
      {
        "name": "motoring club",
        "value": "motoring club"
      },
      {
        "name": "motorsports store",
        "value": "motorsports store"
      },
      {
        "name": "mountain cabin",
        "value": "mountain cabin"
      },
      {
        "name": "mountain peak",
        "value": "mountain peak"
      },
      {
        "name": "mountaineering class",
        "value": "mountaineering class"
      },
      {
        "name": "movie studio",
        "value": "movie studio"
      },
      {
        "name": "movie theater",
        "value": "movie theater"
      },
      {
        "name": "moving company",
        "value": "moving company"
      },
      {
        "name": "mri center",
        "value": "mri center"
      },
      {
        "name": "muffler shop",
        "value": "muffler shop"
      },
      {
        "name": "mughlai restaurant",
        "value": "mughlai restaurant"
      },
      {
        "name": "mulch supplier",
        "value": "mulch supplier"
      },
      {
        "name": "municipal guard",
        "value": "municipal guard"
      },
      {
        "name": "murtabak restaurant",
        "value": "murtabak restaurant"
      },
      {
        "name": "music college",
        "value": "music college"
      },
      {
        "name": "music conservatory",
        "value": "music conservatory"
      },
      {
        "name": "music instructor",
        "value": "music instructor"
      },
      {
        "name": "music producer",
        "value": "music producer"
      },
      {
        "name": "music publisher",
        "value": "music publisher"
      },
      {
        "name": "music school",
        "value": "music school"
      },
      {
        "name": "music store",
        "value": "music store"
      },
      {
        "name": "musical club",
        "value": "musical club"
      },
      {
        "name": "nail salon",
        "value": "nail salon"
      },
      {
        "name": "nasi restaurant",
        "value": "nasi restaurant"
      },
      {
        "name": "national forest",
        "value": "national forest"
      },
      {
        "name": "national library",
        "value": "national library"
      },
      {
        "name": "national museum",
        "value": "national museum"
      },
      {
        "name": "national park",
        "value": "national park"
      },
      {
        "name": "national reserve",
        "value": "national reserve"
      },
      {
        "name": "nature preserve",
        "value": "nature preserve"
      },
      {
        "name": "naturopathic practitioner",
        "value": "naturopathic practitioner"
      },
      {
        "name": "naval base",
        "value": "naval base"
      },
      {
        "name": "navarraise restaurant",
        "value": "navarraise restaurant"
      },
      {
        "name": "neapolitan restaurant",
        "value": "neapolitan restaurant"
      },
      {
        "name": "needlework shop",
        "value": "needlework shop"
      },
      {
        "name": "neonatal physician",
        "value": "neonatal physician"
      },
      {
        "name": "nepalese restaurant",
        "value": "nepalese restaurant"
      },
      {
        "name": "netball club",
        "value": "netball club"
      },
      {
        "name": "news service",
        "value": "news service"
      },
      {
        "name": "newspaper publisher",
        "value": "newspaper publisher"
      },
      {
        "name": "nicaraguan restaurant",
        "value": "nicaraguan restaurant"
      },
      {
        "name": "night club",
        "value": "night club"
      },
      {
        "name": "night market",
        "value": "night market"
      },
      {
        "name": "nissan dealer",
        "value": "nissan dealer"
      },
      {
        "name": "non-denominational church",
        "value": "non-denominational church"
      },
      {
        "name": "non-governmental organization",
        "value": "non-governmental organization"
      },
      {
        "name": "non-profit organization",
        "value": "non-profit organization"
      },
      {
        "name": "noodle shop",
        "value": "noodle shop"
      },
      {
        "name": "norwegian restaurant",
        "value": "norwegian restaurant"
      },
      {
        "name": "notaries association",
        "value": "notaries association"
      },
      {
        "name": "notary public",
        "value": "notary public"
      },
      {
        "name": "notions store",
        "value": "notions store"
      },
      {
        "name": "novelties wholesaler",
        "value": "novelties wholesaler"
      },
      {
        "name": "novelty store",
        "value": "novelty store"
      },
      {
        "name": "nudist club",
        "value": "nudist club"
      },
      {
        "name": "nudist park",
        "value": "nudist park"
      },
      {
        "name": "nurse practitioner",
        "value": "nurse practitioner"
      },
      {
        "name": "nursery school",
        "value": "nursery school"
      },
      {
        "name": "nursing agency",
        "value": "nursing agency"
      },
      {
        "name": "nursing association",
        "value": "nursing association"
      },
      {
        "name": "nursing home",
        "value": "nursing home"
      },
      {
        "name": "nursing school",
        "value": "nursing school"
      },
      {
        "name": "nut store",
        "value": "nut store"
      },
      {
        "name": "nyonya restaurant",
        "value": "nyonya restaurant"
      },
      {
        "name": "oaxacan restaurant",
        "value": "oaxacan restaurant"
      },
      {
        "name": "observation deck",
        "value": "observation deck"
      },
      {
        "name": "occupational therapist",
        "value": "occupational therapist"
      },
      {
        "name": "oden restaurant",
        "value": "oden restaurant"
      },
      {
        "name": "odia restaurant",
        "value": "odia restaurant"
      },
      {
        "name": "oil refinery",
        "value": "oil refinery"
      },
      {
        "name": "okonomiyaki restaurant",
        "value": "okonomiyaki restaurant"
      },
      {
        "name": "oldsmobile dealer",
        "value": "oldsmobile dealer"
      },
      {
        "name": "opel dealer",
        "value": "opel dealer"
      },
      {
        "name": "open university",
        "value": "open university"
      },
      {
        "name": "opera company",
        "value": "opera company"
      },
      {
        "name": "opera house",
        "value": "opera house"
      },
      {
        "name": "ophthalmology clinic",
        "value": "ophthalmology clinic"
      },
      {
        "name": "optical wholesaler",
        "value": "optical wholesaler"
      },
      {
        "name": "oral surgeon",
        "value": "oral surgeon"
      },
      {
        "name": "orchid farm",
        "value": "orchid farm"
      },
      {
        "name": "orchid grower",
        "value": "orchid grower"
      },
      {
        "name": "organic farm",
        "value": "organic farm"
      },
      {
        "name": "organic restaurant",
        "value": "organic restaurant"
      },
      {
        "name": "organic shop",
        "value": "organic shop"
      },
      {
        "name": "orthodox church",
        "value": "orthodox church"
      },
      {
        "name": "orthodox synagogue",
        "value": "orthodox synagogue"
      },
      {
        "name": "orthopedic clinic",
        "value": "orthopedic clinic"
      },
      {
        "name": "orthopedic surgeon",
        "value": "orthopedic surgeon"
      },
      {
        "name": "otolaryngology clinic",
        "value": "otolaryngology clinic"
      },
      {
        "name": "outdoor bath",
        "value": "outdoor bath"
      },
      {
        "name": "outerwear store",
        "value": "outerwear store"
      },
      {
        "name": "outlet mall",
        "value": "outlet mall"
      },
      {
        "name": "outlet store",
        "value": "outlet store"
      },
      {
        "name": "oyster supplier",
        "value": "oyster supplier"
      },
      {
        "name": "paan shop",
        "value": "paan shop"
      },
      {
        "name": "package locker",
        "value": "package locker"
      },
      {
        "name": "packaging company",
        "value": "packaging company"
      },
      {
        "name": "padang restaurant",
        "value": "padang restaurant"
      },
      {
        "name": "padel club",
        "value": "padel club"
      },
      {
        "name": "padel court",
        "value": "padel court"
      },
      {
        "name": "paint manufacturer",
        "value": "paint manufacturer"
      },
      {
        "name": "paint store",
        "value": "paint store"
      },
      {
        "name": "paintball center",
        "value": "paintball center"
      },
      {
        "name": "paintball store",
        "value": "paintball store"
      },
      {
        "name": "painting lessons",
        "value": "painting lessons"
      },
      {
        "name": "painting studio",
        "value": "painting studio"
      },
      {
        "name": "paintings store",
        "value": "paintings store"
      },
      {
        "name": "paisa restaurant",
        "value": "paisa restaurant"
      },
      {
        "name": "pakistani restaurant",
        "value": "pakistani restaurant"
      },
      {
        "name": "palatine restaurant",
        "value": "palatine restaurant"
      },
      {
        "name": "pallet supplier",
        "value": "pallet supplier"
      },
      {
        "name": "pan-asian restaurant",
        "value": "pan-asian restaurant"
      },
      {
        "name": "pancake restaurant",
        "value": "pancake restaurant"
      },
      {
        "name": "panipuri shop",
        "value": "panipuri shop"
      },
      {
        "name": "paper distributor",
        "value": "paper distributor"
      },
      {
        "name": "paper exporter",
        "value": "paper exporter"
      },
      {
        "name": "paper mill",
        "value": "paper mill"
      },
      {
        "name": "paper store",
        "value": "paper store"
      },
      {
        "name": "paraguayan restaurant",
        "value": "paraguayan restaurant"
      },
      {
        "name": "parking garage",
        "value": "parking garage"
      },
      {
        "name": "parking grounds",
        "value": "parking grounds"
      },
      {
        "name": "parking lot",
        "value": "parking lot"
      },
      {
        "name": "parkour spot",
        "value": "parkour spot"
      },
      {
        "name": "parochial school",
        "value": "parochial school"
      },
      {
        "name": "parsi restaurant",
        "value": "parsi restaurant"
      },
      {
        "name": "parsi temple",
        "value": "parsi temple"
      },
      {
        "name": "party planner",
        "value": "party planner"
      },
      {
        "name": "party store",
        "value": "party store"
      },
      {
        "name": "passport agent",
        "value": "passport agent"
      },
      {
        "name": "passport office",
        "value": "passport office"
      },
      {
        "name": "pasta shop",
        "value": "pasta shop"
      },
      {
        "name": "pastry shop",
        "value": "pastry shop"
      },
      {
        "name": "patent attorney",
        "value": "patent attorney"
      },
      {
        "name": "patent office",
        "value": "patent office"
      },
      {
        "name": "paving contractor",
        "value": "paving contractor"
      },
      {
        "name": "pawn shop",
        "value": "pawn shop"
      },
      {
        "name": "payroll service",
        "value": "payroll service"
      },
      {
        "name": "pedestrian zone",
        "value": "pedestrian zone"
      },
      {
        "name": "pediatric cardiologist",
        "value": "pediatric cardiologist"
      },
      {
        "name": "pediatric clinic",
        "value": "pediatric clinic"
      },
      {
        "name": "pediatric dentist",
        "value": "pediatric dentist"
      },
      {
        "name": "pediatric dermatologist",
        "value": "pediatric dermatologist"
      },
      {
        "name": "pediatric endocrinologist",
        "value": "pediatric endocrinologist"
      },
      {
        "name": "pediatric gastroenterologist",
        "value": "pediatric gastroenterologist"
      },
      {
        "name": "pediatric hematologist",
        "value": "pediatric hematologist"
      },
      {
        "name": "pediatric nephrologist",
        "value": "pediatric nephrologist"
      },
      {
        "name": "pediatric neurologist",
        "value": "pediatric neurologist"
      },
      {
        "name": "pediatric oncologist",
        "value": "pediatric oncologist"
      },
      {
        "name": "pediatric ophthalmologist",
        "value": "pediatric ophthalmologist"
      },
      {
        "name": "pediatric pulmonologist",
        "value": "pediatric pulmonologist"
      },
      {
        "name": "pediatric rheumatologist",
        "value": "pediatric rheumatologist"
      },
      {
        "name": "pediatric surgeon",
        "value": "pediatric surgeon"
      },
      {
        "name": "pediatric urologist",
        "value": "pediatric urologist"
      },
      {
        "name": "pempek restaurant",
        "value": "pempek restaurant"
      },
      {
        "name": "pen store",
        "value": "pen store"
      },
      {
        "name": "pension office",
        "value": "pension office"
      },
      {
        "name": "pentecostal church",
        "value": "pentecostal church"
      },
      {
        "name": "perfume store",
        "value": "perfume store"
      },
      {
        "name": "perinatal center",
        "value": "perinatal center"
      },
      {
        "name": "persian restaurant",
        "value": "persian restaurant"
      },
      {
        "name": "personal trainer",
        "value": "personal trainer"
      },
      {
        "name": "peruvian restaurant",
        "value": "peruvian restaurant"
      },
      {
        "name": "pet cemetery",
        "value": "pet cemetery"
      },
      {
        "name": "pet groomer",
        "value": "pet groomer"
      },
      {
        "name": "pet shop",
        "value": "pet shop"
      },
      {
        "name": "pet sitter",
        "value": "pet sitter"
      },
      {
        "name": "pet store",
        "value": "pet store"
      },
      {
        "name": "pet trainer",
        "value": "pet trainer"
      },
      {
        "name": "petrol station",
        "value": "petrol station"
      },
      {
        "name": "peugeot dealer",
        "value": "peugeot dealer"
      },
      {
        "name": "pharmaceutical company",
        "value": "pharmaceutical company"
      },
      {
        "name": "pharmaceutical lab",
        "value": "pharmaceutical lab"
      },
      {
        "name": "philharmonic hall",
        "value": "philharmonic hall"
      },
      {
        "name": "pho restaurant",
        "value": "pho restaurant"
      },
      {
        "name": "photo agency",
        "value": "photo agency"
      },
      {
        "name": "photo booth",
        "value": "photo booth"
      },
      {
        "name": "photo lab",
        "value": "photo lab"
      },
      {
        "name": "photo shop",
        "value": "photo shop"
      },
      {
        "name": "photography class",
        "value": "photography class"
      },
      {
        "name": "photography school",
        "value": "photography school"
      },
      {
        "name": "photography service",
        "value": "photography service"
      },
      {
        "name": "photography studio",
        "value": "photography studio"
      },
      {
        "name": "physical therapist",
        "value": "physical therapist"
      },
      {
        "name": "physician assistant",
        "value": "physician assistant"
      },
      {
        "name": "physiotherapy center",
        "value": "physiotherapy center"
      },
      {
        "name": "piadina restaurant",
        "value": "piadina restaurant"
      },
      {
        "name": "piano bar",
        "value": "piano bar"
      },
      {
        "name": "piano instructor",
        "value": "piano instructor"
      },
      {
        "name": "piano maker",
        "value": "piano maker"
      },
      {
        "name": "piano store",
        "value": "piano store"
      },
      {
        "name": "pickleball court",
        "value": "pickleball court"
      },
      {
        "name": "picnic ground",
        "value": "picnic ground"
      },
      {
        "name": "pie shop",
        "value": "pie shop"
      },
      {
        "name": "piedmontese restaurant",
        "value": "piedmontese restaurant"
      },
      {
        "name": "pig farm",
        "value": "pig farm"
      },
      {
        "name": "pilaf restaurant",
        "value": "pilaf restaurant"
      },
      {
        "name": "pilates studio",
        "value": "pilates studio"
      },
      {
        "name": "pilgrim hostel",
        "value": "pilgrim hostel"
      },
      {
        "name": "pipe supplier",
        "value": "pipe supplier"
      },
      {
        "name": "pizza delivery",
        "value": "pizza delivery"
      },
      {
        "name": "pizza restaurant",
        "value": "pizza restaurant"
      },
      {
        "name": "pizza takeaway",
        "value": "pizza takeaway"
      },
      {
        "name": "pizza takeout",
        "value": "pizza takeout"
      },
      {
        "name": "plant nursery",
        "value": "plant nursery"
      },
      {
        "name": "plastic surgeon",
        "value": "plastic surgeon"
      },
      {
        "name": "plastic wholesaler",
        "value": "plastic wholesaler"
      },
      {
        "name": "plating service",
        "value": "plating service"
      },
      {
        "name": "plywood supplier",
        "value": "plywood supplier"
      },
      {
        "name": "poke bar",
        "value": "poke bar"
      },
      {
        "name": "police academy",
        "value": "police academy"
      },
      {
        "name": "police department",
        "value": "police department"
      },
      {
        "name": "polish restaurant",
        "value": "polish restaurant"
      },
      {
        "name": "polo club",
        "value": "polo club"
      },
      {
        "name": "polygraph service",
        "value": "polygraph service"
      },
      {
        "name": "polymer supplier",
        "value": "polymer supplier"
      },
      {
        "name": "polynesian restaurant",
        "value": "polynesian restaurant"
      },
      {
        "name": "polytechnic institute",
        "value": "polytechnic institute"
      },
      {
        "name": "pond contractor",
        "value": "pond contractor"
      },
      {
        "name": "pontiac dealer",
        "value": "pontiac dealer"
      },
      {
        "name": "pony club",
        "value": "pony club"
      },
      {
        "name": "pool hall",
        "value": "pool hall"
      },
      {
        "name": "popcorn store",
        "value": "popcorn store"
      },
      {
        "name": "porridge restaurant",
        "value": "porridge restaurant"
      },
      {
        "name": "porsche dealer",
        "value": "porsche dealer"
      },
      {
        "name": "port authority",
        "value": "port authority"
      },
      {
        "name": "portrait studio",
        "value": "portrait studio"
      },
      {
        "name": "portuguese restaurant",
        "value": "portuguese restaurant"
      },
      {
        "name": "post office",
        "value": "post office"
      },
      {
        "name": "postal code",
        "value": "postal code"
      },
      {
        "name": "poster store",
        "value": "poster store"
      },
      {
        "name": "pottery classes",
        "value": "pottery classes"
      },
      {
        "name": "pottery manufacturer",
        "value": "pottery manufacturer"
      },
      {
        "name": "pottery store",
        "value": "pottery store"
      },
      {
        "name": "poultry farm",
        "value": "poultry farm"
      },
      {
        "name": "poultry store",
        "value": "poultry store"
      },
      {
        "name": "power station",
        "value": "power station"
      },
      {
        "name": "pozole restaurant",
        "value": "pozole restaurant"
      },
      {
        "name": "prawn fishing",
        "value": "prawn fishing"
      },
      {
        "name": "precision engineer",
        "value": "precision engineer"
      },
      {
        "name": "preparatory school",
        "value": "preparatory school"
      },
      {
        "name": "presbyterian church",
        "value": "presbyterian church"
      },
      {
        "name": "press advisory",
        "value": "press advisory"
      },
      {
        "name": "pretzel store",
        "value": "pretzel store"
      },
      {
        "name": "primary school",
        "value": "primary school"
      },
      {
        "name": "print shop",
        "value": "print shop"
      },
      {
        "name": "private college",
        "value": "private college"
      },
      {
        "name": "private hospital",
        "value": "private hospital"
      },
      {
        "name": "private investigator",
        "value": "private investigator"
      },
      {
        "name": "private tutor",
        "value": "private tutor"
      },
      {
        "name": "private university",
        "value": "private university"
      },
      {
        "name": "probation office",
        "value": "probation office"
      },
      {
        "name": "process server",
        "value": "process server"
      },
      {
        "name": "produce market",
        "value": "produce market"
      },
      {
        "name": "produce wholesaler",
        "value": "produce wholesaler"
      },
      {
        "name": "professional association",
        "value": "professional association"
      },
      {
        "name": "professional organizer",
        "value": "professional organizer"
      },
      {
        "name": "propane supplier",
        "value": "propane supplier"
      },
      {
        "name": "propeller shop",
        "value": "propeller shop"
      },
      {
        "name": "property consultant",
        "value": "property consultant"
      },
      {
        "name": "property developer",
        "value": "property developer"
      },
      {
        "name": "property investment",
        "value": "property investment"
      },
      {
        "name": "property maintenance",
        "value": "property maintenance"
      },
      {
        "name": "protected area",
        "value": "protected area"
      },
      {
        "name": "protestant church",
        "value": "protestant church"
      },
      {
        "name": "provence restaurant",
        "value": "provence restaurant"
      },
      {
        "name": "psychiatric hospital",
        "value": "psychiatric hospital"
      },
      {
        "name": "psychomotor therapist",
        "value": "psychomotor therapist"
      },
      {
        "name": "psychopedagogy clinic",
        "value": "psychopedagogy clinic"
      },
      {
        "name": "public bath",
        "value": "public bath"
      },
      {
        "name": "public bathroom",
        "value": "public bathroom"
      },
      {
        "name": "public beach",
        "value": "public beach"
      },
      {
        "name": "public housing",
        "value": "public housing"
      },
      {
        "name": "public library",
        "value": "public library"
      },
      {
        "name": "public sauna",
        "value": "public sauna"
      },
      {
        "name": "public university",
        "value": "public university"
      },
      {
        "name": "pueblan restaurant",
        "value": "pueblan restaurant"
      },
      {
        "name": "pump supplier",
        "value": "pump supplier"
      },
      {
        "name": "pumpkin patch",
        "value": "pumpkin patch"
      },
      {
        "name": "punjabi restaurant",
        "value": "punjabi restaurant"
      },
      {
        "name": "puppet theater",
        "value": "puppet theater"
      },
      {
        "name": "quaker church",
        "value": "quaker church"
      },
      {
        "name": "quantity surveyor",
        "value": "quantity surveyor"
      },
      {
        "name": "quilt shop",
        "value": "quilt shop"
      },
      {
        "name": "raclette restaurant",
        "value": "raclette restaurant"
      },
      {
        "name": "racquetball club",
        "value": "racquetball club"
      },
      {
        "name": "radiator shop",
        "value": "radiator shop"
      },
      {
        "name": "radio broadcaster",
        "value": "radio broadcaster"
      },
      {
        "name": "rail museum",
        "value": "rail museum"
      },
      {
        "name": "railing contractor",
        "value": "railing contractor"
      },
      {
        "name": "railroad company",
        "value": "railroad company"
      },
      {
        "name": "railroad contractor",
        "value": "railroad contractor"
      },
      {
        "name": "railway services",
        "value": "railway services"
      },
      {
        "name": "rajasthani restaurant",
        "value": "rajasthani restaurant"
      },
      {
        "name": "ram dealer",
        "value": "ram dealer"
      },
      {
        "name": "ramen restaurant",
        "value": "ramen restaurant"
      },
      {
        "name": "real estate",
        "value": "real estate"
      },
      {
        "name": "record company",
        "value": "record company"
      },
      {
        "name": "record store",
        "value": "record store"
      },
      {
        "name": "recording studio",
        "value": "recording studio"
      },
      {
        "name": "recreation center",
        "value": "recreation center"
      },
      {
        "name": "recycling center",
        "value": "recycling center"
      },
      {
        "name": "reenactment site",
        "value": "reenactment site"
      },
      {
        "name": "reform synagogue",
        "value": "reform synagogue"
      },
      {
        "name": "reformed church",
        "value": "reformed church"
      },
      {
        "name": "refrigerator store",
        "value": "refrigerator store"
      },
      {
        "name": "refugee camp",
        "value": "refugee camp"
      },
      {
        "name": "regional airport",
        "value": "regional airport"
      },
      {
        "name": "regional council",
        "value": "regional council"
      },
      {
        "name": "registration office",
        "value": "registration office"
      },
      {
        "name": "registry office",
        "value": "registry office"
      },
      {
        "name": "rehabilitation center",
        "value": "rehabilitation center"
      },
      {
        "name": "rehearsal studio",
        "value": "rehearsal studio"
      },
      {
        "name": "reiki therapist",
        "value": "reiki therapist"
      },
      {
        "name": "religious destination",
        "value": "religious destination"
      },
      {
        "name": "religious institution",
        "value": "religious institution"
      },
      {
        "name": "religious lodging",
        "value": "religious lodging"
      },
      {
        "name": "religious organization",
        "value": "religious organization"
      },
      {
        "name": "religious school",
        "value": "religious school"
      },
      {
        "name": "renault dealer",
        "value": "renault dealer"
      },
      {
        "name": "renovation contractor",
        "value": "renovation contractor"
      },
      {
        "name": "repair service",
        "value": "repair service"
      },
      {
        "name": "reptile store",
        "value": "reptile store"
      },
      {
        "name": "research engineer",
        "value": "research engineer"
      },
      {
        "name": "research foundation",
        "value": "research foundation"
      },
      {
        "name": "research institute",
        "value": "research institute"
      },
      {
        "name": "residential building",
        "value": "residential building"
      },
      {
        "name": "residential college",
        "value": "residential college"
      },
      {
        "name": "residents association",
        "value": "residents association"
      },
      {
        "name": "resort hotel",
        "value": "resort hotel"
      },
      {
        "name": "rest stop",
        "value": "rest stop"
      },
      {
        "name": "resume service",
        "value": "resume service"
      },
      {
        "name": "retirement community",
        "value": "retirement community"
      },
      {
        "name": "retirement home",
        "value": "retirement home"
      },
      {
        "name": "retreat center",
        "value": "retreat center"
      },
      {
        "name": "rice mill",
        "value": "rice mill"
      },
      {
        "name": "rice restaurant",
        "value": "rice restaurant"
      },
      {
        "name": "rice shop",
        "value": "rice shop"
      },
      {
        "name": "rice wholesaler",
        "value": "rice wholesaler"
      },
      {
        "name": "river port",
        "value": "river port"
      },
      {
        "name": "road cycling",
        "value": "road cycling"
      },
      {
        "name": "rock climbing",
        "value": "rock climbing"
      },
      {
        "name": "rock shop",
        "value": "rock shop"
      },
      {
        "name": "roller coaster",
        "value": "roller coaster"
      },
      {
        "name": "roman restaurant",
        "value": "roman restaurant"
      },
      {
        "name": "romanian restaurant",
        "value": "romanian restaurant"
      },
      {
        "name": "roofing contractor",
        "value": "roofing contractor"
      },
      {
        "name": "roofing service",
        "value": "roofing service"
      },
      {
        "name": "rowing area",
        "value": "rowing area"
      },
      {
        "name": "rowing club",
        "value": "rowing club"
      },
      {
        "name": "rsl club",
        "value": "rsl club"
      },
      {
        "name": "rug store",
        "value": "rug store"
      },
      {
        "name": "rugby club",
        "value": "rugby club"
      },
      {
        "name": "rugby field",
        "value": "rugby field"
      },
      {
        "name": "rugby store",
        "value": "rugby store"
      },
      {
        "name": "running store",
        "value": "running store"
      },
      {
        "name": "russian restaurant",
        "value": "russian restaurant"
      },
      {
        "name": "rv dealer",
        "value": "rv dealer"
      },
      {
        "name": "rv park",
        "value": "rv park"
      },
      {
        "name": "saab dealer",
        "value": "saab dealer"
      },
      {
        "name": "sailing club",
        "value": "sailing club"
      },
      {
        "name": "sailing school",
        "value": "sailing school"
      },
      {
        "name": "sake brewery",
        "value": "sake brewery"
      },
      {
        "name": "salad shop",
        "value": "salad shop"
      },
      {
        "name": "salsa bar",
        "value": "salsa bar"
      },
      {
        "name": "salsa classes",
        "value": "salsa classes"
      },
      {
        "name": "salvadoran restaurant",
        "value": "salvadoran restaurant"
      },
      {
        "name": "salvage dealer",
        "value": "salvage dealer"
      },
      {
        "name": "salvage yard",
        "value": "salvage yard"
      },
      {
        "name": "samba school",
        "value": "samba school"
      },
      {
        "name": "sambo school",
        "value": "sambo school"
      },
      {
        "name": "sand plant",
        "value": "sand plant"
      },
      {
        "name": "sandblasting service",
        "value": "sandblasting service"
      },
      {
        "name": "sandwich shop",
        "value": "sandwich shop"
      },
      {
        "name": "sanitary inspection",
        "value": "sanitary inspection"
      },
      {
        "name": "sanitation service",
        "value": "sanitation service"
      },
      {
        "name": "sardinian restaurant",
        "value": "sardinian restaurant"
      },
      {
        "name": "saree shop",
        "value": "saree shop"
      },
      {
        "name": "sashimi restaurant",
        "value": "sashimi restaurant"
      },
      {
        "name": "satay restaurant",
        "value": "satay restaurant"
      },
      {
        "name": "saturn dealer",
        "value": "saturn dealer"
      },
      {
        "name": "sauna club",
        "value": "sauna club"
      },
      {
        "name": "sauna store",
        "value": "sauna store"
      },
      {
        "name": "savings bank",
        "value": "savings bank"
      },
      {
        "name": "saw mill",
        "value": "saw mill"
      },
      {
        "name": "scale supplier",
        "value": "scale supplier"
      },
      {
        "name": "scandinavian restaurant",
        "value": "scandinavian restaurant"
      },
      {
        "name": "scenic spot",
        "value": "scenic spot"
      },
      {
        "name": "scenography company",
        "value": "scenography company"
      },
      {
        "name": "school cafeteria",
        "value": "school cafeteria"
      },
      {
        "name": "school center",
        "value": "school center"
      },
      {
        "name": "school house",
        "value": "school house"
      },
      {
        "name": "science museum",
        "value": "science museum"
      },
      {
        "name": "scottish restaurant",
        "value": "scottish restaurant"
      },
      {
        "name": "scout hall",
        "value": "scout hall"
      },
      {
        "name": "scout home",
        "value": "scout home"
      },
      {
        "name": "scrapbooking store",
        "value": "scrapbooking store"
      },
      {
        "name": "screen printer",
        "value": "screen printer"
      },
      {
        "name": "screen store",
        "value": "screen store"
      },
      {
        "name": "screw supplier",
        "value": "screw supplier"
      },
      {
        "name": "scuba instructor",
        "value": "scuba instructor"
      },
      {
        "name": "sculpture museum",
        "value": "sculpture museum"
      },
      {
        "name": "seafood farm",
        "value": "seafood farm"
      },
      {
        "name": "seafood market",
        "value": "seafood market"
      },
      {
        "name": "seafood restaurant",
        "value": "seafood restaurant"
      },
      {
        "name": "seafood wholesaler",
        "value": "seafood wholesaler"
      },
      {
        "name": "seal shop",
        "value": "seal shop"
      },
      {
        "name": "seaplane base",
        "value": "seaplane base"
      },
      {
        "name": "seat dealer",
        "value": "seat dealer"
      },
      {
        "name": "seblak restaurant",
        "value": "seblak restaurant"
      },
      {
        "name": "secondary school",
        "value": "secondary school"
      },
      {
        "name": "security service",
        "value": "security service"
      },
      {
        "name": "seed supplier",
        "value": "seed supplier"
      },
      {
        "name": "self-catering accommodation",
        "value": "self-catering accommodation"
      },
      {
        "name": "self-storage facility",
        "value": "self-storage facility"
      },
      {
        "name": "serbian restaurant",
        "value": "serbian restaurant"
      },
      {
        "name": "service establishment",
        "value": "service establishment"
      },
      {
        "name": "serviced accommodation",
        "value": "serviced accommodation"
      },
      {
        "name": "serviced apartment",
        "value": "serviced apartment"
      },
      {
        "name": "sewing company",
        "value": "sewing company"
      },
      {
        "name": "sewing shop",
        "value": "sewing shop"
      },
      {
        "name": "seychelles restaurant",
        "value": "seychelles restaurant"
      },
      {
        "name": "sfiha restaurant",
        "value": "sfiha restaurant"
      },
      {
        "name": "shanghainese restaurant",
        "value": "shanghainese restaurant"
      },
      {
        "name": "sharpening service",
        "value": "sharpening service"
      },
      {
        "name": "shawarma restaurant",
        "value": "shawarma restaurant"
      },
      {
        "name": "shed builder",
        "value": "shed builder"
      },
      {
        "name": "sheep shearer",
        "value": "sheep shearer"
      },
      {
        "name": "sheltered housing",
        "value": "sheltered housing"
      },
      {
        "name": "shelving store",
        "value": "shelving store"
      },
      {
        "name": "shinto shrine",
        "value": "shinto shrine"
      },
      {
        "name": "shipping company",
        "value": "shipping company"
      },
      {
        "name": "shipping service",
        "value": "shipping service"
      },
      {
        "name": "shochu brewery",
        "value": "shochu brewery"
      },
      {
        "name": "shoe factory",
        "value": "shoe factory"
      },
      {
        "name": "shoe shop",
        "value": "shoe shop"
      },
      {
        "name": "shoe store",
        "value": "shoe store"
      },
      {
        "name": "shogi lesson",
        "value": "shogi lesson"
      },
      {
        "name": "shooting range",
        "value": "shooting range"
      },
      {
        "name": "shopping centre",
        "value": "shopping centre"
      },
      {
        "name": "shopping mall",
        "value": "shopping mall"
      },
      {
        "name": "shredding service",
        "value": "shredding service"
      },
      {
        "name": "shrimp farm",
        "value": "shrimp farm"
      },
      {
        "name": "sichuan restaurant",
        "value": "sichuan restaurant"
      },
      {
        "name": "sicilian restaurant",
        "value": "sicilian restaurant"
      },
      {
        "name": "siding contractor",
        "value": "siding contractor"
      },
      {
        "name": "sign shop",
        "value": "sign shop"
      },
      {
        "name": "signwriting service",
        "value": "signwriting service"
      },
      {
        "name": "silk store",
        "value": "silk store"
      },
      {
        "name": "singaporean restaurant",
        "value": "singaporean restaurant"
      },
      {
        "name": "singles organization",
        "value": "singles organization"
      },
      {
        "name": "skate shop",
        "value": "skate shop"
      },
      {
        "name": "skateboard shop",
        "value": "skateboard shop"
      },
      {
        "name": "skating instructor",
        "value": "skating instructor"
      },
      {
        "name": "ski club",
        "value": "ski club"
      },
      {
        "name": "ski resort",
        "value": "ski resort"
      },
      {
        "name": "ski school",
        "value": "ski school"
      },
      {
        "name": "ski shop",
        "value": "ski shop"
      },
      {
        "name": "skittle club",
        "value": "skittle club"
      },
      {
        "name": "skoda dealer",
        "value": "skoda dealer"
      },
      {
        "name": "skydiving center",
        "value": "skydiving center"
      },
      {
        "name": "skylight contractor",
        "value": "skylight contractor"
      },
      {
        "name": "sleep clinic",
        "value": "sleep clinic"
      },
      {
        "name": "smart dealer",
        "value": "smart dealer"
      },
      {
        "name": "smart shop",
        "value": "smart shop"
      },
      {
        "name": "smoke shop",
        "value": "smoke shop"
      },
      {
        "name": "snack bar",
        "value": "snack bar"
      },
      {
        "name": "snowboard shop",
        "value": "snowboard shop"
      },
      {
        "name": "snowmobile dealer",
        "value": "snowmobile dealer"
      },
      {
        "name": "soccer club",
        "value": "soccer club"
      },
      {
        "name": "soccer field",
        "value": "soccer field"
      },
      {
        "name": "soccer practice",
        "value": "soccer practice"
      },
      {
        "name": "soccer store",
        "value": "soccer store"
      },
      {
        "name": "social club",
        "value": "social club"
      },
      {
        "name": "social worker",
        "value": "social worker"
      },
      {
        "name": "sod supplier",
        "value": "sod supplier"
      },
      {
        "name": "sofa store",
        "value": "sofa store"
      },
      {
        "name": "softball club",
        "value": "softball club"
      },
      {
        "name": "softball field",
        "value": "softball field"
      },
      {
        "name": "software company",
        "value": "software company"
      },
      {
        "name": "soondae restaurant",
        "value": "soondae restaurant"
      },
      {
        "name": "soto restaurant",
        "value": "soto restaurant"
      },
      {
        "name": "soup kitchen",
        "value": "soup kitchen"
      },
      {
        "name": "soup restaurant",
        "value": "soup restaurant"
      },
      {
        "name": "soup shop",
        "value": "soup shop"
      },
      {
        "name": "souvenir manufacturer",
        "value": "souvenir manufacturer"
      },
      {
        "name": "souvenir store",
        "value": "souvenir store"
      },
      {
        "name": "spa garden",
        "value": "spa garden"
      },
      {
        "name": "spanish restaurant",
        "value": "spanish restaurant"
      },
      {
        "name": "special educator",
        "value": "special educator"
      },
      {
        "name": "specialized clinic",
        "value": "specialized clinic"
      },
      {
        "name": "specialized hospital",
        "value": "specialized hospital"
      },
      {
        "name": "speech pathologist",
        "value": "speech pathologist"
      },
      {
        "name": "sperm bank",
        "value": "sperm bank"
      },
      {
        "name": "spice exporter",
        "value": "spice exporter"
      },
      {
        "name": "spice store",
        "value": "spice store"
      },
      {
        "name": "spice wholesaler",
        "value": "spice wholesaler"
      },
      {
        "name": "spices exporter",
        "value": "spices exporter"
      },
      {
        "name": "spiritist center",
        "value": "spiritist center"
      },
      {
        "name": "sports bar",
        "value": "sports bar"
      },
      {
        "name": "sports club",
        "value": "sports club"
      },
      {
        "name": "sports complex",
        "value": "sports complex"
      },
      {
        "name": "sports school",
        "value": "sports school"
      },
      {
        "name": "sportswear store",
        "value": "sportswear store"
      },
      {
        "name": "sportwear manufacturer",
        "value": "sportwear manufacturer"
      },
      {
        "name": "spring supplier",
        "value": "spring supplier"
      },
      {
        "name": "squash club",
        "value": "squash club"
      },
      {
        "name": "squash court",
        "value": "squash court"
      },
      {
        "name": "stair contractor",
        "value": "stair contractor"
      },
      {
        "name": "stamp shop",
        "value": "stamp shop"
      },
      {
        "name": "stand bar",
        "value": "stand bar"
      },
      {
        "name": "state archive",
        "value": "state archive"
      },
      {
        "name": "state park",
        "value": "state park"
      },
      {
        "name": "state parliament",
        "value": "state parliament"
      },
      {
        "name": "state police",
        "value": "state police"
      },
      {
        "name": "stationery manufacturer",
        "value": "stationery manufacturer"
      },
      {
        "name": "stationery store",
        "value": "stationery store"
      },
      {
        "name": "stationery wholesaler",
        "value": "stationery wholesaler"
      },
      {
        "name": "std clinic",
        "value": "std clinic"
      },
      {
        "name": "steak house",
        "value": "steak house"
      },
      {
        "name": "steamboat restaurant",
        "value": "steamboat restaurant"
      },
      {
        "name": "steel distributor",
        "value": "steel distributor"
      },
      {
        "name": "steel erector",
        "value": "steel erector"
      },
      {
        "name": "steel fabricator",
        "value": "steel fabricator"
      },
      {
        "name": "sticker manufacturer",
        "value": "sticker manufacturer"
      },
      {
        "name": "stitching class",
        "value": "stitching class"
      },
      {
        "name": "stock broker",
        "value": "stock broker"
      },
      {
        "name": "stone carving",
        "value": "stone carving"
      },
      {
        "name": "stone cutter",
        "value": "stone cutter"
      },
      {
        "name": "stone supplier",
        "value": "stone supplier"
      },
      {
        "name": "storage facility",
        "value": "storage facility"
      },
      {
        "name": "structural engineer",
        "value": "structural engineer"
      },
      {
        "name": "stucco contractor",
        "value": "stucco contractor"
      },
      {
        "name": "student dormitory",
        "value": "student dormitory"
      },
      {
        "name": "student union",
        "value": "student union"
      },
      {
        "name": "studying center",
        "value": "studying center"
      },
      {
        "name": "subaru dealer",
        "value": "subaru dealer"
      },
      {
        "name": "subway station",
        "value": "subway station"
      },
      {
        "name": "sugar factory",
        "value": "sugar factory"
      },
      {
        "name": "sugar shack",
        "value": "sugar shack"
      },
      {
        "name": "sukiyaki restaurant",
        "value": "sukiyaki restaurant"
      },
      {
        "name": "sunblind supplier",
        "value": "sunblind supplier"
      },
      {
        "name": "sundae restaurant",
        "value": "sundae restaurant"
      },
      {
        "name": "sundanese restaurant",
        "value": "sundanese restaurant"
      },
      {
        "name": "sunglasses store",
        "value": "sunglasses store"
      },
      {
        "name": "sunroom contractor",
        "value": "sunroom contractor"
      },
      {
        "name": "superannuation consultant",
        "value": "superannuation consultant"
      },
      {
        "name": "superfund site",
        "value": "superfund site"
      },
      {
        "name": "support group",
        "value": "support group"
      },
      {
        "name": "surf school",
        "value": "surf school"
      },
      {
        "name": "surf shop",
        "value": "surf shop"
      },
      {
        "name": "surgical center",
        "value": "surgical center"
      },
      {
        "name": "surgical oncologist",
        "value": "surgical oncologist"
      },
      {
        "name": "surinamese restaurant",
        "value": "surinamese restaurant"
      },
      {
        "name": "surplus store",
        "value": "surplus store"
      },
      {
        "name": "sushi restaurant",
        "value": "sushi restaurant"
      },
      {
        "name": "sushi takeaway",
        "value": "sushi takeaway"
      },
      {
        "name": "suzuki dealer",
        "value": "suzuki dealer"
      },
      {
        "name": "swabian restaurant",
        "value": "swabian restaurant"
      },
      {
        "name": "swedish restaurant",
        "value": "swedish restaurant"
      },
      {
        "name": "swim club",
        "value": "swim club"
      },
      {
        "name": "swimming basin",
        "value": "swimming basin"
      },
      {
        "name": "swimming competition",
        "value": "swimming competition"
      },
      {
        "name": "swimming facility",
        "value": "swimming facility"
      },
      {
        "name": "swimming instructor",
        "value": "swimming instructor"
      },
      {
        "name": "swimming lake",
        "value": "swimming lake"
      },
      {
        "name": "swimming pool",
        "value": "swimming pool"
      },
      {
        "name": "swimming school",
        "value": "swimming school"
      },
      {
        "name": "swimwear store",
        "value": "swimwear store"
      },
      {
        "name": "swiss restaurant",
        "value": "swiss restaurant"
      },
      {
        "name": "syrian restaurant",
        "value": "syrian restaurant"
      },
      {
        "name": "t-shirt store",
        "value": "t-shirt store"
      },
      {
        "name": "tabascan restaurant",
        "value": "tabascan restaurant"
      },
      {
        "name": "tacaca restaurant",
        "value": "tacaca restaurant"
      },
      {
        "name": "tack shop",
        "value": "tack shop"
      },
      {
        "name": "taco restaurant",
        "value": "taco restaurant"
      },
      {
        "name": "taekwondo school",
        "value": "taekwondo school"
      },
      {
        "name": "taiwanese restaurant",
        "value": "taiwanese restaurant"
      },
      {
        "name": "takeout restaurant",
        "value": "takeout restaurant"
      },
      {
        "name": "takoyaki restaurant",
        "value": "takoyaki restaurant"
      },
      {
        "name": "talent agency",
        "value": "talent agency"
      },
      {
        "name": "tamale shop",
        "value": "tamale shop"
      },
      {
        "name": "tanning salon",
        "value": "tanning salon"
      },
      {
        "name": "taoist temple",
        "value": "taoist temple"
      },
      {
        "name": "tapas bar",
        "value": "tapas bar"
      },
      {
        "name": "tapas restaurant",
        "value": "tapas restaurant"
      },
      {
        "name": "tatami store",
        "value": "tatami store"
      },
      {
        "name": "tattoo artist",
        "value": "tattoo artist"
      },
      {
        "name": "tattoo shop",
        "value": "tattoo shop"
      },
      {
        "name": "tax assessor",
        "value": "tax assessor"
      },
      {
        "name": "tax attorney",
        "value": "tax attorney"
      },
      {
        "name": "tax consultant",
        "value": "tax consultant"
      },
      {
        "name": "tax department",
        "value": "tax department"
      },
      {
        "name": "tax preparation",
        "value": "tax preparation"
      },
      {
        "name": "taxi service",
        "value": "taxi service"
      },
      {
        "name": "taxi stand",
        "value": "taxi stand"
      },
      {
        "name": "taxicab stand",
        "value": "taxicab stand"
      },
      {
        "name": "tb clinic",
        "value": "tb clinic"
      },
      {
        "name": "tea exporter",
        "value": "tea exporter"
      },
      {
        "name": "tea house",
        "value": "tea house"
      },
      {
        "name": "tea manufacturer",
        "value": "tea manufacturer"
      },
      {
        "name": "tea store",
        "value": "tea store"
      },
      {
        "name": "tea wholesaler",
        "value": "tea wholesaler"
      },
      {
        "name": "teachers college",
        "value": "teachers college"
      },
      {
        "name": "technical school",
        "value": "technical school"
      },
      {
        "name": "technical university",
        "value": "technical university"
      },
      {
        "name": "technology museum",
        "value": "technology museum"
      },
      {
        "name": "technology park",
        "value": "technology park"
      },
      {
        "name": "tegal restaurant",
        "value": "tegal restaurant"
      },
      {
        "name": "telecommunication school",
        "value": "telecommunication school"
      },
      {
        "name": "telecommunications contractor",
        "value": "telecommunications contractor"
      },
      {
        "name": "telecommunications engineer",
        "value": "telecommunications engineer"
      },
      {
        "name": "telemarketing service",
        "value": "telemarketing service"
      },
      {
        "name": "telephone company",
        "value": "telephone company"
      },
      {
        "name": "telephone exchange",
        "value": "telephone exchange"
      },
      {
        "name": "telescope store",
        "value": "telescope store"
      },
      {
        "name": "television station",
        "value": "television station"
      },
      {
        "name": "temaki restaurant",
        "value": "temaki restaurant"
      },
      {
        "name": "temp agency",
        "value": "temp agency"
      },
      {
        "name": "tempura restaurant",
        "value": "tempura restaurant"
      },
      {
        "name": "tenant ownership",
        "value": "tenant ownership"
      },
      {
        "name": "tennis club",
        "value": "tennis club"
      },
      {
        "name": "tennis court",
        "value": "tennis court"
      },
      {
        "name": "tennis instructor",
        "value": "tennis instructor"
      },
      {
        "name": "tennis store",
        "value": "tennis store"
      },
      {
        "name": "teppanyaki restaurant",
        "value": "teppanyaki restaurant"
      },
      {
        "name": "tesla showroom",
        "value": "tesla showroom"
      },
      {
        "name": "tex-mex restaurant",
        "value": "tex-mex restaurant"
      },
      {
        "name": "textile engineer",
        "value": "textile engineer"
      },
      {
        "name": "textile exporter",
        "value": "textile exporter"
      },
      {
        "name": "textile merchant",
        "value": "textile merchant"
      },
      {
        "name": "textile mill",
        "value": "textile mill"
      },
      {
        "name": "thai restaurant",
        "value": "thai restaurant"
      },
      {
        "name": "theater company",
        "value": "theater company"
      },
      {
        "name": "theater production",
        "value": "theater production"
      },
      {
        "name": "theme park",
        "value": "theme park"
      },
      {
        "name": "thermal baths",
        "value": "thermal baths"
      },
      {
        "name": "thread supplier",
        "value": "thread supplier"
      },
      {
        "name": "thrift store",
        "value": "thrift store"
      },
      {
        "name": "thuringian restaurant",
        "value": "thuringian restaurant"
      },
      {
        "name": "tibetan restaurant",
        "value": "tibetan restaurant"
      },
      {
        "name": "tiffin center",
        "value": "tiffin center"
      },
      {
        "name": "tiki bar",
        "value": "tiki bar"
      },
      {
        "name": "tile contractor",
        "value": "tile contractor"
      },
      {
        "name": "tile manufacturer",
        "value": "tile manufacturer"
      },
      {
        "name": "tile store",
        "value": "tile store"
      },
      {
        "name": "timeshare agency",
        "value": "timeshare agency"
      },
      {
        "name": "tire service",
        "value": "tire service"
      },
      {
        "name": "tire shop",
        "value": "tire shop"
      },
      {
        "name": "title company",
        "value": "title company"
      },
      {
        "name": "toast restaurant",
        "value": "toast restaurant"
      },
      {
        "name": "tobacco shop",
        "value": "tobacco shop"
      },
      {
        "name": "tobacco supplier",
        "value": "tobacco supplier"
      },
      {
        "name": "tofu restaurant",
        "value": "tofu restaurant"
      },
      {
        "name": "tofu shop",
        "value": "tofu shop"
      },
      {
        "name": "toiletries store",
        "value": "toiletries store"
      },
      {
        "name": "toll station",
        "value": "toll station"
      },
      {
        "name": "tongue restaurant",
        "value": "tongue restaurant"
      },
      {
        "name": "tonkatsu restaurant",
        "value": "tonkatsu restaurant"
      },
      {
        "name": "tool manufacturer",
        "value": "tool manufacturer"
      },
      {
        "name": "tool store",
        "value": "tool store"
      },
      {
        "name": "tool wholesaler",
        "value": "tool wholesaler"
      },
      {
        "name": "topography company",
        "value": "topography company"
      },
      {
        "name": "topsoil supplier",
        "value": "topsoil supplier"
      },
      {
        "name": "tortilla shop",
        "value": "tortilla shop"
      },
      {
        "name": "tour agency",
        "value": "tour agency"
      },
      {
        "name": "tour operator",
        "value": "tour operator"
      },
      {
        "name": "tourist attraction",
        "value": "tourist attraction"
      },
      {
        "name": "towing service",
        "value": "towing service"
      },
      {
        "name": "townhouse complex",
        "value": "townhouse complex"
      },
      {
        "name": "toy library",
        "value": "toy library"
      },
      {
        "name": "toy manufacturer",
        "value": "toy manufacturer"
      },
      {
        "name": "toy museum",
        "value": "toy museum"
      },
      {
        "name": "toy store",
        "value": "toy store"
      },
      {
        "name": "toyota dealer",
        "value": "toyota dealer"
      },
      {
        "name": "tractor dealer",
        "value": "tractor dealer"
      },
      {
        "name": "trade school",
        "value": "trade school"
      },
      {
        "name": "trading company",
        "value": "trading company"
      },
      {
        "name": "traditional market",
        "value": "traditional market"
      },
      {
        "name": "traditional teahouse",
        "value": "traditional teahouse"
      },
      {
        "name": "traffic officer",
        "value": "traffic officer"
      },
      {
        "name": "trailer dealer",
        "value": "trailer dealer"
      },
      {
        "name": "trailer manufacturer",
        "value": "trailer manufacturer"
      },
      {
        "name": "train depot",
        "value": "train depot"
      },
      {
        "name": "train station",
        "value": "train station"
      },
      {
        "name": "train yard",
        "value": "train yard"
      },
      {
        "name": "training center",
        "value": "training center"
      },
      {
        "name": "training centre",
        "value": "training centre"
      },
      {
        "name": "training consultant",
        "value": "training consultant"
      },
      {
        "name": "training provider",
        "value": "training provider"
      },
      {
        "name": "tram stop",
        "value": "tram stop"
      },
      {
        "name": "transcription service",
        "value": "transcription service"
      },
      {
        "name": "transit depot",
        "value": "transit depot"
      },
      {
        "name": "transit station",
        "value": "transit station"
      },
      {
        "name": "transit stop",
        "value": "transit stop"
      },
      {
        "name": "translation service",
        "value": "translation service"
      },
      {
        "name": "transmission shop",
        "value": "transmission shop"
      },
      {
        "name": "transplant surgeon",
        "value": "transplant surgeon"
      },
      {
        "name": "transport hub",
        "value": "transport hub"
      },
      {
        "name": "transportation service",
        "value": "transportation service"
      },
      {
        "name": "travel agency",
        "value": "travel agency"
      },
      {
        "name": "travel agent",
        "value": "travel agent"
      },
      {
        "name": "travel clinic",
        "value": "travel clinic"
      },
      {
        "name": "travel lounge",
        "value": "travel lounge"
      },
      {
        "name": "tree farm",
        "value": "tree farm"
      },
      {
        "name": "tree service",
        "value": "tree service"
      },
      {
        "name": "trial attorney",
        "value": "trial attorney"
      },
      {
        "name": "tribal headquarters",
        "value": "tribal headquarters"
      },
      {
        "name": "trolleybus stop",
        "value": "trolleybus stop"
      },
      {
        "name": "trophy shop",
        "value": "trophy shop"
      },
      {
        "name": "truck dealer",
        "value": "truck dealer"
      },
      {
        "name": "truck farmer",
        "value": "truck farmer"
      },
      {
        "name": "truck stop",
        "value": "truck stop"
      },
      {
        "name": "trucking company",
        "value": "trucking company"
      },
      {
        "name": "truss manufacturer",
        "value": "truss manufacturer"
      },
      {
        "name": "trust bank",
        "value": "trust bank"
      },
      {
        "name": "tunisian restaurant",
        "value": "tunisian restaurant"
      },
      {
        "name": "turf supplier",
        "value": "turf supplier"
      },
      {
        "name": "turkish restaurant",
        "value": "turkish restaurant"
      },
      {
        "name": "turkmen restaurant",
        "value": "turkmen restaurant"
      },
      {
        "name": "tuscan restaurant",
        "value": "tuscan restaurant"
      },
      {
        "name": "tutoring service",
        "value": "tutoring service"
      },
      {
        "name": "tuxedo shop",
        "value": "tuxedo shop"
      },
      {
        "name": "typewriter supplier",
        "value": "typewriter supplier"
      },
      {
        "name": "typing service",
        "value": "typing service"
      },
      {
        "name": "tyre manufacturer",
        "value": "tyre manufacturer"
      },
      {
        "name": "ukrainian restaurant",
        "value": "ukrainian restaurant"
      },
      {
        "name": "unagi restaurant",
        "value": "unagi restaurant"
      },
      {
        "name": "underwear store",
        "value": "underwear store"
      },
      {
        "name": "unemployment office",
        "value": "unemployment office"
      },
      {
        "name": "uniform store",
        "value": "uniform store"
      },
      {
        "name": "unity church",
        "value": "unity church"
      },
      {
        "name": "university department",
        "value": "university department"
      },
      {
        "name": "university hospital",
        "value": "university hospital"
      },
      {
        "name": "university library",
        "value": "university library"
      },
      {
        "name": "upholstery shop",
        "value": "upholstery shop"
      },
      {
        "name": "urology clinic",
        "value": "urology clinic"
      },
      {
        "name": "uruguayan restaurant",
        "value": "uruguayan restaurant"
      },
      {
        "name": "utility contractor",
        "value": "utility contractor"
      },
      {
        "name": "valencian restaurant",
        "value": "valencian restaurant"
      },
      {
        "name": "vaporizer store",
        "value": "vaporizer store"
      },
      {
        "name": "variety store",
        "value": "variety store"
      },
      {
        "name": "vascular surgeon",
        "value": "vascular surgeon"
      },
      {
        "name": "vastu consultant",
        "value": "vastu consultant"
      },
      {
        "name": "vegan restaurant",
        "value": "vegan restaurant"
      },
      {
        "name": "vegetable wholesaler",
        "value": "vegetable wholesaler"
      },
      {
        "name": "vegetarian restaurant",
        "value": "vegetarian restaurant"
      },
      {
        "name": "vehicle exporter",
        "value": "vehicle exporter"
      },
      {
        "name": "vehicle repair",
        "value": "vehicle repair"
      },
      {
        "name": "venetian restaurant",
        "value": "venetian restaurant"
      },
      {
        "name": "venezuelan restaurant",
        "value": "venezuelan restaurant"
      },
      {
        "name": "veterans center",
        "value": "veterans center"
      },
      {
        "name": "veterans hospital",
        "value": "veterans hospital"
      },
      {
        "name": "veterans organization",
        "value": "veterans organization"
      },
      {
        "name": "veterinary care",
        "value": "veterinary care"
      },
      {
        "name": "veterinary pharmacy",
        "value": "veterinary pharmacy"
      },
      {
        "name": "video arcade",
        "value": "video arcade"
      },
      {
        "name": "video karaoke",
        "value": "video karaoke"
      },
      {
        "name": "video store",
        "value": "video store"
      },
      {
        "name": "vietnamese restaurant",
        "value": "vietnamese restaurant"
      },
      {
        "name": "village hall",
        "value": "village hall"
      },
      {
        "name": "vineyard church",
        "value": "vineyard church"
      },
      {
        "name": "violin shop",
        "value": "violin shop"
      },
      {
        "name": "visitor center",
        "value": "visitor center"
      },
      {
        "name": "vocal instructor",
        "value": "vocal instructor"
      },
      {
        "name": "vocational school",
        "value": "vocational school"
      },
      {
        "name": "volkswagen dealer",
        "value": "volkswagen dealer"
      },
      {
        "name": "volleyball club",
        "value": "volleyball club"
      },
      {
        "name": "volleyball court",
        "value": "volleyball court"
      },
      {
        "name": "volleyball instructor",
        "value": "volleyball instructor"
      },
      {
        "name": "volunteer organization",
        "value": "volunteer organization"
      },
      {
        "name": "volvo dealer",
        "value": "volvo dealer"
      },
      {
        "name": "waldorf kindergarten",
        "value": "waldorf kindergarten"
      },
      {
        "name": "waldorf school",
        "value": "waldorf school"
      },
      {
        "name": "walk-in clinic",
        "value": "walk-in clinic"
      },
      {
        "name": "wallpaper installer",
        "value": "wallpaper installer"
      },
      {
        "name": "wallpaper store",
        "value": "wallpaper store"
      },
      {
        "name": "war museum",
        "value": "war museum"
      },
      {
        "name": "warehouse club",
        "value": "warehouse club"
      },
      {
        "name": "warehouse store",
        "value": "warehouse store"
      },
      {
        "name": "watch manufacturer",
        "value": "watch manufacturer"
      },
      {
        "name": "watch store",
        "value": "watch store"
      },
      {
        "name": "water mill",
        "value": "water mill"
      },
      {
        "name": "water park",
        "value": "water park"
      },
      {
        "name": "water works",
        "value": "water works"
      },
      {
        "name": "waterbed store",
        "value": "waterbed store"
      },
      {
        "name": "waterproofing service",
        "value": "waterproofing service"
      },
      {
        "name": "wax museum",
        "value": "wax museum"
      },
      {
        "name": "wax supplier",
        "value": "wax supplier"
      },
      {
        "name": "weaving mill",
        "value": "weaving mill"
      },
      {
        "name": "web designer",
        "value": "web designer"
      },
      {
        "name": "website designer",
        "value": "website designer"
      },
      {
        "name": "wedding bakery",
        "value": "wedding bakery"
      },
      {
        "name": "wedding buffet",
        "value": "wedding buffet"
      },
      {
        "name": "wedding chapel",
        "value": "wedding chapel"
      },
      {
        "name": "wedding photographer",
        "value": "wedding photographer"
      },
      {
        "name": "wedding planner",
        "value": "wedding planner"
      },
      {
        "name": "wedding service",
        "value": "wedding service"
      },
      {
        "name": "wedding store",
        "value": "wedding store"
      },
      {
        "name": "wedding venue",
        "value": "wedding venue"
      },
      {
        "name": "weigh station",
        "value": "weigh station"
      },
      {
        "name": "weightlifting area",
        "value": "weightlifting area"
      },
      {
        "name": "wellness center",
        "value": "wellness center"
      },
      {
        "name": "wellness hotel",
        "value": "wellness hotel"
      },
      {
        "name": "wellness program",
        "value": "wellness program"
      },
      {
        "name": "welsh restaurant",
        "value": "welsh restaurant"
      },
      {
        "name": "wesleyan church",
        "value": "wesleyan church"
      },
      {
        "name": "western restaurant",
        "value": "western restaurant"
      },
      {
        "name": "wheel store",
        "value": "wheel store"
      },
      {
        "name": "wheelchair store",
        "value": "wheelchair store"
      },
      {
        "name": "wholesale bakery",
        "value": "wholesale bakery"
      },
      {
        "name": "wholesale drugstore",
        "value": "wholesale drugstore"
      },
      {
        "name": "wholesale florist",
        "value": "wholesale florist"
      },
      {
        "name": "wholesale grocer",
        "value": "wholesale grocer"
      },
      {
        "name": "wholesale jeweler",
        "value": "wholesale jeweler"
      },
      {
        "name": "wholesale market",
        "value": "wholesale market"
      },
      {
        "name": "wi-fi spot",
        "value": "wi-fi spot"
      },
      {
        "name": "wicker store",
        "value": "wicker store"
      },
      {
        "name": "wig shop",
        "value": "wig shop"
      },
      {
        "name": "wildlife park",
        "value": "wildlife park"
      },
      {
        "name": "wildlife refuge",
        "value": "wildlife refuge"
      },
      {
        "name": "wind farm",
        "value": "wind farm"
      },
      {
        "name": "window supplier",
        "value": "window supplier"
      },
      {
        "name": "windsurfing store",
        "value": "windsurfing store"
      },
      {
        "name": "wine bar",
        "value": "wine bar"
      },
      {
        "name": "wine cellar",
        "value": "wine cellar"
      },
      {
        "name": "wine club",
        "value": "wine club"
      },
      {
        "name": "wine store",
        "value": "wine store"
      },
      {
        "name": "wok restaurant",
        "value": "wok restaurant"
      },
      {
        "name": "wood supplier",
        "value": "wood supplier"
      },
      {
        "name": "wool store",
        "value": "wool store"
      },
      {
        "name": "wrestling school",
        "value": "wrestling school"
      },
      {
        "name": "x-ray lab",
        "value": "x-ray lab"
      },
      {
        "name": "yacht broker",
        "value": "yacht broker"
      },
      {
        "name": "yacht club",
        "value": "yacht club"
      },
      {
        "name": "yakiniku restaurant",
        "value": "yakiniku restaurant"
      },
      {
        "name": "yakisoba restaurant",
        "value": "yakisoba restaurant"
      },
      {
        "name": "yakitori restaurant",
        "value": "yakitori restaurant"
      },
      {
        "name": "yarn store",
        "value": "yarn store"
      },
      {
        "name": "yemeni restaurant",
        "value": "yemeni restaurant"
      },
      {
        "name": "yoga instructor",
        "value": "yoga instructor"
      },
      {
        "name": "yoga studio",
        "value": "yoga studio"
      },
      {
        "name": "youth center",
        "value": "youth center"
      },
      {
        "name": "youth club",
        "value": "youth club"
      },
      {
        "name": "youth hostel",
        "value": "youth hostel"
      },
      {
        "name": "youth organization",
        "value": "youth organization"
      },
      {
        "name": "yucatan restaurant",
        "value": "yucatan restaurant"
      },
      {
        "name": "3d printing service",
        "value": "3d printing service"
      },
      {
        "name": "aboriginal art gallery",
        "value": "aboriginal art gallery"
      },
      {
        "name": "abundant life church",
        "value": "abundant life church"
      },
      {
        "name": "acrobatic diving pool",
        "value": "acrobatic diving pool"
      },
      {
        "name": "addiction treatment center",
        "value": "addiction treatment center"
      },
      {
        "name": "adult dvd store",
        "value": "adult dvd store"
      },
      {
        "name": "adult education school",
        "value": "adult education school"
      },
      {
        "name": "adult entertainment club",
        "value": "adult entertainment club"
      },
      {
        "name": "adult entertainment store",
        "value": "adult entertainment store"
      },
      {
        "name": "adventure sports center",
        "value": "adventure sports center"
      },
      {
        "name": "aerated drinks supplier",
        "value": "aerated drinks supplier"
      },
      {
        "name": "aerial sports center",
        "value": "aerial sports center"
      },
      {
        "name": "aero dance class",
        "value": "aero dance class"
      },
      {
        "name": "african goods store",
        "value": "african goods store"
      },
      {
        "name": "after school program",
        "value": "after school program"
      },
      {
        "name": "agricultural high school",
        "value": "agricultural high school"
      },
      {
        "name": "agricultural machinery manufacturer",
        "value": "agricultural machinery manufacturer"
      },
      {
        "name": "agricultural product wholesaler",
        "value": "agricultural product wholesaler"
      },
      {
        "name": "air compressor supplier",
        "value": "air compressor supplier"
      },
      {
        "name": "air conditioning contractor",
        "value": "air conditioning contractor"
      },
      {
        "name": "air conditioning store",
        "value": "air conditioning store"
      },
      {
        "name": "air filter supplier",
        "value": "air filter supplier"
      },
      {
        "name": "air force base",
        "value": "air force base"
      },
      {
        "name": "airbrushing supply store",
        "value": "airbrushing supply store"
      },
      {
        "name": "aircraft maintenance company",
        "value": "aircraft maintenance company"
      },
      {
        "name": "aircraft rental service",
        "value": "aircraft rental service"
      },
      {
        "name": "aircraft supply store",
        "value": "aircraft supply store"
      },
      {
        "name": "airline ticket agency",
        "value": "airline ticket agency"
      },
      {
        "name": "airport shuttle service",
        "value": "airport shuttle service"
      },
      {
        "name": "alcohol retail monopoly",
        "value": "alcohol retail monopoly"
      },
      {
        "name": "alcoholic beverage wholesaler",
        "value": "alcoholic beverage wholesaler"
      },
      {
        "name": "alcoholism treatment program",
        "value": "alcoholism treatment program"
      },
      {
        "name": "alfa romeo dealer",
        "value": "alfa romeo dealer"
      },
      {
        "name": "alternative fuel station",
        "value": "alternative fuel station"
      },
      {
        "name": "alternative medicine clinic",
        "value": "alternative medicine clinic"
      },
      {
        "name": "alternative medicine practitioner",
        "value": "alternative medicine practitioner"
      },
      {
        "name": "aluminum frames supplier",
        "value": "aluminum frames supplier"
      },
      {
        "name": "american grocery store",
        "value": "american grocery store"
      },
      {
        "name": "amish furniture store",
        "value": "amish furniture store"
      },
      {
        "name": "amusement machine supplier",
        "value": "amusement machine supplier"
      },
      {
        "name": "amusement park ride",
        "value": "amusement park ride"
      },
      {
        "name": "amusement ride supplier",
        "value": "amusement ride supplier"
      },
      {
        "name": "angler fish restaurant",
        "value": "angler fish restaurant"
      },
      {
        "name": "animal control service",
        "value": "animal control service"
      },
      {
        "name": "animal feed store",
        "value": "animal feed store"
      },
      {
        "name": "animal protection organization",
        "value": "animal protection organization"
      },
      {
        "name": "animal rescue service",
        "value": "animal rescue service"
      },
      {
        "name": "animal watering hole",
        "value": "animal watering hole"
      },
      {
        "name": "antique furniture store",
        "value": "antique furniture store"
      },
      {
        "name": "apartment rental agency",
        "value": "apartment rental agency"
      },
      {
        "name": "appliance parts supplier",
        "value": "appliance parts supplier"
      },
      {
        "name": "appliance rental service",
        "value": "appliance rental service"
      },
      {
        "name": "appliance repair service",
        "value": "appliance repair service"
      },
      {
        "name": "appliances customer service",
        "value": "appliances customer service"
      },
      {
        "name": "architectural salvage store",
        "value": "architectural salvage store"
      },
      {
        "name": "armed forces association",
        "value": "armed forces association"
      },
      {
        "name": "aromatherapy supply store",
        "value": "aromatherapy supply store"
      },
      {
        "name": "art restoration service",
        "value": "art restoration service"
      },
      {
        "name": "art supply store",
        "value": "art supply store"
      },
      {
        "name": "artificial plant supplier",
        "value": "artificial plant supplier"
      },
      {
        "name": "asbestos testing service",
        "value": "asbestos testing service"
      },
      {
        "name": "asian fusion restaurant",
        "value": "asian fusion restaurant"
      },
      {
        "name": "asian grocery store",
        "value": "asian grocery store"
      },
      {
        "name": "asphalt mixing plant",
        "value": "asphalt mixing plant"
      },
      {
        "name": "assisted living facility",
        "value": "assisted living facility"
      },
      {
        "name": "association / organization",
        "value": "association / organization"
      },
      {
        "name": "aston martin dealer",
        "value": "aston martin dealer"
      },
      {
        "name": "attorney referral service",
        "value": "attorney referral service"
      },
      {
        "name": "atv rental service",
        "value": "atv rental service"
      },
      {
        "name": "atv repair shop",
        "value": "atv repair shop"
      },
      {
        "name": "audio visual consultant",
        "value": "audio visual consultant"
      },
      {
        "name": "australian goods store",
        "value": "australian goods store"
      },
      {
        "name": "auto accessories wholesaler",
        "value": "auto accessories wholesaler"
      },
      {
        "name": "auto body shop",
        "value": "auto body shop"
      },
      {
        "name": "auto bodywork mechanic",
        "value": "auto bodywork mechanic"
      },
      {
        "name": "auto chemistry shop",
        "value": "auto chemistry shop"
      },
      {
        "name": "auto electrical service",
        "value": "auto electrical service"
      },
      {
        "name": "auto glass shop",
        "value": "auto glass shop"
      },
      {
        "name": "auto insurance agency",
        "value": "auto insurance agency"
      },
      {
        "name": "auto machine shop",
        "value": "auto machine shop"
      },
      {
        "name": "auto parts manufacturer",
        "value": "auto parts manufacturer"
      },
      {
        "name": "auto parts market",
        "value": "auto parts market"
      },
      {
        "name": "auto parts store",
        "value": "auto parts store"
      },
      {
        "name": "auto repair shop",
        "value": "auto repair shop"
      },
      {
        "name": "auto restoration service",
        "value": "auto restoration service"
      },
      {
        "name": "auto rickshaw stand",
        "value": "auto rickshaw stand"
      },
      {
        "name": "auto spring shop",
        "value": "auto spring shop"
      },
      {
        "name": "auto sunroof shop",
        "value": "auto sunroof shop"
      },
      {
        "name": "auto tag agency",
        "value": "auto tag agency"
      },
      {
        "name": "automobile storage facility",
        "value": "automobile storage facility"
      },
      {
        "name": "aviation training institute",
        "value": "aviation training institute"
      },
      {
        "name": "ayam penyet restaurant",
        "value": "ayam penyet restaurant"
      },
      {
        "name": "baby clothing store",
        "value": "baby clothing store"
      },
      {
        "name": "baby swimming school",
        "value": "baby swimming school"
      },
      {
        "name": "bail bonds service",
        "value": "bail bonds service"
      },
      {
        "name": "baking supply store",
        "value": "baking supply store"
      },
      {
        "name": "ballroom dance instructor",
        "value": "ballroom dance instructor"
      },
      {
        "name": "banking and finance",
        "value": "banking and finance"
      },
      {
        "name": "bar stool supplier",
        "value": "bar stool supplier"
      },
      {
        "name": "barber supply store",
        "value": "barber supply store"
      },
      {
        "name": "baseball goods store",
        "value": "baseball goods store"
      },
      {
        "name": "basketball court contractor",
        "value": "basketball court contractor"
      },
      {
        "name": "bathroom supply store",
        "value": "bathroom supply store"
      },
      {
        "name": "batik clothing store",
        "value": "batik clothing store"
      },
      {
        "name": "batting cage center",
        "value": "batting cage center"
      },
      {
        "name": "beach cleaning service",
        "value": "beach cleaning service"
      },
      {
        "name": "beach clothing store",
        "value": "beach clothing store"
      },
      {
        "name": "beach entertainment shop",
        "value": "beach entertainment shop"
      },
      {
        "name": "beach volleyball club",
        "value": "beach volleyball club"
      },
      {
        "name": "beach volleyball court",
        "value": "beach volleyball court"
      },
      {
        "name": "beauty product supplier",
        "value": "beauty product supplier"
      },
      {
        "name": "beauty products wholesaler",
        "value": "beauty products wholesaler"
      },
      {
        "name": "beauty supply store",
        "value": "beauty supply store"
      },
      {
        "name": "bed & breakfast",
        "value": "bed & breakfast"
      },
      {
        "name": "bedroom furniture store",
        "value": "bedroom furniture store"
      },
      {
        "name": "bee relocation service",
        "value": "bee relocation service"
      },
      {
        "name": "bicycle rental service",
        "value": "bicycle rental service"
      },
      {
        "name": "bicycle repair shop",
        "value": "bicycle repair shop"
      },
      {
        "name": "bike sharing station",
        "value": "bike sharing station"
      },
      {
        "name": "bikram yoga studio",
        "value": "bikram yoga studio"
      },
      {
        "name": "billiards supply store",
        "value": "billiards supply store"
      },
      {
        "name": "bird control service",
        "value": "bird control service"
      },
      {
        "name": "bird watching area",
        "value": "bird watching area"
      },
      {
        "name": "birth certificate service",
        "value": "birth certificate service"
      },
      {
        "name": "birth control center",
        "value": "birth control center"
      },
      {
        "name": "blast cleaning service",
        "value": "blast cleaning service"
      },
      {
        "name": "blood donation center",
        "value": "blood donation center"
      },
      {
        "name": "blood testing service",
        "value": "blood testing service"
      },
      {
        "name": "bmw motorcycle dealer",
        "value": "bmw motorcycle dealer"
      },
      {
        "name": "board game club",
        "value": "board game club"
      },
      {
        "name": "board of education",
        "value": "board of education"
      },
      {
        "name": "boat accessories supplier",
        "value": "boat accessories supplier"
      },
      {
        "name": "boat cleaning service",
        "value": "boat cleaning service"
      },
      {
        "name": "boat cover supplier",
        "value": "boat cover supplier"
      },
      {
        "name": "boat detailing service",
        "value": "boat detailing service"
      },
      {
        "name": "boat rental service",
        "value": "boat rental service"
      },
      {
        "name": "boat repair shop",
        "value": "boat repair shop"
      },
      {
        "name": "boat storage facility",
        "value": "boat storage facility"
      },
      {
        "name": "boat tour agency",
        "value": "boat tour agency"
      },
      {
        "name": "boat trailer dealer",
        "value": "boat trailer dealer"
      },
      {
        "name": "bocce ball court",
        "value": "bocce ball court"
      },
      {
        "name": "body piercing shop",
        "value": "body piercing shop"
      },
      {
        "name": "body shaping class",
        "value": "body shaping class"
      },
      {
        "name": "bonsai plant supplier",
        "value": "bonsai plant supplier"
      },
      {
        "name": "boot repair shop",
        "value": "boot repair shop"
      },
      {
        "name": "border crossing station",
        "value": "border crossing station"
      },
      {
        "name": "bottled water supplier",
        "value": "bottled water supplier"
      },
      {
        "name": "bouncy castle hire",
        "value": "bouncy castle hire"
      },
      {
        "name": "bowling supply shop",
        "value": "bowling supply shop"
      },
      {
        "name": "box lunch supplier",
        "value": "box lunch supplier"
      },
      {
        "name": "boys' high school",
        "value": "boys' high school"
      },
      {
        "name": "bpo placement agency",
        "value": "bpo placement agency"
      },
      {
        "name": "brewing supply store",
        "value": "brewing supply store"
      },
      {
        "name": "bubble tea store",
        "value": "bubble tea store"
      },
      {
        "name": "buddhist supplies store",
        "value": "buddhist supplies store"
      },
      {
        "name": "building materials market",
        "value": "building materials market"
      },
      {
        "name": "building materials store",
        "value": "building materials store"
      },
      {
        "name": "building materials supplier",
        "value": "building materials supplier"
      },
      {
        "name": "building restoration service",
        "value": "building restoration service"
      },
      {
        "name": "bungee jumping center",
        "value": "bungee jumping center"
      },
      {
        "name": "burglar alarm store",
        "value": "burglar alarm store"
      },
      {
        "name": "bus ticket agency",
        "value": "bus ticket agency"
      },
      {
        "name": "bus tour agency",
        "value": "bus tour agency"
      },
      {
        "name": "business administration service",
        "value": "business administration service"
      },
      {
        "name": "business banking service",
        "value": "business banking service"
      },
      {
        "name": "business development service",
        "value": "business development service"
      },
      {
        "name": "business management consultant",
        "value": "business management consultant"
      },
      {
        "name": "business networking company",
        "value": "business networking company"
      },
      {
        "name": "butane gas supplier",
        "value": "butane gas supplier"
      },
      {
        "name": "butcher shop deli",
        "value": "butcher shop deli"
      },
      {
        "name": "cabin rental agency",
        "value": "cabin rental agency"
      },
      {
        "name": "calvary chapel church",
        "value": "calvary chapel church"
      },
      {
        "name": "camera repair shop",
        "value": "camera repair shop"
      },
      {
        "name": "camper shell supplier",
        "value": "camper shell supplier"
      },
      {
        "name": "cancer treatment center",
        "value": "cancer treatment center"
      },
      {
        "name": "cane furniture store",
        "value": "cane furniture store"
      },
      {
        "name": "cape verdean restaurant",
        "value": "cape verdean restaurant"
      },
      {
        "name": "car accessories store",
        "value": "car accessories store"
      },
      {
        "name": "car alarm supplier",
        "value": "car alarm supplier"
      },
      {
        "name": "car battery store",
        "value": "car battery store"
      },
      {
        "name": "car detailing service",
        "value": "car detailing service"
      },
      {
        "name": "car inspection station",
        "value": "car inspection station"
      },
      {
        "name": "car leasing service",
        "value": "car leasing service"
      },
      {
        "name": "car rental agency",
        "value": "car rental agency"
      },
      {
        "name": "car sharing location",
        "value": "car sharing location"
      },
      {
        "name": "car stereo store",
        "value": "car stereo store"
      },
      {
        "name": "career guidance service",
        "value": "career guidance service"
      },
      {
        "name": "carpet cleaning service",
        "value": "carpet cleaning service"
      },
      {
        "name": "carriage ride service",
        "value": "carriage ride service"
      },
      {
        "name": "cat boarding service",
        "value": "cat boarding service"
      },
      {
        "name": "cell phone store",
        "value": "cell phone store"
      },
      {
        "name": "central american restaurant",
        "value": "central american restaurant"
      },
      {
        "name": "central european restaurant",
        "value": "central european restaurant"
      },
      {
        "name": "central heating service",
        "value": "central heating service"
      },
      {
        "name": "central javanese restaurant",
        "value": "central javanese restaurant"
      },
      {
        "name": "certified public accountant",
        "value": "certified public accountant"
      },
      {
        "name": "chamber of agriculture",
        "value": "chamber of agriculture"
      },
      {
        "name": "chamber of commerce",
        "value": "chamber of commerce"
      },
      {
        "name": "chamber of handicrafts",
        "value": "chamber of handicrafts"
      },
      {
        "name": "champon noodle restaurant",
        "value": "champon noodle restaurant"
      },
      {
        "name": "check cashing service",
        "value": "check cashing service"
      },
      {
        "name": "chicken wings restaurant",
        "value": "chicken wings restaurant"
      },
      {
        "name": "child care agency",
        "value": "child care agency"
      },
      {
        "name": "children's amusement center",
        "value": "children's amusement center"
      },
      {
        "name": "children's clothing store",
        "value": "children's clothing store"
      },
      {
        "name": "children's furniture store",
        "value": "children's furniture store"
      },
      {
        "name": "children's health service",
        "value": "children's health service"
      },
      {
        "name": "children's party buffet",
        "value": "children's party buffet"
      },
      {
        "name": "children's party service",
        "value": "children's party service"
      },
      {
        "name": "chinese language instructor",
        "value": "chinese language instructor"
      },
      {
        "name": "chinese language school",
        "value": "chinese language school"
      },
      {
        "name": "chinese medicine clinic",
        "value": "chinese medicine clinic"
      },
      {
        "name": "chinese medicine store",
        "value": "chinese medicine store"
      },
      {
        "name": "chinese noodle restaurant",
        "value": "chinese noodle restaurant"
      },
      {
        "name": "chinese tea house",
        "value": "chinese tea house"
      },
      {
        "name": "christian book store",
        "value": "christian book store"
      },
      {
        "name": "christmas tree farm",
        "value": "christmas tree farm"
      },
      {
        "name": "church of christ",
        "value": "church of christ"
      },
      {
        "name": "church supply store",
        "value": "church supply store"
      },
      {
        "name": "cig kofte restaurant",
        "value": "cig kofte restaurant"
      },
      {
        "name": "cinema equipment supplier",
        "value": "cinema equipment supplier"
      },
      {
        "name": "citizen information bureau",
        "value": "citizen information bureau"
      },
      {
        "name": "city district office",
        "value": "city district office"
      },
      {
        "name": "city employment department",
        "value": "city employment department"
      },
      {
        "name": "city government office",
        "value": "city government office"
      },
      {
        "name": "city tax office",
        "value": "city tax office"
      },
      {
        "name": "civil engineering company",
        "value": "civil engineering company"
      },
      {
        "name": "civil examinations academy",
        "value": "civil examinations academy"
      },
      {
        "name": "civil law attorney",
        "value": "civil law attorney"
      },
      {
        "name": "cleaning products supplier",
        "value": "cleaning products supplier"
      },
      {
        "name": "clock repair service",
        "value": "clock repair service"
      },
      {
        "name": "closed circuit television",
        "value": "closed circuit television"
      },
      {
        "name": "clothing alteration service",
        "value": "clothing alteration service"
      },
      {
        "name": "coast guard station",
        "value": "coast guard station"
      },
      {
        "name": "coffee machine supplier",
        "value": "coffee machine supplier"
      },
      {
        "name": "coffee vending machine",
        "value": "coffee vending machine"
      },
      {
        "name": "coin operated locker",
        "value": "coin operated locker"
      },
      {
        "name": "cold cut store",
        "value": "cold cut store"
      },
      {
        "name": "cold noodle restaurant",
        "value": "cold noodle restaurant"
      },
      {
        "name": "cold storage facility",
        "value": "cold storage facility"
      },
      {
        "name": "college of agriculture",
        "value": "college of agriculture"
      },
      {
        "name": "comic book store",
        "value": "comic book store"
      },
      {
        "name": "commercial refrigerator supplier",
        "value": "commercial refrigerator supplier"
      },
      {
        "name": "commissioner for oaths",
        "value": "commissioner for oaths"
      },
      {
        "name": "community health center",
        "value": "community health center"
      },
      {
        "name": "community health centre",
        "value": "community health centre"
      },
      {
        "name": "comprehensive secondary school",
        "value": "comprehensive secondary school"
      },
      {
        "name": "computer accessories store",
        "value": "computer accessories store"
      },
      {
        "name": "computer desk store",
        "value": "computer desk store"
      },
      {
        "name": "computer hardware manufacturer",
        "value": "computer hardware manufacturer"
      },
      {
        "name": "computer networking service",
        "value": "computer networking service"
      },
      {
        "name": "computer repair service",
        "value": "computer repair service"
      },
      {
        "name": "computer security service",
        "value": "computer security service"
      },
      {
        "name": "computer software store",
        "value": "computer software store"
      },
      {
        "name": "computer training school",
        "value": "computer training school"
      },
      {
        "name": "concrete product supplier",
        "value": "concrete product supplier"
      },
      {
        "name": "condominium rental agency",
        "value": "condominium rental agency"
      },
      {
        "name": "conservatory of music",
        "value": "conservatory of music"
      },
      {
        "name": "construction equipment supplier",
        "value": "construction equipment supplier"
      },
      {
        "name": "construction machine dealer",
        "value": "construction machine dealer"
      },
      {
        "name": "construction material wholesaler",
        "value": "construction material wholesaler"
      },
      {
        "name": "consumer advice center",
        "value": "consumer advice center"
      },
      {
        "name": "contact lenses supplier",
        "value": "contact lenses supplier"
      },
      {
        "name": "contemporary louisiana restaurant",
        "value": "contemporary louisiana restaurant"
      },
      {
        "name": "convention information bureau",
        "value": "convention information bureau"
      },
      {
        "name": "copier repair service",
        "value": "copier repair service"
      },
      {
        "name": "copying supply store",
        "value": "copying supply store"
      },
      {
        "name": "corporate gift supplier",
        "value": "corporate gift supplier"
      },
      {
        "name": "cosmetic products manufacturer",
        "value": "cosmetic products manufacturer"
      },
      {
        "name": "cost accounting service",
        "value": "cost accounting service"
      },
      {
        "name": "costa rican restaurant",
        "value": "costa rican restaurant"
      },
      {
        "name": "costume jewelry shop",
        "value": "costume jewelry shop"
      },
      {
        "name": "costume rental service",
        "value": "costume rental service"
      },
      {
        "name": "country food restaurant",
        "value": "country food restaurant"
      },
      {
        "name": "county government office",
        "value": "county government office"
      },
      {
        "name": "court executive officer",
        "value": "court executive officer"
      },
      {
        "name": "crane rental agency",
        "value": "crane rental agency"
      },
      {
        "name": "creative cuisine restaurant",
        "value": "creative cuisine restaurant"
      },
      {
        "name": "credit counseling service",
        "value": "credit counseling service"
      },
      {
        "name": "credit reporting agency",
        "value": "credit reporting agency"
      },
      {
        "name": "crime victim service",
        "value": "crime victim service"
      },
      {
        "name": "criminal justice attorney",
        "value": "criminal justice attorney"
      },
      {
        "name": "crushed stone supplier",
        "value": "crushed stone supplier"
      },
      {
        "name": "cured ham bar",
        "value": "cured ham bar"
      },
      {
        "name": "cured ham store",
        "value": "cured ham store"
      },
      {
        "name": "cured ham warehouse",
        "value": "cured ham warehouse"
      },
      {
        "name": "currency exchange service",
        "value": "currency exchange service"
      },
      {
        "name": "custom home builder",
        "value": "custom home builder"
      },
      {
        "name": "custom label printer",
        "value": "custom label printer"
      },
      {
        "name": "custom t-shirt store",
        "value": "custom t-shirt store"
      },
      {
        "name": "cycle rickshaw stand",
        "value": "cycle rickshaw stand"
      },
      {
        "name": "dart supply store",
        "value": "dart supply store"
      },
      {
        "name": "data entry service",
        "value": "data entry service"
      },
      {
        "name": "data recovery service",
        "value": "data recovery service"
      },
      {
        "name": "database management company",
        "value": "database management company"
      },
      {
        "name": "day care center",
        "value": "day care center"
      },
      {
        "name": "debris removal service",
        "value": "debris removal service"
      },
      {
        "name": "debt collection agency",
        "value": "debt collection agency"
      },
      {
        "name": "delivery chinese restaurant",
        "value": "delivery chinese restaurant"
      },
      {
        "name": "dental implants periodontist",
        "value": "dental implants periodontist"
      },
      {
        "name": "dental implants provider",
        "value": "dental implants provider"
      },
      {
        "name": "dental insurance agency",
        "value": "dental insurance agency"
      },
      {
        "name": "dental supply store",
        "value": "dental supply store"
      },
      {
        "name": "denture care center",
        "value": "denture care center"
      },
      {
        "name": "department of housing",
        "value": "department of housing"
      },
      {
        "name": "department of transportation",
        "value": "department of transportation"
      },
      {
        "name": "designer clothing store",
        "value": "designer clothing store"
      },
      {
        "name": "desktop publishing service",
        "value": "desktop publishing service"
      },
      {
        "name": "diabetes equipment supplier",
        "value": "diabetes equipment supplier"
      },
      {
        "name": "diesel engine dealer",
        "value": "diesel engine dealer"
      },
      {
        "name": "diesel fuel supplier",
        "value": "diesel fuel supplier"
      },
      {
        "name": "digital printing service",
        "value": "digital printing service"
      },
      {
        "name": "dim sum restaurant",
        "value": "dim sum restaurant"
      },
      {
        "name": "direct mail advertising",
        "value": "direct mail advertising"
      },
      {
        "name": "disability equipment supplier",
        "value": "disability equipment supplier"
      },
      {
        "name": "disc golf course",
        "value": "disc golf course"
      },
      {
        "name": "display stand manufacturer",
        "value": "display stand manufacturer"
      },
      {
        "name": "disposable tableware supplier",
        "value": "disposable tableware supplier"
      },
      {
        "name": "distance learning center",
        "value": "distance learning center"
      },
      {
        "name": "district government office",
        "value": "district government office"
      },
      {
        "name": "dj supply store",
        "value": "dj supply store"
      },
      {
        "name": "dogsled ride service",
        "value": "dogsled ride service"
      },
      {
        "name": "doll restoration service",
        "value": "doll restoration service"
      },
      {
        "name": "doner kebab restaurant",
        "value": "doner kebab restaurant"
      },
      {
        "name": "double glazing installer",
        "value": "double glazing installer"
      },
      {
        "name": "drafting equipment supplier",
        "value": "drafting equipment supplier"
      },
      {
        "name": "dried flower shop",
        "value": "dried flower shop"
      },
      {
        "name": "dried seafood store",
        "value": "dried seafood store"
      },
      {
        "name": "drilling equipment supplier",
        "value": "drilling equipment supplier"
      },
      {
        "name": "drinking water fountain",
        "value": "drinking water fountain"
      },
      {
        "name": "driver's license office",
        "value": "driver's license office"
      },
      {
        "name": "driving test center",
        "value": "driving test center"
      },
      {
        "name": "drug testing service",
        "value": "drug testing service"
      },
      {
        "name": "dry fruit store",
        "value": "dry fruit store"
      },
      {
        "name": "dry ice supplier",
        "value": "dry ice supplier"
      },
      {
        "name": "dry wall contractor",
        "value": "dry wall contractor"
      },
      {
        "name": "ds automobiles dealer",
        "value": "ds automobiles dealer"
      },
      {
        "name": "dump truck dealer",
        "value": "dump truck dealer"
      },
      {
        "name": "dumpster rental service",
        "value": "dumpster rental service"
      },
      {
        "name": "duty free store",
        "value": "duty free store"
      },
      {
        "name": "e commerce agency",
        "value": "e commerce agency"
      },
      {
        "name": "ear piercing service",
        "value": "ear piercing service"
      },
      {
        "name": "earth works company",
        "value": "earth works company"
      },
      {
        "name": "east african restaurant",
        "value": "east african restaurant"
      },
      {
        "name": "east javanese restaurant",
        "value": "east javanese restaurant"
      },
      {
        "name": "eastern european restaurant",
        "value": "eastern european restaurant"
      },
      {
        "name": "eastern orthodox church",
        "value": "eastern orthodox church"
      },
      {
        "name": "economic development agency",
        "value": "economic development agency"
      },
      {
        "name": "educational supply store",
        "value": "educational supply store"
      },
      {
        "name": "educational testing service",
        "value": "educational testing service"
      },
      {
        "name": "eftpos equipment supplier",
        "value": "eftpos equipment supplier"
      },
      {
        "name": "elder law attorney",
        "value": "elder law attorney"
      },
      {
        "name": "electric bicycle store",
        "value": "electric bicycle store"
      },
      {
        "name": "electric generator shop",
        "value": "electric generator shop"
      },
      {
        "name": "electric motor store",
        "value": "electric motor store"
      },
      {
        "name": "electric motorcycle dealer",
        "value": "electric motorcycle dealer"
      },
      {
        "name": "electric utility company",
        "value": "electric utility company"
      },
      {
        "name": "electrical appliance wholesaler",
        "value": "electrical appliance wholesaler"
      },
      {
        "name": "electrical equipment supplier",
        "value": "electrical equipment supplier"
      },
      {
        "name": "electrical installation service",
        "value": "electrical installation service"
      },
      {
        "name": "electrical products wholesaler",
        "value": "electrical products wholesaler"
      },
      {
        "name": "electrical repair shop",
        "value": "electrical repair shop"
      },
      {
        "name": "electrical supply store",
        "value": "electrical supply store"
      },
      {
        "name": "electronic engineering service",
        "value": "electronic engineering service"
      },
      {
        "name": "electronic parts supplier",
        "value": "electronic parts supplier"
      },
      {
        "name": "electronics accessories wholesaler",
        "value": "electronics accessories wholesaler"
      },
      {
        "name": "electronics hire shop",
        "value": "electronics hire shop"
      },
      {
        "name": "electronics repair shop",
        "value": "electronics repair shop"
      },
      {
        "name": "electronics vending machine",
        "value": "electronics vending machine"
      },
      {
        "name": "emergency care physician",
        "value": "emergency care physician"
      },
      {
        "name": "emergency care service",
        "value": "emergency care service"
      },
      {
        "name": "emergency dental service",
        "value": "emergency dental service"
      },
      {
        "name": "emergency locksmith service",
        "value": "emergency locksmith service"
      },
      {
        "name": "emergency training school",
        "value": "emergency training school"
      },
      {
        "name": "emergency veterinarian service",
        "value": "emergency veterinarian service"
      },
      {
        "name": "engine rebuilding service",
        "value": "engine rebuilding service"
      },
      {
        "name": "english language camp",
        "value": "english language camp"
      },
      {
        "name": "english language school",
        "value": "english language school"
      },
      {
        "name": "environmental health service",
        "value": "environmental health service"
      },
      {
        "name": "environmental protection organization",
        "value": "environmental protection organization"
      },
      {
        "name": "equipment rental agency",
        "value": "equipment rental agency"
      },
      {
        "name": "escape room center",
        "value": "escape room center"
      },
      {
        "name": "estate planning attorney",
        "value": "estate planning attorney"
      },
      {
        "name": "event management company",
        "value": "event management company"
      },
      {
        "name": "event planning service",
        "value": "event planning service"
      },
      {
        "name": "event technology service",
        "value": "event technology service"
      },
      {
        "name": "event ticket seller",
        "value": "event ticket seller"
      },
      {
        "name": "executive search firm",
        "value": "executive search firm"
      },
      {
        "name": "exercise equipment store",
        "value": "exercise equipment store"
      },
      {
        "name": "extended stay hotel",
        "value": "extended stay hotel"
      },
      {
        "name": "eye care center",
        "value": "eye care center"
      },
      {
        "name": "fabric product manufacturer",
        "value": "fabric product manufacturer"
      },
      {
        "name": "factory equipment supplier",
        "value": "factory equipment supplier"
      },
      {
        "name": "faculty of law",
        "value": "faculty of law"
      },
      {
        "name": "faculty of pharmacy",
        "value": "faculty of pharmacy"
      },
      {
        "name": "faculty of science",
        "value": "faculty of science"
      },
      {
        "name": "family law attorney",
        "value": "family law attorney"
      },
      {
        "name": "family planning center",
        "value": "family planning center"
      },
      {
        "name": "family planning counselor",
        "value": "family planning counselor"
      },
      {
        "name": "family practice physician",
        "value": "family practice physician"
      },
      {
        "name": "family service center",
        "value": "family service center"
      },
      {
        "name": "farm equipment supplier",
        "value": "farm equipment supplier"
      },
      {
        "name": "farm household tour",
        "value": "farm household tour"
      },
      {
        "name": "fashion accessories shop",
        "value": "fashion accessories shop"
      },
      {
        "name": "fashion accessories store",
        "value": "fashion accessories store"
      },
      {
        "name": "fashion design school",
        "value": "fashion design school"
      },
      {
        "name": "fast food restaurant",
        "value": "fast food restaurant"
      },
      {
        "name": "federal credit union",
        "value": "federal credit union"
      },
      {
        "name": "federal government office",
        "value": "federal government office"
      },
      {
        "name": "felt boots store",
        "value": "felt boots store"
      },
      {
        "name": "fence supply store",
        "value": "fence supply store"
      },
      {
        "name": "feng shui consultant",
        "value": "feng shui consultant"
      },
      {
        "name": "feng shui shop",
        "value": "feng shui shop"
      },
      {
        "name": "fiberglass repair service",
        "value": "fiberglass repair service"
      },
      {
        "name": "filipino grocery store",
        "value": "filipino grocery store"
      },
      {
        "name": "film production company",
        "value": "film production company"
      },
      {
        "name": "fine dining restaurant",
        "value": "fine dining restaurant"
      },
      {
        "name": "finishing materials supplier",
        "value": "finishing materials supplier"
      },
      {
        "name": "fire alarm supplier",
        "value": "fire alarm supplier"
      },
      {
        "name": "fire fighters academy",
        "value": "fire fighters academy"
      },
      {
        "name": "fire protection consultant",
        "value": "fire protection consultant"
      },
      {
        "name": "fire protection service",
        "value": "fire protection service"
      },
      {
        "name": "first aid station",
        "value": "first aid station"
      },
      {
        "name": "fitness equipment wholesaler",
        "value": "fitness equipment wholesaler"
      },
      {
        "name": "fitted furniture supplier",
        "value": "fitted furniture supplier"
      },
      {
        "name": "flamenco dance store",
        "value": "flamenco dance store"
      },
      {
        "name": "floor refinishing service",
        "value": "floor refinishing service"
      },
      {
        "name": "fmcg goods wholesaler",
        "value": "fmcg goods wholesaler"
      },
      {
        "name": "foam rubber producer",
        "value": "foam rubber producer"
      },
      {
        "name": "foam rubber supplier",
        "value": "foam rubber supplier"
      },
      {
        "name": "folk high school",
        "value": "folk high school"
      },
      {
        "name": "food and drink",
        "value": "food and drink"
      },
      {
        "name": "food machinery supplier",
        "value": "food machinery supplier"
      },
      {
        "name": "food manufacturing supply",
        "value": "food manufacturing supply"
      },
      {
        "name": "food processing company",
        "value": "food processing company"
      },
      {
        "name": "food processing equipment",
        "value": "food processing equipment"
      },
      {
        "name": "food products supplier",
        "value": "food products supplier"
      },
      {
        "name": "food seasoning manufacturer",
        "value": "food seasoning manufacturer"
      },
      {
        "name": "foot massage parlor",
        "value": "foot massage parlor"
      },
      {
        "name": "foreign trade consultant",
        "value": "foreign trade consultant"
      },
      {
        "name": "foreman builders association",
        "value": "foreman builders association"
      },
      {
        "name": "forklift rental service",
        "value": "forklift rental service"
      },
      {
        "name": "formal wear store",
        "value": "formal wear store"
      },
      {
        "name": "fortune telling services",
        "value": "fortune telling services"
      },
      {
        "name": "foster care service",
        "value": "foster care service"
      },
      {
        "name": "free parking lot",
        "value": "free parking lot"
      },
      {
        "name": "freight forwarding service",
        "value": "freight forwarding service"
      },
      {
        "name": "french language school",
        "value": "french language school"
      },
      {
        "name": "french steakhouse restaurant",
        "value": "french steakhouse restaurant"
      },
      {
        "name": "fresh food market",
        "value": "fresh food market"
      },
      {
        "name": "fried chicken takeaway",
        "value": "fried chicken takeaway"
      },
      {
        "name": "frozen dessert supplier",
        "value": "frozen dessert supplier"
      },
      {
        "name": "frozen food manufacturer",
        "value": "frozen food manufacturer"
      },
      {
        "name": "frozen food store",
        "value": "frozen food store"
      },
      {
        "name": "frozen yogurt shop",
        "value": "frozen yogurt shop"
      },
      {
        "name": "full gospel church",
        "value": "full gospel church"
      },
      {
        "name": "function room facility",
        "value": "function room facility"
      },
      {
        "name": "funeral celebrant service",
        "value": "funeral celebrant service"
      },
      {
        "name": "fur coat shop",
        "value": "fur coat shop"
      },
      {
        "name": "furnace parts supplier",
        "value": "furnace parts supplier"
      },
      {
        "name": "furnace repair service",
        "value": "furnace repair service"
      },
      {
        "name": "furnished apartment building",
        "value": "furnished apartment building"
      },
      {
        "name": "furniture accessories supplier",
        "value": "furniture accessories supplier"
      },
      {
        "name": "furniture rental service",
        "value": "furniture rental service"
      },
      {
        "name": "furniture repair shop",
        "value": "furniture repair shop"
      },
      {
        "name": "garage door supplier",
        "value": "garage door supplier"
      },
      {
        "name": "garbage collection service",
        "value": "garbage collection service"
      },
      {
        "name": "garden building supplier",
        "value": "garden building supplier"
      },
      {
        "name": "garden machinery supplier",
        "value": "garden machinery supplier"
      },
      {
        "name": "gas cylinders supplier",
        "value": "gas cylinders supplier"
      },
      {
        "name": "gas installation service",
        "value": "gas installation service"
      },
      {
        "name": "gas logs supplier",
        "value": "gas logs supplier"
      },
      {
        "name": "gay night club",
        "value": "gay night club"
      },
      {
        "name": "general education school",
        "value": "general education school"
      },
      {
        "name": "general practice attorney",
        "value": "general practice attorney"
      },
      {
        "name": "geological research company",
        "value": "geological research company"
      },
      {
        "name": "german language school",
        "value": "german language school"
      },
      {
        "name": "gift basket store",
        "value": "gift basket store"
      },
      {
        "name": "gift wrap store",
        "value": "gift wrap store"
      },
      {
        "name": "girls' high school",
        "value": "girls' high school"
      },
      {
        "name": "glass block supplier",
        "value": "glass block supplier"
      },
      {
        "name": "glass cutting service",
        "value": "glass cutting service"
      },
      {
        "name": "glass etching service",
        "value": "glass etching service"
      },
      {
        "name": "glass repair service",
        "value": "glass repair service"
      },
      {
        "name": "glasses repair service",
        "value": "glasses repair service"
      },
      {
        "name": "gold mining company",
        "value": "gold mining company"
      },
      {
        "name": "golf cart dealer",
        "value": "golf cart dealer"
      },
      {
        "name": "golf course builder",
        "value": "golf course builder"
      },
      {
        "name": "golf driving range",
        "value": "golf driving range"
      },
      {
        "name": "gourmet grocery store",
        "value": "gourmet grocery store"
      },
      {
        "name": "government economic program",
        "value": "government economic program"
      },
      {
        "name": "government ration shop",
        "value": "government ration shop"
      },
      {
        "name": "graffiti removal service",
        "value": "graffiti removal service"
      },
      {
        "name": "greek orthodox church",
        "value": "greek orthodox church"
      },
      {
        "name": "green energy supplier",
        "value": "green energy supplier"
      },
      {
        "name": "greeting card shop",
        "value": "greeting card shop"
      },
      {
        "name": "grocery delivery service",
        "value": "grocery delivery service"
      },
      {
        "name": "gutter cleaning service",
        "value": "gutter cleaning service"
      },
      {
        "name": "gypsum product supplier",
        "value": "gypsum product supplier"
      },
      {
        "name": "hair extension technician",
        "value": "hair extension technician"
      },
      {
        "name": "hair extensions supplier",
        "value": "hair extensions supplier"
      },
      {
        "name": "hair removal service",
        "value": "hair removal service"
      },
      {
        "name": "hair replacement service",
        "value": "hair replacement service"
      },
      {
        "name": "hair transplantation clinic",
        "value": "hair transplantation clinic"
      },
      {
        "name": "handicapped transportation service",
        "value": "handicapped transportation service"
      },
      {
        "name": "hang gliding center",
        "value": "hang gliding center"
      },
      {
        "name": "haute french restaurant",
        "value": "haute french restaurant"
      },
      {
        "name": "hawaiian goods store",
        "value": "hawaiian goods store"
      },
      {
        "name": "head start center",
        "value": "head start center"
      },
      {
        "name": "health food restaurant",
        "value": "health food restaurant"
      },
      {
        "name": "health food store",
        "value": "health food store"
      },
      {
        "name": "health insurance agency",
        "value": "health insurance agency"
      },
      {
        "name": "hearing aid store",
        "value": "hearing aid store"
      },
      {
        "name": "heating equipment supplier",
        "value": "heating equipment supplier"
      },
      {
        "name": "heating oil supplier",
        "value": "heating oil supplier"
      },
      {
        "name": "helicopter tour agency",
        "value": "helicopter tour agency"
      },
      {
        "name": "helium gas supplier",
        "value": "helium gas supplier"
      },
      {
        "name": "herbal medicine store",
        "value": "herbal medicine store"
      },
      {
        "name": "high ropes course",
        "value": "high ropes course"
      },
      {
        "name": "higher secondary school",
        "value": "higher secondary school"
      },
      {
        "name": "historical place museum",
        "value": "historical place museum"
      },
      {
        "name": "hiv testing center",
        "value": "hiv testing center"
      },
      {
        "name": "hockey supply store",
        "value": "hockey supply store"
      },
      {
        "name": "holiday apartment rental",
        "value": "holiday apartment rental"
      },
      {
        "name": "holistic medicine practitioner",
        "value": "holistic medicine practitioner"
      },
      {
        "name": "home audio store",
        "value": "home audio store"
      },
      {
        "name": "home automation company",
        "value": "home automation company"
      },
      {
        "name": "home cinema installation",
        "value": "home cinema installation"
      },
      {
        "name": "home furniture shop",
        "value": "home furniture shop"
      },
      {
        "name": "home goods store",
        "value": "home goods store"
      },
      {
        "name": "home improvement store",
        "value": "home improvement store"
      },
      {
        "name": "home insurance agency",
        "value": "home insurance agency"
      },
      {
        "name": "home staging service",
        "value": "home staging service"
      },
      {
        "name": "home theater store",
        "value": "home theater store"
      },
      {
        "name": "horse boarding stable",
        "value": "horse boarding stable"
      },
      {
        "name": "horse rental service",
        "value": "horse rental service"
      },
      {
        "name": "horse riding field",
        "value": "horse riding field"
      },
      {
        "name": "horse riding school",
        "value": "horse riding school"
      },
      {
        "name": "horse trailer dealer",
        "value": "horse trailer dealer"
      },
      {
        "name": "horseback riding service",
        "value": "horseback riding service"
      },
      {
        "name": "hospitality high school",
        "value": "hospitality high school"
      },
      {
        "name": "hot bedstone spa",
        "value": "hot bedstone spa"
      },
      {
        "name": "hot dog restaurant",
        "value": "hot dog restaurant"
      },
      {
        "name": "hot dog stand",
        "value": "hot dog stand"
      },
      {
        "name": "hot pot restaurant",
        "value": "hot pot restaurant"
      },
      {
        "name": "hot tub store",
        "value": "hot tub store"
      },
      {
        "name": "hotel management school",
        "value": "hotel management school"
      },
      {
        "name": "hotel supply store",
        "value": "hotel supply store"
      },
      {
        "name": "house cleaning service",
        "value": "house cleaning service"
      },
      {
        "name": "house clearance service",
        "value": "house clearance service"
      },
      {
        "name": "house sitter agency",
        "value": "house sitter agency"
      },
      {
        "name": "houseboat rental service",
        "value": "houseboat rental service"
      },
      {
        "name": "household chemicals supplier",
        "value": "household chemicals supplier"
      },
      {
        "name": "household goods wholesaler",
        "value": "household goods wholesaler"
      },
      {
        "name": "housing utility company",
        "value": "housing utility company"
      },
      {
        "name": "hua gong shop",
        "value": "hua gong shop"
      },
      {
        "name": "hub cap supplier",
        "value": "hub cap supplier"
      },
      {
        "name": "human resource consulting",
        "value": "human resource consulting"
      },
      {
        "name": "hydraulic equipment supplier",
        "value": "hydraulic equipment supplier"
      },
      {
        "name": "hydraulic repair service",
        "value": "hydraulic repair service"
      },
      {
        "name": "hydroelectric power plant",
        "value": "hydroelectric power plant"
      },
      {
        "name": "hydroponics equipment supplier",
        "value": "hydroponics equipment supplier"
      },
      {
        "name": "hygiene articles wholesaler",
        "value": "hygiene articles wholesaler"
      },
      {
        "name": "hyperbaric medicine physician",
        "value": "hyperbaric medicine physician"
      },
      {
        "name": "ice cream shop",
        "value": "ice cream shop"
      },
      {
        "name": "ice hockey club",
        "value": "ice hockey club"
      },
      {
        "name": "ice skating club",
        "value": "ice skating club"
      },
      {
        "name": "ice skating instructor",
        "value": "ice skating instructor"
      },
      {
        "name": "ice skating rink",
        "value": "ice skating rink"
      },
      {
        "name": "ikan bakar restaurant",
        "value": "ikan bakar restaurant"
      },
      {
        "name": "import export company",
        "value": "import export company"
      },
      {
        "name": "indian grocery store",
        "value": "indian grocery store"
      },
      {
        "name": "indian motorcycle dealer",
        "value": "indian motorcycle dealer"
      },
      {
        "name": "indian muslim restaurant",
        "value": "indian muslim restaurant"
      },
      {
        "name": "indian sizzler restaurant",
        "value": "indian sizzler restaurant"
      },
      {
        "name": "indian sweets shop",
        "value": "indian sweets shop"
      },
      {
        "name": "indoor golf course",
        "value": "indoor golf course"
      },
      {
        "name": "indoor swimming pool",
        "value": "indoor swimming pool"
      },
      {
        "name": "industrial chemicals wholesaler",
        "value": "industrial chemicals wholesaler"
      },
      {
        "name": "industrial design company",
        "value": "industrial design company"
      },
      {
        "name": "industrial engineers association",
        "value": "industrial engineers association"
      },
      {
        "name": "industrial equipment supplier",
        "value": "industrial equipment supplier"
      },
      {
        "name": "industrial gas supplier",
        "value": "industrial gas supplier"
      },
      {
        "name": "infectious disease physician",
        "value": "infectious disease physician"
      },
      {
        "name": "institute of technology",
        "value": "institute of technology"
      },
      {
        "name": "insulation materials store",
        "value": "insulation materials store"
      },
      {
        "name": "intellectual property registry",
        "value": "intellectual property registry"
      },
      {
        "name": "interior architect office",
        "value": "interior architect office"
      },
      {
        "name": "interior construction contractor",
        "value": "interior construction contractor"
      },
      {
        "name": "interior fitting contractor",
        "value": "interior fitting contractor"
      },
      {
        "name": "interior plant service",
        "value": "interior plant service"
      },
      {
        "name": "internal medicine ward",
        "value": "internal medicine ward"
      },
      {
        "name": "international trade consultant",
        "value": "international trade consultant"
      },
      {
        "name": "internet marketing service",
        "value": "internet marketing service"
      },
      {
        "name": "internet service provider",
        "value": "internet service provider"
      },
      {
        "name": "invitation printing service",
        "value": "invitation printing service"
      },
      {
        "name": "irish goods store",
        "value": "irish goods store"
      },
      {
        "name": "iron ware dealer",
        "value": "iron ware dealer"
      },
      {
        "name": "irrigation equipment supplier",
        "value": "irrigation equipment supplier"
      },
      {
        "name": "italian grocery store",
        "value": "italian grocery store"
      },
      {
        "name": "janitorial equipment supplier",
        "value": "janitorial equipment supplier"
      },
      {
        "name": "japanese confectionery shop",
        "value": "japanese confectionery shop"
      },
      {
        "name": "japanese curry restaurant",
        "value": "japanese curry restaurant"
      },
      {
        "name": "japanese grocery store",
        "value": "japanese grocery store"
      },
      {
        "name": "japanese language instructor",
        "value": "japanese language instructor"
      },
      {
        "name": "japanese regional restaurant",
        "value": "japanese regional restaurant"
      },
      {
        "name": "japanese sweets restaurant",
        "value": "japanese sweets restaurant"
      },
      {
        "name": "japanese-style business hotel",
        "value": "japanese-style business hotel"
      },
      {
        "name": "japanized western restaurant",
        "value": "japanized western restaurant"
      },
      {
        "name": "jewelry equipment supplier",
        "value": "jewelry equipment supplier"
      },
      {
        "name": "jewelry repair service",
        "value": "jewelry repair service"
      },
      {
        "name": "junk removal service",
        "value": "junk removal service"
      },
      {
        "name": "juvenile detention center",
        "value": "juvenile detention center"
      },
      {
        "name": "kalle pache restaurant",
        "value": "kalle pache restaurant"
      },
      {
        "name": "kawasaki motorcycle dealer",
        "value": "kawasaki motorcycle dealer"
      },
      {
        "name": "key duplication service",
        "value": "key duplication service"
      },
      {
        "name": "kitchen furniture store",
        "value": "kitchen furniture store"
      },
      {
        "name": "kitchen supply store",
        "value": "kitchen supply store"
      },
      {
        "name": "korean barbecue restaurant",
        "value": "korean barbecue restaurant"
      },
      {
        "name": "korean beef restaurant",
        "value": "korean beef restaurant"
      },
      {
        "name": "korean grocery store",
        "value": "korean grocery store"
      },
      {
        "name": "korean rib restaurant",
        "value": "korean rib restaurant"
      },
      {
        "name": "kosher grocery store",
        "value": "kosher grocery store"
      },
      {
        "name": "kung fu school",
        "value": "kung fu school"
      },
      {
        "name": "labor relations attorney",
        "value": "labor relations attorney"
      },
      {
        "name": "laboratory equipment supplier",
        "value": "laboratory equipment supplier"
      },
      {
        "name": "ladies' clothes shop",
        "value": "ladies' clothes shop"
      },
      {
        "name": "laminating equipment supplier",
        "value": "laminating equipment supplier"
      },
      {
        "name": "lamp repair service",
        "value": "lamp repair service"
      },
      {
        "name": "lamp shade supplier",
        "value": "lamp shade supplier"
      },
      {
        "name": "land planning authority",
        "value": "land planning authority"
      },
      {
        "name": "land reform institute",
        "value": "land reform institute"
      },
      {
        "name": "land rover dealer",
        "value": "land rover dealer"
      },
      {
        "name": "land surveying office",
        "value": "land surveying office"
      },
      {
        "name": "landscape lighting designer",
        "value": "landscape lighting designer"
      },
      {
        "name": "landscaping supply store",
        "value": "landscaping supply store"
      },
      {
        "name": "laser cutting service",
        "value": "laser cutting service"
      },
      {
        "name": "laser equipment supplier",
        "value": "laser equipment supplier"
      },
      {
        "name": "laser tag center",
        "value": "laser tag center"
      },
      {
        "name": "latin american restaurant",
        "value": "latin american restaurant"
      },
      {
        "name": "law book store",
        "value": "law book store"
      },
      {
        "name": "lawn bowls club",
        "value": "lawn bowls club"
      },
      {
        "name": "lawn care service",
        "value": "lawn care service"
      },
      {
        "name": "lawn mower store",
        "value": "lawn mower store"
      },
      {
        "name": "leather cleaning service",
        "value": "leather cleaning service"
      },
      {
        "name": "leather coats store",
        "value": "leather coats store"
      },
      {
        "name": "leather goods manufacturer",
        "value": "leather goods manufacturer"
      },
      {
        "name": "leather goods store",
        "value": "leather goods store"
      },
      {
        "name": "leather goods supplier",
        "value": "leather goods supplier"
      },
      {
        "name": "leather goods wholesaler",
        "value": "leather goods wholesaler"
      },
      {
        "name": "leather repair service",
        "value": "leather repair service"
      },
      {
        "name": "legal affairs bureau",
        "value": "legal affairs bureau"
      },
      {
        "name": "life insurance agency",
        "value": "life insurance agency"
      },
      {
        "name": "light bulb supplier",
        "value": "light bulb supplier"
      },
      {
        "name": "lighting products wholesaler",
        "value": "lighting products wholesaler"
      },
      {
        "name": "line marking service",
        "value": "line marking service"
      },
      {
        "name": "little league club",
        "value": "little league club"
      },
      {
        "name": "little league field",
        "value": "little league field"
      },
      {
        "name": "live music bar",
        "value": "live music bar"
      },
      {
        "name": "live music venue",
        "value": "live music venue"
      },
      {
        "name": "livestock auction house",
        "value": "livestock auction house"
      },
      {
        "name": "local government office",
        "value": "local government office"
      },
      {
        "name": "local history museum",
        "value": "local history museum"
      },
      {
        "name": "local medical services",
        "value": "local medical services"
      },
      {
        "name": "log home builder",
        "value": "log home builder"
      },
      {
        "name": "lost property office",
        "value": "lost property office"
      },
      {
        "name": "luggage repair service",
        "value": "luggage repair service"
      },
      {
        "name": "luggage storage facility",
        "value": "luggage storage facility"
      },
      {
        "name": "lymph drainage therapist",
        "value": "lymph drainage therapist"
      },
      {
        "name": "machine knife supplier",
        "value": "machine knife supplier"
      },
      {
        "name": "machine maintenance service",
        "value": "machine maintenance service"
      },
      {
        "name": "machine repair service",
        "value": "machine repair service"
      },
      {
        "name": "machinery parts manufacturer",
        "value": "machinery parts manufacturer"
      },
      {
        "name": "mailbox rental service",
        "value": "mailbox rental service"
      },
      {
        "name": "mailing machine supplier",
        "value": "mailing machine supplier"
      },
      {
        "name": "main customs office",
        "value": "main customs office"
      },
      {
        "name": "manufactured home transporter",
        "value": "manufactured home transporter"
      },
      {
        "name": "marine supply store",
        "value": "marine supply store"
      },
      {
        "name": "marquee hire service",
        "value": "marquee hire service"
      },
      {
        "name": "marriage license bureau",
        "value": "marriage license bureau"
      },
      {
        "name": "martial arts club",
        "value": "martial arts club"
      },
      {
        "name": "martial arts school",
        "value": "martial arts school"
      },
      {
        "name": "masonry supply store",
        "value": "masonry supply store"
      },
      {
        "name": "massage supply store",
        "value": "massage supply store"
      },
      {
        "name": "match box manufacturer",
        "value": "match box manufacturer"
      },
      {
        "name": "measuring instruments supplier",
        "value": "measuring instruments supplier"
      },
      {
        "name": "meat dish restaurant",
        "value": "meat dish restaurant"
      },
      {
        "name": "meat products store",
        "value": "meat products store"
      },
      {
        "name": "medical billing service",
        "value": "medical billing service"
      },
      {
        "name": "medical book store",
        "value": "medical book store"
      },
      {
        "name": "medical certificate service",
        "value": "medical certificate service"
      },
      {
        "name": "medical equipment manufacturer",
        "value": "medical equipment manufacturer"
      },
      {
        "name": "medical equipment supplier",
        "value": "medical equipment supplier"
      },
      {
        "name": "medical supply store",
        "value": "medical supply store"
      },
      {
        "name": "medical technology manufacturer",
        "value": "medical technology manufacturer"
      },
      {
        "name": "medical transcription service",
        "value": "medical transcription service"
      },
      {
        "name": "meeting planning service",
        "value": "meeting planning service"
      },
      {
        "name": "men's clothes shop",
        "value": "men's clothes shop"
      },
      {
        "name": "men's clothing store",
        "value": "men's clothing store"
      },
      {
        "name": "men's health physician",
        "value": "men's health physician"
      },
      {
        "name": "mental health clinic",
        "value": "mental health clinic"
      },
      {
        "name": "mental health service",
        "value": "mental health service"
      },
      {
        "name": "metal construction company",
        "value": "metal construction company"
      },
      {
        "name": "metal industry suppliers",
        "value": "metal industry suppliers"
      },
      {
        "name": "metal machinery supplier",
        "value": "metal machinery supplier"
      },
      {
        "name": "metal polishing service",
        "value": "metal polishing service"
      },
      {
        "name": "metal processing company",
        "value": "metal processing company"
      },
      {
        "name": "metal stamping service",
        "value": "metal stamping service"
      },
      {
        "name": "metal working shop",
        "value": "metal working shop"
      },
      {
        "name": "metaphysical supply store",
        "value": "metaphysical supply store"
      },
      {
        "name": "metropolitan train company",
        "value": "metropolitan train company"
      },
      {
        "name": "mexican goods store",
        "value": "mexican goods store"
      },
      {
        "name": "mexican grocery store",
        "value": "mexican grocery store"
      },
      {
        "name": "mexican torta restaurant",
        "value": "mexican torta restaurant"
      },
      {
        "name": "middle eastern restaurant",
        "value": "middle eastern restaurant"
      },
      {
        "name": "military recruiting office",
        "value": "military recruiting office"
      },
      {
        "name": "milk delivery service",
        "value": "milk delivery service"
      },
      {
        "name": "mineral water company",
        "value": "mineral water company"
      },
      {
        "name": "miniature golf course",
        "value": "miniature golf course"
      },
      {
        "name": "minibus taxi service",
        "value": "minibus taxi service"
      },
      {
        "name": "ministry of education",
        "value": "ministry of education"
      },
      {
        "name": "miso cutlet restaurant",
        "value": "miso cutlet restaurant"
      },
      {
        "name": "missing persons organization",
        "value": "missing persons organization"
      },
      {
        "name": "mobile disco service",
        "value": "mobile disco service"
      },
      {
        "name": "mobile home dealer",
        "value": "mobile home dealer"
      },
      {
        "name": "mobile home park",
        "value": "mobile home park"
      },
      {
        "name": "mobile money agent",
        "value": "mobile money agent"
      },
      {
        "name": "mobile network operator",
        "value": "mobile network operator"
      },
      {
        "name": "mobile phone shop",
        "value": "mobile phone shop"
      },
      {
        "name": "mobility equipment supplier",
        "value": "mobility equipment supplier"
      },
      {
        "name": "model design company",
        "value": "model design company"
      },
      {
        "name": "model portfolio studio",
        "value": "model portfolio studio"
      },
      {
        "name": "model train store",
        "value": "model train store"
      },
      {
        "name": "modern art museum",
        "value": "modern art museum"
      },
      {
        "name": "modern british restaurant",
        "value": "modern british restaurant"
      },
      {
        "name": "modern european restaurant",
        "value": "modern european restaurant"
      },
      {
        "name": "modern french restaurant",
        "value": "modern french restaurant"
      },
      {
        "name": "modern indian restaurant",
        "value": "modern indian restaurant"
      },
      {
        "name": "modern izakaya restaurant",
        "value": "modern izakaya restaurant"
      },
      {
        "name": "modular home builder",
        "value": "modular home builder"
      },
      {
        "name": "modular home dealer",
        "value": "modular home dealer"
      },
      {
        "name": "money order service",
        "value": "money order service"
      },
      {
        "name": "money transfer service",
        "value": "money transfer service"
      },
      {
        "name": "mongolian barbecue restaurant",
        "value": "mongolian barbecue restaurant"
      },
      {
        "name": "motor scooter dealer",
        "value": "motor scooter dealer"
      },
      {
        "name": "motor vehicle dealer",
        "value": "motor vehicle dealer"
      },
      {
        "name": "motorcycle driving school",
        "value": "motorcycle driving school"
      },
      {
        "name": "motorcycle insurance agency",
        "value": "motorcycle insurance agency"
      },
      {
        "name": "motorcycle parts store",
        "value": "motorcycle parts store"
      },
      {
        "name": "motorcycle rental agency",
        "value": "motorcycle rental agency"
      },
      {
        "name": "motorcycle repair shop",
        "value": "motorcycle repair shop"
      },
      {
        "name": "mountain cable car",
        "value": "mountain cable car"
      },
      {
        "name": "movie rental kiosk",
        "value": "movie rental kiosk"
      },
      {
        "name": "movie rental store",
        "value": "movie rental store"
      },
      {
        "name": "moving supply store",
        "value": "moving supply store"
      },
      {
        "name": "municipal administration office",
        "value": "municipal administration office"
      },
      {
        "name": "museum of zoology",
        "value": "museum of zoology"
      },
      {
        "name": "music box store",
        "value": "music box store"
      },
      {
        "name": "musical instrument manufacturer",
        "value": "musical instrument manufacturer"
      },
      {
        "name": "musical instrument store",
        "value": "musical instrument store"
      },
      {
        "name": "musician and composer",
        "value": "musician and composer"
      },
      {
        "name": "mutton barbecue restaurant",
        "value": "mutton barbecue restaurant"
      },
      {
        "name": "nasi goreng restaurant",
        "value": "nasi goreng restaurant"
      },
      {
        "name": "nasi uduk restaurant",
        "value": "nasi uduk restaurant"
      },
      {
        "name": "native american restaurant",
        "value": "native american restaurant"
      },
      {
        "name": "natural goods store",
        "value": "natural goods store"
      },
      {
        "name": "natural history museum",
        "value": "natural history museum"
      },
      {
        "name": "natural stone exporter",
        "value": "natural stone exporter"
      },
      {
        "name": "natural stone supplier",
        "value": "natural stone supplier"
      },
      {
        "name": "natural stone wholesaler",
        "value": "natural stone wholesaler"
      },
      {
        "name": "neon sign shop",
        "value": "neon sign shop"
      },
      {
        "name": "new age church",
        "value": "new age church"
      },
      {
        "name": "new american restaurant",
        "value": "new american restaurant"
      },
      {
        "name": "new england restaurant",
        "value": "new england restaurant"
      },
      {
        "name": "new zealand restaurant",
        "value": "new zealand restaurant"
      },
      {
        "name": "newspaper distribution service",
        "value": "newspaper distribution service"
      },
      {
        "name": "non vegetarian restaurant",
        "value": "non vegetarian restaurant"
      },
      {
        "name": "north african restaurant",
        "value": "north african restaurant"
      },
      {
        "name": "north indian restaurant",
        "value": "north indian restaurant"
      },
      {
        "name": "northern italian restaurant",
        "value": "northern italian restaurant"
      },
      {
        "name": "nuclear power company",
        "value": "nuclear power company"
      },
      {
        "name": "nuclear power plant",
        "value": "nuclear power plant"
      },
      {
        "name": "nuevo latino restaurant",
        "value": "nuevo latino restaurant"
      },
      {
        "name": "occupational health service",
        "value": "occupational health service"
      },
      {
        "name": "occupational medical physician",
        "value": "occupational medical physician"
      },
      {
        "name": "off roading area",
        "value": "off roading area"
      },
      {
        "name": "offal barbecue restaurant",
        "value": "offal barbecue restaurant"
      },
      {
        "name": "office accessories wholesaler",
        "value": "office accessories wholesaler"
      },
      {
        "name": "office equipment supplier",
        "value": "office equipment supplier"
      },
      {
        "name": "office furniture store",
        "value": "office furniture store"
      },
      {
        "name": "office refurbishment service",
        "value": "office refurbishment service"
      },
      {
        "name": "office supply store",
        "value": "office supply store"
      },
      {
        "name": "office supply wholesaler",
        "value": "office supply wholesaler"
      },
      {
        "name": "offset printing service",
        "value": "offset printing service"
      },
      {
        "name": "oil change service",
        "value": "oil change service"
      },
      {
        "name": "olive oil cooperative",
        "value": "olive oil cooperative"
      },
      {
        "name": "olive oil manufacturer",
        "value": "olive oil manufacturer"
      },
      {
        "name": "open air museum",
        "value": "open air museum"
      },
      {
        "name": "optical products manufacturer",
        "value": "optical products manufacturer"
      },
      {
        "name": "organic drug store",
        "value": "organic drug store"
      },
      {
        "name": "organic food store",
        "value": "organic food store"
      },
      {
        "name": "oriental goods store",
        "value": "oriental goods store"
      },
      {
        "name": "oriental medicine clinic",
        "value": "oriental medicine clinic"
      },
      {
        "name": "oriental medicine store",
        "value": "oriental medicine store"
      },
      {
        "name": "oriental rug store",
        "value": "oriental rug store"
      },
      {
        "name": "orthopedic shoe store",
        "value": "orthopedic shoe store"
      },
      {
        "name": "orthopedic supplies store",
        "value": "orthopedic supplies store"
      },
      {
        "name": "outboard motor store",
        "value": "outboard motor store"
      },
      {
        "name": "outdoor activity organiser",
        "value": "outdoor activity organiser"
      },
      {
        "name": "outdoor equestrian facility",
        "value": "outdoor equestrian facility"
      },
      {
        "name": "outdoor furniture store",
        "value": "outdoor furniture store"
      },
      {
        "name": "outdoor sports store",
        "value": "outdoor sports store"
      },
      {
        "name": "outdoor swimming pool",
        "value": "outdoor swimming pool"
      },
      {
        "name": "oxygen cocktail spot",
        "value": "oxygen cocktail spot"
      },
      {
        "name": "oxygen equipment supplier",
        "value": "oxygen equipment supplier"
      },
      {
        "name": "oyster bar restaurant",
        "value": "oyster bar restaurant"
      },
      {
        "name": "pacific rim restaurant",
        "value": "pacific rim restaurant"
      },
      {
        "name": "packaging supply store",
        "value": "packaging supply store"
      },
      {
        "name": "pain control clinic",
        "value": "pain control clinic"
      },
      {
        "name": "pain management physician",
        "value": "pain management physician"
      },
      {
        "name": "paint stripping service",
        "value": "paint stripping service"
      },
      {
        "name": "painter and decorator",
        "value": "painter and decorator"
      },
      {
        "name": "paper bag supplier",
        "value": "paper bag supplier"
      },
      {
        "name": "paralegal services provider",
        "value": "paralegal services provider"
      },
      {
        "name": "park and garden",
        "value": "park and garden"
      },
      {
        "name": "park and ride",
        "value": "park and ride"
      },
      {
        "name": "passport photo processor",
        "value": "passport photo processor"
      },
      {
        "name": "paternity testing service",
        "value": "paternity testing service"
      },
      {
        "name": "patients support association",
        "value": "patients support association"
      },
      {
        "name": "patio enclosure supplier",
        "value": "patio enclosure supplier"
      },
      {
        "name": "paving materials supplier",
        "value": "paving materials supplier"
      },
      {
        "name": "pecel lele restaurant",
        "value": "pecel lele restaurant"
      },
      {
        "name": "pennsylvania dutch restaurant",
        "value": "pennsylvania dutch restaurant"
      },
      {
        "name": "performing arts group",
        "value": "performing arts group"
      },
      {
        "name": "performing arts theater",
        "value": "performing arts theater"
      },
      {
        "name": "permanent make-up clinic",
        "value": "permanent make-up clinic"
      },
      {
        "name": "personal chef service",
        "value": "personal chef service"
      },
      {
        "name": "personal injury attorney",
        "value": "personal injury attorney"
      },
      {
        "name": "personal injury lawyer",
        "value": "personal injury lawyer"
      },
      {
        "name": "personal watercraft dealer",
        "value": "personal watercraft dealer"
      },
      {
        "name": "pest control service",
        "value": "pest control service"
      },
      {
        "name": "pet adoption service",
        "value": "pet adoption service"
      },
      {
        "name": "pet boarding service",
        "value": "pet boarding service"
      },
      {
        "name": "pet care service",
        "value": "pet care service"
      },
      {
        "name": "pet moving service",
        "value": "pet moving service"
      },
      {
        "name": "pet supply store",
        "value": "pet supply store"
      },
      {
        "name": "petroleum products company",
        "value": "petroleum products company"
      },
      {
        "name": "pharmaceutical products wholesaler",
        "value": "pharmaceutical products wholesaler"
      },
      {
        "name": "phone repair service",
        "value": "phone repair service"
      },
      {
        "name": "photo restoration service",
        "value": "photo restoration service"
      },
      {
        "name": "physical examination center",
        "value": "physical examination center"
      },
      {
        "name": "physical fitness program",
        "value": "physical fitness program"
      },
      {
        "name": "physical rehabilitation center",
        "value": "physical rehabilitation center"
      },
      {
        "name": "physical therapy clinic",
        "value": "physical therapy clinic"
      },
      {
        "name": "physician referral service",
        "value": "physician referral service"
      },
      {
        "name": "physiotherapy equipment supplier",
        "value": "physiotherapy equipment supplier"
      },
      {
        "name": "piano moving service",
        "value": "piano moving service"
      },
      {
        "name": "piano repair service",
        "value": "piano repair service"
      },
      {
        "name": "piano tuning service",
        "value": "piano tuning service"
      },
      {
        "name": "picture frame shop",
        "value": "picture frame shop"
      },
      {
        "name": "pinball machine supplier",
        "value": "pinball machine supplier"
      },
      {
        "name": "pine furniture shop",
        "value": "pine furniture shop"
      },
      {
        "name": "place of worship",
        "value": "place of worship"
      },
      {
        "name": "plast window store",
        "value": "plast window store"
      },
      {
        "name": "plastic bag supplier",
        "value": "plastic bag supplier"
      },
      {
        "name": "plastic bags wholesaler",
        "value": "plastic bags wholesaler"
      },
      {
        "name": "plastic fabrication company",
        "value": "plastic fabrication company"
      },
      {
        "name": "plastic products supplier",
        "value": "plastic products supplier"
      },
      {
        "name": "plastic products wholesaler",
        "value": "plastic products wholesaler"
      },
      {
        "name": "plastic resin manufacturer",
        "value": "plastic resin manufacturer"
      },
      {
        "name": "plastic surgery clinic",
        "value": "plastic surgery clinic"
      },
      {
        "name": "playground equipment supplier",
        "value": "playground equipment supplier"
      },
      {
        "name": "plumbing supply store",
        "value": "plumbing supply store"
      },
      {
        "name": "pneumatic tools supplier",
        "value": "pneumatic tools supplier"
      },
      {
        "name": "police supply store",
        "value": "police supply store"
      },
      {
        "name": "political party office",
        "value": "political party office"
      },
      {
        "name": "pond fish supplier",
        "value": "pond fish supplier"
      },
      {
        "name": "pond supply store",
        "value": "pond supply store"
      },
      {
        "name": "pony ride service",
        "value": "pony ride service"
      },
      {
        "name": "pool billard club",
        "value": "pool billard club"
      },
      {
        "name": "pool cleaning service",
        "value": "pool cleaning service"
      },
      {
        "name": "port operating company",
        "value": "port operating company"
      },
      {
        "name": "portable building manufacturer",
        "value": "portable building manufacturer"
      },
      {
        "name": "portable toilet supplier",
        "value": "portable toilet supplier"
      },
      {
        "name": "powder coating service",
        "value": "powder coating service"
      },
      {
        "name": "power plant consultant",
        "value": "power plant consultant"
      },
      {
        "name": "powersports vehicle dealer",
        "value": "powersports vehicle dealer"
      },
      {
        "name": "practitioner service location",
        "value": "practitioner service location"
      },
      {
        "name": "pregnancy care center",
        "value": "pregnancy care center"
      },
      {
        "name": "pressure washing service",
        "value": "pressure washing service"
      },
      {
        "name": "printed music publisher",
        "value": "printed music publisher"
      },
      {
        "name": "printer repair service",
        "value": "printer repair service"
      },
      {
        "name": "printing equipment supplier",
        "value": "printing equipment supplier"
      },
      {
        "name": "private educational institution",
        "value": "private educational institution"
      },
      {
        "name": "private equity firm",
        "value": "private equity firm"
      },
      {
        "name": "private golf course",
        "value": "private golf course"
      },
      {
        "name": "private sector bank",
        "value": "private sector bank"
      },
      {
        "name": "promotional products supplier",
        "value": "promotional products supplier"
      },
      {
        "name": "property administration service",
        "value": "property administration service"
      },
      {
        "name": "property investment company",
        "value": "property investment company"
      },
      {
        "name": "property management company",
        "value": "property management company"
      },
      {
        "name": "protective clothing supplier",
        "value": "protective clothing supplier"
      },
      {
        "name": "psychoneurological specialized clinic",
        "value": "psychoneurological specialized clinic"
      },
      {
        "name": "psychosomatic medical practitioner",
        "value": "psychosomatic medical practitioner"
      },
      {
        "name": "public defender's office",
        "value": "public defender's office"
      },
      {
        "name": "public educational institution",
        "value": "public educational institution"
      },
      {
        "name": "public golf course",
        "value": "public golf course"
      },
      {
        "name": "public health department",
        "value": "public health department"
      },
      {
        "name": "public medical center",
        "value": "public medical center"
      },
      {
        "name": "public parking space",
        "value": "public parking space"
      },
      {
        "name": "public prosecutors office",
        "value": "public prosecutors office"
      },
      {
        "name": "public relations firm",
        "value": "public relations firm"
      },
      {
        "name": "public safety office",
        "value": "public safety office"
      },
      {
        "name": "public sector bank",
        "value": "public sector bank"
      },
      {
        "name": "public swimming pool",
        "value": "public swimming pool"
      },
      {
        "name": "public works department",
        "value": "public works department"
      },
      {
        "name": "puerto rican restaurant",
        "value": "puerto rican restaurant"
      },
      {
        "name": "pvc windows supplier",
        "value": "pvc windows supplier"
      },
      {
        "name": "race car dealer",
        "value": "race car dealer"
      },
      {
        "name": "radiator repair service",
        "value": "radiator repair service"
      },
      {
        "name": "raft trip outfitter",
        "value": "raft trip outfitter"
      },
      {
        "name": "railroad equipment supplier",
        "value": "railroad equipment supplier"
      },
      {
        "name": "railroad ties supplier",
        "value": "railroad ties supplier"
      },
      {
        "name": "rainwater tank supplier",
        "value": "rainwater tank supplier"
      },
      {
        "name": "rare book store",
        "value": "rare book store"
      },
      {
        "name": "raw food restaurant",
        "value": "raw food restaurant"
      },
      {
        "name": "real estate agency",
        "value": "real estate agency"
      },
      {
        "name": "real estate agent",
        "value": "real estate agent"
      },
      {
        "name": "real estate appraiser",
        "value": "real estate appraiser"
      },
      {
        "name": "real estate attorney",
        "value": "real estate attorney"
      },
      {
        "name": "real estate auctioneer",
        "value": "real estate auctioneer"
      },
      {
        "name": "real estate consultant",
        "value": "real estate consultant"
      },
      {
        "name": "real estate developer",
        "value": "real estate developer"
      },
      {
        "name": "real estate school",
        "value": "real estate school"
      },
      {
        "name": "real estate surveyor",
        "value": "real estate surveyor"
      },
      {
        "name": "records storage facility",
        "value": "records storage facility"
      },
      {
        "name": "recycling drop-off location",
        "value": "recycling drop-off location"
      },
      {
        "name": "refrigerated transport service",
        "value": "refrigerated transport service"
      },
      {
        "name": "refrigerator repair service",
        "value": "refrigerator repair service"
      },
      {
        "name": "regional government office",
        "value": "regional government office"
      },
      {
        "name": "registered general nurse",
        "value": "registered general nurse"
      },
      {
        "name": "religious book store",
        "value": "religious book store"
      },
      {
        "name": "religious goods store",
        "value": "religious goods store"
      },
      {
        "name": "renter's insurance agency",
        "value": "renter's insurance agency"
      },
      {
        "name": "reproductive health clinic",
        "value": "reproductive health clinic"
      },
      {
        "name": "restaurant or cafe",
        "value": "restaurant or cafe"
      },
      {
        "name": "restaurant supply store",
        "value": "restaurant supply store"
      },
      {
        "name": "retaining wall supplier",
        "value": "retaining wall supplier"
      },
      {
        "name": "rice cake shop",
        "value": "rice cake shop"
      },
      {
        "name": "rice cracker shop",
        "value": "rice cracker shop"
      },
      {
        "name": "road construction company",
        "value": "road construction company"
      },
      {
        "name": "road safety town",
        "value": "road safety town"
      },
      {
        "name": "rock climbing gym",
        "value": "rock climbing gym"
      },
      {
        "name": "rock climbing instructor",
        "value": "rock climbing instructor"
      },
      {
        "name": "rock music club",
        "value": "rock music club"
      },
      {
        "name": "roller skating club",
        "value": "roller skating club"
      },
      {
        "name": "roller skating rink",
        "value": "roller skating rink"
      },
      {
        "name": "roofing supply store",
        "value": "roofing supply store"
      },
      {
        "name": "roommate referral service",
        "value": "roommate referral service"
      },
      {
        "name": "rubber products supplier",
        "value": "rubber products supplier"
      },
      {
        "name": "rubber stamp store",
        "value": "rubber stamp store"
      },
      {
        "name": "rugby league club",
        "value": "rugby league club"
      },
      {
        "name": "russian grocery store",
        "value": "russian grocery store"
      },
      {
        "name": "russian orthodox church",
        "value": "russian orthodox church"
      },
      {
        "name": "rustic furniture store",
        "value": "rustic furniture store"
      },
      {
        "name": "rv detailing service",
        "value": "rv detailing service"
      },
      {
        "name": "rv repair shop",
        "value": "rv repair shop"
      },
      {
        "name": "rv storage facility",
        "value": "rv storage facility"
      },
      {
        "name": "rv supply store",
        "value": "rv supply store"
      },
      {
        "name": "safety equipment supplier",
        "value": "safety equipment supplier"
      },
      {
        "name": "sailing event area",
        "value": "sailing event area"
      },
      {
        "name": "satellite communication service",
        "value": "satellite communication service"
      },
      {
        "name": "saw sharpening service",
        "value": "saw sharpening service"
      },
      {
        "name": "scaffolding rental service",
        "value": "scaffolding rental service"
      },
      {
        "name": "scale model club",
        "value": "scale model club"
      },
      {
        "name": "scale repair service",
        "value": "scale repair service"
      },
      {
        "name": "school administration office",
        "value": "school administration office"
      },
      {
        "name": "school bus service",
        "value": "school bus service"
      },
      {
        "name": "school district office",
        "value": "school district office"
      },
      {
        "name": "school supply store",
        "value": "school supply store"
      },
      {
        "name": "scientific equipment supplier",
        "value": "scientific equipment supplier"
      },
      {
        "name": "scooter rental service",
        "value": "scooter rental service"
      },
      {
        "name": "scooter repair shop",
        "value": "scooter repair shop"
      },
      {
        "name": "scrap metal dealer",
        "value": "scrap metal dealer"
      },
      {
        "name": "screen printing shop",
        "value": "screen printing shop"
      },
      {
        "name": "screen repair service",
        "value": "screen repair service"
      },
      {
        "name": "scuba tour agency",
        "value": "scuba tour agency"
      },
      {
        "name": "seasonal goods store",
        "value": "seasonal goods store"
      },
      {
        "name": "second hand store",
        "value": "second hand store"
      },
      {
        "name": "security guard service",
        "value": "security guard service"
      },
      {
        "name": "security system supplier",
        "value": "security system supplier"
      },
      {
        "name": "self defense school",
        "value": "self defense school"
      },
      {
        "name": "self service restaurant",
        "value": "self service restaurant"
      },
      {
        "name": "self storage facility",
        "value": "self storage facility"
      },
      {
        "name": "semi conductor supplier",
        "value": "semi conductor supplier"
      },
      {
        "name": "senior citizen center",
        "value": "senior citizen center"
      },
      {
        "name": "senior high school",
        "value": "senior high school"
      },
      {
        "name": "septic system service",
        "value": "septic system service"
      },
      {
        "name": "seventh-day adventist church",
        "value": "seventh-day adventist church"
      },
      {
        "name": "sewage disposal service",
        "value": "sewage disposal service"
      },
      {
        "name": "sewage treatment plant",
        "value": "sewage treatment plant"
      },
      {
        "name": "sewing machine store",
        "value": "sewing machine store"
      },
      {
        "name": "sheet metal contractor",
        "value": "sheet metal contractor"
      },
      {
        "name": "sheet music store",
        "value": "sheet music store"
      },
      {
        "name": "shipping equipment industry",
        "value": "shipping equipment industry"
      },
      {
        "name": "shoe repair shop",
        "value": "shoe repair shop"
      },
      {
        "name": "shoe shining service",
        "value": "shoe shining service"
      },
      {
        "name": "shooting event area",
        "value": "shooting event area"
      },
      {
        "name": "shower door shop",
        "value": "shower door shop"
      },
      {
        "name": "sightseeing tour agency",
        "value": "sightseeing tour agency"
      },
      {
        "name": "silk plant shop",
        "value": "silk plant shop"
      },
      {
        "name": "singing telegram service",
        "value": "singing telegram service"
      },
      {
        "name": "sixth form college",
        "value": "sixth form college"
      },
      {
        "name": "skate sharpening service",
        "value": "skate sharpening service"
      },
      {
        "name": "skeet shooting range",
        "value": "skeet shooting range"
      },
      {
        "name": "ski rental service",
        "value": "ski rental service"
      },
      {
        "name": "ski repair service",
        "value": "ski repair service"
      },
      {
        "name": "skin care clinic",
        "value": "skin care clinic"
      },
      {
        "name": "small plates restaurant",
        "value": "small plates restaurant"
      },
      {
        "name": "smart car dealer",
        "value": "smart car dealer"
      },
      {
        "name": "smog inspection station",
        "value": "smog inspection station"
      },
      {
        "name": "snow removal service",
        "value": "snow removal service"
      },
      {
        "name": "snowboard rental service",
        "value": "snowboard rental service"
      },
      {
        "name": "snowmobile rental service",
        "value": "snowmobile rental service"
      },
      {
        "name": "soba noodle shop",
        "value": "soba noodle shop"
      },
      {
        "name": "social security attorney",
        "value": "social security attorney"
      },
      {
        "name": "social security office",
        "value": "social security office"
      },
      {
        "name": "social services organization",
        "value": "social services organization"
      },
      {
        "name": "social welfare center",
        "value": "social welfare center"
      },
      {
        "name": "societe de flocage",
        "value": "societe de flocage"
      },
      {
        "name": "soft drinks shop",
        "value": "soft drinks shop"
      },
      {
        "name": "software training institute",
        "value": "software training institute"
      },
      {
        "name": "soil testing service",
        "value": "soil testing service"
      },
      {
        "name": "solar energy company",
        "value": "solar energy company"
      },
      {
        "name": "solid fuel company",
        "value": "solid fuel company"
      },
      {
        "name": "solid waste engineer",
        "value": "solid waste engineer"
      },
      {
        "name": "soto ayam restaurant",
        "value": "soto ayam restaurant"
      },
      {
        "name": "soul food restaurant",
        "value": "soul food restaurant"
      },
      {
        "name": "south african restaurant",
        "value": "south african restaurant"
      },
      {
        "name": "south american restaurant",
        "value": "south american restaurant"
      },
      {
        "name": "south asian restaurant",
        "value": "south asian restaurant"
      },
      {
        "name": "south indian restaurant",
        "value": "south indian restaurant"
      },
      {
        "name": "south sulawesi restaurant",
        "value": "south sulawesi restaurant"
      },
      {
        "name": "southeast asian restaurant",
        "value": "southeast asian restaurant"
      },
      {
        "name": "southern italian restaurant",
        "value": "southern italian restaurant"
      },
      {
        "name": "southern restaurant (us)",
        "value": "southern restaurant (us)"
      },
      {
        "name": "soy sauce maker",
        "value": "soy sauce maker"
      },
      {
        "name": "space of remembrance",
        "value": "space of remembrance"
      },
      {
        "name": "special education school",
        "value": "special education school"
      },
      {
        "name": "sport tour agency",
        "value": "sport tour agency"
      },
      {
        "name": "sporting goods store",
        "value": "sporting goods store"
      },
      {
        "name": "sports accessories wholesaler",
        "value": "sports accessories wholesaler"
      },
      {
        "name": "sports activity location",
        "value": "sports activity location"
      },
      {
        "name": "sports card store",
        "value": "sports card store"
      },
      {
        "name": "sports injury clinic",
        "value": "sports injury clinic"
      },
      {
        "name": "sports massage therapist",
        "value": "sports massage therapist"
      },
      {
        "name": "sports medicine clinic",
        "value": "sports medicine clinic"
      },
      {
        "name": "sports medicine physician",
        "value": "sports medicine physician"
      },
      {
        "name": "sports memorabilia store",
        "value": "sports memorabilia store"
      },
      {
        "name": "sports nutrition store",
        "value": "sports nutrition store"
      },
      {
        "name": "sri lankan restaurant",
        "value": "sri lankan restaurant"
      },
      {
        "name": "stained glass studio",
        "value": "stained glass studio"
      },
      {
        "name": "stainless steel plant",
        "value": "stainless steel plant"
      },
      {
        "name": "stall installation service",
        "value": "stall installation service"
      },
      {
        "name": "stamp collectors club",
        "value": "stamp collectors club"
      },
      {
        "name": "staple food package",
        "value": "staple food package"
      },
      {
        "name": "state employment department",
        "value": "state employment department"
      },
      {
        "name": "state government office",
        "value": "state government office"
      },
      {
        "name": "state liquor store",
        "value": "state liquor store"
      },
      {
        "name": "state owned farm",
        "value": "state owned farm"
      },
      {
        "name": "std testing service",
        "value": "std testing service"
      },
      {
        "name": "steamed bun shop",
        "value": "steamed bun shop"
      },
      {
        "name": "steel construction company",
        "value": "steel construction company"
      },
      {
        "name": "steel framework contractor",
        "value": "steel framework contractor"
      },
      {
        "name": "steelwork design service",
        "value": "steelwork design service"
      },
      {
        "name": "stereo rental store",
        "value": "stereo rental store"
      },
      {
        "name": "stereo repair service",
        "value": "stereo repair service"
      },
      {
        "name": "stock exchange building",
        "value": "stock exchange building"
      },
      {
        "name": "store equipment supplier",
        "value": "store equipment supplier"
      },
      {
        "name": "stores and shopping",
        "value": "stores and shopping"
      },
      {
        "name": "student housing center",
        "value": "student housing center"
      },
      {
        "name": "students parents association",
        "value": "students parents association"
      },
      {
        "name": "students support association",
        "value": "students support association"
      },
      {
        "name": "suburban train line",
        "value": "suburban train line"
      },
      {
        "name": "summer camp organizer",
        "value": "summer camp organizer"
      },
      {
        "name": "summer toboggan run",
        "value": "summer toboggan run"
      },
      {
        "name": "super public bath",
        "value": "super public bath"
      },
      {
        "name": "supplementary educational institute",
        "value": "supplementary educational institute"
      },
      {
        "name": "surf lifesaving club",
        "value": "surf lifesaving club"
      },
      {
        "name": "surgical products wholesaler",
        "value": "surgical products wholesaler"
      },
      {
        "name": "surgical supply store",
        "value": "surgical supply store"
      },
      {
        "name": "suzuki motorcycle dealer",
        "value": "suzuki motorcycle dealer"
      },
      {
        "name": "swimming pool contractor",
        "value": "swimming pool contractor"
      },
      {
        "name": "table tennis club",
        "value": "table tennis club"
      },
      {
        "name": "table tennis facility",
        "value": "table tennis facility"
      },
      {
        "name": "tai chi school",
        "value": "tai chi school"
      },
      {
        "name": "tata motors dealer",
        "value": "tata motors dealer"
      },
      {
        "name": "tattoo removal service",
        "value": "tattoo removal service"
      },
      {
        "name": "tax collector's office",
        "value": "tax collector's office"
      },
      {
        "name": "tax preparation service",
        "value": "tax preparation service"
      },
      {
        "name": "tea market place",
        "value": "tea market place"
      },
      {
        "name": "teeth whitening service",
        "value": "teeth whitening service"
      },
      {
        "name": "telecommunications equipment supplier",
        "value": "telecommunications equipment supplier"
      },
      {
        "name": "telecommunications service provider",
        "value": "telecommunications service provider"
      },
      {
        "name": "telephone answering service",
        "value": "telephone answering service"
      },
      {
        "name": "television repair service",
        "value": "television repair service"
      },
      {
        "name": "tent rental service",
        "value": "tent rental service"
      },
      {
        "name": "thai massage therapist",
        "value": "thai massage therapist"
      },
      {
        "name": "theater supply store",
        "value": "theater supply store"
      },
      {
        "name": "theatrical costume supplier",
        "value": "theatrical costume supplier"
      },
      {
        "name": "tile cleaning service",
        "value": "tile cleaning service"
      },
      {
        "name": "tire repair shop",
        "value": "tire repair shop"
      },
      {
        "name": "toner cartridge supplier",
        "value": "toner cartridge supplier"
      },
      {
        "name": "tool rental service",
        "value": "tool rental service"
      },
      {
        "name": "tool repair shop",
        "value": "tool repair shop"
      },
      {
        "name": "tourist information center",
        "value": "tourist information center"
      },
      {
        "name": "towing equipment provider",
        "value": "towing equipment provider"
      },
      {
        "name": "tractor repair shop",
        "value": "tractor repair shop"
      },
      {
        "name": "trading card store",
        "value": "trading card store"
      },
      {
        "name": "traditional american restaurant",
        "value": "traditional american restaurant"
      },
      {
        "name": "traditional costume club",
        "value": "traditional costume club"
      },
      {
        "name": "traditional kostume store",
        "value": "traditional kostume store"
      },
      {
        "name": "trailer rental service",
        "value": "trailer rental service"
      },
      {
        "name": "trailer repair shop",
        "value": "trailer repair shop"
      },
      {
        "name": "trailer supply store",
        "value": "trailer supply store"
      },
      {
        "name": "train repairing center",
        "value": "train repairing center"
      },
      {
        "name": "train ticket agency",
        "value": "train ticket agency"
      },
      {
        "name": "transportation escort service",
        "value": "transportation escort service"
      },
      {
        "name": "triumph motorcycle dealer",
        "value": "triumph motorcycle dealer"
      },
      {
        "name": "tropical fish store",
        "value": "tropical fish store"
      },
      {
        "name": "truck accessories store",
        "value": "truck accessories store"
      },
      {
        "name": "truck driving school",
        "value": "truck driving school"
      },
      {
        "name": "truck parts supplier",
        "value": "truck parts supplier"
      },
      {
        "name": "truck rental agency",
        "value": "truck rental agency"
      },
      {
        "name": "truck repair shop",
        "value": "truck repair shop"
      },
      {
        "name": "truck topper supplier",
        "value": "truck topper supplier"
      },
      {
        "name": "tsukigime parking lot",
        "value": "tsukigime parking lot"
      },
      {
        "name": "tune up supplier",
        "value": "tune up supplier"
      },
      {
        "name": "typewriter repair service",
        "value": "typewriter repair service"
      },
      {
        "name": "udon noodle restaurant",
        "value": "udon noodle restaurant"
      },
      {
        "name": "unfinished furniture store",
        "value": "unfinished furniture store"
      },
      {
        "name": "unitarian universalist church",
        "value": "unitarian universalist church"
      },
      {
        "name": "united methodist church",
        "value": "united methodist church"
      },
      {
        "name": "upholstery cleaning service",
        "value": "upholstery cleaning service"
      },
      {
        "name": "urban planning department",
        "value": "urban planning department"
      },
      {
        "name": "urgent care center",
        "value": "urgent care center"
      },
      {
        "name": "used appliance store",
        "value": "used appliance store"
      },
      {
        "name": "used bicycle shop",
        "value": "used bicycle shop"
      },
      {
        "name": "used book store",
        "value": "used book store"
      },
      {
        "name": "used car dealer",
        "value": "used car dealer"
      },
      {
        "name": "used cd store",
        "value": "used cd store"
      },
      {
        "name": "used clothing store",
        "value": "used clothing store"
      },
      {
        "name": "used computer store",
        "value": "used computer store"
      },
      {
        "name": "used furniture store",
        "value": "used furniture store"
      },
      {
        "name": "used game store",
        "value": "used game store"
      },
      {
        "name": "used motorcycle dealer",
        "value": "used motorcycle dealer"
      },
      {
        "name": "used tire shop",
        "value": "used tire shop"
      },
      {
        "name": "used truck dealer",
        "value": "used truck dealer"
      },
      {
        "name": "utility trailer dealer",
        "value": "utility trailer dealer"
      },
      {
        "name": "uyghur cuisine restaurant",
        "value": "uyghur cuisine restaurant"
      },
      {
        "name": "vacuum cleaner store",
        "value": "vacuum cleaner store"
      },
      {
        "name": "valet parking service",
        "value": "valet parking service"
      },
      {
        "name": "van rental agency",
        "value": "van rental agency"
      },
      {
        "name": "vcr repair service",
        "value": "vcr repair service"
      },
      {
        "name": "vegetable wholesale market",
        "value": "vegetable wholesale market"
      },
      {
        "name": "vehicle inspection service",
        "value": "vehicle inspection service"
      },
      {
        "name": "vehicle repair shop",
        "value": "vehicle repair shop"
      },
      {
        "name": "vehicle shipping agent",
        "value": "vehicle shipping agent"
      },
      {
        "name": "vehicle wrapping service",
        "value": "vehicle wrapping service"
      },
      {
        "name": "vending machine supplier",
        "value": "vending machine supplier"
      },
      {
        "name": "ventilating equipment manufacturer",
        "value": "ventilating equipment manufacturer"
      },
      {
        "name": "venture capital company",
        "value": "venture capital company"
      },
      {
        "name": "veterans affairs department",
        "value": "veterans affairs department"
      },
      {
        "name": "video conferencing service",
        "value": "video conferencing service"
      },
      {
        "name": "video duplication service",
        "value": "video duplication service"
      },
      {
        "name": "video editing service",
        "value": "video editing service"
      },
      {
        "name": "video game store",
        "value": "video game store"
      },
      {
        "name": "video production service",
        "value": "video production service"
      },
      {
        "name": "vintage clothing store",
        "value": "vintage clothing store"
      },
      {
        "name": "vinyl sign shop",
        "value": "vinyl sign shop"
      },
      {
        "name": "virtual office rental",
        "value": "virtual office rental"
      },
      {
        "name": "visa consulting service",
        "value": "visa consulting service"
      },
      {
        "name": "vocational gymnasium school",
        "value": "vocational gymnasium school"
      },
      {
        "name": "vocational secondary school",
        "value": "vocational secondary school"
      },
      {
        "name": "voter registration office",
        "value": "voter registration office"
      },
      {
        "name": "waste management service",
        "value": "waste management service"
      },
      {
        "name": "waste transfer station",
        "value": "waste transfer station"
      },
      {
        "name": "watch repair service",
        "value": "watch repair service"
      },
      {
        "name": "water cooler supplier",
        "value": "water cooler supplier"
      },
      {
        "name": "water filter supplier",
        "value": "water filter supplier"
      },
      {
        "name": "water polo pool",
        "value": "water polo pool"
      },
      {
        "name": "water pump supplier",
        "value": "water pump supplier"
      },
      {
        "name": "water purification company",
        "value": "water purification company"
      },
      {
        "name": "water ski shop",
        "value": "water ski shop"
      },
      {
        "name": "water skiing club",
        "value": "water skiing club"
      },
      {
        "name": "water skiing instructor",
        "value": "water skiing instructor"
      },
      {
        "name": "water skiing service",
        "value": "water skiing service"
      },
      {
        "name": "water testing service",
        "value": "water testing service"
      },
      {
        "name": "water treatment plant",
        "value": "water treatment plant"
      },
      {
        "name": "water treatment supplier",
        "value": "water treatment supplier"
      },
      {
        "name": "water utility company",
        "value": "water utility company"
      },
      {
        "name": "waterbed repair service",
        "value": "waterbed repair service"
      },
      {
        "name": "weather forecast service",
        "value": "weather forecast service"
      },
      {
        "name": "web hosting company",
        "value": "web hosting company"
      },
      {
        "name": "wedding souvenir shop",
        "value": "wedding souvenir shop"
      },
      {
        "name": "weight loss service",
        "value": "weight loss service"
      },
      {
        "name": "welding gas supplier",
        "value": "welding gas supplier"
      },
      {
        "name": "welding supply store",
        "value": "welding supply store"
      },
      {
        "name": "well drilling contractor",
        "value": "well drilling contractor"
      },
      {
        "name": "west african restaurant",
        "value": "west african restaurant"
      },
      {
        "name": "western apparel store",
        "value": "western apparel store"
      },
      {
        "name": "wheel alignment service",
        "value": "wheel alignment service"
      },
      {
        "name": "wheelchair rental service",
        "value": "wheelchair rental service"
      },
      {
        "name": "wheelchair repair service",
        "value": "wheelchair repair service"
      },
      {
        "name": "wholesale food store",
        "value": "wholesale food store"
      },
      {
        "name": "wholesale plant nursery",
        "value": "wholesale plant nursery"
      },
      {
        "name": "wholesaler household appliances",
        "value": "wholesaler household appliances"
      },
      {
        "name": "wildlife rescue service",
        "value": "wildlife rescue service"
      },
      {
        "name": "willow basket manufacturer",
        "value": "willow basket manufacturer"
      },
      {
        "name": "wind turbine builder",
        "value": "wind turbine builder"
      },
      {
        "name": "window cleaning service",
        "value": "window cleaning service"
      },
      {
        "name": "window installation service",
        "value": "window installation service"
      },
      {
        "name": "window tinting service",
        "value": "window tinting service"
      },
      {
        "name": "window treatment store",
        "value": "window treatment store"
      },
      {
        "name": "wine storage facility",
        "value": "wine storage facility"
      },
      {
        "name": "winemaking supply store",
        "value": "winemaking supply store"
      },
      {
        "name": "wing chun school",
        "value": "wing chun school"
      },
      {
        "name": "women's clothing store",
        "value": "women's clothing store"
      },
      {
        "name": "women's health clinic",
        "value": "women's health clinic"
      },
      {
        "name": "women's personal trainer",
        "value": "women's personal trainer"
      },
      {
        "name": "wood frame supplier",
        "value": "wood frame supplier"
      },
      {
        "name": "wood stove shop",
        "value": "wood stove shop"
      },
      {
        "name": "wood working class",
        "value": "wood working class"
      },
      {
        "name": "woodworking supply store",
        "value": "woodworking supply store"
      },
      {
        "name": "work clothes store",
        "value": "work clothes store"
      },
      {
        "name": "yamaha motorcycle dealer",
        "value": "yamaha motorcycle dealer"
      },
      {
        "name": "yoga retreat center",
        "value": "yoga retreat center"
      },
      {
        "name": "youth care service",
        "value": "youth care service"
      },
      {
        "name": "youth clothing store",
        "value": "youth clothing store"
      },
      {
        "name": "adult day care center",
        "value": "adult day care center"
      },
      {
        "name": "adult foster care service",
        "value": "adult foster care service"
      },
      {
        "name": "air compressor repair service",
        "value": "air compressor repair service"
      },
      {
        "name": "air conditioning repair service",
        "value": "air conditioning repair service"
      },
      {
        "name": "air conditioning system supplier",
        "value": "air conditioning system supplier"
      },
      {
        "name": "air duct cleaning service",
        "value": "air duct cleaning service"
      },
      {
        "name": "antique furniture restoration service",
        "value": "antique furniture restoration service"
      },
      {
        "name": "asian household goods store",
        "value": "asian household goods store"
      },
      {
        "name": "assemblies of god church",
        "value": "assemblies of god church"
      },
      {
        "name": "audio visual equipment supplier",
        "value": "audio visual equipment supplier"
      },
      {
        "name": "audiovisual equipment rental service",
        "value": "audiovisual equipment rental service"
      },
      {
        "name": "auto air conditioning service",
        "value": "auto air conditioning service"
      },
      {
        "name": "auto body parts supplier",
        "value": "auto body parts supplier"
      },
      {
        "name": "auto care products store",
        "value": "auto care products store"
      },
      {
        "name": "auto dent removal service",
        "value": "auto dent removal service"
      },
      {
        "name": "auto glass repair service",
        "value": "auto glass repair service"
      },
      {
        "name": "auto radiator repair service",
        "value": "auto radiator repair service"
      },
      {
        "name": "auto tune up service",
        "value": "auto tune up service"
      },
      {
        "name": "auto window tinting service",
        "value": "auto window tinting service"
      },
      {
        "name": "balloon ride tour agency",
        "value": "balloon ride tour agency"
      },
      {
        "name": "bar restaurant furniture store",
        "value": "bar restaurant furniture store"
      },
      {
        "name": "beauty products vending machine",
        "value": "beauty products vending machine"
      },
      {
        "name": "building equipment hire service",
        "value": "building equipment hire service"
      },
      {
        "name": "business to business service",
        "value": "business to business service"
      },
      {
        "name": "cake decorating equipment shop",
        "value": "cake decorating equipment shop"
      },
      {
        "name": "canoe & kayak store",
        "value": "canoe & kayak store"
      },
      {
        "name": "canoe and kayak club",
        "value": "canoe and kayak club"
      },
      {
        "name": "car security system installer",
        "value": "car security system installer"
      },
      {
        "name": "cardiovascular and thoracic surgeon",
        "value": "cardiovascular and thoracic surgeon"
      },
      {
        "name": "carport and pergola builder",
        "value": "carport and pergola builder"
      },
      {
        "name": "cash and carry wholesaler",
        "value": "cash and carry wholesaler"
      },
      {
        "name": "cell phone accessory store",
        "value": "cell phone accessory store"
      },
      {
        "name": "cell phone charging station",
        "value": "cell phone charging station"
      },
      {
        "name": "chess and card club",
        "value": "chess and card club"
      },
      {
        "name": "child health care centre",
        "value": "child health care centre"
      },
      {
        "name": "church of the nazarene",
        "value": "church of the nazarene"
      },
      {
        "name": "city department of transportation",
        "value": "city department of transportation"
      },
      {
        "name": "classified ads newspaper publisher",
        "value": "classified ads newspaper publisher"
      },
      {
        "name": "clock and watch maker",
        "value": "clock and watch maker"
      },
      {
        "name": "clothes and fabric manufacturer",
        "value": "clothes and fabric manufacturer"
      },
      {
        "name": "clothes and fabric wholesaler",
        "value": "clothes and fabric wholesaler"
      },
      {
        "name": "clothing wholesale market place",
        "value": "clothing wholesale market place"
      },
      {
        "name": "coach and minibus hire",
        "value": "coach and minibus hire"
      },
      {
        "name": "commercial real estate agency",
        "value": "commercial real estate agency"
      },
      {
        "name": "commercial real estate inspector",
        "value": "commercial real estate inspector"
      },
      {
        "name": "compressed natural gas station",
        "value": "compressed natural gas station"
      },
      {
        "name": "computer support and services",
        "value": "computer support and services"
      },
      {
        "name": "concrete metal framework supplier",
        "value": "concrete metal framework supplier"
      },
      {
        "name": "construction machine rental service",
        "value": "construction machine rental service"
      },
      {
        "name": "conveyor belt sushi restaurant",
        "value": "conveyor belt sushi restaurant"
      },
      {
        "name": "curtain supplier and maker",
        "value": "curtain supplier and maker"
      },
      {
        "name": "custom confiscated goods store",
        "value": "custom confiscated goods store"
      },
      {
        "name": "dairy farm equipment supplier",
        "value": "dairy farm equipment supplier"
      },
      {
        "name": "dan dan noodle restaurant",
        "value": "dan dan noodle restaurant"
      },
      {
        "name": "dealer of fiat professional",
        "value": "dealer of fiat professional"
      },
      {
        "name": "department of motor vehicles",
        "value": "department of motor vehicles"
      },
      {
        "name": "department of public safety",
        "value": "department of public safety"
      },
      {
        "name": "department of social services",
        "value": "department of social services"
      },
      {
        "name": "diesel engine repair service",
        "value": "diesel engine repair service"
      },
      {
        "name": "disciples of christ church",
        "value": "disciples of christ church"
      },
      {
        "name": "dog day care center",
        "value": "dog day care center"
      },
      {
        "name": "domestic abuse treatment center",
        "value": "domestic abuse treatment center"
      },
      {
        "name": "drivers license training school",
        "value": "drivers license training school"
      },
      {
        "name": "dry wall supply store",
        "value": "dry wall supply store"
      },
      {
        "name": "dryer vent cleaning service",
        "value": "dryer vent cleaning service"
      },
      {
        "name": "eating disorder treatment center",
        "value": "eating disorder treatment center"
      },
      {
        "name": "electric motor repair shop",
        "value": "electric motor repair shop"
      },
      {
        "name": "electric motor scooter dealer",
        "value": "electric motor scooter dealer"
      },
      {
        "name": "electric motor vehicle dealer",
        "value": "electric motor vehicle dealer"
      },
      {
        "name": "electric vehicle charging station",
        "value": "electric vehicle charging station"
      },
      {
        "name": "electrolysis hair removal service",
        "value": "electrolysis hair removal service"
      },
      {
        "name": "energy equipment and solutions",
        "value": "energy equipment and solutions"
      },
      {
        "name": "environment renewable natural resources",
        "value": "environment renewable natural resources"
      },
      {
        "name": "executive suite rental agency",
        "value": "executive suite rental agency"
      },
      {
        "name": "exhibition and trade centre",
        "value": "exhibition and trade centre"
      },
      {
        "name": "family day care service",
        "value": "family day care service"
      },
      {
        "name": "farm equipment repair service",
        "value": "farm equipment repair service"
      },
      {
        "name": "farming and cattle raising",
        "value": "farming and cattle raising"
      },
      {
        "name": "fiber optic products supplier",
        "value": "fiber optic products supplier"
      },
      {
        "name": "film and photograph library",
        "value": "film and photograph library"
      },
      {
        "name": "fire damage restoration service",
        "value": "fire damage restoration service"
      },
      {
        "name": "fire department equipment supplier",
        "value": "fire department equipment supplier"
      },
      {
        "name": "fire protection equipment supplier",
        "value": "fire protection equipment supplier"
      },
      {
        "name": "fire protection system supplier",
        "value": "fire protection system supplier"
      },
      {
        "name": "fish & chips restaurant",
        "value": "fish & chips restaurant"
      },
      {
        "name": "fish and chips takeaway",
        "value": "fish and chips takeaway"
      },
      {
        "name": "food and beverage consultant",
        "value": "food and beverage consultant"
      },
      {
        "name": "food and beverage exporter",
        "value": "food and beverage exporter"
      },
      {
        "name": "foreign exchange students organization",
        "value": "foreign exchange students organization"
      },
      {
        "name": "foreign languages program school",
        "value": "foreign languages program school"
      },
      {
        "name": "fruit and vegetable processing",
        "value": "fruit and vegetable processing"
      },
      {
        "name": "fruit and vegetable store",
        "value": "fruit and vegetable store"
      },
      {
        "name": "fruit and vegetable wholesaler",
        "value": "fruit and vegetable wholesaler"
      },
      {
        "name": "full dress rental service",
        "value": "full dress rental service"
      },
      {
        "name": "glass & mirror shop",
        "value": "glass & mirror shop"
      },
      {
        "name": "ground self defense force",
        "value": "ground self defense force"
      },
      {
        "name": "guardia di finanza police",
        "value": "guardia di finanza police"
      },
      {
        "name": "haute couture fashion house",
        "value": "haute couture fashion house"
      },
      {
        "name": "health and beauty shop",
        "value": "health and beauty shop"
      },
      {
        "name": "hearing aid repair service",
        "value": "hearing aid repair service"
      },
      {
        "name": "hearing assistance earphone store",
        "value": "hearing assistance earphone store"
      },
      {
        "name": "hip hop dance class",
        "value": "hip hop dance class"
      },
      {
        "name": "home health care service",
        "value": "home health care service"
      },
      {
        "name": "home help service agency",
        "value": "home help service agency"
      },
      {
        "name": "hospital equipment and supplies",
        "value": "hospital equipment and supplies"
      },
      {
        "name": "hospitality and tourism school",
        "value": "hospitality and tourism school"
      },
      {
        "name": "hot tub repair service",
        "value": "hot tub repair service"
      },
      {
        "name": "hot water system supplier",
        "value": "hot water system supplier"
      },
      {
        "name": "hua niao market place",
        "value": "hua niao market place"
      },
      {
        "name": "hunting and fishing store",
        "value": "hunting and fishing store"
      },
      {
        "name": "ice cream equipment supplier",
        "value": "ice cream equipment supplier"
      },
      {
        "name": "immigration & naturalization service",
        "value": "immigration & naturalization service"
      },
      {
        "name": "income protection insurance agency",
        "value": "income protection insurance agency"
      },
      {
        "name": "income tax help association",
        "value": "income tax help association"
      },
      {
        "name": "industrial real estate agency",
        "value": "industrial real estate agency"
      },
      {
        "name": "industrial technical engineers association",
        "value": "industrial technical engineers association"
      },
      {
        "name": "industrial vacuum equipment supplier",
        "value": "industrial vacuum equipment supplier"
      },
      {
        "name": "iron and steel store",
        "value": "iron and steel store"
      },
      {
        "name": "it support and services",
        "value": "it support and services"
      },
      {
        "name": "japanese cheap sweets shop",
        "value": "japanese cheap sweets shop"
      },
      {
        "name": "jehovah's witness kingdom hall",
        "value": "jehovah's witness kingdom hall"
      },
      {
        "name": "karaoke equipment rental service",
        "value": "karaoke equipment rental service"
      },
      {
        "name": "kilt shop and hire",
        "value": "kilt shop and hire"
      },
      {
        "name": "kushiage and kushikatsu restaurant",
        "value": "kushiage and kushikatsu restaurant"
      },
      {
        "name": "laser hair removal service",
        "value": "laser hair removal service"
      },
      {
        "name": "lawn equipment rental service",
        "value": "lawn equipment rental service"
      },
      {
        "name": "lawn irrigation equipment supplier",
        "value": "lawn irrigation equipment supplier"
      },
      {
        "name": "lawn mower repair service",
        "value": "lawn mower repair service"
      },
      {
        "name": "lawn sprinkler system contractor",
        "value": "lawn sprinkler system contractor"
      },
      {
        "name": "learner driver training area",
        "value": "learner driver training area"
      },
      {
        "name": "license plate frames supplier",
        "value": "license plate frames supplier"
      },
      {
        "name": "low income housing program",
        "value": "low income housing program"
      },
      {
        "name": "marine self defense force",
        "value": "marine self defense force"
      },
      {
        "name": "marriage or relationship counselor",
        "value": "marriage or relationship counselor"
      },
      {
        "name": "martial arts supply store",
        "value": "martial arts supply store"
      },
      {
        "name": "material handling equipment supplier",
        "value": "material handling equipment supplier"
      },
      {
        "name": "medical diagnostic imaging center",
        "value": "medical diagnostic imaging center"
      },
      {
        "name": "metal detecting equipment supplier",
        "value": "metal detecting equipment supplier"
      },
      {
        "name": "metal heat treating service",
        "value": "metal heat treating service"
      },
      {
        "name": "microwave oven repair service",
        "value": "microwave oven repair service"
      },
      {
        "name": "mobile home rental agency",
        "value": "mobile home rental agency"
      },
      {
        "name": "mobile home supply store",
        "value": "mobile home supply store"
      },
      {
        "name": "mobile phone repair shop",
        "value": "mobile phone repair shop"
      },
      {
        "name": "model car play area",
        "value": "model car play area"
      },
      {
        "name": "motor scooter repair shop",
        "value": "motor scooter repair shop"
      },
      {
        "name": "moving and storage service",
        "value": "moving and storage service"
      },
      {
        "name": "muay thai boxing gym",
        "value": "muay thai boxing gym"
      },
      {
        "name": "municipal department of tourism",
        "value": "municipal department of tourism"
      },
      {
        "name": "museum of space history",
        "value": "museum of space history"
      },
      {
        "name": "music management and promotion",
        "value": "music management and promotion"
      },
      {
        "name": "musical instrument rental service",
        "value": "musical instrument rental service"
      },
      {
        "name": "musical instrument repair shop",
        "value": "musical instrument repair shop"
      },
      {
        "name": "native american goods store",
        "value": "native american goods store"
      },
      {
        "name": "natural rock climbing area",
        "value": "natural rock climbing area"
      },
      {
        "name": "non smoking holiday home",
        "value": "non smoking holiday home"
      },
      {
        "name": "north eastern indian restaurant",
        "value": "north eastern indian restaurant"
      },
      {
        "name": "occupational safety and health",
        "value": "occupational safety and health"
      },
      {
        "name": "off track betting shop",
        "value": "off track betting shop"
      },
      {
        "name": "offal pot cooking restaurant",
        "value": "offal pot cooking restaurant"
      },
      {
        "name": "office equipment rental service",
        "value": "office equipment rental service"
      },
      {
        "name": "office equipment repair service",
        "value": "office equipment repair service"
      },
      {
        "name": "office space rental agency",
        "value": "office space rental agency"
      },
      {
        "name": "oil field equipment supplier",
        "value": "oil field equipment supplier"
      },
      {
        "name": "olive oil bottling company",
        "value": "olive oil bottling company"
      },
      {
        "name": "optical instrument repair service",
        "value": "optical instrument repair service"
      },
      {
        "name": "oral and maxillofacial surgeon",
        "value": "oral and maxillofacial surgeon"
      },
      {
        "name": "orthotics & prosthetics service",
        "value": "orthotics & prosthetics service"
      },
      {
        "name": "paper shredding machine supplier",
        "value": "paper shredding machine supplier"
      },
      {
        "name": "parking lot for bicycles",
        "value": "parking lot for bicycles"
      },
      {
        "name": "parking lot for motorcycles",
        "value": "parking lot for motorcycles"
      },
      {
        "name": "party equipment rental service",
        "value": "party equipment rental service"
      },
      {
        "name": "pay by weight restaurant",
        "value": "pay by weight restaurant"
      },
      {
        "name": "plant and machinery hire",
        "value": "plant and machinery hire"
      },
      {
        "name": "plastic injection molding service",
        "value": "plastic injection molding service"
      },
      {
        "name": "plus size clothing store",
        "value": "plus size clothing store"
      },
      {
        "name": "power plant equipment supplier",
        "value": "power plant equipment supplier"
      },
      {
        "name": "printer ink refill store",
        "value": "printer ink refill store"
      },
      {
        "name": "professional and hobby associations",
        "value": "professional and hobby associations"
      },
      {
        "name": "qing fang market place",
        "value": "qing fang market place"
      },
      {
        "name": "racing car parts store",
        "value": "racing car parts store"
      },
      {
        "name": "ready mix concrete supplier",
        "value": "ready mix concrete supplier"
      },
      {
        "name": "real estate rental agency",
        "value": "real estate rental agency"
      },
      {
        "name": "recreational vehicle rental agency",
        "value": "recreational vehicle rental agency"
      },
      {
        "name": "research and product development",
        "value": "research and product development"
      },
      {
        "name": "retail space rental agency",
        "value": "retail space rental agency"
      },
      {
        "name": "rolled metal products supplier",
        "value": "rolled metal products supplier"
      },
      {
        "name": "safe & vault shop",
        "value": "safe & vault shop"
      },
      {
        "name": "sand & gravel supplier",
        "value": "sand & gravel supplier"
      },
      {
        "name": "sand and gravel supplier",
        "value": "sand and gravel supplier"
      },
      {
        "name": "school for the deaf",
        "value": "school for the deaf"
      },
      {
        "name": "screen printing supply store",
        "value": "screen printing supply store"
      },
      {
        "name": "security system installation service",
        "value": "security system installation service"
      },
      {
        "name": "self service car wash",
        "value": "self service car wash"
      },
      {
        "name": "self service health station",
        "value": "self service health station"
      },
      {
        "name": "sewing machine repair service",
        "value": "sewing machine repair service"
      },
      {
        "name": "shipbuilding and repair company",
        "value": "shipbuilding and repair company"
      },
      {
        "name": "shipping and mailing service",
        "value": "shipping and mailing service"
      },
      {
        "name": "shop supermarket furniture store",
        "value": "shop supermarket furniture store"
      },
      {
        "name": "single sex secondary school",
        "value": "single sex secondary school"
      },
      {
        "name": "small appliance repair service",
        "value": "small appliance repair service"
      },
      {
        "name": "small claims assistance service",
        "value": "small claims assistance service"
      },
      {
        "name": "small engine repair service",
        "value": "small engine repair service"
      },
      {
        "name": "social security financial department",
        "value": "social security financial department"
      },
      {
        "name": "solar energy equipment supplier",
        "value": "solar energy equipment supplier"
      },
      {
        "name": "solar energy system service",
        "value": "solar energy system service"
      },
      {
        "name": "solar panel maintenance service",
        "value": "solar panel maintenance service"
      },
      {
        "name": "solar photovoltaic power plant",
        "value": "solar photovoltaic power plant"
      },
      {
        "name": "south east asian restaurant",
        "value": "south east asian restaurant"
      },
      {
        "name": "spa and health club",
        "value": "spa and health club"
      },
      {
        "name": "sports equipment rental service",
        "value": "sports equipment rental service"
      },
      {
        "name": "stage lighting equipment supplier",
        "value": "stage lighting equipment supplier"
      },
      {
        "name": "state office of education",
        "value": "state office of education"
      },
      {
        "name": "student career counseling office",
        "value": "student career counseling office"
      },
      {
        "name": "study at home school",
        "value": "study at home school"
      },
      {
        "name": "sweets and dessert buffet",
        "value": "sweets and dessert buffet"
      },
      {
        "name": "swimming pool repair service",
        "value": "swimming pool repair service"
      },
      {
        "name": "swimming pool supply store",
        "value": "swimming pool supply store"
      },
      {
        "name": "syokudo and teishoku restaurant",
        "value": "syokudo and teishoku restaurant"
      },
      {
        "name": "table tennis supply store",
        "value": "table tennis supply store"
      },
      {
        "name": "tattoo and piercing shop",
        "value": "tattoo and piercing shop"
      },
      {
        "name": "tea and coffee shop",
        "value": "tea and coffee shop"
      },
      {
        "name": "tennis court construction company",
        "value": "tennis court construction company"
      },
      {
        "name": "threads and yarns wholesaler",
        "value": "threads and yarns wholesaler"
      },
      {
        "name": "tool & die shop",
        "value": "tool & die shop"
      },
      {
        "name": "trade fair construction company",
        "value": "trade fair construction company"
      },
      {
        "name": "united church of canada",
        "value": "united church of canada"
      },
      {
        "name": "united church of christ",
        "value": "united church of christ"
      },
      {
        "name": "used auto parts store",
        "value": "used auto parts store"
      },
      {
        "name": "used musical instrument store",
        "value": "used musical instrument store"
      },
      {
        "name": "used office furniture store",
        "value": "used office furniture store"
      },
      {
        "name": "used store fixture supplier",
        "value": "used store fixture supplier"
      },
      {
        "name": "vacation home rental agency",
        "value": "vacation home rental agency"
      },
      {
        "name": "vacuum cleaner repair shop",
        "value": "vacuum cleaner repair shop"
      },
      {
        "name": "vacuum cleaning system supplier",
        "value": "vacuum cleaning system supplier"
      },
      {
        "name": "vegetarian cafe and deli",
        "value": "vegetarian cafe and deli"
      },
      {
        "name": "video camera repair service",
        "value": "video camera repair service"
      },
      {
        "name": "video conferencing equipment supplier",
        "value": "video conferencing equipment supplier"
      },
      {
        "name": "video equipment repair service",
        "value": "video equipment repair service"
      },
      {
        "name": "video game rental kiosk",
        "value": "video game rental kiosk"
      },
      {
        "name": "video game rental store",
        "value": "video game rental store"
      },
      {
        "name": "visa and passport office",
        "value": "visa and passport office"
      },
      {
        "name": "vitamin & supplements store",
        "value": "vitamin & supplements store"
      },
      {
        "name": "washer & dryer store",
        "value": "washer & dryer store"
      },
      {
        "name": "water damage restoration service",
        "value": "water damage restoration service"
      },
      {
        "name": "water jet cutting service",
        "value": "water jet cutting service"
      },
      {
        "name": "water softening equipment supplier",
        "value": "water softening equipment supplier"
      },
      {
        "name": "water tank cleaning service",
        "value": "water tank cleaning service"
      },
      {
        "name": "water works equipment supplier",
        "value": "water works equipment supplier"
      },
      {
        "name": "waxing hair removal service",
        "value": "waxing hair removal service"
      },
      {
        "name": "wedding dress rental service",
        "value": "wedding dress rental service"
      },
      {
        "name": "whale watching tour agency",
        "value": "whale watching tour agency"
      },
      {
        "name": "wildlife and safari park",
        "value": "wildlife and safari park"
      },
      {
        "name": "wine wholesaler and importer",
        "value": "wine wholesaler and importer"
      },
      {
        "name": "wood floor installation service",
        "value": "wood floor installation service"
      },
      {
        "name": "wood floor refinishing service",
        "value": "wood floor refinishing service"
      },
      {
        "name": "youth social services organization",
        "value": "youth social services organization"
      },
      {
        "name": "architectural and engineering model maker",
        "value": "architectural and engineering model maker"
      },
      {
        "name": "army & navy surplus shop",
        "value": "army & navy surplus shop"
      },
      {
        "name": "audio visual equipment repair service",
        "value": "audio visual equipment repair service"
      },
      {
        "name": "bottle & can redemption center",
        "value": "bottle & can redemption center"
      },
      {
        "name": "canoe & kayak tour agency",
        "value": "canoe & kayak tour agency"
      },
      {
        "name": "car finance and loan company",
        "value": "car finance and loan company"
      },
      {
        "name": "car repair and maintenance service",
        "value": "car repair and maintenance service"
      },
      {
        "name": "catering food and drink supplier",
        "value": "catering food and drink supplier"
      },
      {
        "name": "coin operated laundry equipment supplier",
        "value": "coin operated laundry equipment supplier"
      },
      {
        "name": "combined primary and secondary school",
        "value": "combined primary and secondary school"
      },
      {
        "name": "disability services and support organization",
        "value": "disability services and support organization"
      },
      {
        "name": "dress and tuxedo rental service",
        "value": "dress and tuxedo rental service"
      },
      {
        "name": "electric vehicle charging station contractor",
        "value": "electric vehicle charging station contractor"
      },
      {
        "name": "electronics retail and repair shop",
        "value": "electronics retail and repair shop"
      },
      {
        "name": "federal agency for technical relief",
        "value": "federal agency for technical relief"
      },
      {
        "name": "flavours fragrances and aroma supplier",
        "value": "flavours fragrances and aroma supplier"
      },
      {
        "name": "floor sanding and polishing service",
        "value": "floor sanding and polishing service"
      },
      {
        "name": "ice cream and drink shop",
        "value": "ice cream and drink shop"
      },
      {
        "name": "industrial spares and products wholesaler",
        "value": "industrial spares and products wholesaler"
      },
      {
        "name": "institute of geography and statistics",
        "value": "institute of geography and statistics"
      },
      {
        "name": "multimedia and electronic book publisher",
        "value": "multimedia and electronic book publisher"
      },
      {
        "name": "oil & natural gas company",
        "value": "oil & natural gas company"
      },
      {
        "name": "oil and gas exploration service",
        "value": "oil and gas exploration service"
      },
      {
        "name": "organ donation and tissue bank",
        "value": "organ donation and tissue bank"
      },
      {
        "name": "outdoor clothing and equipment shop",
        "value": "outdoor clothing and equipment shop"
      },
      {
        "name": "pet food and animal feeds",
        "value": "pet food and animal feeds"
      },
      {
        "name": "pick your own farm produce",
        "value": "pick your own farm produce"
      },
      {
        "name": "polythene and plastic sheeting supplier",
        "value": "polythene and plastic sheeting supplier"
      },
      {
        "name": "road construction machine repair service",
        "value": "road construction machine repair service"
      },
      {
        "name": "sheepskin and wool products supplier",
        "value": "sheepskin and wool products supplier"
      },
      {
        "name": "short term apartment rental agency",
        "value": "short term apartment rental agency"
      },
      {
        "name": "skin care products vending machine",
        "value": "skin care products vending machine"
      },
      {
        "name": "solar hot water system supplier",
        "value": "solar hot water system supplier"
      },
      {
        "name": "sukiyaki and shabu shabu restaurant",
        "value": "sukiyaki and shabu shabu restaurant"
      },
      {
        "name": "united states armed forces base",
        "value": "united states armed forces base"
      },
      {
        "name": "washer & dryer repair service",
        "value": "washer & dryer repair service"
      },
      {
        "name": "water sports equipment rental service",
        "value": "water sports equipment rental service"
      },
      {
        "name": "wood and laminate flooring supplier",
        "value": "wood and laminate flooring supplier"
      },
      {
        "name": "aboriginal and torres strait islander organisation",
        "value": "aboriginal and torres strait islander organisation"
      },
      {
        "name": "hong kong style fast food restaurant",
        "value": "hong kong style fast food restaurant"
      },
      {
        "name": "roads ports and canals engineers association",
        "value": "roads ports and canals engineers association"
      },
      {
        "name": "church of jesus christ of latter-day saints",
        "value": "church of jesus christ of latter-day saints"
      }
    ]
  },
  {
    "displayName": "Get exact name matches (no similar results)($)",
    "name": "searchMatching",
    "description": "Restrict what places are scraped based on matching their name with provided 🔍 <b>Search term</b>. E.g., all places that have <b>chicken</b> in their name vs. places called <b>Kentucky Fried Chicken</b>.",
    "required": false,
    "default": "all",
    "type": "options",
    "options": [
      {
        "name": "Scrape all places as provided by Google",
        "value": "all"
      },
      {
        "name": "Scrape only places that include the search term in their title",
        "value": "only_includes"
      },
      {
        "name": "Scrape only places that match the search term exactly with their title",
        "value": "only_exact"
      }
    ]
  },
  {
    "displayName": "Set a minimum star rating ($)",
    "name": "placeMinimumStars",
    "description": "Scrape only places with a rating equal to or above the selected stars. Places without reviews will also be skipped. Keep in mind, filtering by reviews reduces the number of places found per credit spent, as many will be excluded.",
    "required": false,
    "default": "",
    "type": "options",
    "options": [
      {
        "name": "All",
        "value": ""
      },
      {
        "name": "⭐️ 2+ star",
        "value": "two"
      },
      {
        "name": "⭐️ 2.5+ stars",
        "value": "twoAndHalf"
      },
      {
        "name": "⭐️ 3+ stars",
        "value": "three"
      },
      {
        "name": "⭐️ 3.5+ stars",
        "value": "threeAndHalf"
      },
      {
        "name": "⭐️ 4+ stars",
        "value": "four"
      },
      {
        "name": "⭐️ 4.5+ stars",
        "value": "fourAndHalf"
      }
    ]
  },
  {
    "displayName": "Scrape places with/without a website($)",
    "name": "website",
    "description": "Use this to exclude places without a website, or vice versa. This option is turned off by default.",
    "required": false,
    "default": "allPlaces",
    "type": "options",
    "options": [
      {
        "name": "Scrape all places",
        "value": "allPlaces"
      },
      {
        "name": "Scrape only places with a website",
        "value": "withWebsite"
      },
      {
        "name": "Scrape only places without a website",
        "value": "withoutWebsite"
      }
    ]
  },
  {
    "displayName": "⏩ Skip closed places ($)",
    "name": "skipClosedPlaces",
    "description": "Skip places that are marked as temporary or permanently closed. Ideal for focusing on currently open places.",
    "required": false,
    "default": false,
    "type": "boolean"
  },
  {
    "displayName": "Scrape place detail page ($)",
    "name": "scrapePlaceDetailPage",
    "description": "Scrape detail pages of each place the Actor finds. This will slow down the Actor since it needs to open another page for each place individually.<br><br> The fields available only when scrapePlaceDetailPage is enabled include: `reviewsDistribution`, `imageCategories`, popularTimes fields, `openingHours`, `BusinessConfirmationText`, `peopleAlsoSearch`, `reviewsTags`, `updatesFromCustomers`, `questionsAndAnswers`, `tableReservationLinks`, `orderBy`, `ownerUpdates`, and hotel fields. <br><br>This option needs to be enabled if you wish to use any of the options below.",
    "required": false,
    "default": false,
    "type": "boolean"
  },
  {
    "displayName": "Scrape table reservation provider data ($)",
    "name": "scrapeTableReservationProvider",
    "description": "Scrape table reservation provider data like name, address, email or phone. This data is present only in restaurants that have blue \"RESERVE A TABLE\" button",
    "required": false,
    "default": false,
    "type": "boolean"
  },
  {
    "displayName": "🌐 Include \"Web results\" ($)",
    "name": "includeWebResults",
    "description": "Extract the \"Web results\" section located at the bottom of every place listing.",
    "required": false,
    "default": false,
    "type": "boolean"
  },
  {
    "displayName": "🛍 Scrape inside places (e.g. malls or shopping center) ($)",
    "name": "scrapeDirectories",
    "description": "Some places (e.g. malls) can have multiple businesses located inside them. This option will scrape inside the \"Directory\" or \"At this place\" as per different categories (example <a href='https://www.google.com/maps/place/Forum+Karlín/@50.0914263,14.4522411,532m/data=!3m1!1e3!4m7!3m6!1s0x470b94a14fd738ff:0x6a75e391416ab4fa!8m2!3d50.0914263!4d14.454816!10e3!16s%2Fg%2F1ptxlz77_?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D'>here</a>). Turn this toggle on to include those places in your results.<br><br> ⚠️ Note that that full place details needs to be scraped in order to scrape directories.",
    "required": false,
    "default": false,
    "type": "boolean"
  },
  {
    "displayName": "Number of questions to extract ($)",
    "name": "maxQuestions",
    "description": "Set the number of questions per place you expect to scrape. If you fill in <b>0</b> or leave the field empty, only the first question and answer will be scraped. To extract all questions, type <b>999</b> into the field.<br><br>⚠️ Note that some of the fields contain <b>personal data</b>.",
    "required": false,
    "default": 0,
    "type": "number",
    "typeOptions": {
      "minValue": 0
    }
  },
  {
    "displayName": "⏩ Add-on: Company contacts enrichment (from website)",
    "name": "scrapeContacts",
    "description": "Enrich Google Maps places with contact details extracted from the business website, including business emails and social media profiles (Meta, LinkedIn, X, etc). Price is charged per place at $2 per 1000 places that have a website. <br><br>We exclude contacts of big chains: mcdonalds, starbucks, dominos, pizzahut, burgerking, kfc, subway, wendys, dunkindonuts, tacobell.",
    "required": false,
    "default": false,
    "type": "boolean"
  },
  {
    "displayName": "🔍 Add-on: Social media profile enrichment",
    "name": "scrapeSocialMediaProfiles",
    "description": "Enable enrichment for any social media profiles found. This add-on retrieves detailed public data for each profile, including <b>profile names, follower/following counts, descriptions, post/video counts, and verification status</b>.<br><br>Pricing depends on your <b>subscription plan</b> (please see the 'Pricing' tab for details). You are charged a flat rate for the <b>total number of profiles enriched</b>, regardless of how many platforms (Facebook, YouTube, etc.) you select.<hr><b>Feature Dependency:</b><br>To use this feature, the <b>'⏩ Add-on: Company contacts enrichment (from website)'</b> option will be automatically enabled. This ensures that all enriched social media data is correctly combined with the main contact record for each domain.",
    "required": false,
    "default": "{\"facebooks\":false,\"instagrams\":false,\"youtubes\":false,\"tiktoks\":false,\"twitters\":false}",
    "type": "json"
  },
  {
    "displayName": "⏩ Add-on: Extract business leads information - Maximum leads per place",
    "name": "maximumLeadsEnrichmentRecords",
    "description": "Enrich your results with detailed contact and company information, including employee names, job titles, emails, phone numbers, LinkedIn profiles, and key company data like industry and number of employees. <br><br> This setting allows you to set the maximum number of leads records you want to scrape per each place found on the map (that has a website). By default, it's set to 0 which means that no leads information will be scraped. <br><br>⚠️ Note that some of the fields contain <b>personal data</b>. GDPR protects personal data in the European Union and by other regulations around the world. You should not scrape personal data unless you have a legitimate reason to do so. If you're unsure whether your use case is legitimate, please consult an attorney. <br><br>We exclude leads of big chains as these are not related to the local places: mcdonalds, starbucks, dominos, pizzahut, burgerking, kfc, subway, wendys, dunkindonuts, tacobell.<br><br>⚠️ <b>Cost warning:</b> This is a multiplier. Requesting 10 leads for 1,000 places will attempt to find 10,000 total leads. You are only charged for leads successfully found.",
    "required": false,
    "default": 0,
    "type": "number",
    "typeOptions": {}
  },
  {
    "displayName": "Leads departments selection",
    "name": "leadsEnrichmentDepartments",
    "description": "You can use this filter to include only specific departments (like Sales, Marketing, or C-Suite). Note: This will only work if the ⏩ Add-on: Extract business leads information - Maximum leads per place (maximumLeadsEnrichmentRecords) option is enabled. Please note that some job titles are sometimes miscategorized in the wrong departments.",
    "required": false,
    "default": [],
    "type": "multiOptions",
    "options": [
      {
        "name": "C-Suite",
        "value": "c_suite"
      },
      {
        "name": "Product",
        "value": "product"
      },
      {
        "name": "Engineering & Technical",
        "value": "engineering_technical"
      },
      {
        "name": "Design",
        "value": "design"
      },
      {
        "name": "Education",
        "value": "education"
      },
      {
        "name": "Finance",
        "value": "finance"
      },
      {
        "name": "Human Resources",
        "value": "human_resources"
      },
      {
        "name": "Information Technology",
        "value": "information_technology"
      },
      {
        "name": "Legal",
        "value": "legal"
      },
      {
        "name": "Marketing",
        "value": "marketing"
      },
      {
        "name": "Medical & Health",
        "value": "medical_health"
      },
      {
        "name": "Operations",
        "value": "operations"
      },
      {
        "name": "Sales",
        "value": "sales"
      },
      {
        "name": "Consulting",
        "value": "consulting"
      }
    ]
  },
  {
    "displayName": "Number of reviews to extract ($)",
    "name": "maxReviews",
    "description": "Set the number of reviews you expect to get per place.<br> <br>Please be aware that the `Add-on: additional place details scraped` charge applies to each place you scrape for reviews, as the Actor must access the detail page first. All prices are determined by your subscription plan.<br> <br>To extract all reviews, <b>leave this field empty</b>. <br> <br>Each output place item can contain maximum 5,000 reviews so in case more reviews are extracted, a duplicate place is stored with the next 5,000 reviews and so on. <br>⚠️ Enabling this feature might slow the search down.",
    "required": false,
    "default": 0,
    "type": "number",
    "typeOptions": {
      "minValue": 0
    }
  },
  {
    "displayName": "Extract only reviews posted after [date]",
    "name": "reviewsStartDate",
    "description": "Either absolute date (e.g. `2024-05-03`) or relative date from now into the past (e.g. `8 days`, `3 months`). JSON input also supports adding time in both absolute (ISO standard, e.g. `2024-05-03T20:00:00`) and relative  (e.g. `3 hours`) formats. Absolute time is always interpreted in the UTC timezone, not your local timezone - please convert accordingly. Supported relative date & time units: `minutes`, `hours`, `days`, `weeks`, `months`, `years`. <br><br> ⚠️ Heads up: If this parameter is specified, you must choose the 'Newest' sort by value. The reason for this is that with this parameter entered, the actor stops scraping reviews as soon as it finds the first review that's older than the specified date. If the sorting is not set to 'Newest', it might encounter a review older than the specified date before it reaches the desired review count and not scrape the desired amount of reviews.",
    "required": false,
    "default": "",
    "type": "dateTime"
  },
  {
    "displayName": "Sort reviews by",
    "name": "reviewsSort",
    "description": "Define the order in which reviews should be sorted.",
    "required": false,
    "default": "newest",
    "type": "options",
    "options": [
      {
        "name": "Newest",
        "value": "newest"
      },
      {
        "name": "Most relevant",
        "value": "mostRelevant"
      },
      {
        "name": "Highest ranking",
        "value": "highestRanking"
      },
      {
        "name": "Lowest ranking",
        "value": "lowestRanking"
      }
    ]
  },
  {
    "displayName": "Filter reviews by keywords",
    "name": "reviewsFilterString",
    "description": "If you enter keywords, only reviews containing those keywords will be scraped. Leave it blank to scrape all reviews.",
    "required": false,
    "default": "",
    "type": "string",
    "typeOptions": {
      "rows": 5
    }
  },
  {
    "displayName": "Reviews origin",
    "name": "reviewsOrigin",
    "description": "Select whether you want all reviews (from Google, Tripadvisor, etc.) or only reviews from Google",
    "required": false,
    "default": "all",
    "type": "options",
    "options": [
      {
        "name": "All reviews",
        "value": "all"
      },
      {
        "name": "Google",
        "value": "google"
      }
    ]
  },
  {
    "displayName": "🧛‍♂️ Include reviewers' data",
    "name": "scrapeReviewsPersonalData",
    "description": "This setting allows you to get personal data about the reviewer (their ID, name, URL, and photo URL) and about review (ID and URL). <br><br>⚠️ Personal data is protected by the GDPR in the European Union and by other regulations around the world. You should not scrape personal data unless you have a legitimate reason to do so. If you're unsure whether your reason is legitimate, consult your lawyers.",
    "required": false,
    "default": true,
    "type": "boolean"
  },
  {
    "displayName": "Number of additional images to extract ($)",
    "name": "maxImages",
    "description": "Set the number of images per place you expect to scrape. <br> <br>Please be aware that the `Add-on: additional place details scraped` charge applies to each place you scrape for images, as the Actor must access the detail page first. All prices are determined by your subscription plan.<br> <br>To extract all images, <b>leave this field empty</b>. The higher the number, the slower the search.",
    "required": false,
    "default": 0,
    "type": "number",
    "typeOptions": {
      "minValue": 0
    }
  },
  {
    "displayName": "🧑‍🎨 Include the image authors",
    "name": "scrapeImageAuthors",
    "description": "Include the author name for each image. <br><br>⚠️ Enabling this toggle may slow down processing as it requires fetching information for each image individually.",
    "required": false,
    "default": false,
    "type": "boolean"
  },
  {
    "displayName": "🗺 Country",
    "name": "countryCode",
    "description": "Set the country where the data extraction should be carried out, e.g., <b>United States</b>.",
    "required": false,
    "default": "",
    "type": "options",
    "options": [
      {
        "name": "",
        "value": ""
      },
      {
        "name": "United States",
        "value": "us"
      },
      {
        "name": "Afghanistan",
        "value": "af"
      },
      {
        "name": "Albania",
        "value": "al"
      },
      {
        "name": "Algeria",
        "value": "dz"
      },
      {
        "name": "American Samoa",
        "value": "as"
      },
      {
        "name": "Andorra",
        "value": "ad"
      },
      {
        "name": "Angola",
        "value": "ao"
      },
      {
        "name": "Anguilla",
        "value": "ai"
      },
      {
        "name": "Antarctica",
        "value": "aq"
      },
      {
        "name": "Antigua and Barbuda",
        "value": "ag"
      },
      {
        "name": "Argentina",
        "value": "ar"
      },
      {
        "name": "Armenia",
        "value": "am"
      },
      {
        "name": "Aruba",
        "value": "aw"
      },
      {
        "name": "Australia",
        "value": "au"
      },
      {
        "name": "Austria",
        "value": "at"
      },
      {
        "name": "Azerbaijan",
        "value": "az"
      },
      {
        "name": "Bahamas",
        "value": "bs"
      },
      {
        "name": "Bahrain",
        "value": "bh"
      },
      {
        "name": "Bangladesh",
        "value": "bd"
      },
      {
        "name": "Barbados",
        "value": "bb"
      },
      {
        "name": "Belarus",
        "value": "by"
      },
      {
        "name": "Belgium",
        "value": "be"
      },
      {
        "name": "Belize",
        "value": "bz"
      },
      {
        "name": "Benin",
        "value": "bj"
      },
      {
        "name": "Bermuda",
        "value": "bm"
      },
      {
        "name": "Bhutan",
        "value": "bt"
      },
      {
        "name": "Bolivia",
        "value": "bo"
      },
      {
        "name": "Bosnia and Herzegovina",
        "value": "ba"
      },
      {
        "name": "Botswana",
        "value": "bw"
      },
      {
        "name": "Bouvet Island",
        "value": "bv"
      },
      {
        "name": "Brazil",
        "value": "br"
      },
      {
        "name": "British Indian Ocean Territory",
        "value": "io"
      },
      {
        "name": "Brunei Darussalam",
        "value": "bn"
      },
      {
        "name": "Bulgaria",
        "value": "bg"
      },
      {
        "name": "Burkina Faso",
        "value": "bf"
      },
      {
        "name": "Burundi",
        "value": "bi"
      },
      {
        "name": "Cambodia",
        "value": "kh"
      },
      {
        "name": "Cameroon",
        "value": "cm"
      },
      {
        "name": "Canada",
        "value": "ca"
      },
      {
        "name": "Cape Verde",
        "value": "cv"
      },
      {
        "name": "Cayman Islands",
        "value": "ky"
      },
      {
        "name": "Central African Republic",
        "value": "cf"
      },
      {
        "name": "Chad",
        "value": "td"
      },
      {
        "name": "Chile",
        "value": "cl"
      },
      {
        "name": "China",
        "value": "cn"
      },
      {
        "name": "Christmas Island",
        "value": "cx"
      },
      {
        "name": "Cocos (Keeling) Islands",
        "value": "cc"
      },
      {
        "name": "Colombia",
        "value": "co"
      },
      {
        "name": "Comoros",
        "value": "km"
      },
      {
        "name": "Congo-Brazzaville",
        "value": "cg"
      },
      {
        "name": "Congo, Democratic Republic of the",
        "value": "cd"
      },
      {
        "name": "Cook Islands",
        "value": "ck"
      },
      {
        "name": "Costa Rica",
        "value": "cr"
      },
      {
        "name": "Cote D'ivoire",
        "value": "ci"
      },
      {
        "name": "Croatia",
        "value": "hr"
      },
      {
        "name": "Cuba",
        "value": "cu"
      },
      {
        "name": "Cyprus",
        "value": "cy"
      },
      {
        "name": "Czech Republic",
        "value": "cz"
      },
      {
        "name": "Denmark",
        "value": "dk"
      },
      {
        "name": "Djibouti",
        "value": "dj"
      },
      {
        "name": "Dominica",
        "value": "dm"
      },
      {
        "name": "Dominican Republic",
        "value": "do"
      },
      {
        "name": "Ecuador",
        "value": "ec"
      },
      {
        "name": "Egypt",
        "value": "eg"
      },
      {
        "name": "El Salvador",
        "value": "sv"
      },
      {
        "name": "Equatorial Guinea",
        "value": "gq"
      },
      {
        "name": "Eritrea",
        "value": "er"
      },
      {
        "name": "Estonia",
        "value": "ee"
      },
      {
        "name": "Ethiopia",
        "value": "et"
      },
      {
        "name": "Falkland Islands",
        "value": "fk"
      },
      {
        "name": "Faroe Islands",
        "value": "fo"
      },
      {
        "name": "Fiji",
        "value": "fj"
      },
      {
        "name": "Finland",
        "value": "fi"
      },
      {
        "name": "France",
        "value": "fr"
      },
      {
        "name": "French Guiana",
        "value": "gf"
      },
      {
        "name": "French Polynesia",
        "value": "pf"
      },
      {
        "name": "French Southern Territories",
        "value": "tf"
      },
      {
        "name": "Gabon",
        "value": "ga"
      },
      {
        "name": "Gambia",
        "value": "gm"
      },
      {
        "name": "Georgia",
        "value": "ge"
      },
      {
        "name": "Germany",
        "value": "de"
      },
      {
        "name": "Ghana",
        "value": "gh"
      },
      {
        "name": "Gibraltar",
        "value": "gi"
      },
      {
        "name": "Greece",
        "value": "gr"
      },
      {
        "name": "Greenland",
        "value": "gl"
      },
      {
        "name": "Grenada",
        "value": "gd"
      },
      {
        "name": "Guadeloupe",
        "value": "gp"
      },
      {
        "name": "Guam",
        "value": "gu"
      },
      {
        "name": "Guatemala",
        "value": "gt"
      },
      {
        "name": "Guinea",
        "value": "gn"
      },
      {
        "name": "Guinea-Bissau",
        "value": "gw"
      },
      {
        "name": "Guyana",
        "value": "gy"
      },
      {
        "name": "Haiti",
        "value": "ht"
      },
      {
        "name": "Heard Island and Mcdonald Islands",
        "value": "hm"
      },
      {
        "name": "Vatican City State",
        "value": "va"
      },
      {
        "name": "Honduras",
        "value": "hn"
      },
      {
        "name": "Hungary",
        "value": "hu"
      },
      {
        "name": "Iceland",
        "value": "is"
      },
      {
        "name": "India",
        "value": "in"
      },
      {
        "name": "Indonesia",
        "value": "id"
      },
      {
        "name": "Iran",
        "value": "ir"
      },
      {
        "name": "Iraq",
        "value": "iq"
      },
      {
        "name": "Ireland",
        "value": "ie"
      },
      {
        "name": "Israel",
        "value": "il"
      },
      {
        "name": "Italy",
        "value": "it"
      },
      {
        "name": "Jamaica",
        "value": "jm"
      },
      {
        "name": "Japan",
        "value": "jp"
      },
      {
        "name": "Jordan",
        "value": "jo"
      },
      {
        "name": "Kazakhstan",
        "value": "kz"
      },
      {
        "name": "Kenya",
        "value": "ke"
      },
      {
        "name": "Kiribati",
        "value": "ki"
      },
      {
        "name": "Korea, Democratic People's Republic of",
        "value": "kp"
      },
      {
        "name": "Korea",
        "value": "kr"
      },
      {
        "name": "Kuwait",
        "value": "kw"
      },
      {
        "name": "Kyrgyzstan",
        "value": "kg"
      },
      {
        "name": "Laos",
        "value": "la"
      },
      {
        "name": "Latvia",
        "value": "lv"
      },
      {
        "name": "Lebanon",
        "value": "lb"
      },
      {
        "name": "Lesotho",
        "value": "ls"
      },
      {
        "name": "Liberia",
        "value": "lr"
      },
      {
        "name": "Libyan Arab Jamahiriya",
        "value": "ly"
      },
      {
        "name": "Liechtenstein",
        "value": "li"
      },
      {
        "name": "Lithuania",
        "value": "lt"
      },
      {
        "name": "Luxembourg",
        "value": "lu"
      },
      {
        "name": "Macao",
        "value": "mo"
      },
      {
        "name": "Macedonia",
        "value": "mk"
      },
      {
        "name": "Madagascar",
        "value": "mg"
      },
      {
        "name": "Malawi",
        "value": "mw"
      },
      {
        "name": "Malaysia",
        "value": "my"
      },
      {
        "name": "Maldives",
        "value": "mv"
      },
      {
        "name": "Mali",
        "value": "ml"
      },
      {
        "name": "Malta",
        "value": "mt"
      },
      {
        "name": "Marshall Islands",
        "value": "mh"
      },
      {
        "name": "Martinique",
        "value": "mq"
      },
      {
        "name": "Mauritania",
        "value": "mr"
      },
      {
        "name": "Mauritius",
        "value": "mu"
      },
      {
        "name": "Mayotte",
        "value": "yt"
      },
      {
        "name": "Mexico",
        "value": "mx"
      },
      {
        "name": "Micronesia",
        "value": "fm"
      },
      {
        "name": "Moldova",
        "value": "md"
      },
      {
        "name": "Monaco",
        "value": "mc"
      },
      {
        "name": "Mongolia",
        "value": "mn"
      },
      {
        "name": "Montenegro",
        "value": "me"
      },
      {
        "name": "Montserrat",
        "value": "ms"
      },
      {
        "name": "Morocco",
        "value": "ma"
      },
      {
        "name": "Mozambique",
        "value": "mz"
      },
      {
        "name": "Myanmar",
        "value": "mm"
      },
      {
        "name": "Namibia",
        "value": "na"
      },
      {
        "name": "Nauru",
        "value": "nr"
      },
      {
        "name": "Nepal",
        "value": "np"
      },
      {
        "name": "Netherlands",
        "value": "nl"
      },
      {
        "name": "Netherlands Antilles",
        "value": "an"
      },
      {
        "name": "New Caledonia",
        "value": "nc"
      },
      {
        "name": "New Zealand",
        "value": "nz"
      },
      {
        "name": "Nicaragua",
        "value": "ni"
      },
      {
        "name": "Niger",
        "value": "ne"
      },
      {
        "name": "Nigeria",
        "value": "ng"
      },
      {
        "name": "Niue",
        "value": "nu"
      },
      {
        "name": "Norfolk Island",
        "value": "nf"
      },
      {
        "name": "Northern Mariana Islands",
        "value": "mp"
      },
      {
        "name": "Norway",
        "value": "no"
      },
      {
        "name": "Oman",
        "value": "om"
      },
      {
        "name": "Pakistan",
        "value": "pk"
      },
      {
        "name": "Palau",
        "value": "pw"
      },
      {
        "name": "Palestine",
        "value": "ps"
      },
      {
        "name": "Panama",
        "value": "pa"
      },
      {
        "name": "Papua New Guinea",
        "value": "pg"
      },
      {
        "name": "Paraguay",
        "value": "py"
      },
      {
        "name": "Peru",
        "value": "pe"
      },
      {
        "name": "Philippines",
        "value": "ph"
      },
      {
        "name": "Pitcairn",
        "value": "pn"
      },
      {
        "name": "Poland",
        "value": "pl"
      },
      {
        "name": "Portugal",
        "value": "pt"
      },
      {
        "name": "Puerto Rico",
        "value": "pr"
      },
      {
        "name": "Qatar",
        "value": "qa"
      },
      {
        "name": "Reunion",
        "value": "re"
      },
      {
        "name": "Romania",
        "value": "ro"
      },
      {
        "name": "Russian Federation",
        "value": "ru"
      },
      {
        "name": "Rwanda",
        "value": "rw"
      },
      {
        "name": "Saint Helena",
        "value": "sh"
      },
      {
        "name": "Saint Kitts and Nevis",
        "value": "kn"
      },
      {
        "name": "Saint Lucia",
        "value": "lc"
      },
      {
        "name": "Saint Pierre and Miquelon",
        "value": "pm"
      },
      {
        "name": "Saint Vincent and the Grenadines",
        "value": "vc"
      },
      {
        "name": "Samoa",
        "value": "ws"
      },
      {
        "name": "San Marino",
        "value": "sm"
      },
      {
        "name": "Sao Tome and Principe",
        "value": "st"
      },
      {
        "name": "Saudi Arabia",
        "value": "sa"
      },
      {
        "name": "Senegal",
        "value": "sn"
      },
      {
        "name": "Serbia",
        "value": "rs"
      },
      {
        "name": "Seychelles",
        "value": "sc"
      },
      {
        "name": "Sierra Leone",
        "value": "sl"
      },
      {
        "name": "Singapore",
        "value": "sg"
      },
      {
        "name": "Slovakia",
        "value": "sk"
      },
      {
        "name": "Slovenia",
        "value": "si"
      },
      {
        "name": "Solomon Islands",
        "value": "sb"
      },
      {
        "name": "Somalia",
        "value": "so"
      },
      {
        "name": "South Africa",
        "value": "za"
      },
      {
        "name": "South Georgia and the South Sandwich Islands",
        "value": "gs"
      },
      {
        "name": "South Sudan",
        "value": "ss"
      },
      {
        "name": "Spain",
        "value": "es"
      },
      {
        "name": "Sri Lanka",
        "value": "lk"
      },
      {
        "name": "Sudan",
        "value": "sd"
      },
      {
        "name": "Suriname",
        "value": "sr"
      },
      {
        "name": "Svalbard and Jan Mayen",
        "value": "sj"
      },
      {
        "name": "Swaziland",
        "value": "sz"
      },
      {
        "name": "Sweden",
        "value": "se"
      },
      {
        "name": "Switzerland",
        "value": "ch"
      },
      {
        "name": "Syrian Arab Republic",
        "value": "sy"
      },
      {
        "name": "Taiwan",
        "value": "tw"
      },
      {
        "name": "Tajikistan",
        "value": "tj"
      },
      {
        "name": "Tanzania",
        "value": "tz"
      },
      {
        "name": "Thailand",
        "value": "th"
      },
      {
        "name": "Timor-Leste",
        "value": "tl"
      },
      {
        "name": "Togo",
        "value": "tg"
      },
      {
        "name": "Tokelau",
        "value": "tk"
      },
      {
        "name": "Tonga",
        "value": "to"
      },
      {
        "name": "Trinidad and Tobago",
        "value": "tt"
      },
      {
        "name": "Tunisia",
        "value": "tn"
      },
      {
        "name": "Turkey",
        "value": "tr"
      },
      {
        "name": "Turkmenistan",
        "value": "tm"
      },
      {
        "name": "Turks and Caicos Islands",
        "value": "tc"
      },
      {
        "name": "Tuvalu",
        "value": "tv"
      },
      {
        "name": "Uganda",
        "value": "ug"
      },
      {
        "name": "Ukraine",
        "value": "ua"
      },
      {
        "name": "United Arab Emirates",
        "value": "ae"
      },
      {
        "name": "United Kingdom",
        "value": "gb"
      },
      {
        "name": "United States Minor Outlying Islands",
        "value": "um"
      },
      {
        "name": "Uruguay",
        "value": "uy"
      },
      {
        "name": "Uzbekistan",
        "value": "uz"
      },
      {
        "name": "Vanuatu",
        "value": "vu"
      },
      {
        "name": "Venezuela",
        "value": "ve"
      },
      {
        "name": "Viet Nam",
        "value": "vn"
      },
      {
        "name": "Virgin Islands, British",
        "value": "vg"
      },
      {
        "name": "Virgin Islands, U.S.",
        "value": "vi"
      },
      {
        "name": "Wallis and Futuna",
        "value": "wf"
      },
      {
        "name": "Western Sahara",
        "value": "eh"
      },
      {
        "name": "Yemen",
        "value": "ye"
      },
      {
        "name": "Zambia",
        "value": "zm"
      },
      {
        "name": "Zimbabwe",
        "value": "zw"
      }
    ]
  },
  {
    "displayName": "🌇 City",
    "name": "city",
    "description": "Enter the city where the data extraction should be carried out, e.g., <b>Pittsburgh</b>.<br><br>⚠️ <b>Do not include State or Country names here.</b><br><br>⚠️ Automatic City polygons may be smaller than expected (e.g., they don't include agglomeration areas). If you need that, set up the location using Country, State, County, City, or Postal code.<br>For an even more precise location definition (, head over to <b>🛰 Custom search area</b> section to create polygon shapes of the areas you want to scrape.",
    "required": false,
    "default": "",
    "type": "string"
  },
  {
    "displayName": "State",
    "name": "state",
    "description": "Set a state where the data extraction should be carried out, e.g., <b>Massachusetts</b> (mainly for the US addresses).",
    "required": false,
    "default": "",
    "type": "string"
  },
  {
    "displayName": "County",
    "name": "county",
    "description": "Set the county where the data extraction should be carried out.<br><br>⚠️ Note that <b>county</b> may represent different administrative areas in different countries: a county (e.g., US), regional district (e.g., Canada) or département (e.g., France).",
    "required": false,
    "default": "",
    "type": "string"
  },
  {
    "displayName": "Postal code",
    "name": "postalCode",
    "description": "Set the postal code of the area where the data extraction should be carried out, e.g., <b>10001</b>. <br><br>⚠️ <b>Combine Postal code only with 🗺 Country, never with 🌇 City. You can only input one postal code at a time.</b>",
    "required": false,
    "default": "",
    "type": "string"
  },
  {
    "displayName": "🛰 Custom search area (coordinate order must be: [↕ longitude, ↔ latitude])",
    "name": "customGeolocation",
    "description": "Use this field to define the exact search area if other search area parameters don't work for you. See <a href='https://apify.com/compass/crawler-google-places#custom-search-area' target='_blank' rel='noopener'>readme</a> or <a href='https://blog.apify.com/google-places-api-limits/#1-create-a-custom-area-by-using-pairs-of-coordinates-%F0%9F%93%A1' target='_blank' rel='noopener'>our guide</a> for details.",
    "required": false,
    "default": "",
    "type": "json"
  },
  {
    "displayName": "Google Maps URLs",
    "name": "startUrls",
    "description": "Max 300 results per search URL. Valid format for URLs contains <code>google.com/maps/</code>. This feature also supports uncommon URL formats such as: <code>google.com?cid=***</code>, <code>goo.gl/maps</code>, and custom place list URL.",
    "required": false,
    "default": {},
    "type": "fixedCollection",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "items",
        "displayName": "items",
        "values": [
          {
            "displayName": "item",
            "name": "url",
            "type": "string",
            "default": ""
          }
        ]
      }
    ]
  },
  {
    "displayName": "🗃 Place IDs",
    "name": "placeIds",
    "description": "List of place IDs. You can add place IDs one by one or upload a list using the <strong>Bulk edit</strong> option. <b>Place ID</b> has format `ChIJreV9aqYWdkgROM_boL6YbwA`",
    "required": false,
    "default": {},
    "type": "fixedCollection",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "values",
        "displayName": "Values",
        "values": [
          {
            "displayName": "Value",
            "name": "value",
            "type": "string",
            "default": ""
          }
        ]
      }
    ]
  },
  {
    "displayName": "Scrape all places",
    "name": "allPlacesNoSearchAction",
    "description": "Extract all places visible on the map. Use the <b>Override zoom level</b> parameter to select the level of detail. Higher zoom will scrape more places but will take longer to finish. You can test what place pins are visible with a specific zoom by changing the <a href=\"https://www.google.com/maps/@40.745204,-73.9390184,16z\">16z</a> part of the Google Maps URL.",
    "required": false,
    "default": "",
    "type": "options",
    "options": [
      {
        "name": "Not applied (normal search or direct places)",
        "value": ""
      },
      {
        "name": "Scrape all places visible on the map (ignore search terms)",
        "value": "all_places_no_search_ocr"
      },
      {
        "name": "DEPRECATED: Scrape by Moving mouse (very slow)",
        "value": "all_places_no_search_mouse"
      }
    ]
  }
];

export const properties: INodeProperties[] = [...actorProperties, ...authenticationProperties];