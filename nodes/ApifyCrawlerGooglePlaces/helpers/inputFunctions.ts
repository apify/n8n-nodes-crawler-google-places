import { IExecuteFunctions } from 'n8n-workflow';

/**
 * Get searchStringsArray parameter (string list)
 * Transforms the fixedCollection format to a simple string array expected by Apify
 */
export function getSearchStringsArray(this: IExecuteFunctions, i: number): string[] | undefined {
	const searchStringsArray = this.getNodeParameter('searchStringsArray', i, {}) as {
		values?: { value: string }[];
	};
	const result = searchStringsArray.values?.map(item => item.value) || [];
	return result.length > 0 ? result : undefined;
}

/**
 * Get locationQuery parameter
 */
export function getLocationQuery(this: IExecuteFunctions, i: number): string | undefined {
	const value = this.getNodeParameter('locationQuery', i) as string;
	return value !== undefined && value !== null && value !== '' ? value : undefined;
}

/**
 * Get maxCrawledPlacesPerSearch parameter
 */
export function getMaxCrawledPlacesPerSearch(this: IExecuteFunctions, i: number): number {
	return this.getNodeParameter('maxCrawledPlacesPerSearch', i) as number;
}

/**
 * Get language parameter
 */
export function getLanguage(this: IExecuteFunctions, i: number): string {
	return this.getNodeParameter('language', i) as string;
}

/**
 * Get categoryFilterWords parameter
 */
export function getCategoryFilterWords(this: IExecuteFunctions, i: number): string[] {
	return this.getNodeParameter('categoryFilterWords', i) as string[];
}

/**
 * Get searchMatching parameter
 */
export function getSearchMatching(this: IExecuteFunctions, i: number): string {
	return this.getNodeParameter('searchMatching', i) as string;
}

/**
 * Get placeMinimumStars parameter
 */
export function getPlaceMinimumStars(this: IExecuteFunctions, i: number): string {
	return this.getNodeParameter('placeMinimumStars', i) as string;
}

/**
 * Get website parameter
 */
export function getWebsite(this: IExecuteFunctions, i: number): string {
	return this.getNodeParameter('website', i) as string;
}

/**
 * Get skipClosedPlaces parameter
 */
export function getSkipClosedPlaces(this: IExecuteFunctions, i: number): boolean {
	return this.getNodeParameter('skipClosedPlaces', i) as boolean;
}

/**
 * Get searchFiltersAndCategories section parameters
 */
export function getSearchFiltersAndCategoriesSection(this: IExecuteFunctions, i: number) : {
	categoryFilterWords: string[],
	searchMatching: string,
	placeMinimumStars: string,
	website: string,
	skipClosedPlaces: boolean,
} | null {
	const searchFiltersAndCategories = this.getNodeParameter('searchFiltersAndCategories', i) as any;
        if (searchFiltersAndCategories && typeof searchFiltersAndCategories === 'object' && 'options' in searchFiltersAndCategories && searchFiltersAndCategories.options) {
        	return {
               	categoryFilterWords: searchFiltersAndCategories.options.categoryFilterWords,
				searchMatching: searchFiltersAndCategories.options.searchMatching,
				placeMinimumStars: searchFiltersAndCategories.options.placeMinimumStars,
				website: searchFiltersAndCategories.options.website,
				skipClosedPlaces: searchFiltersAndCategories.options.skipClosedPlaces,
            };
        }
    return null;
}

/**
 * Get scrapePlaceDetailPage parameter
 */
export function getScrapePlaceDetailPage(this: IExecuteFunctions, i: number): boolean {
	return this.getNodeParameter('scrapePlaceDetailPage', i) as boolean;
}

/**
 * Get scrapeTableReservationProvider parameter
 */
export function getScrapeTableReservationProvider(this: IExecuteFunctions, i: number): boolean {
	return this.getNodeParameter('scrapeTableReservationProvider', i) as boolean;
}

