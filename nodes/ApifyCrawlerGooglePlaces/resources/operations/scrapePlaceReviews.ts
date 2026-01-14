import { IExecuteFunctions, INodeExecutionData, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { executeActorRun } from '../../helpers/genericFunctions';
import { ACTOR_ID } from '../../ApifyCrawlerGooglePlaces.node';
import * as inputFunctions from '../../helpers/inputFunctions';
import {
	getSearchStringsArrayProperty,
	getLocationQueryProperty,
	getMaxCrawledPlacesPerSearchProperty,
	getLanguageProperty,
	getSearchFiltersAndCategoriesSectionProperty,
	getAdditionalPlaceDetailsScrapingSectionProperty,
	getAlternativeSourcesSectionProperty,
	getScrapingPlacesWithoutSearchTermsSectionProperty,
	getReviewsSectionProperty,
} from '../../helpers/propertyFunctions';

export const OPERATION_SCRAPE_PLACE_REVIEWS_NAME = 'Scrape place reviews';
export const name = OPERATION_SCRAPE_PLACE_REVIEWS_NAME;

export const option: INodePropertyOptions = {
	name: OPERATION_SCRAPE_PLACE_REVIEWS_NAME,
	value: OPERATION_SCRAPE_PLACE_REVIEWS_NAME,
	action: 'Scrape place reviews',
	description: 'Scrape Google Maps place reviews',
};

export function getProperties(resourceName: string): INodeProperties[] {
	return [
		getSearchStringsArrayProperty(resourceName, OPERATION_SCRAPE_PLACE_REVIEWS_NAME),
		getLocationQueryProperty(resourceName, OPERATION_SCRAPE_PLACE_REVIEWS_NAME),
		getMaxCrawledPlacesPerSearchProperty(resourceName, OPERATION_SCRAPE_PLACE_REVIEWS_NAME),
		getLanguageProperty(resourceName, OPERATION_SCRAPE_PLACE_REVIEWS_NAME),
		getSearchFiltersAndCategoriesSectionProperty(resourceName, OPERATION_SCRAPE_PLACE_REVIEWS_NAME),
		getAdditionalPlaceDetailsScrapingSectionProperty(resourceName, OPERATION_SCRAPE_PLACE_REVIEWS_NAME),
		getReviewsSectionProperty(resourceName, OPERATION_SCRAPE_PLACE_REVIEWS_NAME),
		getAlternativeSourcesSectionProperty(resourceName, OPERATION_SCRAPE_PLACE_REVIEWS_NAME),
		getScrapingPlacesWithoutSearchTermsSectionProperty(resourceName, OPERATION_SCRAPE_PLACE_REVIEWS_NAME),
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
		
	const searchFiltersAndCategories = inputFunctions.getSearchFiltersAndCategoriesSection.call(this, i);
	if (searchFiltersAndCategories) {
		actorInput.categoryFilterWords = searchFiltersAndCategories.categoryFilterWords;
		actorInput.searchMatching = searchFiltersAndCategories.searchMatching;
		actorInput.placeMinimumStars = searchFiltersAndCategories.placeMinimumStars;
		actorInput.website = searchFiltersAndCategories.website;
		actorInput.skipClosedPlaces = searchFiltersAndCategories.skipClosedPlaces;
	}
	
	const additionalPlaceDetailsScraping = inputFunctions.getAdditionalPlaceDetailsScrapingSection.call(this, i);
	if (additionalPlaceDetailsScraping) {
		actorInput.scrapePlaceDetailPage = additionalPlaceDetailsScraping.scrapePlaceDetailPage;
		actorInput.scrapeTableReservationProvider = additionalPlaceDetailsScraping.scrapeTableReservationProvider;
		actorInput.includeWebResults = additionalPlaceDetailsScraping.includeWebResults;
		actorInput.scrapeDirectories = additionalPlaceDetailsScraping.scrapeDirectories;
		actorInput.maxQuestions = additionalPlaceDetailsScraping.maxQuestions;
	}
	
	const reviews = inputFunctions.getReviewsSection.call(this, i);
	if (reviews) {
		actorInput.maxReviews = reviews.maxReviews;
		const reviewsStartDate = reviews.reviewsStartDate;
		if (reviewsStartDate) actorInput.reviewsStartDate = reviewsStartDate;
		actorInput.reviewsSort = reviews.reviewsSort;
		actorInput.reviewsFilterString = reviews.reviewsFilterString;
		actorInput.reviewsOrigin = reviews.reviewsOrigin;
		actorInput.scrapeReviewsPersonalData = reviews.scrapeReviewsPersonalData;
	}
	
	const alternativeSources = inputFunctions.getAlternativeSourcesSection.call(this, i);
	if (alternativeSources) {
		if (alternativeSources.startUrls) {
			actorInput.startUrls = alternativeSources.startUrls;
		}
		if (alternativeSources.placeIds) {
			actorInput.placeIds = alternativeSources.placeIds;
		}
	}
	
	const scrapingPlacesWithoutSearchTerms = inputFunctions.getScrapingPlacesWithoutSearchTermsSection.call(this, i);
	if (scrapingPlacesWithoutSearchTerms) {
		actorInput.allPlacesNoSearchAction = scrapingPlacesWithoutSearchTerms.allPlacesNoSearchAction;
	}

	return await executeActorRun.call(this, ACTOR_ID, actorInput);
}
