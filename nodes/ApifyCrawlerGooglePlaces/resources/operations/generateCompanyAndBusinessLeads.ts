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
	getAlternativeSourcesSectionProperty,
	getCompanyContactsEnrichmentSectionProperty,
	getAdditionalPlaceDetailsScrapingSectionProperty,
	getBusinessLeadsEnrichmentSectionProperty,
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
		getSearchFiltersAndCategoriesSectionProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getAdditionalPlaceDetailsScrapingSectionProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getCompanyContactsEnrichmentSectionProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getBusinessLeadsEnrichmentSectionProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
		getAlternativeSourcesSectionProperty(resourceName, OPERATION_GENERATE_COMPANY_AND_BUSINESS_LEADS_NAME),
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

	const companyContactsEnrichment = inputFunctions.getCompanyContactsEnrichmentSection.call(this, i);
	if (companyContactsEnrichment) {
		actorInput.scrapeContacts = companyContactsEnrichment.scrapeContacts;
		actorInput.scrapeSocialMediaProfiles = companyContactsEnrichment.scrapeSocialMediaProfiles;
	}

	const businessLeadsEnrichment = inputFunctions.getBusinessLeadsEnrichmentSection.call(this, i);
	if (businessLeadsEnrichment) {
		actorInput.maximumLeadsEnrichmentRecords = businessLeadsEnrichment.maximumLeadsEnrichmentRecords;
		actorInput.leadsEnrichmentDepartments = businessLeadsEnrichment.leadsEnrichmentDepartments;
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

	return await executeActorRun.call(this, ACTOR_ID, actorInput);
}