/**
 * Get includeWebResults parameter
 */
export function getIncludeWebResults(this: IExecuteFunctions, i: number): boolean {
	return this.getNodeParameter('includeWebResults', i) as boolean;
}

/**
 * Get scrapeDirectories parameter
 */
export function getScrapeDirectories(this: IExecuteFunctions, i: number): boolean {
	return this.getNodeParameter('scrapeDirectories', i) as boolean;
}

/**
 * Get maxQuestions parameter
 */
export function getMaxQuestions(this: IExecuteFunctions, i: number): number {
	return this.getNodeParameter('maxQuestions', i) as number;
}

/**
 * Get additionalPlaceDetailsScraping section parameters
 */
export function getAdditionalPlaceDetailsScrapingSection(this: IExecuteFunctions, i: number) : {
	scrapePlaceDetailPage: boolean,
	scrapeTableReservationProvider: boolean,
	includeWebResults: boolean,
	scrapeDirectories: boolean,
	maxQuestions: number,
} | null {
	const additionalPlaceDetailsScraping = this.getNodeParameter('additionalPlaceDetailsScraping', i) as any;
        if (additionalPlaceDetailsScraping && typeof additionalPlaceDetailsScraping === 'object' && 'options' in additionalPlaceDetailsScraping && additionalPlaceDetailsScraping.options) {
        	return {
               	scrapePlaceDetailPage: additionalPlaceDetailsScraping.options.scrapePlaceDetailPage,
				scrapeTableReservationProvider: additionalPlaceDetailsScraping.options.scrapeTableReservationProvider,
				includeWebResults: additionalPlaceDetailsScraping.options.includeWebResults,
				scrapeDirectories: additionalPlaceDetailsScraping.options.scrapeDirectories,
				maxQuestions: additionalPlaceDetailsScraping.options.maxQuestions,
            };
        }
    return null;
}

/**
 * Get scrapeContacts parameter
 */
export function getScrapeContacts(this: IExecuteFunctions, i: number): boolean {
	return this.getNodeParameter('scrapeContacts', i) as boolean;
}

/**
 * Get scrapeSocialMediaProfiles parameter
 * Parses JSON string if needed
 */
