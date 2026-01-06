import { IExecuteFunctions, INodeExecutionData, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { executeActorRun } from '../../helpers/genericFunctions';
import { ACTOR_ID } from '../../ApifyCrawlerGooglePlaces.node';
import * as inputFunctions from '../../helpers/inputFunctions';
import {
	getSearchStringsArrayProperty,
	getLocationQueryProperty,
	getMaxCrawledPlacesPerSearchProperty,
	getLanguageProperty,
	getCategoryFilterWordsProperty,
	getSearchMatchingProperty,
	getPlaceMinimumStarsProperty,
	getWebsiteProperty,
	getSkipClosedPlacesProperty,
	getScrapePlaceDetailPageProperty,
	getScrapeTableReservationProviderProperty,
	getIncludeWebResultsProperty,
	getScrapeDirectoriesProperty,
	getMaxQuestionsProperty,
	getScrapeContactsProperty,
	getScrapeSocialMediaProfilesProperty,
	getMaximumLeadsEnrichmentRecordsProperty,
	getLeadsEnrichmentDepartmentsProperty,
	getMaxReviewsProperty,
	getReviewsStartDateProperty,
	getReviewsSortProperty,
	getReviewsFilterStringProperty,
	getReviewsOriginProperty,
	getScrapeReviewsPersonalDataProperty,
	getMaxImagesProperty,
	getScrapeImageAuthorsProperty,
	getCountryCodeProperty,
	getCityProperty,
	getStateProperty,
	getCountyProperty,
	getPostalCodeProperty,
	getCustomGeolocationProperty,
	getStartUrlsProperty,
	getPlaceIdsProperty,
	getAllPlacesNoSearchActionProperty,
} from '../../helpers/propertyFunctions';

export const OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME = 'Generate company and business leads';
export const name = OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME;

export const option: INodePropertyOptions = {
	name: OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME,
	value: OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME,
	action: 'Generate company and business leads',
	description: 'Generate company and business leads from Google Maps',
};

export function getProperties(resourceName: string): INodeProperties[] {
	return [
		getSearchStringsArrayProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getLocationQueryProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getMaxCrawledPlacesPerSearchProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getLanguageProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getCategoryFilterWordsProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getSearchMatchingProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getPlaceMinimumStarsProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getWebsiteProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getSkipClosedPlacesProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getScrapePlaceDetailPageProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getScrapeTableReservationProviderProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getIncludeWebResultsProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getScrapeDirectoriesProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getMaxQuestionsProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getScrapeContactsProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getScrapeSocialMediaProfilesProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getMaximumLeadsEnrichmentRecordsProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getLeadsEnrichmentDepartmentsProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getMaxReviewsProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getReviewsStartDateProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getReviewsSortProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getReviewsFilterStringProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getReviewsOriginProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getScrapeReviewsPersonalDataProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getMaxImagesProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getScrapeImageAuthorsProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getCountryCodeProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getCityProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getStateProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getCountyProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getPostalCodeProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getCustomGeolocationProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getStartUrlsProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getPlaceIdsProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getAllPlacesNoSearchActionProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
	];
}

export async function execute(this: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const actorInput: Record<string, any> = {};

	// Get all input parameters
	const searchStringsArray = inputFunctions.getSearchStringsArray.call(this, i);
	if (searchStringsArray) actorInput.searchStringsArray = searchStringsArray;

	const locationQuery = inputFunctions.getLocationQuery.call(this, i);
	if (locationQuery) actorInput.locationQuery = locationQuery;

	actorInput.maxCrawledPlacesPerSearch = inputFunctions.getMaxCrawledPlacesPerSearch.call(this, i);
	actorInput.language = inputFunctions.getLanguage.call(this, i);
	actorInput.categoryFilterWords = inputFunctions.getCategoryFilterWords.call(this, i);
	actorInput.searchMatching = inputFunctions.getSearchMatching.call(this, i);
	actorInput.placeMinimumStars = inputFunctions.getPlaceMinimumStars.call(this, i);
	actorInput.website = inputFunctions.getWebsite.call(this, i);
	actorInput.skipClosedPlaces = inputFunctions.getSkipClosedPlaces.call(this, i);
	actorInput.scrapePlaceDetailPage = inputFunctions.getScrapePlaceDetailPage.call(this, i);
	actorInput.scrapeTableReservationProvider = inputFunctions.getScrapeTableReservationProvider.call(this, i);
	actorInput.includeWebResults = inputFunctions.getIncludeWebResults.call(this, i);
	actorInput.scrapeDirectories = inputFunctions.getScrapeDirectories.call(this, i);
	actorInput.maxQuestions = inputFunctions.getMaxQuestions.call(this, i);
	actorInput.scrapeContacts = inputFunctions.getScrapeContacts.call(this, i);

	const scrapeSocialMediaProfiles = inputFunctions.getScrapeSocialMediaProfiles.call(this, i);
	if (scrapeSocialMediaProfiles) actorInput.scrapeSocialMediaProfiles = scrapeSocialMediaProfiles;

	actorInput.maximumLeadsEnrichmentRecords = inputFunctions.getMaximumLeadsEnrichmentRecords.call(this, i);
	actorInput.leadsEnrichmentDepartments = inputFunctions.getLeadsEnrichmentDepartments.call(this, i);
	actorInput.maxReviews = inputFunctions.getMaxReviews.call(this, i);

	const reviewsStartDate = inputFunctions.getReviewsStartDate.call(this, i);
	if (reviewsStartDate) actorInput.reviewsStartDate = reviewsStartDate;

	actorInput.reviewsSort = inputFunctions.getReviewsSort.call(this, i);

	const reviewsFilterString = inputFunctions.getReviewsFilterString.call(this, i);
	if (reviewsFilterString) actorInput.reviewsFilterString = reviewsFilterString;

	actorInput.reviewsOrigin = inputFunctions.getReviewsOrigin.call(this, i);
	actorInput.scrapeReviewsPersonalData = inputFunctions.getScrapeReviewsPersonalData.call(this, i);
	actorInput.maxImages = inputFunctions.getMaxImages.call(this, i);
	actorInput.scrapeImageAuthors = inputFunctions.getScrapeImageAuthors.call(this, i);
	actorInput.countryCode = inputFunctions.getCountryCode.call(this, i);

	const city = inputFunctions.getCity.call(this, i);
	if (city) actorInput.city = city;

	const state = inputFunctions.getState.call(this, i);
	if (state) actorInput.state = state;

	const county = inputFunctions.getCounty.call(this, i);
	if (county) actorInput.county = county;

	const postalCode = inputFunctions.getPostalCode.call(this, i);
	if (postalCode) actorInput.postalCode = postalCode;

	const customGeolocation = inputFunctions.getCustomGeolocation.call(this, i);
	if (customGeolocation) actorInput.customGeolocation = customGeolocation;

	const startUrls = inputFunctions.getStartUrls.call(this, i);
	if (startUrls) actorInput.startUrls = startUrls;

	const placeIds = inputFunctions.getPlaceIds.call(this, i);
	if (placeIds) actorInput.placeIds = placeIds;

	actorInput.allPlacesNoSearchAction = inputFunctions.getAllPlacesNoSearchAction.call(this, i);

	return await executeActorRun.call(this, ACTOR_ID, actorInput);
}
