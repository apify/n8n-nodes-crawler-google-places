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
 * Get allPlacesNoSearchAction parameter
 */
export function getAllPlacesNoSearchAction(this: IExecuteFunctions, i: number): string {
	return this.getNodeParameter('allPlacesNoSearchAction', i) as string;
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