export function getScrapeSocialMediaProfiles(this: IExecuteFunctions, i: number): object | undefined {
	try {
		const rawValue = this.getNodeParameter('scrapeSocialMediaProfiles', i);
		if (typeof rawValue === 'string' && rawValue.trim() === '') {
			return undefined;
		}
		if (typeof rawValue === 'string') {
			return JSON.parse(rawValue) as object;
		}
		if (rawValue && typeof rawValue === 'object') {
			return rawValue as object;
		}
		return undefined;
	} catch (error) {
		throw new Error(`Invalid JSON in scrapeSocialMediaProfiles: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

/**
 * Get additionalPlaceDetailsScraping section parameters
 */
export function getCompanyContactsEnrichmentSection(this: IExecuteFunctions, i: number) : {
	scrapeContacts: boolean,
	scrapeSocialMediaProfiles: {
		instagrams: boolean,
	} | null,
} | null {
	const companyContactsEnrichment = this.getNodeParameter('companyContactsEnrichment', i) as any;
   if (companyContactsEnrichment && typeof companyContactsEnrichment === 'object' && 'options' in companyContactsEnrichment && companyContactsEnrichment.options) {
		const defaultScrapeSocialMediaProfilesOptions = {
			facebooks: false,
			instagrams: false,
			youtubes: false,
			tiktoks: false,
			twitters: false,
		};

		const result = {
			scrapeContacts: companyContactsEnrichment.options.scrapeContacts,	
			scrapeSocialMediaProfiles: defaultScrapeSocialMediaProfilesOptions,
		}

		if (companyContactsEnrichment.options.scrapeSocialMediaProfiles && typeof companyContactsEnrichment.options.scrapeSocialMediaProfiles === 'object' && 'options' in companyContactsEnrichment.options.scrapeSocialMediaProfiles && companyContactsEnrichment.options.scrapeSocialMediaProfiles.options) {
			result.scrapeSocialMediaProfiles = companyContactsEnrichment.options.scrapeSocialMediaProfiles.options;
		}

		return result;
    }
    return null;
}

/**
 * Get maximumLeadsEnrichmentRecords parameter
 */
export function getMaximumLeadsEnrichmentRecords(this: IExecuteFunctions, i: number): number {
	return this.getNodeParameter('maximumLeadsEnrichmentRecords', i) as number;
}

/**
 * Get leadsEnrichmentDepartments parameter
 */
export function getLeadsEnrichmentDepartments(this: IExecuteFunctions, i: number): string[] {
	return this.getNodeParameter('leadsEnrichmentDepartments', i) as string[];
}

/**
 * Get businessLeadsEnrichment section parameters
 */
export function getBusinessLeadsEnrichmentSection(this: IExecuteFunctions, i: number) : {
	maximumLeadsEnrichmentRecords: number,
	leadsEnrichmentDepartments: string[],
} | null {
	const businessLeadsEnrichment = this.getNodeParameter('businessLeadsEnrichment', i) as any;
        if (businessLeadsEnrichment && typeof businessLeadsEnrichment === 'object' && 'options' in businessLeadsEnrichment && businessLeadsEnrichment.options) {
        	return {
               	maximumLeadsEnrichmentRecords: businessLeadsEnrichment.options.maximumLeadsEnrichmentRecords,
				leadsEnrichmentDepartments: businessLeadsEnrichment.options.leadsEnrichmentDepartments,
            };
        }
    return null;
}

/**
 * Get maxReviews parameter
 */
export function getMaxReviews(this: IExecuteFunctions, i: number): number {
	return this.getNodeParameter('maxReviews', i) as number;
}

/**
 * Get reviewsStartDate parameter
 */
export function getReviewsStartDate(this: IExecuteFunctions, i: number): string | undefined {
	const value = this.getNodeParameter('reviewsStartDate', i) as string;
	return value !== undefined && value !== null && value !== '' ? value : undefined;
}

/**
 * Get reviewsSort parameter
 */
export function getReviewsSort(this: IExecuteFunctions, i: number): string {
	return this.getNodeParameter('reviewsSort', i) as string;
}

/**
 * Get reviewsFilterString parameter
 */
export function getReviewsFilterString(this: IExecuteFunctions, i: number): string | undefined {
	const value = this.getNodeParameter('reviewsFilterString', i) as string;
	return value !== undefined && value !== null && value !== '' ? value : undefined;
}

/**
 * Get reviewsOrigin parameter
 */
export function getReviewsOrigin(this: IExecuteFunctions, i: number): string {
	return this.getNodeParameter('reviewsOrigin', i) as string;
}

/**
 * Get scrapeReviewsPersonalData parameter
 */
export function getScrapeReviewsPersonalData(this: IExecuteFunctions, i: number): boolean {
	return this.getNodeParameter('scrapeReviewsPersonalData', i) as boolean;
}

/**
 * Get reviews section parameters
 */
export function getReviewsSection(this: IExecuteFunctions, i: number) : {
	maxReviews: number,
	reviewsStartDate: string,
	reviewsSort: string,
	reviewsFilterString: string,
	reviewsOrigin: string,
	scrapeReviewsPersonalData: boolean,
} | null {
	const reviews = this.getNodeParameter('reviews', i) as any;
        if (reviews && typeof reviews === 'object' && 'options' in reviews && reviews.options) {
        	return {
               	maxReviews: reviews.options.maxReviews,
				reviewsStartDate: reviews.options.reviewsStartDate,
				reviewsSort: reviews.options.reviewsSort,
				reviewsFilterString: reviews.options.reviewsFilterString,
				reviewsOrigin: reviews.options.reviewsOrigin,
				scrapeReviewsPersonalData: reviews.options.scrapeReviewsPersonalData,
            };
        }
    return null;
}

/**
 * Get maxImages parameter
 */
export function getMaxImages(this: IExecuteFunctions, i: number): number {
	return this.getNodeParameter('maxImages', i) as number;
}

/**
 * Get scrapeImageAuthors parameter
 */
export function getScrapeImageAuthors(this: IExecuteFunctions, i: number): boolean {
	return this.getNodeParameter('scrapeImageAuthors', i) as boolean;
}

/**
 * Get reviews section parameters
 */
export function getImagesSection(this: IExecuteFunctions, i: number) : {
	maxImages: number,
	scrapeImageAuthors: boolean,
} | null  {
	const images = this.getNodeParameter('images', i) as any;
        if (images && typeof images === 'object' && 'options' in images && images.options) {
        	return {
               	maxImages: images.options.maxImages,
				scrapeImageAuthors: images.options.scrapeImageAuthors,
            };
        }
    return null;
}

/**
 * Get countryCode parameter
 */
export function getCountryCode(this: IExecuteFunctions, i: number): string {
	return this.getNodeParameter('countryCode', i) as string;
}

/**
 * Get city parameter
 */
export function getCity(this: IExecuteFunctions, i: number): string | undefined {
	const value = this.getNodeParameter('city', i) as string;
	return value !== undefined && value !== null && value !== '' ? value : undefined;
}

/**
 * Get state parameter
 */
export function getState(this: IExecuteFunctions, i: number): string | undefined {
	const value = this.getNodeParameter('state', i) as string;
	return value !== undefined && value !== null && value !== '' ? value : undefined;
}

/**
 * Get county parameter
 */
export function getCounty(this: IExecuteFunctions, i: number): string | undefined {
	const value = this.getNodeParameter('county', i) as string;
	return value !== undefined && value !== null && value !== '' ? value : undefined;
}

/**
 * Get postalCode parameter
 */
export function getPostalCode(this: IExecuteFunctions, i: number): string | undefined {
	const value = this.getNodeParameter('postalCode', i) as string;
	return value !== undefined && value !== null && value !== '' ? value : undefined;
}

/**
 * Get customGeolocation parameter
 * Parses JSON string if needed
 */
export function getCustomGeolocation(this: IExecuteFunctions, i: number): object | undefined {
	try {
		const rawValue = this.getNodeParameter('customGeolocation', i);
		if (typeof rawValue === 'string' && rawValue.trim() === '') {
			return undefined;
		}
		if (typeof rawValue === 'string') {
			return JSON.parse(rawValue) as object;
		}
		if (rawValue && typeof rawValue === 'object') {
			return rawValue as object;
		}
		return undefined;
	} catch (error) {
		throw new Error(`Invalid JSON in customGeolocation: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

/**
 * Get advanced geolocation section parameters
 */
export function getAdvancedGeolocationSection(this: IExecuteFunctions, i: number) : {
	countryCode: string,
	city: string | undefined,
	state: string | undefined,
	county: string | undefined,
	postalCode: string | undefined,
	customGeolocation: object | undefined,
} | null  {
	const advancedGeolocation = this.getNodeParameter('advancedGeolocation', i) as any;
        if (advancedGeolocation && typeof advancedGeolocation === 'object' && 'options' in advancedGeolocation && advancedGeolocation.options) {
        	const options: {
				countryCode: string,
				city: string | undefined,
				state: string | undefined,
				county: string | undefined,
				postalCode: string | undefined,
				customGeolocation: object | undefined,
			} = {
               	countryCode: advancedGeolocation.options.countryCode,
				city: advancedGeolocation.options.city !== undefined && advancedGeolocation.options.city !== null && advancedGeolocation.options.city !== '' ? advancedGeolocation.options.city : undefined,
				state: advancedGeolocation.options.state !== undefined && advancedGeolocation.options.state !== null && advancedGeolocation.options.state !== '' ? advancedGeolocation.options.state : undefined,
				county: advancedGeolocation.options.county !== undefined && advancedGeolocation.options.county !== null && advancedGeolocation.options.county !== '' ? advancedGeolocation.options.county : undefined,
				postalCode: advancedGeolocation.options.postalCode !== undefined && advancedGeolocation.options.postalCode !== null && advancedGeolocation.options.postalCode !== '' ? advancedGeolocation.options.postalCode : undefined,
				customGeolocation: undefined,
			}

			try {
				const rawValue = advancedGeolocation.options.customGeolocation;
				if (typeof rawValue === 'string' && rawValue.trim() === '') {
					options.customGeolocation = undefined;
				} else if (typeof rawValue === 'string') {
					options.customGeolocation = JSON.parse(rawValue) as object;
				} else if (rawValue && typeof rawValue === 'object') {
					options.customGeolocation = rawValue as object;
				} else {
					options.customGeolocation = undefined;
				}
			} catch (error) {
				throw new Error(`Invalid JSON in customGeolocation: ${error instanceof Error ? error.message : 'Unknown error'}`);
			}

			return options;
        }
    return null;
}

/**
 * Get startUrls parameter (list)
 * Transforms the fixedCollection format to an array format expected by Apify
 */
export function getStartUrls(this: IExecuteFunctions, i: number): string[] | undefined {
	const startUrls = this.getNodeParameter('startUrls', i, {}) as {
		items?: { value: string }[];
	};
	const result = startUrls.items?.map(item => item.value) || [];
	return result.length > 0 ? result : undefined;
}

/**
 * Get placeIds parameter (string list)
 * Transforms the fixedCollection format to a simple string array expected by Apify
 */
export function getPlaceIds(this: IExecuteFunctions, i: number): string[] | undefined {
	const placeIds = this.getNodeParameter('placeIds', i, {}) as {
		values?: { value: string }[];
	};
	const result = placeIds.values?.map(item => item.value) || [];
	return result.length > 0 ? result : undefined;
}

/**
 * Get alternativeSources section parameters
 */
export function getAlternativeSourcesSection(this: IExecuteFunctions, i: number) : {
	startUrls: string[] | undefined,
	placeIds: string[] | undefined,
} | null {
	const alternativeSources = this.getNodeParameter('alternativeSources', i) as any;
        if (alternativeSources && typeof alternativeSources === 'object' && 'options' in alternativeSources && alternativeSources.options) {
			const options: {
				startUrls: string[] | undefined,
				placeIds: string[] | undefined,
			} = {
				startUrls: undefined,
				placeIds: undefined,
			};

			const startUrls = alternativeSources.options.startUrls as {
				items?: { value: string }[];
			};
			const mappedStartUrls = startUrls.items?.map(item => item.value) || [];
			if(mappedStartUrls.length > 0) {
				options.startUrls = mappedStartUrls;
			}

			const placeIds = alternativeSources.options.placeIds as {
				values?: { value: string }[];
			};
			const mappedPlaceIds = placeIds.values?.map(item => item.value) || [];
			if(mappedPlaceIds.length > 0) {
				options.placeIds = mappedPlaceIds;
			}
			return options;
		}
    return null;
}

/**
 * Get allPlacesNoSearchAction parameter
 */
export function getAllPlacesNoSearchAction(this: IExecuteFunctions, i: number): string {
	return this.getNodeParameter('allPlacesNoSearchAction', i) as string;
}

/**
 * Get reviews section parameters
 */
export function getScrapingPlacesWithoutSearchTermsSection(this: IExecuteFunctions, i: number) : {
	allPlacesNoSearchAction: string,
} | null  {
	const scrapingPlacesWithoutSearchTerms = this.getNodeParameter('scrapingPlacesWithoutSearchTerms', i) as any;
        if (scrapingPlacesWithoutSearchTerms && typeof scrapingPlacesWithoutSearchTerms === 'object' && 'options' in scrapingPlacesWithoutSearchTerms && scrapingPlacesWithoutSearchTerms.options) {
        	return {
               	allPlacesNoSearchAction: scrapingPlacesWithoutSearchTerms.options.allPlacesNoSearchAction,
            };
        }
    return null;
}

/**
 * Build the complete actor input from all parameters
 */
export function buildActorInput(this: IExecuteFunctions, i: number): Record<string, any> {
	const input: Record<string, any> = {};

	// Required/simple params
	const searchStringsArray = getSearchStringsArray.call(this, i);
	if (searchStringsArray) input.searchStringsArray = searchStringsArray;

	const locationQuery = getLocationQuery.call(this, i);
	if (locationQuery) input.locationQuery = locationQuery;

	input.maxCrawledPlacesPerSearch = getMaxCrawledPlacesPerSearch.call(this, i);
	input.language = getLanguage.call(this, i);
	input.categoryFilterWords = getCategoryFilterWords.call(this, i);
	input.searchMatching = getSearchMatching.call(this, i);
	input.placeMinimumStars = getPlaceMinimumStars.call(this, i);
	input.website = getWebsite.call(this, i);
	input.skipClosedPlaces = getSkipClosedPlaces.call(this, i);
	input.scrapePlaceDetailPage = getScrapePlaceDetailPage.call(this, i);
	input.scrapeTableReservationProvider = getScrapeTableReservationProvider.call(this, i);
	input.includeWebResults = getIncludeWebResults.call(this, i);
	input.scrapeDirectories = getScrapeDirectories.call(this, i);
	input.maxQuestions = getMaxQuestions.call(this, i);
	input.scrapeContacts = getScrapeContacts.call(this, i);

	const scrapeSocialMediaProfiles = getScrapeSocialMediaProfiles.call(this, i);
	if (scrapeSocialMediaProfiles) input.scrapeSocialMediaProfiles = scrapeSocialMediaProfiles;

	input.maximumLeadsEnrichmentRecords = getMaximumLeadsEnrichmentRecords.call(this, i);
	input.leadsEnrichmentDepartments = getLeadsEnrichmentDepartments.call(this, i);
	input.maxReviews = getMaxReviews.call(this, i);

	const reviewsStartDate = getReviewsStartDate.call(this, i);
	if (reviewsStartDate) input.reviewsStartDate = reviewsStartDate;

	input.reviewsSort = getReviewsSort.call(this, i);

	const reviewsFilterString = getReviewsFilterString.call(this, i);
	if (reviewsFilterString) input.reviewsFilterString = reviewsFilterString;

	input.reviewsOrigin = getReviewsOrigin.call(this, i);
	input.scrapeReviewsPersonalData = getScrapeReviewsPersonalData.call(this, i);
	input.maxImages = getMaxImages.call(this, i);
	input.scrapeImageAuthors = getScrapeImageAuthors.call(this, i);
	input.countryCode = getCountryCode.call(this, i);

	const city = getCity.call(this, i);
	if (city) input.city = city;

	const state = getState.call(this, i);
	if (state) input.state = state;

	const county = getCounty.call(this, i);
	if (county) input.county = county;

	const postalCode = getPostalCode.call(this, i);
	if (postalCode) input.postalCode = postalCode;

	const customGeolocation = getCustomGeolocation.call(this, i);
	if (customGeolocation) input.customGeolocation = customGeolocation;

	const startUrls = getStartUrls.call(this, i);
	if (startUrls) input.startUrls = startUrls;

	const placeIds = getPlaceIds.call(this, i);
	if (placeIds) input.placeIds = placeIds;

	input.allPlacesNoSearchAction = getAllPlacesNoSearchAction.call(this, i);

	return input;
}
